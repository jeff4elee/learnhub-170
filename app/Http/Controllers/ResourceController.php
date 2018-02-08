<?php

namespace App\Http\Controllers;

use App\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ResourceController extends Controller
{
    public function create(Request $request){
        $request['url_domain'] = parse_url($request['url'])['host'];
        $resource = Resource::create($request->all());
        return Response::make([
            'data' => $resource,
            'success' => true,
            'message' => null
        ], 200);
    }
}
