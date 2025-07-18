<?php

namespace App\Application\Charity\Jobs;

use App\Domain\Beneficiary\Models\beneficiary_notification;
use App\Domain\Beneficiary\Models\Request;
use App\Domain\Events\Models\Event;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;

class NotifyAcceptedBeneficiaries implements ShouldQueue
{
    use Dispatchable,Queueable;

    /**
     * Create a new job instance.
     */

    protected $charityId;
    protected $eventId;

    public function __construct($charityId,$eventId)
    {
      //  dd('hi');
        $this->charityId = $charityId;
        $this->eventId = $eventId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $event = Event::findOrFail($this->eventId);

        $message = "You're invited to attend our upcoming charity event at {$event->location}. {$event->description} We hope to see you there!";


        // Get accepted requests for this charity
        $requests = Request::where('charity_id', $this->charityId)
            ->where('status', 'accepted')
            ->get();

       // dd($requests);
        foreach ($requests as $request) {
            beneficiary_notification::create([
                'beneficiary_id' => $request->beneficiary_id,
                'title' => 'You’re Invited!',
                'message' => $message,
            ]);
        }
       // dd($requests);
    }
}
