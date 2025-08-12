<?php

use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\CharityController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\EventController;
use App\Http\Middleware\SetLocaleFromHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Middleware\RoleMiddleware;


/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::middleware([SetLocaleFromHeader::class])->group(function () {



Route::post('/volunteer/register',[VolunteerController::class,'register']);
Route::post('/volunteer/login',[VolunteerController::class,'login']);
Route::get('/volunteer/{id}',[VolunteerController::class,'show']);//
Route::post('/volunteer/{id}/profile',[VolunteerController::class,'report']);//

Route::get('/charities', [CharityController::class, 'getAllCharities']);
Route::get('/charity/{id}', [CharityController::class, 'getCharity']);
Route::get('/charity/category/{id}', [CharityController::class, 'getCharityByCategory']);

Route::get('/events', [EventController::class, 'getAllEvents']);
Route::get('/event/{id}', [EventController::class, 'getEvent']);
Route::get('/charity/events/{id}', [EventController::class, 'getEventByCharity']);


Route::get('/beneficiaries', [BeneficiaryController::class, 'getAllBeneficiaries']);
Route::get('/beneficiary/{id}', [BeneficiaryController::class, 'getBeneficairy']);
Route::post('/beneficiary/register', [BeneficiaryController::class, 'registerBeneficiary']);
Route::post('/beneficiary/login', [BeneficiaryController::class, 'loginBeneficiary']);


Route::post('/donate/{id}', [DonationController::class, 'getPaymentIntent']);
Route::post('/donate/{id}/confirm', [DonationController::class, 'storeDonation']);


Route::post('/admin/login', [AdminController::class, 'login']);

Route::get('/charity-feedback/{id}', [SuperAdminController::class, 'charityFeedback']);

Route::group(['middleware'=>['auth:sanctum']], function (){
    Route::get('/user', [AdminController::class, 'verifyUser']);


    Route::middleware(RoleMiddleware::class.':Beneficiary')->group(function () {
        Route::post('/beneficiary/logout', [BeneficiaryController::class, 'logoutBeneficiary']);
        Route::post('/beneficiary/charity/{id}', [BeneficiaryController::class, 'applyForCharity']);
        Route::post('/beneficiary/feedback/{id}', [BeneficiaryController::class, 'createBeneficiaryFeedback']);
        Route::put('/beneficiary/update/{id}', [BeneficiaryController::class, 'updateBeneficiary']);
        Route::get('/myApplication', [BeneficiaryController::class, 'myApplication']);
        Route::get('/myNotification', [BeneficiaryController::class, 'myNotification']);
        Route::get('/beneficiaryFeedback', [BeneficiaryController::class, 'myFeedbacks']);
    });


    Route::middleware(RoleMiddleware::class.':Volunteer')->group(function () {
        Route::put('/volunteer/update', [VolunteerController::class, 'updateVolunteer']);//
        Route::post('/logout', [VolunteerController::class, 'logout']);//
        Route::post('/feedback', [VolunteerController::class, 'makeFeedback']);
        Route::get('/myFeedbacks', [VolunteerController::class, 'myFeedbacks']);
        Route::post('/events/{id}/apply', [VolunteerController::class, 'applyForEvent']);
        Route::get('/myEvents', [VolunteerController::class, 'myEvents']);
        Route::get('/volunteer/{id}/notification', [VolunteerController::class, 'myNotification']);
    });


    Route::middleware(RoleMiddleware::class.':Admin')->group(function () {
        Route::post('/event/create', [AdminController::class, 'createEvent']);
        Route::put('/event/update/{id}', [AdminController::class, 'updateEvent']);
        Route::delete('/event/delete/{id}', [AdminController::class, 'deleteEvent']);
        Route::get('/donations', [DonationController::class, 'getAllDonations']);
        Route::get('/donation/{id}', [DonationController::class, 'getDonation']);
        Route::get('/donation/charity/{id}', [DonationController::class, 'getDonationByCharity']);
        Route::get('/admin/charity/events-by-month', [AdminController::class, 'activityReport']);
        Route::get('/admin/charity/volunteer-in-events', [AdminController::class, 'volunteerStat']);
        Route::post('/event/accept_volunteer', [AdminController::class, 'acceptVolunteer']);
        Route::post('/event/accept_beneficiary', [AdminController::class, 'acceptBeneficiary']);
        Route::get('/admin/charity/beneficiary-in-charity', [AdminController::class, 'beneficiaryStat']);
        Route::get('/admin/charity/donors-in-charity', [AdminController::class, 'donorsStat']);
        Route::get('/admin/charity/financialReport', [AdminController::class, 'financialReport']);
    });

    Route::middleware(RoleMiddleware::class.':SuperAdmin')->group(function () {
        Route::post('/charity/create', [SuperAdminController::class, 'createCharity']);
        Route::put('/charity/update/{id}', [SuperAdminController::class, 'updateCharity']);
        Route::delete('/charity/delete/{id}', [SuperAdminController::class, 'deleteCharity']);
        Route::get('/super_admin/charity/beneficiary-in-charity', [SuperAdminController::class, 'beneficiaryStat']);
        Route::get('/super_admin/charity/volunteer-in-events', [SuperAdminController::class, 'volunteerStat']);
        Route::get('/super_admin/charity/financialReport', [AdminController::class, 'financialReport']);
        Route::get('/super_admin/charity/charity_stat', [SuperAdminController::class, 'charityStat']);
    });
});

});
