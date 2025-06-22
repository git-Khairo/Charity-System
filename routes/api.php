<?php

use App\Http\Controllers\CharityController;
use App\Http\Controllers\EventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VolunteerController;



/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::post('/register',[VolunteerController::class,'register']);
Route::post('/login',[VolunteerController::class,'login']);
Route::get('/volunteer/{id}',[VolunteerController::class,'show']);//


Route::get('/charities', [CharityController::class, 'getAllCharities']);
Route::get('/charity/{id}', [CharityController::class, 'getCharity']);
Route::post('/charity/create', [CharityController::class, 'createCharity']);
Route::put('/charity/update/{id}', [CharityController::class, 'updateCharity']);
Route::delete('/charity/delete/{id}', [CharityController::class, 'deleteCharity']);

Route::get('/events', [EventController::class, 'getAllEvents']);
Route::get('/event/{id}', [EventController::class, 'getEvent']);
Route::get('/charity/events/{id}', [EventController::class, 'getEventByCharity']);
Route::post('/event/create', [EventController::class, 'createEvent']);
Route::put('/event/update/{id}', [EventController::class, 'updateEvent']);
Route::delete('/event/delete/{id}', [EventController::class, 'deleteEvent']);



Route::group(['middleware'=>['auth:sanctum']], function (){
    Route::put('/volunteer/update',[VolunteerController::class, 'updateVolunteer']);//
    Route::post('/logout',[VolunteerController::class,'logout']);//
    Route::post('/feedback', [VolunteerController::class, 'makeFeedback']);
    Route::get('/myFeedbacks', [VolunteerController::class, 'myFeedbacks']);
    Route::post('/events/{id}/apply', [VolunteerController::class, 'applyForEvent']);
    Route::get('/myEvents', [VolunteerController::class, 'myEvents']);
});
