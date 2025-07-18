<?php

namespace App\Application\SuperAdmin\useCases;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Admins\Repositories\SuperAdminRepositoriesInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRequestRepositoryInterface;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryNotificationRepository;

class Statistics
{
    protected BeneficiaryRepositoryInterface  $beneficiaryRepo;
    protected VolunteerRepositoryInterface $volunteerRepo;
    protected DonationRepositoryInterface $donationRepo;
    protected SuperAdminRepositoriesInterface $superAdminRepo;

    public function __construct( DonationRepositoryInterface $donationRepo,
                                 VolunteerRepositoryInterface $volunteerRepo,
                                 BeneficiaryRepositoryInterface  $beneficiaryRepo,
                                 SuperAdminRepositoriesInterface $superAdminRepo

    )
    {
        $this->donationRepo=$donationRepo;
        $this->beneficiaryRepo=$beneficiaryRepo;
        $this->volunteerRepo=$volunteerRepo;
        $this->superAdminRepo=$superAdminRepo;
    }


    public function allVolunteer(){

        return $this->volunteerRepo->allCharitiesVolunteerCounts();
    }

    public function allBeneficiary(){

        return $this->beneficiaryRepo->charityBeneficiary();
    }

    public function allCharity(){

        return $this->superAdminRepo->allCharityInfo();
    }


}
