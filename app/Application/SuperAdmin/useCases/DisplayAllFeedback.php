<?php

namespace App\Application\SuperAdmin\useCases;

use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;
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

    public function charityFeedback($id){

        $charity=$this->charityRepo->find($id);

        $charity->beneficiary_feedback;

        return $charity['beneficiary_feedback'];

    }

}
