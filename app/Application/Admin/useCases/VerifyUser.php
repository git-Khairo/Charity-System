<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;

class VerifyUser
{
    protected AdminRepositoriesInterface $repo;


    public function __construct(AdminRepositoriesInterface $repo)
    {
        $this->repo = $repo;
    }

    public function verify($token){

        return $this->repo->verify($token);

    }
}
