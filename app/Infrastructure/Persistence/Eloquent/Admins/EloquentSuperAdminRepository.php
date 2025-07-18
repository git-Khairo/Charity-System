<?php

namespace App\Infrastructure\Persistence\Eloquent\Admins;

use App\Domain\Admins\Models\Admin;
use App\Domain\Admins\Repositories\SuperAdminRepositoriesInterface;
use App\Domain\Beneficiary\Models\Beneficiary;
use App\Domain\Charity\Models\Charity;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EloquentSuperAdminRepository implements SuperAdminRepositoriesInterface
{
    public function login(array $data){
        // Attempt to find the beneficiary by email
        $superAdmin = Admin::where('email', $data['email'])->first();

        if (!$superAdmin || !Hash::check($data['password'], $superAdmin->password)) {
            return null;
        }

        // Create a personal access token
        $token = $superAdmin->createToken($superAdmin->email)->plainTextToken;

        return [
            'user'  => $superAdmin,
            'token' => $token
        ];
    }

    public function logout($request){
        $request->user()->tokens()->delete();
        return;
    }

    public function allCharityInfo(){


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
