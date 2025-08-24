<?php

namespace App\Infrastructure\Persistence\Eloquent\Donation;

use App\Domain\Donation\Models\Donation;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use Illuminate\Support\Facades\DB;

class EloquentDonationRepository implements DonationRepositoryInterface
{
    public function all(){
        return Donation::all();
    }

    public function find($id){
        return Donation::findOrFail($id);
    }

    public function byCharity($id){
        return Donation::where('charity_id', $id)->get();
    }

    public function createCard($id, array $data){
        $donation = Donation::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phonenumber' => $data['phonenumber'],
            'address' => $data['address'],
            'amount' => $data['amount'],
            'charity_id' => $id,
            'payment_intent_id' => $data['paymentIntentId'],
        ]);

        return $donation;
    }

    public function createImage($id, array $data){
        $donation = Donation::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phonenumber' => $data['phonenumber'],
            'address' => $data['address'],
            'amount' => $data['amount'],
            'charity_id' => $id,
            'image' => $data['image'],
        ]);

        return $donation;
    }

    public function getEveryDonors($data){

        $charityId=$data['charity_id'];

        $donors = DB::table('donations')
            ->select('email', 'name', DB::raw('SUM(amount) as total_donated'))
            ->where('charity_id', $charityId)
            ->groupBy('email', 'name')
            ->get();

        return $donors;
    }
    public function charityDonation($data){

        $charityId=$data['charity_id'];

        $totalDonation = DB::table('donations')
            ->where('charity_id', $charityId)
            ->where('status', 'completed') // Optional: only count completed donations
            ->sum('amount');

        return $totalDonation;
    }

    public function getTotalDonationForEveryCharity(){

        $totals = DB::table('donations')
            ->select('charity_id', DB::raw('SUM(amount) as total_donated'))
            ->where('status', 'completed')
            ->groupBy('charity_id')
            ->get();

        return $totals;
    }

    public function totalDonationByYear($data)
    {
        $startDate = $data['start'];
        $endDate = $data['end'];
        $charityId = $data['charity_id'];



        $totalAmount = DB::table('donations')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('status', 'Accepted')
            ->where('charity_id', $charityId)
            ->sum('amount');

        return $totalAmount;
    }

    public function totalDonorsByYear($data)
    {
        $startDate = $data['start'];
        $endDate = $data['end'];
        $charityId = $data['charity_id'];

        $donorBreakdown = DB::table('donations')
            ->select('email', 'name', DB::raw('SUM(amount) as total_donated'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('status', 'Accepted')
            ->where('charity_id', $charityId)
            ->groupBy('email', 'name')
            ->get();

        return $donorBreakdown;
    }

    public function DonationChart($data)
    {

        // Get unique donor count per month based on email
        $monthlyCounts = DB::table('donations')
            ->selectRaw('MONTH(created_at) as month, COUNT(DISTINCT email) as total')
            ->whereYear('created_at', $data['year'])
            ->where('charity_id', $data['charity_id'])
            ->groupBy('month')
            ->pluck('total', 'month')
            ->toArray();

        // Initialize all months to 0
        $months = array_fill(1, 12, 0);

        // Replace with actual counts
        foreach ($monthlyCounts as $month => $count) {
            $months[$month] = $count;
        }

        return $months;
    }

    public function confirm($data){
        $donation = Donation::findOrFail($data['id']);
        if ($data['decision'] == 'accepted') {
            $donation->status = 'accepted';
            $donation->save();
        }else{
            $donation->status = 'rejected';
            $donation->save();
        }
        return $donation;
    }
}
