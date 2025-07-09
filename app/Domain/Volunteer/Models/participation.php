<?php

namespace App\Domain\volunteer\Models;

use App\Domain\Events\Models\Event;
use App\Domain\volunteer\Models\Volunteer;
use Illuminate\Database\Eloquent\Model;

class participation extends Model
{
    protected $fillable = [
        'full_name',
        'phone_number',
        'address',
        'email',
        'study',
        'national_number',
        'gender',
        'why_charity',
        'availability_for_volunteering',
        'preferred_time',
        'Developmental',
        'Child_care',
        'Training',
        'Shelter_and_relief',
        'Events_and_conferences',
        'Awareness_campaigns',
        'Elderly_care',
        'Supporting_women',
        'Maintenance_technician',
        'field_media_photography',
        'Administrative_field',
        'volunteer_id',
        'event_id',
        'status',
    ];

    public function volunteer(){
        return $this->belongsTo(Volunteer::class);
    }

    public function event(){
        return $this->belongsTo(Event::class);
    }
}
