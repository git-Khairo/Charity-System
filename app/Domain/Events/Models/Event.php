<?php

namespace App\Domain\Events\Models;

use App\Domain\volunteer\Models\Volunteer;
use App\Domain\Volunteer\Models\Volunteer_feddback;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory,Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'title',
        'description',
        'location',
        'status',
        'capacity',
        'NumOfVolunteer',
    ];

    public function feedback(){
        return $this->hasMany(Volunteer_feddback::class);
    }

    public function volunteer(){
        return $this->hasMany(Volunteer::class, 'participations', 'volunteer_id', 'event_id')
            ->withPivot('signup_date', 'status')
            ->withTimestamps();
    }
}
