<?php

namespace App\Interfaces\Http\Resources\Donation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonationResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->status,
            'address' => $this->address,
            'email' => $this->email,
            'phonenumber' => $this->phonenumber,
            'amount' => $this->amount
        ];
    }
}
