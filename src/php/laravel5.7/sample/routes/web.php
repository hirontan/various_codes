<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/tasks');
});

Route::get('/tasks', 'TaskController@index');
Route::post('/tasks', 'TaskController@store');
Route::delete('/tasks/{task}', 'TaskController@destroy'); // {task}でtask_idを受け取れる

// httpsに強制的にアクセスする場合、利用する
// \URL::forceScheme('https');
