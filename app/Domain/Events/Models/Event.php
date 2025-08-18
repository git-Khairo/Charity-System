<?php

namespace App\Domain\Events\Models;

use App\Domain\Charity\Models\Charity;
use App\Domain\Volunteer\Models\participation;
use App\Domain\Volunteer\Models\Volunteer;
use App\Domain\Volunteer\Models\Volunteer_feedback;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Spatie\Translatable\HasTranslations;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory,Notifiable,HasTranslations;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    public $translatable = [
        'title',
        'description',
        'location',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    protected $fillable = [
        'charity_id',
        'title',
        'description',
        'location',
        'status',
        'capacity',
        'NumOfVolunteer',
        'images',
        'date'
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

    public function acceptedVolunteers()
    {
        return $this->hasMany(participation::class)->where('status', 'Accepted');
    }

    protected static function newFactory()
    {
        return \Database\Factories\EventFactory::new();
    }
}
