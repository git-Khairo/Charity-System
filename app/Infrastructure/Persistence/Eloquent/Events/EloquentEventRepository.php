<?php

namespace App\Infrastructure\Persistence\Eloquent\Events;

use App\Domain\Events\Models\Event;
use App\Domain\Events\Repositories\EventRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EloquentEventRepository implements EventRepositoryInterface
{

    public function all() { return Event::all(); }

    public function find($id) {

        return Event::findOrFail($id);
    }

    public function byCharity($id){
        $events = Event::where('charity_id', $id)->get();
        return $events;
    }

    public function create(array $data) {
        try {
        $event = Event::create($data);

        return $event;
        } catch (\Exception $e) {
            // Handle exception or log the error
            throw new \Exception("Failed to create charity: " . $e->getMessage());
        }
    }

    public function update($id, array $data) {
        try {
        $event = Event::findOrFail($id);

        $event->update($data);

        return $event;
        } catch (ModelNotFoundException $e) {
            // Handle the case where the charity isn't found
            throw new \Exception("Charity with ID $id not found.");
        } catch (\Exception $e) {
            // Handle other possible exceptions
            throw new \Exception("Failed to update charity: " . $e->getMessage());
        }
    }

    public function delete($id) {
        try {
        $event = Event::findOrFail($id);

        $event->delete();
        return true;
        } catch (ModelNotFoundException $e) {
            throw new \Exception("Charity with ID $id not found.");
        } catch (\Exception $e) {
            throw new \Exception("Failed to delete charity: " . $e->getMessage());
        }
    }


}
