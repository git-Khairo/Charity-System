<?php

namespace App\Application\Donation;

use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class GetPaymentIntent
{
    protected DonationRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(DonationRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getIntent($id, $data){
        Stripe::setApiKey(config('services.stripe.secret'));

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

        return $paymentIntent->client_secret;
    }
}
