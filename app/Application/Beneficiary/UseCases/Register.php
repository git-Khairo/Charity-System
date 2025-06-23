<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;

class Register
{
    protected BeneficiaryRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(BeneficiaryRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

     public function register($data){
        return $this->repo->register($data->toArray());
    }
}
