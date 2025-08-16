<?php

namespace  App\Application\Admin\Listeners;

use App\Application\Admin\Jobs\SendNotificationJob;
use App\Domain\Admins\Events\EventDeleted;
use App\Domain\Beneficiary\Models\Request;
use App\Domain\Events\Models\Event;
use App\Domain\volunteer\Models\Volunteer_notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Queue\InteractsWithQueue;

class NotifyAcceptedParticipantsOnEventDelete
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
    public function handle(EventDeleted $event): void
    {
        $events =$event->event;



        $title="The Event Got deleted";

        $message = " our upcoming charity event at time :{$events->date}.location :{$events->location}. description :{$events->description} got canceled we hope to see soon in other Events in our charity !";

        $usersIds = $events->volunteer()
            ->where('status', 'Accepted')
            ->pluck('volunteer_id')
            ->toArray();

      //  dd( $events->charity_id);

        $requests = Request::where('charity_id', $events->charity_id)
            ->where('status', 'Accepted')
            ->pluck('beneficiary_id')
            ->toArray();



        SendNotificationJob::dispatch($requests,$usersIds,$message,$title);

        try {

            $events->delete();
        } catch (ModelNotFoundException $e) {
            throw new \Exception("Charity with ID $events->charity_id not found.");
        } catch (\Exception $e) {
            throw new \Exception("Failed to delete charity: " . $e->getMessage());
        }
    }
}
