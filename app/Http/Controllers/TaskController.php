<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function get_user_tasks($user_id){
        $tasks = Task::where('user_id', '=', $user_id)->get();
        return Response::make([
            'data' => $tasks,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function create(Request $request){
        $request['url_domain'] = parse_url($request['url'])['host'];
        $subject_name = $request['subject'];
        unset($request['subject']);

        $subject = Subject::whereRaw('LOWER(title) = ?', [strtolower($subject_name)])->first();

        if($subject === null){
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
