<?php

use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\CharityController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UploadController;
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


Route::post('/upload', [UploadController::class, 'store']);

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
        Route::get('/beneficiaryCharity', [BeneficiaryController::class, 'myCharity']);
    });


    Route::middleware(RoleMiddleware::class.':Volunteer')->group(function () {
        Route::put('/volunteer/update', [VolunteerController::class, 'updateVolunteer']);//
        Route::post('/logout', [VolunteerController::class, 'logout']);//
        Route::post('/feedback', [VolunteerController::class, 'makeFeedback']);
        Route::get('/myFeedbacks', [VolunteerController::class, 'myFeedbacks']);
        Route::post('/events/{id}/apply', [VolunteerController::class, 'applyForEvent']);
        Route::get('/myEvents', [VolunteerController::class, 'myEvents']);
        Route::get('/volunteer/{id}/notification', [VolunteerController::class, 'myNotification']);
        Route::get('/volunteerEvent', [VolunteerController::class, 'acceptedEvent']);
    });


    Route::middleware(RoleMiddleware::class.':Admin')->group(function () {
        Route::post('/event/create', [AdminController::class, 'createEvent']);
        Route::put('/event/update/{id}', [AdminController::class, 'updateEvent']);
        Route::delete('/event/delete/{id}', [AdminController::class, 'deleteEvent']);
        Route::get('/donations', [DonationController::class, 'getAllDonations']);
        Route::get('/donation/{id}', [DonationController::class, 'getDonation']);
        Route::get('/donation/charity/{id}', [DonationController::class, 'getDonationByCharity']);
        Route::post('/donation/{id}/confirmation', [DonationController::class, 'confirmDonation']);
        Route::post('/admin/charity/events-by-month', [AdminController::class, 'activityReport']);
        Route::post('/admin/charity/volunteer-in-events', [AdminController::class, 'volunteerStat']);
        Route::post('/event/accept_volunteer', [AdminController::class, 'acceptVolunteer']);
        Route::post('/event/accept_beneficiary', [AdminController::class, 'acceptBeneficiary']);
        Route::post('/admin/charity/beneficiary-in-charity', [AdminController::class, 'beneficiaryStat']);
        Route::get('/admin/charity/donors-in-charity', [AdminController::class, 'donorsStat']);
        Route::post('/admin/charity/financialReport', [AdminController::class, 'financialReport']);
        Route::post('/admin/charity/donorsChart', [AdminController::class, 'donationChart']);
        Route::get('/admin/charity/charity-info', [AdminController::class, 'charityInfo']);
        Route::put('/charity/update/{id}', [SuperAdminController::class, 'updateCharity']);
        Route::get('/admin/participation/{id}', [AdminController::class, 'Participation']);
        Route::get('/admin/requests/{id}', [AdminController::class, 'requests']);
    });

    Route::middleware(RoleMiddleware::class.':SuperAdmin')->group(function () {
        Route::post('/charity/create', [SuperAdminController::class, 'createCharity']);
        Route::delete('/charity/delete/{id}', [SuperAdminController::class, 'deleteCharity']);
        Route::get('/super_admin/charity/beneficiary-in-charity', [SuperAdminController::class, 'beneficiaryStat']);
        Route::get('/super_admin/charity/volunteer-in-events', [SuperAdminController::class, 'volunteerStat']);
        Route::post('/super_admin/charity/financialReport', [AdminController::class, 'financialReport']);
        Route::get('/super_admin/charity/charity_stat', [SuperAdminController::class, 'charityStat']);
        Route::get('/super_admin/volunteer/feedbacks', [SuperAdminController::class, 'volunteerFeedback']);
        Route::get('/super_admin/charity/feedbacks', [SuperAdminController::class, 'charityFeedback']);
    });
});

});
