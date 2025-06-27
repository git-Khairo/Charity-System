<?php

namespace App\Http\Controllers;

use App\Application\Donation\GetDonation;
use App\Application\Donation\GetDonationByCharity;
use App\Application\Donation\GetDonations;
use App\Interfaces\Http\Resources\Donation\DonationResource;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllDonations(GetDonations $usecase)
    {
        $donations = $usecase->getDonations();
        return response()->json(['message' => 'All Donations', 'donations' => DonationResource::collection($donations)], 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getDonation($id, GetDonation $usecase)
    {
        $donation = $usecase->getDonation($id);
        return response()->json(['message' => 'All Donations', 'donations' => new DonationResource($donation)], 201);
    }

    public function getDonationByCharity($id, GetDonationByCharity $usecase)
    {
        $donations = $usecase->getDonationByCharity($id);
        return response()->json(['message' => 'All Donations', 'donations' => DonationResource::collection($donations)], 201);
    }
}
