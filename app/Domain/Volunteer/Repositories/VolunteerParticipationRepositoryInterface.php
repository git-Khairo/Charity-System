<?php

namespace App\Domain\Volunteer\Repositories;

use App\Domain\Repositories\BaseRepositoryInterface;

interface VolunteerParticipationRepositoryInterface extends BaseRepositoryInterface
{
    public function allParticipation($id);

}
