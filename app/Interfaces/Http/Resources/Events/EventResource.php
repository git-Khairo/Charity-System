<?php

namespace App\Interfaces\Http\Resources\Events;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'charity_id' => $this->charity_id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'status' => $this->status,
            'capacity' => $this->capacity,
            'NumOfVolunteer' => $this->NumOfVolunteer,
            'categoryName' => $this->charity->category->name,
            'updated_at'=>$this->updated_at,
            'created_at'=>$this->created_at,
        ];
    }
}
