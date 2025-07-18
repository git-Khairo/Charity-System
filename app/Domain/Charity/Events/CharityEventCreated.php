<?php

namespace App\Domain\Charity\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CharityEventCreated
{
    use Dispatchable, SerializesModels;

    /**
     * Create a new event instance.
     */

    public $charityId;
    public $eventId;

    public function __construct($charityId, $eventId)
    {
        $this->charityId = $charityId;
        $this->eventId = $eventId;
        //dd($this->charityId);
    }
}
