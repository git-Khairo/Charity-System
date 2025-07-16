<?php

namespace App\Domain\Charity\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'name',
    ];

    public function charity(){
        return $this->hasMany(Charity::class);
    }

    protected static function newFactory()
    {
        return \Database\Factories\CategoryFactory::new();
    }
}
