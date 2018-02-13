<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    /**
     * Get the comments for the blog post.
     */
    public function resources()
    {
        return $this->hasMany('App\Resource');
    }
}
