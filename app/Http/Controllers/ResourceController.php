<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Rating;
use App\Resource;
use App\Subject;
use App\Tag;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class ResourceController extends Controller
{

    public function get_owned()
    {
        $resources = Resource::where('user_id', '=', Auth::id())->get();

        return Response::make([
            'data' => ['resources' => $resources],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function get_comments($resource_id)
    {
        $resource = Resource::where('id', '=', $resource_id)->first();
        $comments = Comment::where('resource_id', '=', $resource_id)->get();
        $users = array();

        foreach ($comments as $comment) {
            array_push($users, $comment->user()->first());
        }

        return Response::make([
            'data' => ['comments' => $comments, 'users' => $users, 'resource' => $resource],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function get($resource_id)
    {
        $resource = Resource::where('id', '=', $resource_id)->first();

        $rating = Rating::where('user_id', '=', Auth::id())
            ->where('resource_id', '=', $resource_id)
            ->first();

        if ($rating !== null) {
            $resource['personal_rating'] = $rating->rating;
        }

        return Response::make([
            'data' => ['resource' => $resource],
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
        Rating::updateOrCreate(['user_id' => Auth::id(), 'resource_id' => $request['resource_id']],
            ['rating' => $request['rating']]);

        return $this->get($request['resource_id']);
    }

    public function delete($resource_id){
        $resource = Resource::where('id', $resource_id)->where('user_id', Auth::id())->first();
        $resource->delete();
        return Response::make([
            'data' => $resource->id,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function create(Request $request)
    {
        //Auth::id() needs to be in web route
        $request['user_id'] = Auth::id();
        $request['url_domain'] = parse_url($request['url'])['host'];
        $subject_name = $request['subject'];

        if (!$subject_name) {
            return Response::make([
                'data' => null,
                'success' => false,
                'message' => null
            ], 400);
        }

        $subject = Subject::firstOrCreate(['title' => strtolower($subject_name)]);

        $request['subject_id'] = $subject->id;

        $resource = Resource::create($request->all());

        if ($request['tags'] != null) {
            $tags = array();
            foreach ($request['tags'] as $tag_name) {
                array_push($tags, Tag::firstOrCreate(['tag' => strtolower($tag_name)]));
            }
            $resource->tags()->saveMany($tags);
        }

        return Response::make([
            'data' => $resource,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function search(Request $request)
    {
        $seach_term = $request['search_term'];

        $resources = Resource::where('title', 'like', '%' . $seach_term . '%')
            ->orWhere('description', 'like', '%' . $seach_term . '%')->get();

        return Response::make([
            'data' => $resources,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function comment(Request $request)
    {

        $request['user_id'] = Auth::id();

        $comment = Comment::create($request->all());

        $resource = Resource::where('id', $comment->resource_id)->first();

        return Response::make([
            'data' => ['resource' => $resource, 'comment' => $comment],
            'success' => true,
            'message' => null
        ], 200);

    }

}
