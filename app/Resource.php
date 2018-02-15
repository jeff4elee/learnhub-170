<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Resource extends Model
{
    protected $fillable = ['title', 'description', 'url', 'url_domain', 'subject_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function subject()
    {
        return $this->belongsTo('App\Subject');
    }

    public function toArray()
    {
        $array = parent::toArray();
        return $array;
    }
}
