<?php

namespace App\Interfaces\Http\Resources\Charity;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CharityCardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'admin_id' => $this->admin_id,
            'name' => $this->name,
            'address' => $this->address,
            'images' => $this->images,
            'categoryName' => $this->category->name, 
        ];
    }
}
