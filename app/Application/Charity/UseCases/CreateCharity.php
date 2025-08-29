<?php

namespace App\Application\Charity\UseCases;

use App\Domain\Admins\Models\Admin;
use App\Domain\Charity\Models\Category;
use App\Domain\Charity\Repositories\CharityRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class CreateCharity
{
    protected CharityRepositoryInterface $repo;
    /**
     * Create a new class instance.
     */
    public function __construct(CharityRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function createCharity($data)
    {
        // Create the admin
        $admin = Admin::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phoneNumber' => $data['phonenumber'],
        ]);

        // Get the category ID from the category name
        $category = Category::where('name', $data['category'])->firstOrFail();
        
        $image = $data['images']; // Access the file directly from $data array
        $filename = 'charity_' . time() . '.' . $image->getClientOriginalExtension();
        $imagePath = $image->storeAs('charities', $filename, 'public');

        // Prepare the charity data
        $charityData = [
            'admin_id' => $admin->id,
            'category_id' => $category->id,
            'name' => [
                'en' => $data['name_translations']['en'],
                'ar' => $data['name_translations']['ar'],
            ],
            'address' => [
                'en' => $data['address']['en'],
                'ar' => $data['address']['ar'],
            ],
            'description' => [
                'en' => $data['description']['en'],
                'ar' => $data['description']['ar'],
            ],
            'phonenumber' => $data['phonenumber'],
            'email' => $data['email'],
            'images' => '/storage' . $imagePath,
        ];

        // Create the charity
        return $this->repo->create($charityData);
    }

}
