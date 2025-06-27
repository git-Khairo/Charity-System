<?php

namespace App\Http\Controllers;

use App\Application\Donation\GetDonation;
use App\Application\Donation\GetDonationByCharity;
use App\Application\Donation\GetDonations;
use App\Application\Donation\StoreDonation;
use App\Interfaces\Http\Requests\Donation\DonationRequest;
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

    public function storeDonation($id, DonationRequest $request, StoreDonation $usecase)
    {
        $donation = $usecase->storeDonation($id, $request);
        return response()->json(['message' => 'Donation Stored', 'donations' => $donation], 201);
    }
}
