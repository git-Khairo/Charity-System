<?php

namespace App\Interfaces\Http\Resources\Events;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventCardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'charity_id' => $this->charity_id,
            'title' => $this->title,
            'location' => $this->loaction,
            'status' => $this->status,
        ];
    }
}
