<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Repositories\BaseRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryNotificationRepository;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerNotificationRepository;

class AllNotification
{
    protected BaseRepositoryInterface $notificationRepo;

    public function __construct(EloquentVolunteerNotificationRepository  $notificationRepo)
    {

        $this->notificationRepo = $notificationRepo;
    }

    public function all(){
        return $this->notificationRepo->all();
    }


}
