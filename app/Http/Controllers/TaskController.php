<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class TaskController extends Controller
{
    public function get_user_tasks()
    {
        $tasks = Task::where('user_id', '=', Auth::id())->get();

        $resources = array();

        foreach ($tasks as $task) {
            array_push($resources, $task->resource()->first());
        }

        return Response::make([
            'data' => ['tasks' => $tasks, 'resources' => $resources],
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

    public function toggle_task($task_id)
    {
        $task = Task::where('id', $task_id)->first();

        $task->completed = !$task->completed;

        $task->save();

        return Response::make([
            'data' => $task,
            'success' => true,
            'message' => null
        ], 200);
    }

}