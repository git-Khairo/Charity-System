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
                        'image' => 'https://images.unsplash.com/photo-1591130234524-2c58efb4e9c7',
                    ],
                    [
                        'title_ar' => 'حملة العودة للمدارس',
                        'title_en' => 'Back to School Campaign',
                        'date' => '2025-08-25',
                        'description_ar' => 'توزيع حقائب مدرسية وقرطاسية للطلاب المحتاجين.',
                        'description_en' => 'Distribution of school bags and stationery for students in need.',
                        'location_ar' => 'دمشق',
                        'location_en' => 'Damascus',
                        'image' => 'https://images.unsplash.com/photo-1562771247-bb1c9f2b2e4c',
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
                        'image' => 'https://images.unsplash.com/photo-1603398938378-24b62d3ea5e9',
                    ],
                    [
                        'title_ar' => 'أسبوع التوعية الصحية',
                        'title_en' => 'Health Awareness Week',
                        'date' => '2025-09-01',
                        'description_ar' => 'حملات تثقيفية في المدارس والأسواق حول النظافة والتغذية السليمة.',
                        'description_en' => 'Educational campaigns in schools and markets about hygiene and healthy nutrition.',
                        'location_ar' => 'دمشق',
                        'location_en' => 'Damascus',
                        'image' => 'https://images.unsplash.com/photo-1588776814546-ec47a2f0cb09',
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
                        'image' => 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0642',
                    ],
                    [
                        'title_ar' => 'دورة مهارات القيادة',
                        'title_en' => 'Leadership Skills Course',
                        'date' => '2025-09-12',
                        'description_ar' => 'تدريب نساء على المهارات الإدارية والقيادية.',
                        'description_en' => 'Training women in administrative and leadership skills.',
                        'location_ar' => 'دمشق',
                        'location_en' => 'Damascus',
                        'image' => 'https://images.unsplash.com/photo-1573497019440-99a5a4f56f4c',
                    ],
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
                        'image' => 'https://images.unsplash.com/photo-1595526114035-7a5a6b16ef6b',
                    ],
                    [
                        'title_ar' => 'مشروع كفالة طالب يتيم',
                        'title_en' => 'Orphan Student Sponsorship Project',
                        'date' => '2025-09-10',
                        'description_ar' => 'برنامج دعم دراسي للأيتام عبر الكفالات.',
                        'description_en' => 'Educational support program for orphans through sponsorships.',
                        'location_ar' => 'طرطوس',
                        'location_en' => 'Tartous',
                        'image' => 'https://images.unsplash.com/photo-1616587892266-3b3d7c8cb0d6',
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
                        'image' => 'https://images.unsplash.com/photo-1524492412937-4961d66aa114',
                    ],
                    [
                        'title_ar' => 'يوم التشجير الوطني',
                        'title_en' => 'National Tree Planting Day',
                        'date' => '2025-11-15',
                        'description_ar' => 'زرع أكثر من 500 شجرة بالتعاون مع المدارس.',
                        'description_en' => 'Planting more than 500 trees in collaboration with schools.',
                        'location_ar' => 'اللاذقية',
                        'location_en' => 'Latakia',
                        'image' => 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
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
                        'image' => 'https://images.unsplash.com/photo-1584261454321-379b4f5c74f0',
                    ],
                    [
                        'title_ar' => 'حملة الشتاء الدافئ',
                        'title_en' => 'Warm Winter Campaign',
                        'date' => '2025-12-01',
                        'description_ar' => 'ألبسة وبطانيات ووقود تدفئة للنازحين.',
                        'description_en' => 'Clothes, blankets, and heating fuel for displaced people.',
                        'location_ar' => 'حلب',
                        'location_en' => 'Aleppo',
                        'image' => 'https://images.unsplash.com/photo-1603570419985-0c1a7db8c3b9',
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
                        'image' => 'https://images.unsplash.com/photo-1603570418171-ff779df9b17b',
                    ],
                    [
                        'title_ar' => 'برنامج التدريب الصيفي',
                        'title_en' => 'Summer Training Program',
                        'date' => '2025-07-01',
                        'description_ar' => 'دورات تدريبية في المهارات الرقمية للشباب.',
                        'description_en' => 'Training courses in digital skills for youth.',
                        'location_ar' => 'حماة',
                        'location_en' => 'Hama',
                        'image' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
                    ],
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
