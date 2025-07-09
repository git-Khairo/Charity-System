<?php

namespace App\Domain\volunteer\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volunteer_notification extends Model
{
    /** @use HasFactory<\Database\Factories\VolunteerNotificationFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'volunteer_id',
        'message'
    ];

    public function beneficiary(){
        return $this->belongsTo(Volunteer::class);
    }
    protected static function newFactory()
    {
        return \Database\Factories\VolunteerNotificationFactory::new();
    }

}
