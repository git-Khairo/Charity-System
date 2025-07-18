<?php

namespace App\Application\SuperAdmin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;

class FinancialReport
{

    protected DonationRepositoryInterface $donationRepo;


    public function __construct( DonationRepositoryInterface $donationRepo)
    {
        $this->donationRepo=$donationRepo;
    }

    public function report($data){

        return $this->donationRepo->totalDonationByYear($data);
    }

}
