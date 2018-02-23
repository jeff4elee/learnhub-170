<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['resource_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function resource(){
        return $this->belongsTo('App\Resource');
    }
}
