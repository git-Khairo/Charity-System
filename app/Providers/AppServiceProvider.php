<?php

namespace App\Providers;

use App\Domain\Admins\Repositories\AdminRepositoriesInterface;
use App\Domain\Beneficiary\Repositories\BeneficiaryRepositoryInterface;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Domain\Donation\Repositories\DonationRepositoryInterface;
use App\Domain\Events\Repositories\EventRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Admins\EloquentAdminRepository;
use App\Infrastructure\Persistence\Eloquent\Beneficiary\EloquentBeneficiaryRepository;
use App\Infrastructure\Persistence\Eloquent\Charity\EloquentCharityRepository;
use App\Infrastructure\Persistence\Eloquent\Donation\EloquentDonationRepository;
use App\Infrastructure\Persistence\Eloquent\Events\EloquentEventRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
