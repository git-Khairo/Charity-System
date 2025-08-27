<?php

namespace App\Infrastructure\Persistence\Eloquent\Volunteer;

use App\Domain\Events\Models\Event;
use App\Domain\Repositories\BaseRepositoryInterface;
use App\Domain\Volunteer\Models\Volunteer_feedback;

class EloquentVolunteerFeedbackRepository implements BaseRepositoryInterface
{
    public function all() { 
        return Volunteer_feedback::with(['event', 'volunteer'])
        ->get()
        ->map(function ($feedback) {
            return [
                'id' => $feedback->id,
                'volunteer_id' => $feedback->volunteer_id,
                'volunteer_name' => $feedback->volunteer ? $feedback->volunteer->name : 'Unknown',
                'event_id' => $feedback->event_id,
                'event_name' => $feedback->event ? $feedback->event->title : 'Unknown',
                'title' => $feedback->title,
                'rating' => $feedback->rating,
                'description' => $feedback->description,
                'created_at' => $feedback->created_at,
                'updated_at' => $feedback->updated_at,
            ];
        });
     }

    public function find($id) { return Volunteer_feedback::findOrFail($id); }

    public function create(array $data) { return Volunteer_feedback::create($data); }

    public function update($id, array $data) {
        $volunteer = Volunteer_feedback::findOrFail($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id) {
        $volunteer = Volunteer_feedback::findOrFail($id);
        return $volunteer->delete();
    }



}
