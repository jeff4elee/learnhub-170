<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/example', function (Request $request) {
    return "Success!";
});

Route::post('/facebook/login', 'Auth\LoginController@facebookLogin');

Route::post('/subject', 'SubjectController@create');
Route::get('/subject/all', 'SubjectController@all');
Route::get('/search/popular/', 'SearchController@popular');
Route::get('/search/{search_term}', 'SearchController@broad_search');
Route::get('/feed', 'SubscriptionController@feed');
Route::get('/self/resources', 'ResourceController@get_owned');

//routes match above route, must be declared later
Route::get('/subject/{subject_id}/resources', 'SubjectController@get_resources');
Route::get('/subject/{subject_id}/toggle_subscription', 'SubjectController@toggle_subscription');
Route::get('/subject/{subject_id}', 'SubjectController@get');

Route::post('/resource', 'ResourceController@create');
Route::post('/resource/comment', 'ResourceController@comment');
//Route::post('/resource/search', 'ResourceController@search');
Route::post('/task', 'TaskController@add_to_tasks');
Route::get('/task/all', 'TaskController@get_user_tasks');
Route::get('/task/{task_id}/toggle', 'TaskController@toggle_task');
Route::get('/resource/all', 'ResourceController@all');
Route::get('/resource/{resource_id}', 'ResourceController@get');
Route::get('/resource/{resource_id}/comments', 'ResourceController@get_comments');
Route::post('/resource/{resource_id}/rate', 'ResourceController@rate');

