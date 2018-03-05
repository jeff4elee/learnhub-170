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

    public function ratings()
    {
        return $this->hasMany('App\Rating');
    }

    public function toArray()
    {
        $array = parent::toArray();

        $ratings = $this->ratings()->pluck('rating')->toArray();
        $num_ratings = count($ratings);

        if($num_ratings > 0){
            $array['rating'] = round(array_sum($ratings) / (float) $num_ratings, 2);
        } else {
            $array['rating'] = "N/A";
        }

        $array['rating_count'] = $num_ratings;

        return $array;
    }
}
