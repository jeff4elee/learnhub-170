<?php

namespace App\Http\Controllers;

use App\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SubjectController extends Controller
{
    public function create(Request $request){
        $subject = new Subject;
        return Response::make([
            'data' => $subject,
            'success' => true,
            'message' => null
        ], 200);
    }
}
