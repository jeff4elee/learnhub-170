<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

    public function toArray()
    {
        $array = parent::toArray();
        $array["resources"] = $this->resources;
        return $array;
    }
}
