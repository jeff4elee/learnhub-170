<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{

    public $fillable = ['tag'];

    public $timestamps = false;

    public function resources()
    {
        return $this->morphedByMany('App\Resource', 'taggable');
    }

}
