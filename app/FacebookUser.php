<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FacebookUser extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'facebook_id', 'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
