<?php

namespace App\Infrastructure\Persistence\Eloquent\Admins;

use App\Domain\Admins\Models\Admin;
use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Beneficiary\Models\Beneficiary;
use App\Domain\Charity\Models\Charity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class EloquentAdminRepository implements AdminRepositoriesInterface
{

    public function register(array $data){
        $admin = Admin::create($data);

        $token=$admin->createToken($admin->email)->plainTextToken;

        $response=[
            'user'=>$admin,
            'token'=>$token
        ];

        return $response;
    }

    public function login(array $data){
        // Attempt to find the beneficiary by email
        $admin = Admin::where('email', $data['email'])->first();

        if (!$admin || !Hash::check($data['password'], $admin->password)) {
            return null;
        }

        // Create a personal access token
        $token = $admin->createToken($admin->email)->plainTextToken;


        return [
            'user'  => $admin,
            'token' => $token
        ];
    }

    public function logout($request){
        $request->user()->tokens()->delete();
        return;
    }

    public function getActivity($data)
    {


        $charity=$data['charity'];

        $year=$data['year'];

        // Fetch counts grouped by month
        $events = $charity->events()
            ->whereYear('created_at', $year)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month');

        // Generate full 12-month output (fill missing months with 0)
        $monthlyCounts = collect(range(1, 12))->mapWithKeys(function ($month) use ($events) {
            return [$month => $events->get($month, 0)];
        });

        return response()->json([
            'charity_id' => $charity->id,
            'year' => $year,
            'monthly_events' => $monthlyCounts
        ]);
    }

    public function volunteerStat($data)
    {

        $charity = $data['charity'];
        $year = $data['year'];

        // Get all event IDs for this charity
        $eventIds = $charity->events()->pluck('id');

        // Count accepted volunteer applications by month
        $applications = collect(DB::table('participations') // adjust table name if needed
        ->whereIn('event_id', $eventIds)
            ->whereYear('created_at', $year)
            ->where('status', 'accepted')
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month'));

        // Fill all months with 0 where no applications
        $monthlyCounts = collect(range(1, 12))->mapWithKeys(function ($month) use ($applications) {
            return [$month => $applications->get($month, 0)];
        });

        return response()->json([
            'charity_id' => $charity->id,
            'year' => $year,
            'monthly_accepted_volunteers' => $monthlyCounts
        ]);
    }

    public function beneficiaryStat($data)
    {
        $charity = $data['charity'];
        $year = $data['year'];

        // Get all request IDs or filter by charity if applicable
        // Adjust the table and field names if different
        $requests = collect(DB::table('requests')
            ->where('charity_id', $charity->id) // Adjust if relationship is different
            ->whereYear('created_at', $year)
            ->where('status', 'accepted')
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupByRaw('MONTH(created_at)')
            ->pluck('total', 'month'));

        // Fill all 12 months with 0 where there are no requests
        $monthlyCounts = collect(range(1, 12))->mapWithKeys(function ($month) use ($requests) {
            return [$month => $requests->get($month, 0)];
        });

        return response()->json([
            'charity_id' => $charity->id,
            'year' => $year,
            'monthly_accepted_requests' => $monthlyCounts
        ]);
    }

    public function verify($token){
        if (!$token) {
            return response()->json(['error' => 'Invalid token format'], 400);
        }

        $cleanToken = preg_replace('/^\d+\|/', '', $token);
        $hashedToken = hash('sha256', $cleanToken);

        $token = PersonalAccessToken::where('token', $hashedToken)->first();

        if ($token) {

            $user=Auth::user();
            $user->getRoleNames();

            if ( $user->hasRole('Admin')) {
               $user->charity;
            }


            return [
            'valid' => true,
            'user' => $user
                ];
        }

        return false;
    }

    public function charity()
    {

        $charities = Charity::with(['events.volunteer' => function ($q) {
            $q->select('id', 'event_id', 'volunteer_id');
        }])
            ->select('id', 'name', 'email')
            ->get()
            ->map(function ($charity) {
                // Get unique volunteer IDs from all participations through events
                //  dd(  $charity->events
                //    ->flatMap-> voluntee);
                $volunteerCount = $charity->events
                    ->flatMap-> volunteer
                    ->pluck('volunteer_id')
                    ->unique()
                    ->count();

                // Count distinct beneficiaries (requests)
                $beneficiaryCount = DB::table('requests')
                    ->where('charity_id', $charity->id)
                    ->distinct('beneficiary_id')
                    ->count('beneficiary_id');

                // Count distinct donors
                $donorCount = DB::table('donations')
                    ->select('email', DB::raw('COUNT(*) as total_donations'))
                    ->groupBy('email')
                    ->get();

                // Sum total donations
                $totalDonations = DB::table('donations')
                    ->where('charity_id', $charity->id)
                    ->sum('amount');

                return [
                    'id' => $charity->id,
                    'name' => $charity->name,
                    'email' => $charity->email,
                    'report' => [
                        'total_volunteers' => $volunteerCount,
                        'total_beneficiaries' => $beneficiaryCount,
                        'total_donors' => $donorCount,
                        'total_donation_amount' => round($totalDonations, 2),
                    ],
                ];
            });

        return $charities;
    }

}
