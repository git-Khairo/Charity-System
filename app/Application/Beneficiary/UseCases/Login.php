<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;

class Login
{
    protected BeneficiaryRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(BeneficiaryRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

     public function login($data){
        return $this->repo->login($data);
    }
}
