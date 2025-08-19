<?php

namespace Database\Seeders;

use App\Domain\Charity\Models\Charity;
use App\Domain\Events\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                $eventsData = [
            // جمعية النور للتعليم
            [
                'charity' => 'جمعية النور للتعليم',
                'events' => [
                    [
                        'title_ar' => 'مخيم النور الصيفي',
                        'title_en' => 'Al-Noor Summer Camp',
                        'date' => '2025-07-01',
                        'description_ar' => 'مخيم تعليمي مجاني للأطفال يشمل نشاطات ترفيهية وتقوية دراسية.',
                        'description_en' => 'A free educational camp for children with recreational activities and academic support.',
                        'location_ar' => 'مقر الجمعية - دمشق',
                        'location_en' => 'Charity Headquarters - Damascus',
                        'image' => json_encode(['/storage/events/event8.jpeg', '/storage/events/event24.jpeg', '/storage/events/event19.jpeg', '/storage/events/event9.jpeg']),
                    ],
                    [
                        'title_ar' => 'حملة العودة للمدارس',
                        'title_en' => 'Back to School Campaign',
                        'date' => '2025-08-25',
                        'description_ar' => 'توزيع حقائب مدرسية وقرطاسية للطلاب المحتاجين.',
                        'description_en' => 'Distribution of school bags and stationery for students in need.',
                        'location_ar' => 'دمشق',
                        'location_en' => 'Damascus',
                        'image' => json_encode(['/storage/events/event5.jpeg', '/storage/events/event15.jpeg', '/storage/events/event22.jpeg']),
                    ],
                ]
            ],
            // جمعية الرحمة الصحية
            [
                'charity' => 'جمعية الرحمة الصحية',
                'events' => [
                    [
                        'title_ar' => 'عيادة الرحمة المتنقلة',
                        'title_en' => 'Al-Rahma Mobile Clinic',
                        'date' => '2025-05-15',
                        'description_ar' => 'تقديم استشارات طبية مجانية في الأرياف.',
                        'description_en' => 'Providing free medical consultations in rural areas.',
                        'location_ar' => 'ريف دمشق',
                        'location_en' => 'Rural Damascus',
                        'image' => json_encode(['/storage/events/event7.jpeg', '/storage/events/event25.jpeg']),
                    ],
                    [
                        'title_ar' => 'أسبوع التوعية الصحية',
                        'title_en' => 'Health Awareness Week',
                        'date' => '2025-09-01',
                        'description_ar' => 'حملات تثقيفية في المدارس والأسواق حول النظافة والتغذية السليمة.',
                        'description_en' => 'Educational campaigns in schools and markets about hygiene and healthy nutrition.',
                        'location_ar' => 'دمشق',
                        'location_en' => 'Damascus',
                        'image' => json_encode(['/storage/events/event2.jpeg', '/storage/events/event12.jpeg', '/storage/events/event17.jpeg']),
                    ],
                ]
            ],
            // جمعية تمكين المرأة
            [
                'charity' => 'جمعية تمكين المرأة',
                'events' => [
                    [
                        'title_ar' => 'معرض مشاريع النساء',
                        'title_en' => 'Women’s Projects Exhibition',
                        'date' => '2025-06-10',
                        'description_ar' => 'عرض لمنتجات النساء المشاركات في برامج التمكين.',
                        'description_en' => 'Showcase of products from women participating in empowerment programs.',
                        'location_ar' => 'حلب',
                        'location_en' => 'Aleppo',
                        'image' => json_encode(['/storage/events/event21.jpeg']),
                    ]
                ]
            ],
            // جمعية دار اليتيم
            [
                'charity' => 'جمعية دار اليتيم',
                'events' => [
                    [
                        'title_ar' => 'يوم اليتيم السنوي',
                        'title_en' => 'Annual Orphan Day',
                        'date' => '2025-04-07',
                        'description_ar' => 'احتفالية مخصصة للأطفال الأيتام تتضمن ألعاب وهدايا.',
                        'description_en' => 'A celebration dedicated to orphan children including games and gifts.',
                        'location_ar' => 'حمص',
                        'location_en' => 'Homs',
                        'image' => json_encode(['/storage/events/event4.jpeg', '/storage/events/event6.jpeg', '/storage/events/event10.jpeg']),
                    ],
                    [
                        'title_ar' => 'مشروع كفالة طالب يتيم',
                        'title_en' => 'Orphan Student Sponsorship Project',
                        'date' => '2025-09-10',
                        'description_ar' => 'برنامج دعم دراسي للأيتام عبر الكفالات.',
                        'description_en' => 'Educational support program for orphans through sponsorships.',
                        'location_ar' => 'طرطوس',
                        'location_en' => 'Tartous',
                        'image' => json_encode(['/storage/events/event5.jpeg', '/storage/events/event10.jpeg', '/storage/events/event15.jpeg']),
                    ],
                ]
            ],
            // جمعية بيئتنا
            [
                'charity' => 'جمعية بيئتنا',
                'events' => [
                    [
                        'title_ar' => 'حملة تنظيف الشواطئ',
                        'title_en' => 'Beach Cleaning Campaign',
                        'date' => '2025-06-20',
                        'description_ar' => 'يوم تطوعي لتنظيف شاطئ طرطوس بمشاركة طلاب ومدنيين.',
                        'description_en' => 'Volunteer day to clean Tartous beach with students and civilians.',
                        'location_ar' => 'طرطوس',
                        'location_en' => 'Tartous',
                        'image' => json_encode(['/storage/events/event12.jpeg']),
                    ],
                    [
                        'title_ar' => 'يوم التشجير الوطني',
                        'title_en' => 'National Tree Planting Day',
                        'date' => '2025-11-15',
                        'description_ar' => 'زرع أكثر من 500 شجرة بالتعاون مع المدارس.',
                        'description_en' => 'Planting more than 500 trees in collaboration with schools.',
                        'location_ar' => 'اللاذقية',
                        'location_en' => 'Latakia',
                        'image' => json_encode(['/storage/events/event17.jpeg', '/storage/events/event16.jpeg', '/storage/events/event11.jpeg']),
                    ],
                ]
            ],
            // جمعية الأمل للإغاثة
            [
                'charity' => 'جمعية الأمل للإغاثة',
                'events' => [
                    [
                        'title_ar' => 'توزيع سلال رمضان',
                        'title_en' => 'Ramadan Basket Distribution',
                        'date' => '2025-03-20',
                        'description_ar' => 'توزيع سلال غذائية في المناطق المحتاجة.',
                        'description_en' => 'Distribution of food baskets in needy areas.',
                        'location_ar' => 'دمشق',
                        'location_en' => 'Damascus',
                        'image' => json_encode(['/storage/events/event2.jpeg', '/storage/events/event25.jpeg', '/storage/events/event23.jpeg', '/storage/events/event20.jpeg']),
                    ],
                    [
                        'title_ar' => 'حملة الشتاء الدافئ',
                        'title_en' => 'Warm Winter Campaign',
                        'date' => '2025-12-01',
                        'description_ar' => 'ألبسة وبطانيات ووقود تدفئة للنازحين.',
                        'description_en' => 'Clothes, blankets, and heating fuel for displaced people.',
                        'location_ar' => 'حلب',
                        'location_en' => 'Aleppo',
                        'image' => json_encode(['/storage/events/event14.jpeg', '/storage/events/event1.jpeg']),
                    ],
                ]
            ],
            // جمعية شبابنا
            [
                'charity' => 'جمعية شبابنا',
                'events' => [
                    [
                        'title_ar' => 'ملتقى ريادة الشباب',
                        'title_en' => 'Youth Entrepreneurship Forum',
                        'date' => '2025-08-17',
                        'description_ar' => 'فعالية تجمع شباب مع موجهين ومستثمرين.',
                        'description_en' => 'An event bringing together youth with mentors and investors.',
                        'location_ar' => 'دمشق',
                        'location_en' => 'Damascus',
                        'image' => json_encode(['/storage/events/event3.jpeg', '/storage/events/event18.jpeg', '/storage/events/event21.jpeg']),
                    ]
                ]
            ],
        ];

        foreach ($eventsData as $charityData) {
            $charity = Charity::where('name->ar', $charityData['charity'])->first();
            if (!$charity) continue;

            foreach ($charityData['events'] as $event) {
                Event::create([
                    'charity_id' => $charity->id,
                    'title' => ['ar' => $event['title_ar'], 'en' => $event['title_en']],
                    'images' => [$event['image']],
                    'description' => ['ar' => $event['description_ar'], 'en' => $event['description_en']],
                    'location' => ['ar' => $event['location_ar'], 'en' => $event['location_en']],
                    'status' => 'upcoming',
                    'date' => $event['date'],
                    'capacity' => 100,
                    'NumOfVolunteer' => 20,
                ]);
            }
        }
    }
}
