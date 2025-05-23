<?php

namespace App\Application\Volunteer\UseCases;

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use App\Domain\Volunteer\Repositories\VolunteerRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class LoginOrRegister
{
    protected VolunteerRepositoryInterface $repo ;

    public function __construct(VolunteerRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function Register(array $data){

        $response=$this->repo->Register($data);

        $volunteer=$response['user'];

        $profileUrl = url("/users/{$volunteer->id}");

        // ✅ Create QR code object (only 1 parameter)
        $qrCode = QrCode::create($profileUrl)
            ->setEncoding(new Encoding('UTF-8'))
            ->setErrorCorrectionLevel(new ErrorCorrectionLevelHigh())
            ->setSize(300)
            ->setMargin(10)
            ->setRoundBlockSizeMode(new RoundBlockSizeModeMargin());

        // ✅ Create image using PNG writer
        $writer = new PngWriter();
        $result = $writer->write($qrCode);

        // ✅ Save image to disk
        $filename = "user-{$volunteer->id}.png";
        $path = "public/qrcodes/{$filename}";
        Storage::put($path, $result->getString());

        // ✅ Save image path in DB
        $volunteer->qr_code_path = "storage/qrcodes/{$filename}";
        $volunteer->save();

        $response['user']=$volunteer;

        return $response;

    }

    public function login(array $data){
        return $this->repo->login($data);
    }


}
