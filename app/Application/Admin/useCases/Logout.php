<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;

class Logout
{

    protected AdminRepositoryInterface $repo;


    public function __construct(AdminRepositoriesInterface $repo)
    {
        $this->repo = $repo;
    }

    public function logout($data){

        return $this->repo->logout($data);

    }


}
