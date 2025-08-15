<?php

namespace App\Application\Admin\Listeners;

use App\Application\Admin\Jobs\SendNotificationJob;
use App\Domain\Admins\Events\EventUpdated;
use App\Domain\Events\Models\Event;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyAcceptedParticipantsOnEventUpdate
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
    public function handle(EventUpdated $event): void
    {
        $events = Event::findOrFail($event->eventId);


        $title="The Event Got Updated";

        $message = " this is our new information about our upcoming charity event will be at {$events->location}. {$events->description}  we hope you can come to help us and thanks for the efforts !";

        $usersIds = $events->volunteer()
            ->where('status', 'Accepted')
            ->pluck('volunteer_id')
            ->toArray();

        SendNotificationJob::dispatch($usersIds,$message,$title);
    }
}
