<?php

namespace App\Application\Charity\Listeners;

use App\Application\Charity\Jobs\NotifyAcceptedBeneficiaries;
use App\Domain\Charity\Events\CharityEventCreated;


class SendCharityEventNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CharityEventCreated $event): void
    {
       // dd('hi');
        NotifyAcceptedBeneficiaries::dispatch($event->charityId, $event->eventId);
    }
}
