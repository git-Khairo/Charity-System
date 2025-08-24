<?php

namespace App\Application\Donation;

use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use App\Mail\SendDonationEmail;
use Illuminate\Support\Facades\Mail;

class ConfirmDonation
{
    protected DonationRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(DonationRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function confirm($data){
        $donation = $this->repo->confirm($data);
        if($donation){
            Mail::to($data['email'])->send(new SendDonationEmail($data));
        }
        return $donation;
    }
}
