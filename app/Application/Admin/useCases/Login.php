<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;

class Login
{
    protected AdminRepositoriesInterface $repo;


    public function __construct(AdminRepositoriesInterface $repo)
    {
        $this->repo = $repo;
    }

    public function login($data){

        return $this->repo->login($data);

    }

}
