<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class Feedback
{
    protected VolunteerRepositoryInterface $repo ;

    public function __construct(VolunteerRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function makeFeedback(array $data){

        return $this->repo->createFeedback($data);
    }

    public function myFeedback(){

        $volunteer=Auth::user();


        $volunteer->feedback;

        return $volunteer;

    }

}
