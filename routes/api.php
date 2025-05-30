<?php

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



Route::group(['middleware'=>['auth:sanctum']], function (){
    Route::put('/volunteer/update',[VolunteerController::class, 'updateVolunteer']);//
    Route::post('/logout',[VolunteerController::class,'logout']);//
    Route::post('/feedback', [VolunteerController::class, 'makeFeedback']);
    Route::get('/myFeedbacks', [VolunteerController::class, 'myFeedbacks']);
    Route::post('/events/{id}/apply', [VolunteerController::class, 'applyForEvent']);
    Route::get('/myEvents', [VolunteerController::class, 'myEvents']);
});
