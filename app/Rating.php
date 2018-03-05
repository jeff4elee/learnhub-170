<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = ['rating', 'resource_id', 'user_id'];

    public $timestamps = false;
}
