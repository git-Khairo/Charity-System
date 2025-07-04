<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;

class ActivityReport
{

    protected AdminRepositoriesInterface $repo;


    public function __construct(AdminRepositoriesInterface $repo)
    {
        $this->repo = $repo;
    }

    public function report($data){

        $admin = auth()->user();
        $charity = $admin->charity;


        if (!$charity) {
            return response()->json(['message' => 'No charity found for this admin'], 404);
        }



        $year = $data['year'];


        $data =[
            'charity'=>$charity,
            'year'=>$year
        ];


        return $this->repo->getActivity($data);
    }

}
