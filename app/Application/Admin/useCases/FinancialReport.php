<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use Carbon\Carbon;


class FinancialReport
{

    protected AdminRepositoriesInterface $repo;
    protected DonationRepositoryInterface $donationRepo;


    public function __construct(AdminRepositoriesInterface $repo, DonationRepositoryInterface $donationRepo)
    {
        $this->repo = $repo;
        $this->donationRepo=$donationRepo;
    }


    public function report($data){

        $start = Carbon::createFromFormat('Y-m', $data['start'])->startOfMonth();
        $end = Carbon::createFromFormat('Y-m', $data['end'])->endOfMonth();

        $charityId = $data['charity_id'];

        $validData=[
            'start'=>$start,
            'end'=>$end,
            'charity_id'=>$charityId

        ];

    //    dd($data);

        return [
            'totalAmount'=>$this->donationRepo->totalDonationByYear($validData),
             'donorBreakdown'=>$this->donationRepo->totalDonorsByYear($validData)
        ];
    }

}
