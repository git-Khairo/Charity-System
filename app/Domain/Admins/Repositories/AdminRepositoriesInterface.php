<?php

namespace App\Domain\Admins\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface AdminRepositoriesInterface
{
    public function register(array $data);
    public function login($lang,array $data);
    public function logout($request);
    public function getActivity($data);
    public function volunteerStat($data);
}
