<?php

namespace App\Application\SuperAdmin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Admins\Repositories\SuperAdminRepositoriesInterface;
use Spatie\Permission\Models\Role;

class Login
{
    protected SuperAdminRepositoryInterface $repo;


    public function __construct(SuperAdminRepositoriesInterface $repo)
    {
        $this->repo = $repo;
    }

    public function login($data){

        return $this->repo->login($data);
    }



}
