<?php

namespace App\Infrastructure\Persistence\Eloquent\Donation;

use App\Domain\Donation\Models\Donation;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;

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

    public function createCard($id, array $data, $paymentIntent){
        Donation::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phonenumber' => $data['phonenumber'],
            'address' => $data['address'],
            'amount' => $data['amount'],
            'charity_id' => $id,
            'payment_intent_id' => $paymentIntent->id,
        ]);

        return $paymentIntent->client_secret;
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

        return $donation->id;
    }
}
