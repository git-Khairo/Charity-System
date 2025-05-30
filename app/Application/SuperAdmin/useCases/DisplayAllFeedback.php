<?php

namespace App\Application\SuperAdmin\useCases;

use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerFeedbackRepository;

class DisplayAllFeedback
{

    protected BaseRepositoryInterface $feedbackRepo;
    public function __construct(EloquentVolunteerFeedbackRepository  $feedbackRepo)
    {
        $this->feedbackRepo=$feedbackRepo;
    }

    public function allFeedbacks(){

        return $this->feedbackRepo->all();

    }

}
