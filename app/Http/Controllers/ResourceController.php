<?php

namespace App\Http\Controllers;

use App\Rating;
use App\Resource;
use App\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class ResourceController extends Controller
{

    public function get($resource_id)
    {
        $resource = Resource::where('id', '=', $resource_id)->first();

        $rating = Rating::where('user_id', '=', Auth::id())
            ->where('resource_id', '=', $resource_id)
            ->first();

        if($rating !== null){
            $resource['personal_rating'] = $rating->rating;
        }

        return Response::make([
            'data' => $resource,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function all()
    {
        $resources = Resource::all();
        return Response::make([
            'data' => $resources,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function rate(Request $request)
    {
        Rating::updateOrCreate(['user_id' => $request['user_id'], 'resource_id' => $request['resource_id']],
            ['rating' => $request['rating']]);

        return $this->get($request['resource_id']);
    }

    public function create(Request $request)
    {

        //CANT USE Auth::id(), needs to be in web route

        $request['url_domain'] = parse_url($request['url'])['host'];
        $subject_name = $request['subject'];
        unset($request['subject']);

        $subject = Subject::whereRaw('LOWER(title) = ?', [strtolower($subject_name)])->first();

        if ($subject === null) {
            $subject = new Subject;
            $subject->title = $subject_name;
            $subject->description = "";
            $subject->save();
        }

        $request['subject_id'] = $subject->id;
        $resource = Resource::create($request->all());

        return Response::make([
            'data' => $resource,
            'success' => true,
            'message' => null
        ], 200);
    }
}
