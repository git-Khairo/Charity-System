<?php

namespace App\Domain\Admins\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface AdminRepositoriesInterface
{
    public function register(array $data);
    public function login(array $data);
    public function logout($request);
    public function getActivity($data);
    public function volunteerStat($data);
    public function BeneficiaryStat($data);
    public function verify($token);
    public function charity();
}
