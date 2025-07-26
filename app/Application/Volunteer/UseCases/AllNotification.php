<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Repositories\BaseRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryNotificationRepository;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerNotificationRepository;
use Illuminate\Support\Facades\Auth;

class AllNotification
{
    protected BaseRepositoryInterface $notificationRepo;

    public function __construct(EloquentVolunteerNotificationRepository  $notificationRepo)
    {

        $this->notificationRepo = $notificationRepo;
    }

    public function all(){

        $volunteer=Auth::user();

        $notification=$volunteer->notification()->latest()->get();

        return $notification;
    }


}
