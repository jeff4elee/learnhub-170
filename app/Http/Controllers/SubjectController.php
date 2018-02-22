<?php

namespace App\Http\Controllers;

use App\Rating;
use App\Resource;
use App\Subject;
use App\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class SubjectController extends Controller
{
    public function get_resources($subject_id)
    {
        $resources = Resource::where('subject_id', $subject_id)->get();
        return Response::make([
            'data' => $resources,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function get($subject_id)
    {
        $resources = Resource::where('subject_id', $subject_id)->get();
        $users = [];

        foreach ($resources as $resource) {
            array_push($users, $resource->user);
        }

        $subject = Subject::where('id', $subject_id)->first();

        return Response::make([
            'data' => [
                'subject' => $subject,
                'resources' => $resources,
                'users' => $users
            ],
            'success' => true,
            'message' => null
        ], 200);
    }

    public function all()
    {
        $user = Auth::user();

        $subscriptions = $user->subscriptions->pluck('subscribeable_id');

        $subscribed_subjects = Subject::whereIn('id', $subscriptions)
            ->get()
            ->sortByDesc(function ($subject) {
                return count($subject->subscribers);
            });

        $other_subjects = Subject::whereNotIn('id', $subscriptions)
            ->take(10)
            ->get()
            ->sortByDesc(function ($subject) {
                return count($subject->subscribers);
            });

        $subjects = array_merge($subscribed_subjects->toArray(), $other_subjects->toArray());

        return Response::make([
            'data' => $subjects,
            'success' => true,
            'message' => null
        ], 200);
    }

    public function toggle_subscription($subject_id){

        $user_id = Auth::id();

        $subscription = Subscription::where('subject_id', $subject_id)
            ->where('user_id', $user_id)
            ->first();

        if($subscription){
            $subscription->delete();
        } else {
            Subscription::create(['subject_id' => $subject_id, 'user_id' => $user_id]);
        }

        $subject = Subject::where('id', $subject_id)->first();

        return Response::make([
            'data' => $subject,
            'success' => true,
            'message' => null
        ], 200);
    }

}
