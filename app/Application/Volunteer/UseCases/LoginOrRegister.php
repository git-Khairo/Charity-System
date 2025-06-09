<?php

namespace App\Application\Volunteer\UseCases;

use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Writer\SvgWriter;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class LoginOrRegister
{
    protected VolunteerRepositoryInterface $repo ;

    public function __construct(VolunteerRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function generateAndSaveVolunteerQrCode(int $volunteerId)
    {
        $url = '127.0.0.1:8000' . '/volunteer/' . $volunteerId;

        $builder = new Builder(
            writer: new SvgWriter(),
            data: $url,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::High,
            size: 300,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin
        );

        $result = $builder->build();

        $filename = 'qrcodes/volunteer_' . $volunteerId . '.svg';


        Storage::disk('public')->put($filename, $result->getString());

        // Return the publicly accessible URL to the stored QR code
        return Storage::url($filename); // typically "/storage/qrcodes/volunteer_{id}.svg"
    }

    public function Register(array $data){

        $response=$this->repo->Register($data);

        $volunteer=$response['user'];

        $volunteerRole=Role::firstOrCreate(['name' => 'Volunteer','guard_name' => 'api']);

        $volunteer->assignRole($volunteerRole);

        $qrCodePath=$this->generateAndSaveVolunteerQrCode($volunteer->id);
        $volunteer->update(['qr_code_path' => $qrCodePath]);

        $response['user']=$volunteer;

        return $response;

    }

    public function login(array $data){
        return $this->repo->login($data);
    }


}
