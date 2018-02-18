<?php

namespace App\Http\Controllers;

use App\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function create(Request $request){
        $rating = Rating::create($request->all());

        return Response::make([
            'data' => $rating,
            'success' => true,
            'message' => null
        ], 200);
    }
}
