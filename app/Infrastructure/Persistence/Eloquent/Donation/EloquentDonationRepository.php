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

    public function create(array $data){

    }
}
