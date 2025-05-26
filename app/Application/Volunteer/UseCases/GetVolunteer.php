<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class GetVolunteer
{
    protected VolunteerRepositoryInterface $repo ;

    public function __construct(VolunteerRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getUser($id){

        return $this->repo->find($id);

    }

}
