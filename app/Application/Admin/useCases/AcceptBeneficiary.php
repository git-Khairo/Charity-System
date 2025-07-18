<?php

namespace App\Application\Admin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRequestRepositoryInterface;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Domain\Events\Repositories\EventRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerParticipationRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryNotificationRepository;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerNotificationRepository;

class AcceptBeneficiary
{
    protected AdminRepositoriesInterface $adminRepo;
    protected BeneficiaryRepositoryInterface  $beneficiaryRepo;
    protected BeneficiaryRequestRepositoryInterface $requestRepo;
    protected BaseRepositoryInterface $notificationRepo;
    protected CharityRepositoryInterface $charityRepo;

    public function __construct(AdminRepositoriesInterface $adminRepo,
                                BeneficiaryRepositoryInterface  $beneficiaryRepo,
                                BeneficiaryRequestRepositoryInterface $requestRepo,
                                CharityRepositoryInterface $charityRepo,
                                EloquentBeneficiaryNotificationRepository $notificationRepo
    )
    {
        $this->adminRepo = $adminRepo;
        $this->beneficiaryRepo = $beneficiaryRepo;
        $this->requestRepo = $requestRepo;
        $this->charityRepo = $charityRepo;
        $this->notificationRepo = $notificationRepo;
    }


    public function accept($data){

        $beneficiary=$this->beneficiaryRepo->find($data['beneficiary_id']);

        $request=$this->requestRepo->find($data['request_id']);

        $charity=$this->charityRepo->find($data['charity_id']);

        //dd($request);

        $request->status=$data['status'];
        $request->save();

        if ($data['status'] === 'Accepted') {
            $title = "You've Been Accepted into the Charity Program";
            $message = "
            Dear {$beneficiary->full_name},

            We are pleased to inform you that you have been accepted into the charity program: {$charity->name}.

            Your application has been reviewed and approved. We are honored to support you and will contact you soon with more details on how to receive assistance.

            If you have any questions, feel free to reach out to our team.

            Warm regards,
            The Charity Support Team
            ";
        } elseif ($data['status'] === 'Rejected') {
            $title = "Update on Your Charity Program Application";
            $message = "
            Dear {$beneficiary->full_name},

            Thank you for applying to the charity program: {$charity->name}.

            After reviewing your application, we regret to inform you that you were not selected for this round. Please know that this does not reflect your worth or need, and we encourage you to apply again in the future.

            If you have any questions or would like to know about other available opportunities, feel free to reach out.

            Kind regards,
            The Charity Support Team
            ";
        }
        $notification=[
            'beneficiary_id'=>$data['beneficiary_id'],
            'title'=>$title,
            'message'=>$message,
        ];

    //    dd($notification);

        return $this->notificationRepo->create($notification);
    }


}
