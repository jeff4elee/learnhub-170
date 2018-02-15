<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

}
