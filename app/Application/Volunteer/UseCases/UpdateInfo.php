<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class UpdateInfo
{
    protected VolunteerRepositoryInterface $repo ;

    public function __construct(VolunteerRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function Update(array $data){

        $volunteerId=Auth::id();

        return $this->repo->update($volunteerId,$data);

    }

}
