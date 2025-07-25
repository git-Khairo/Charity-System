<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;

class Statistics
{


    protected AdminRepositoriesInterface $repo;
    protected DonationRepositoryInterface $donationRepo;


    public function __construct(AdminRepositoriesInterface $repo, DonationRepositoryInterface $donationRepo)
    {
        $this->repo = $repo;
        $this->donationRepo=$donationRepo;
    }


    public function allVolunteer($request){

        $admin = auth()->user();
        $charity = $admin->charity;

        if (!$charity) {
            return response()->json(['message' => 'No charity found for this admin'], 404);
        }

        $year = $request['year'];

        $data =[
            'charity'=>$charity,
            'year'=>$year
        ];

        return $this->repo->volunteerStat($data);
    }

    public function allBeneficiary($request){

        $admin = auth()->user();
        $charity = $admin->charity;

        if (!$charity) {
            return response()->json(['message' => 'No charity found for this admin'], 404);
        }

        $year = $request['year'];

        $data =[
            'charity'=>$charity,
            'year'=>$year
        ];

        return $this->repo->BeneficiaryStat($data);
    }

    public function allDonors(){

        $admin = auth()->user();
        $charity = $admin->charity;

        if (!$charity) {
            return response()->json(['message' => 'No charity found for this admin'], 404);
        }


        $data=[
            'charity_id'=>$charity->id,
        ];

        return  $this->donationRepo->getEveryDonors($data);

    }

}
