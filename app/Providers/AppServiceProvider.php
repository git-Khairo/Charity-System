<?php

namespace App\Providers;

use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\Charity\EloquentCharityRepository;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
