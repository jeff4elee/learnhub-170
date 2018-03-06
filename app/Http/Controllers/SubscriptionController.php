<?php

namespace App\Http\Controllers;

use App\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class SubscriptionController extends Controller
{
    public function feed()
    {
        $user = Auth::user();

        $subscriptions = $user->subscriptions->pluck('subject_id')->toArray();

        $resources = Resource::whereIn('subject_id', $subscriptions)->orderBy('created_at', 'desc')->paginate(15);

        $users = [];

        foreach ($resources as $resource) {
            array_push($users, $resource->user);
        }

        return Response::make([
            'data' => ['resources' => $resources,
                'users' => $users],
            'success' => true,
            'message' => null
        ], 200);
    }

}
