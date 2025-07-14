<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;

class Statistics
{


    protected AdminRepositoriesInterface $repo;


    public function __construct(AdminRepositoriesInterface $repo)
    {
        $this->repo = $repo;
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

}
