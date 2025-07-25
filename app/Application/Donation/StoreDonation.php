<?php

namespace App\Application\Donation;

use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class StoreDonation
{
    protected DonationRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(DonationRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function storeDonation($id, $data){
        if($data['payment'] == 'bank'){
            $path = $data->file('bankStatement')->store('donations', 'public');
            $data['image'] = $path;
            return $this->repo->createImage($id, $data->toArray());
        }else{
            return $this->repo->createCard($id, $data->toArray());
        }
    }
}
