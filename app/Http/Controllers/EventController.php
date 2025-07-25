<?php

namespace App\Http\Controllers;

use App\Application\Events\useCases\GetEvent;
use App\Application\Events\useCases\GetEventByCharity;
use App\Application\Events\useCases\GetEvents;
use App\Interfaces\Http\Resources\Events\EventCardResource;
use App\Interfaces\Http\Resources\Events\EventResource;

class EventController extends Controller
{

    public function getAllEvents(GetEvents $usecase){
        $events = $usecase->getEvents();
        return response()->json(['message' => 'All Events', 'events' => EventCardResource::collection($events)], 201);
    }

    public function getEventByCharity($id, GetEventByCharity $usecase){
        $events = $usecase->getEventsByCharity($id);
        return response()->json(['message' => 'All Events', 'events' => EventResource::collection($events)], 201);
    }

    public function getEvent($id, GetEvent $usecase) {
        $event = $usecase->getEvent($id);
        return response()->json(['message' => `Event Num $id`, 'event' => new EventResource($event)], 201);
    }


}
