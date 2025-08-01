<?php

namespace App\Application\Beneficiary\UseCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerParticipationRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryNotificationRepository;
use Illuminate\Support\Facades\Auth;

class AllNotification
{
    protected BaseRepositoryInterface $notificationRepo;

    public function __construct(EloquentBeneficiaryNotificationRepository $notificationRepo)
    {

        $this->notificationRepo = $notificationRepo;
    }

    public function all(){
        return $this->notificationRepo->all();
    }


    public function userNotification(){

        $beneficiary=Auth::user();

        $beneficiary->notification;

        $notification=$beneficiary['notification'];

        return $notification;
    }
}
