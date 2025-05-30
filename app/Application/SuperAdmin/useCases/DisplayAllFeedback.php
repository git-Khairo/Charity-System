<?php

namespace App\Application\SuperAdmin\useCases;

use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;

class DisplayAllFeedback
{

    protected BaseRepositoryInterface $feedbackRepo;
    public function __construct(EloquentEventRepository $feedbackRepo)
    {
        $this->feedbackRepo=$feedbackRepo;
    }

    public function allFeedbacks(){

        return $this->feedbackRepo->all();

    }

}
