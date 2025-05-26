<?php

namespace App\Domain\Volunteer\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface VolunteerRepositoryInterface extends BaseRepositoryInterface
{
    public function Register(array $data);
    public function login(array $data);
    public function apply(array $data);
    public function findEvent($id);
    public function createFeedback(array $data);
}
