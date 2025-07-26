<?php

namespace App\Domain\Events\Models;

use App\Domain\Charity\Models\Charity;
use App\Domain\Volunteer\Models\participation;
use App\Domain\Volunteer\Models\Volunteer;
use App\Domain\Volunteer\Models\Volunteer_feedback;
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
        'charity_id',
        'title',
        'description',
        'location',
        'status',
        'capacity',
        'NumOfVolunteer',
    ];

    public function feedback(){
        return $this->hasMany(Volunteer_feedback::class);
    }

    public function charity(){
        return $this->belongsTo(Charity::class);
    }

    public function volunteer(){
        return $this->hasMany(participation::class);
    }

    protected static function newFactory()
    {
        return \Database\Factories\EventFactory::new();
    }
}
