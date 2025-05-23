<?php

namespace App\Domain\Volunteer\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface VolunteerRepositoryInterface extends BaseRepositoryInterface
{
    public function Register(array $data);
}
