<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class TaskController extends Controller
{
    public function get_user_tasks(){
        $tasks = Task::where('user_id', '=', Auth::id())->get();
        return Response::make([
            'data' => $tasks,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function add_to_tasks(Request $request)
    {
        $task = Task::firstOrCreate(['user_id' => Auth::id(), 'resource_id' => $request['resource_id']]);

        return Response::make([
            'data' => $task,
            'success' => true,
            'message' => null
        ], 200);
    }

}