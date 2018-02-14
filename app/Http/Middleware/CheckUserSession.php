<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;

class CheckUserSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($user = Auth::user()) {
            // user value cannot be found in session
            return $next($request);
        }

        return Response::make([
            'data' => null,
            'success' => true,
            'message' => "No user session"
        ], 401);
    }

}
