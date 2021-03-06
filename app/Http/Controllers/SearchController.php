<?php

namespace App\Http\Controllers;

use App\Rating;
use App\Resource;
use App\Subject;
use App\Subscription;
use App\Tag;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class SearchController extends Controller
{

    public function popular()
    {
        $resourceIds = Rating::groupBy('resource_id')
            ->select('resource_id', DB::raw('sum(rating) as total'))
            ->orderBy('total', 'desc')->take(5)->get()->toArray();
        $resources = Resource::whereIn('id', $resourceIds)->get();
//        $subjectIds = Subscription::groupBy('subject_id')
//            ->select('subject_id', DB::raw('count(*) as total'))
//            ->orderBy('total', 'desc')->take(5)->get()->toArray();
        $subjectIds = Auth::user()->subscriptions->pluck('subject_id')->toArray();
        $subjects = Subject::whereIn('id', $subjectIds)->get();
        $userIds = array();

        foreach ($resources as $resource) {
            array_push($userIds, $resource->user_id);
        }

        $users = User::whereIn('id', $userIds)->get();

        return Response::make([
            'data' => ['resources' => $resources,
                'subjects' => $subjects,
                'users' => $users],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function broad_search($search_term)
    {
        $resources = Resource::where('title', 'like', $search_term . '%')
            ->orWhere('description', 'like', $search_term . '%')->get()->toArray();

        $tag = Tag::where('tag', $search_term)->first();
        if ($tag != null) {
            $tagged_resources = $tag->resources()->get()->toArray();
            $resources = array_merge($resources, $tagged_resources);
        }

        $unique_resources = array();
        $userIds = array();
        $found = array();

        // Remove the duplicates from original array
        foreach($resources as $resource){
            if (!isset($found[((object) $resource)->id])){
                array_push($unique_resources, $resource);
                array_push($userIds, ((object) $resource)->user_id);
                $found[((object) $resource)->id] = true;
            }
        }

        $users = User::whereIn('id', $userIds)->get();

        $subjects = Subject::where('title', 'like', $search_term . '%')->get();

        return Response::make([
            'data' => [
                'resources' => $unique_resources,
                'subjects' => $subjects,
                'users' => $users
            ],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function search_resources($search_term)
    {
        $tagged_resources = Tag::where('tag', $search_term)->first()->resources;

        $matching_resources = Resource::where('title', 'like', $search_term . '%')
            ->orWhere('description', 'like', $search_term . '%')->get()->toArray();

        $resources = array_merge($matching_resources, $tagged_resources);

        $unique_resources = array();
        $userIds = array();
        $found = array();

        // Remove the duplicates from original array
        foreach($resources as $resource){
            if (!isset($found[((object) $resource)->id])){
                array_push($unique_resources, $resource);
                array_push($userIds, ((object) $resource)->user_id);
                $found[((object) $resource)->id] = true;
            }
        }

        $users = User::whereIn('id', $userIds)->get();

        return Response::make([
            'data' => [
                'resources' => $unique_resources,
                'users' => $users
            ],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function search_subjects($search_term)
    {
        $subjects = Subject::where('title', 'like', $search_term . '%')->get();

        return Response::make([
            'data' => $subjects,
            'success' => true,
            'message' => null
        ], 200);
    }
}
