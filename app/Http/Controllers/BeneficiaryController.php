<?php

namespace App\Http\Controllers;

use App\Application\Beneficiary\UseCases\AllNotification;
use App\Application\Beneficiary\UseCases\ApplyForCharity;
use App\Application\Beneficiary\UseCases\CreateFeedback;
use App\Application\Beneficiary\UseCases\GetBeneficiaries;
use App\Application\Beneficiary\UseCases\GetBeneficiary;
use App\Application\Beneficiary\UseCases\Login;
use App\Application\Beneficiary\UseCases\Logout;
use App\Application\Beneficiary\UseCases\Register;
use App\Application\Beneficiary\UseCases\UpdateInfo;
use App\Interfaces\Http\Requests\Beneficiary\ApplyForCharityRequest;
use App\Interfaces\Http\Requests\Beneficiary\BeneficiaryFeedbackRequest;
use App\Interfaces\Http\Requests\Beneficiary\LoginBeneficiaryRequest;
use App\Interfaces\Http\Requests\Beneficiary\RegisterBeneficiaryRequest;
use App\Interfaces\Http\Requests\Beneficiary\UpdateBeneficiaryRequest;
use App\Interfaces\Http\Resources\Beneficiary\BeneficiaryResource;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BeneficiaryController extends Controller
{
    public function getAllBeneficiaries(GetBeneficiaries $usecase){
        $beneficiaries = $usecase->getBeneficairies();
        return response()->json(['message' => 'All beneficiaries', 'beneficiaries' => BeneficiaryResource::collection($beneficiaries)],201);
    }

    public function getBeneficairy($id, GetBeneficiary $usecase){
        $beneficiary = $usecase->getBeneficiary($id);
        return response()->json(['message' => `beneficiary $id`, 'beneficiary' => $beneficiary],201);
    }

    public function registerBeneficiary(RegisterBeneficiaryRequest $request, Register $usecase){
        $beneficiary = $usecase->register($request->validated());
        return response()->json(['message' => 'beneficiary added', 'beneficiaries' => $beneficiary],201);
    }

    public function loginBeneficiary(LoginBeneficiaryRequest $request, Login $usecase){
       try {
            $beneficiary = $usecase->login($request->validated());

            if (!$beneficiary) {
                return response()->json([
                    'message' => 'Authentication failed',
                    'errors' => ['credentials' => ['Invalid email or password']],
                ], 401);
            }

            return response()->json([
                'message' => 'Beneficiary logged in',
                'user' => $beneficiary['user'],
                'token' => $beneficiary['token'],
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    public function logoutBeneficiary(Request $request, Logout $usecase){
        $usecase->logout($request);
        return response()->json(['message' => 'beneficiary logged out'],201);
    }

    public function updateBeneficiary($id, UpdateBeneficiaryRequest $request, UpdateInfo $usecase){
        $beneficiary = $usecase->updateInfo($id, $request->validated());
        return response()->json(['message' => 'beneficiary logged in', 'beneficiaries' => $beneficiary],201);
    }

    public function applyForCharity($id, ApplyForCharityRequest $request, ApplyForCharity $usecase){
        $beneficiary = $usecase->applyForCharity($id, $request->validated());
        return response()->json(['message' => 'beneficiary logged in', 'beneficiaries' => $beneficiary],201);
    }

    public function createBeneficiaryFeedback($id, BeneficiaryFeedbackRequest $request, CreateFeedback $usecase){
        $beneficiary = $usecase->createFeedback($id, $request->validated());
        return response()->json(['message' => 'beneficiary logged in', 'beneficiaries' => $beneficiary],201);
    }

    public function myApplication(ApplyForCharity $useCase){
        $beneficiary = $useCase->myApplication();
        return response()->json(['message' => 'beneficiary application', 'applications' => $beneficiary],201);

    }

    public function myNotification(AllNotification $useCase){
        $beneficiary = $useCase->userNotification();
        return response()->json(['message' => 'beneficiary notification', 'notifications' => $beneficiary],201);

    }
}
