<?php

namespace App\Http\Controllers;

use App\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SubjectController extends Controller
{
    public function create(Request $request){
        $subject = new Subject;
//        $task = new Task;
//        $task->resource_id = (int) $resource_id;
//        $task->topic_id = Resource::where('id', $resource_id)->first()->topic()->first()->id;
//        $task->user_id = Auth::id();
//        $task->save();
//        $request[]
        return Response::make([
            'data' => $subject,
            'success' => true,
            'message' => null
        ], 200);
    }
}
