<?php

namespace App\Http\Controllers;

use App\Rating;
use App\Resource;
use App\Subject;
use App\Subscription;
use App\User;
use Illuminate\Http\Request;
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
        $subjectIds = Subscription::groupBy('subject_id')
            ->select('subject_id', DB::raw('count(*) as total'))
            ->orderBy('total', 'desc')->take(5)->get()->toArray();
        $subjects = Subject::whereIn('id', $subjectIds)->get();
        $userIds = array();

        foreach($resources as $resource){
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
        $resources = Resource::where('title', 'like', '%' . $search_term . '%')
            ->orWhere('description', 'like', '%' . $search_term . '%')->get();
        $subjects = Subject::where('title', 'like', '%' . $search_term . '%')->get();

        return Response::make([
            'data' => ['resources' => $resources,
                'subjects' => $subjects],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function search_resources($search_term)
    {

        $resources = Resource::where('title', 'like', '%' . $search_term . '%')
            ->orWhere('description', 'like', '%' . $search_term . '%')->get();

        return Response::make([
            'data' => $resources,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function search_subjects($search_term)
    {

        $subjects = Subject::where('title', 'like', '%' . $search_term . '%')->get();

        return Response::make([
            'data' => $subjects,
            'success' => true,
            'message' => null
        ], 200);
    }
}
