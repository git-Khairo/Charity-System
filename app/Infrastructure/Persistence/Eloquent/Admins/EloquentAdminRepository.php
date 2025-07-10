<?php

namespace App\Infrastructure\Persistence\Eloquent\Admins;

use App\Domain\Admins\Models\Admin;
use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Beneficiary\Models\Beneficiary;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

    public function findPart($id)
    {
        //return ::findOrFail($id);
    }


}
