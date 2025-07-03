<?php

namespace App\Application\SuperAdmin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use Spatie\Permission\Models\Role;

class CreateAdmin
{
    protected AdminRepositoryInterface $repo;


    public function __construct(AdminRepositoriesInterface $repo)
    {
        $this->repo = $repo;
    }

    public function register($data){

        $admin = $this->repo->register($data);

        $adminRole=Role::firstOrCreate(['name' => 'Admin','guard_name' => 'api']);

        $admin->assignRole($adminRole);

        return $admin;
    }


}
