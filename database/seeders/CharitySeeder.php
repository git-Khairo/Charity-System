<?php

namespace Database\Seeders;

use App\Domain\Admins\Models\Admin;
use App\Domain\Charity\Models\Charity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class CharitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'Admin','guard_name' => 'api']);

        $charitiesData = [
            [
                'category_id' => 2,
                'name' => [
                    'en' => 'Noor Education Association',
                    'ar' => 'جمعية النور للتعليم'
                ],
                'address' => [
                    'en' => 'Damascus – Al-Mazzeh',
                    'ar' => 'دمشق - المزة'
                ],
                'description' => [
                    'en' => 'Provides free tutoring programs and academic support for school and university students.',
                    'ar' => 'تقدم برامج دراسية مجانية ودورات تقوية لطلبة المدارس والجامعات'
                ],
                'images' => '/storage/charities/noor.jpeg',
                'phonenumber' => '0933445566',
                'email' => 'info@alnoor.org'
            ],
            [
                'category_id' => 1,
                'name' => [
                    'en' => 'Rahma Health Association',
                    'ar' => 'جمعية الرحمة الصحية'
                ],
                'address' => [
                    'en' => 'Aleppo – Al-Sukkari',
                    'ar' => 'حلب - السكري'
                ],
                'description' => [
                    'en' => 'Offers primary medical services and mobile clinics in impoverished rural areas.',
                    'ar' => 'تقدم خدمات طبية أولية وعيادات متنقلة للقرى والمناطق المحرومة'
                ],
                'images' => '/storage/charities/charity1.jpeg',
                'phonenumber' => '0955667788',
                'email' => 'rahma@health.org'
            ],
            [
                'category_id' => 2,
                'name' => [
                    'en' => 'Tamkeen Women Association',
                    'ar' => 'جمعية تمكين المرأة'
                ],
                'address' => [
                    'en' => 'Homs – Al-Insha’at',
                    'ar' => 'حمص - الإنشاءات'
                ],
                'description' => [
                    'en' => 'Trains women in vocational skills and supports small-business initiatives.',
                    'ar' => 'تهدف لتعليم النساء مهارات مهنية وتمكين اقتصادي'
                ],
                'images' => '/storage/charities/charity2.jpeg',
                'phonenumber' => '0944221133',
                'email' => 'women@tamkeen.org'
            ],
            [
                'category_id' => 4,
                'name' => [
                    'en' => 'Dar Al-Yateem Orphan Care',
                    'ar' => 'جمعية دار اليتيم'
                ],
                'address' => [
                    'en' => 'Idlib – Al-Madina',
                    'ar' => 'إدلب - المدينة'
                ],
                'description' => [
                    'en' => 'Supports orphaned children with education, psychological support, and vocational training.',
                    'ar' => 'ترعى الأطفال اليتامى وتؤمن لهم التعليم والرعاية الكاملة'
                ],
                'images' => '/storage/charities/charity3.jpeg',
                'phonenumber' => '0988776655',
                'email' => 'dayr@orphans.org'
            ],
            [
                'category_id' => 5,
                'name' => [
                    'en' => 'Our Environment Association',
                    'ar' => 'جمعية بيئتنا'
                ],
                'address' => [
                    'en' => 'Tartus – The Corniche',
                    'ar' => 'طرطوس - الكورنيش'
                ],
                'description' => [
                    'en' => 'Implements environmental awareness campaigns, tree-planting, and cleanup drives.',
                    'ar' => 'تعمل على التوعية البيئية وحملات تنظيف وتشجير'
                ],
                'images' => '/storage/charities/charity4.jpeg',
                'phonenumber' => '0966443388',
                'email' => 'green@b2na.org'
            ],
            [
                'category_id' => 5,
                'name' => [
                    'en' => 'Hope Relief Association',
                    'ar' => 'جمعية الأمل للإغاثة'
                ],
                'address' => [
                    'en' => 'Rural Damascus – Douma',
                    'ar' => 'ريف دمشق - دوما'
                ],
                'description' => [
                    'en' => 'Provides food aid and emergency assistance during natural disasters and crises.',
                    'ar' => 'تقدم سلال غذائية ومساعدات طارئة في الأزمات'
                ],
                'images' => '/storage/charities/charity5.jpeg',
                'phonenumber' => '0997766554',
                'email' => 'hope@relief.org'
            ],
            [
                'category_id' => 2,
                'name' => [
                    'en' => 'Shabab Youth Association',
                    'ar' => 'جمعية شبابنا'
                ],
                'address' => [
                    'en' => 'As-Suwayda – City Center',
                    'ar' => 'السويداء - المركز'
                ],
                'description' => [
                    'en' => 'Develops youth skills and facilitates volunteering and entrepreneurship.',
                    'ar' => 'منصة لتطوير مهارات الشباب وفتح فرص عمل'
                ],
                'images' => '/storage/charities/charity6.jpeg',
                'phonenumber' => '0923344556',
                'email' => 'shabab@future.org'
            ]
        ];

        foreach ($charitiesData as $charity) {
            // Create admin for this charity
            $admin = Admin::factory()->create();
            $admin->assignRole($adminRole);

            Charity::create([
                'admin_id' => $admin->id,
                'category_id' => $charity['category_id'],
                'name' => $charity['name'],
                'address' => $charity['address'],
                'description' => $charity['description'],
                'images' => $charity['images'],
                'phonenumber' => $charity['phonenumber'],
                'email' => $charity['email']
            ]);
        }
    }
}
