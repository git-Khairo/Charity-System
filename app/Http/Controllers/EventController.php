<?php

namespace App\Http\Controllers;

use App\Application\Events\useCases\AddEvent;
use App\Application\Events\useCases\DeleteEvent;
use App\Application\Events\useCases\GetEvent;
use App\Application\Events\useCases\GetEventByCharity;
use App\Application\Events\useCases\GetEvents;
use App\Application\Events\useCases\UpdateEvent;
use App\Domain\Events\Models\Event;
use App\Interfaces\Http\Requests\Events\StoreEventRequest;
use App\Interfaces\Http\Requests\Events\UpdateEventRequest;

class EventController extends Controller
{

    public function getAllEvents(GetEvents $usecase){
        $events = $usecase->getEvents();
        return response()->json(['message' => 'All Events', 'events' => $events], 201);
    }

    public function getEventByCharity($id, GetEventByCharity $usecase){
        $events = $usecase->getEventsByCharity($id);
        return response()->json(['message' => 'All Events', 'events' => $events], 201);
    }

    public function getEvent($id, GetEvent $usecase) {
        $event = $usecase->getEvent($id);
        return response()->json(['message' => `Event Num $id`, 'event' => $event], 201);
    }

    public function createEvent(StoreEventRequest $request, AddEvent $usecase){
        $event = $usecase->createEvent($request);
        return response()->json(['message' => 'Created Event', 'event' => $event], 201);
    }

    public function updateEvent(UpdateEventRequest $request, $id, UpdateEvent $usecase){
        $event = $usecase->updateEvent($id, $request);
        return response()->json(['message' => 'Updated Event', 'event' => $event], 201);
    }

    public function deleteEvent($id, DeleteEvent $usecase){
        $event = $usecase->deleteEvent($id);
        return response()->json(['message' => 'Deleted Event', 'event' => $event], 201);
    }

}
