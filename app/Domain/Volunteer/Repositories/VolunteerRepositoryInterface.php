<?php

namespace App\Domain\Volunteer\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface VolunteerRepositoryInterface extends BaseRepositoryInterface
{
    public function Register(array $data);
    public function login(array $data);
    public function apply(array $data);
    public function createFeedback(array $data);
    public function charityVolunteer($data);
    public function allCharitiesVolunteerCounts();
    public function eventStat($data);
    public function getMonthlyAcceptedEvents($data);
}
