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




Route::group(['middleware'=>['auth:sanctum']], function (){
    Route::put('/volunteer/update',[VolunteerController::class, 'updateVolunteer']);//

});
