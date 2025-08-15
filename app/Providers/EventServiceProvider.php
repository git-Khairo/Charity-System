<?php

namespace App\Providers;

use App\Application\Admin\Listeners\NotifyAcceptedParticipantsOnEventDelete;
use App\Application\Admin\Listeners\NotifyAcceptedParticipantsOnEventUpdate;
use App\Application\Charity\Listeners\SendCharityEventNotification;
use App\Domain\Admins\Events\EventDeleted;
use App\Domain\Admins\Events\EventUpdated;
use App\Domain\Charity\Events\CharityEventCreated;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        CharityEventCreated::class => [
            SendCharityEventNotification::class,
        ],
        EventDeleted::class => [
            NotifyAcceptedParticipantsOnEventDelete::class,
        ],
        EventUpdated::class => [
            NotifyAcceptedParticipantsOnEventUpdate::class,
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
