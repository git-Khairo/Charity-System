<?php

namespace App\Application\SuperAdmin\useCases;

use App\Domain\Charity\Models\Charity;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerFeedbackRepository;

class DisplayAllFeedback
{

    protected  EloquentVolunteerFeedbackRepository  $feedbackRepo;
    protected CharityRepositoryInterface $charityRepo;
    public function __construct(EloquentVolunteerFeedbackRepository  $feedbackRepo,CharityRepositoryInterface $charityRepo)
    {
        $this->feedbackRepo=$feedbackRepo;
        $this->charityRepo=$charityRepo;
    }

    public function allFeedbacks(){

        return $this->feedbackRepo->all();

    }

    public function charityFeedback(){
        $charities = Charity::with('beneficiary_feedback')->get();


        return $charities->pluck('beneficiary_feedback')->flatten();
    }

}
