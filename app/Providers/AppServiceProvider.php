<?php

namespace App\Providers;

use App\Application\Charity\Listeners\SendCharityEventNotification;
use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Admins\Repositories\SuperAdminRepositoriesInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRequestRepositoryInterface;
use App\Domain\Charity\Events\CharityEventCreated;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use App\Domain\Events\Models\Event;
use App\Domain\Events\Repositories\EventRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerParticipationRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Admins\EloquentAdminRepository;
use App\Infrastructure\Persistence\Eloquent\Admins\EloquentSuperAdminRepository;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryNotificationRepository;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryRepository;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryRequestRepository;
use App\Infrastructure\Persistence\Eloquent\Charity\EloquentCharityRepository;
use App\Infrastructure\Persistence\Eloquent\Donation\EloquentDonationRepository;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerNotificationRepository;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerParticipationRepository;
use App\Infrastructure\Persistence\Eloquent\Volunteer\EloquentVolunteerRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(VolunteerRepositoryInterface::class, EloquentVolunteerRepository::class);
        $this->app->bind(BaseRepositoryInterface::class, EloquentEventRepository::class);
        $this->app->bind(CharityRepositoryInterface::class, EloquentCharityRepository::class);
        $this->app->bind(EventRepositoryInterface::class, EloquentEventRepository::class);
        $this->app->bind(BeneficiaryRepositoryInterface::class, EloquentBeneficiaryRepository::class);
        $this->app->bind(DonationRepositoryInterface::class, EloquentDonationRepository::class);
        $this->app->bind(AdminRepositoriesInterface::class, EloquentAdminRepository::class);
        $this->app->bind(VolunteerParticipationRepositoryInterface::class, EloquentVolunteerParticipationRepository::class);
        $this->app->bind(BaseRepositoryInterface::class, EloquentVolunteerNotificationRepository::class);
        $this->app->bind(BeneficiaryRequestRepositoryInterface::class, EloquentBeneficiaryRequestRepository::class);
        $this->app->bind(BaseRepositoryInterface::class, EloquentBeneficiaryNotificationRepository::class);
        $this->app->bind(SuperAdminRepositoriesInterface::class, EloquentSuperAdminRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
 /*       Event::listen(
            CharityEventCreated::class,
            SendCharityEventNotification::class
    );*/
    }
}
