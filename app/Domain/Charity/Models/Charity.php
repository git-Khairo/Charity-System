<?php

namespace App\Domain\Charity\Models;

use App\Domain\Admins\Models\Admin;
use App\Domain\Events\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Charity extends Model
{
     /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory,Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'admin_id',
        'name',
        'address',
        'description',
        'images',
        'phonenumber',
        'email',
        'category_id'
    ];

    public function events(){
        return $this->hasMany(Event::class);
    }

    public function admin(){
        return $this->belongsTo(Admin::class);
    }

    protected static function newFactory()
    {
        return \Database\Factories\CharityFactory::new();
    }
}
