<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ApplyForCharity
{
       protected BeneficiaryRepositoryInterface $repo;
       protected CharityRepositoryInterface $charityRepo;
    /**
     * Create a new class instance.
     */
    public function __construct(BeneficiaryRepositoryInterface $repo,CharityRepositoryInterface $charityRepo)
    {
        $this->repo = $repo;
        $this->charityRepo = $charityRepo;
    }

    public function applyForCharity($id, $data){
        return $this->repo->apply($id, $data);
    }

    public function myApplication(){

        $beneficiary = Auth::user();

        $beneficiary->request;

        $requests=$beneficiary['request'];


        if(!$requests->first()){

            return response()->json(['message' => 'No participation found'], 404);
        }

        $response = [];

        foreach ($requests as $request) {
            $charity = $this->charityRepo->find($request->charity_id);

            $response[] = [
                'id' => $request->id,
                'orgName' => $charity ? $charity->name : null,
                'status' => $request->status,
                'details' => $request->details,
                'date' => $request->created_at,
            ];
        }
        //$participation->event;

        return $response ;
    }

    public function MyCharities(){

        $beneficiary=Auth::user();

        $response=$this->repo->getMyCharities($beneficiary->id);


        return $response->pluck('charity')->unique('id')->values();

    }
}
