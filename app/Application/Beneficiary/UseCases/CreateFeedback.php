<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class CreateFeedback
{
        protected BeneficiaryRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(BeneficiaryRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

     public function createFeedback($id, $data){
        return $this->repo->createFeedback($id, $data);
    }

    public function myFeedback(){

        $beneficiary=Auth::user();


        $beneficiary->feedback;

        $feedback=$beneficiary['feedback'];

        return $feedback;

    }

}
