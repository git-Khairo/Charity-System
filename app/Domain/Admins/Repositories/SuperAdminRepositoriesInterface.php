<?php

namespace App\Domain\Admins\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface SuperAdminRepositoriesInterface
{
    public function login(array $data);
    public function logout($request);
    public function allCharityInfo();

}
