<?php

namespace App\Domain\Volunteer\Models;

use App\Domain\Events\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Volunteer_feedback extends Model
{
    /** @use HasFactory<\Database\Factories\VolunteerFactory> */
    use HasFactory,Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'volunteer_id',
        'event_id',
        'title',
        'description'
    ];

   public function volunteer(){
       return $this->belongsTo(Volunteer::class);
   }

   public function event(){
       return $this->belongsTo(Event::class);
   }

}
