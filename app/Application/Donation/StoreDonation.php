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
        if($data->hasFile('image')){
            $path = $data->file('image')->store('donations', 'public');
            $data['image'] = $path;
            return $this->repo->createImage($id, $data->toArray());
        }else{
            Stripe::setApiKey(config('services.stripe.secret'));

            // Convert amount to cents
            $amountInCents = $data['amount'] * 100;

            $paymentIntent = PaymentIntent::create([
                'amount' => $amountInCents,
                'currency' => 'usd',
                'payment_method_types' => ['card'],
                'metadata' => [
                    'donor_name' => $data['name'],
                    'charity_id' => $id,
                ]
            ]);
            return $this->repo->createCard($id, $data->toArray(), $paymentIntent);
        }
    }
}
