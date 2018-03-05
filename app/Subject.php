<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Subject extends Model
{
    protected $fillable = ['title', 'description'];
    /**
     * Get the comments for the blog post.
     */
    public function resources()
    {
        return $this->hasMany('App\Resource');
    }

    public function subscribers()
    {
        return $this->hasMany('App\Subscription');
    }

    public function toArray()
    {
        $array = parent::toArray();
        $array["subscribed"] = Subscription::where('subject_id', $this->id)->where('user_id',Auth::id())->exists();
        $array["subscribers"] = sizeof($this->subscribers()->get()->toArray());
        return $array;
    }
}
