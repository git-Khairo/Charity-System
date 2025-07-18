<?php

namespace App\Providers;

use App\Application\Charity\Listeners\SendCharityEventNotification;
use App\Domain\Charity\Events\CharityEventCreated;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        CharityEventCreated::class => [
            SendCharityEventNotification::class,
        ],
    ];

    public function boot(): void
    {
        //
    }

    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
