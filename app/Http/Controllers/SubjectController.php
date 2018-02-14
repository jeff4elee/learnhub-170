<?php

namespace App\Http\Controllers;

use App\Resource;
use App\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SubjectController extends Controller
{
    public function get_resources($subject_id)
    {
        $resources = Resource::where('subject_id', '=', $subject_id)->get();
        return Response::make([
            'data' => $resources,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function get($subject_id)
    {
        $resources = Resource::where('subject_id', '=', $subject_id)->get();
        $users = [];

        foreach ($resources as $resource) {
            array_push($users, $resource->user);
        }

        return Response::make([
            'data' => [
                'resources' => $resources,
                'users' => $users
            ],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function all()
    {
        $subjects = Subject::all();
        return Response::make([
            'data' => $subjects,
            'success' => true,
            'message' => null
        ], 200);
    }

}
