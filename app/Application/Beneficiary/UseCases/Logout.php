<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;

class Logout
{
    protected BeneficiaryRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(BeneficiaryRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function logout($request){
        return $this->repo->logout($request);
    }
}
