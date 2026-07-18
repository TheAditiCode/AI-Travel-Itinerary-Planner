/**
 * VoyageAI - Travel Itinerary Planner Engine
 * Handles State, Data Seeding, Math calculations, and DOM Operations.
 */

// --- Global App State ---
const state = {
    vibe: 'beach',
    duration: 5,
    budgetLimit: 25000,
    travelers: 2,
    packingList: [],
    customItems: [],
    activeDestination: null,
    activeIsRealAI: false
};

// --- Destination & Itinerary Database ---
const destinationsDb = {
    beach: {
        low: {
            name: "Goa, India",
            badge: "Tropical Beach Vibe",
            description: "Relax on golden sands, explore historic Portuguese quarters, and enjoy vibrant local markets on a budget.",
            dailyRates: { stay: 15, transit: 5, food: 10, fun: 8 },
            tips: "Rent a scooter (approx $4/day) to get around economically, and dine at local beach shacks rather than upscale restaurants.",
            days: [
                {
                    title: "Arrival & North Goa Sands",
                    morning: "Arrive in Goa, check in to your cozy hostel, and head straight to Baga Beach for fresh coconut water.",
                    afternoon: "Explore the street markets near Calangute beach, grab cheap local samosas and fruit juices.",
                    evening: "Watch a gorgeous sunset at Anjuna beach, followed by dinner at a beachside shack featuring traditional Goan fish curry."
                },
                {
                    title: "Fort Ruins & Quiet Coves",
                    morning: "Rent scooters and ride up to Chapora Fort (made famous in Bollywood films) for stunning panoramic bay views.",
                    afternoon: "Head north to Vagator beach. Enjoy a budget lunch of fried prawns and local poi bread.",
                    evening: "Relax on the calmer shores of Morjim beach, looking out for Olive Ridley sea turtles if in season."
                },
                {
                    title: "Spice Plantation & Old Heritage",
                    morning: "Take a local bus to Ponda for a tour of a tropical spice plantation, complete with a traditional buffet lunch.",
                    afternoon: "Walk through the UNESCO world heritage basilicas and churches of Old Goa, admiring Portuguese architecture.",
                    evening: "Stroll along the Mandovi riverfront in Panaji, exploring Fontainhas (the colorful Latin Quarter)."
                },
                {
                    title: "Southern Beach Excursion",
                    morning: "Travel south to Colva beach. The sands here are whiter, softer, and much less crowded.",
                    afternoon: "Walk to Benaulim beach for a swim and enjoy local street food like Pav Bhaji and sugarcane juice.",
                    evening: "Watch local fishermen bring in their evening catch and dine under string lights at a southern shack."
                },
                {
                    title: "Dudhsagar Waterfall Trek",
                    morning: "Early morning jeep safari tour to the spectacular Dudhsagar Waterfalls nestled deep inside the forest.",
                    afternoon: "Swim in the natural pool at the base of the falls and enjoy a packed local picnic lunch.",
                    evening: "Head back to your hostel, join a social bonfire, and swap stories with fellow travelers."
                },
                {
                    title: "Sunset Kayaking & Beach Volley",
                    morning: "Head to Bambolim beach for a relaxed morning walk and breakfast of pav bhaji.",
                    afternoon: "Join local travelers for beach volleyball or try paddle boarding in calm waters.",
                    evening: "Rent a kayak for a sunset paddle along the cliffs, followed by local drinks and music."
                },
                {
                    title: "Local Markets & Souvenirs",
                    morning: "Visit the bustling Mapusa local market, smelling fresh spices and observing local trade.",
                    afternoon: "Hunt for seashell souvenirs, handicraft jewelry, and cashew nuts at the Panaji market.",
                    evening: "Farewell dinner at a budget-friendly beach cafe with live acoustic music."
                }
            ]
        },
        medium: {
            name: "Phuket, Thailand",
            badge: "Tropical Island Paradise",
            description: "Crystal clear waters, limestone cliffs, vibrant night markets, and comfortable beachfront resorts.",
            dailyRates: { stay: 45, transit: 15, food: 20, fun: 20 },
            tips: "Use ride-hailing apps like Grab instead of hailing local tuk-tuks, and book island day-trips online a day in advance.",
            days: [
                {
                    title: "Arrival & Patong Beach Walk",
                    morning: "Land in Phuket, transfer to your mid-range resort, and enjoy a fresh welcome drink by the pool.",
                    afternoon: "Stroll along Patong Beach, grab a delicious banana pancake, and feel the tropical breeze.",
                    evening: "Explore the bustling street food vendors of Malin Plaza; try pad thai and fresh mango sticky rice."
                },
                {
                    title: "Phi Phi Islands Snorkeling",
                    morning: "Take a speed boat tour to the iconic Phi Phi Islands. Snorkel amongst colorful coral reefs.",
                    afternoon: "Lunch buffet on Phi Phi Don, followed by a visit to Maya Bay (famed from 'The Beach').",
                    evening: "Return to Phuket; relax with a traditional Thai massage at a boutique spa."
                },
                {
                    title: "Phuket Old Town & Cultural Discovery",
                    morning: "Visit the historic Phuket Old Town, admiring Sino-Portuguese shophouses and murals.",
                    afternoon: "Dine at a trendy heritage cafe, trying local Southern Thai specialty dish 'Moo Hong' (pork belly).",
                    evening: "Ascend Nakkerd Hill to view the majestic 45-meter-tall Big Buddha statue at sunset."
                },
                {
                    title: "James Bond Island & Kayaking",
                    morning: "Excursion to Phang Nga Bay. Board a longtail boat to cruise past towering limestone cliffs.",
                    afternoon: "Sea canoe adventure through hidden sea caves and lagoons. Lunch at the floating Muslim village of Koh Panyi.",
                    evening: "Return to Phuket. Enjoy a beachside dinner with fire-dancing entertainment."
                },
                {
                    title: "Kata & Karon Relaxation",
                    morning: "Spend a lazy morning swimming and sunbathing at the picturesque Kata Noi beach.",
                    afternoon: "Have a lunch of papaya salad and grilled chicken, then walk up to Karon Viewpoint.",
                    evening: "Dine at a hillside restaurant overlooking the Andaman Sea, watching the sky change colors."
                },
                {
                    title: "Thai Cooking Class",
                    morning: "Attend an interactive Thai cooking class. Start by selecting fresh ingredients at a local wet market.",
                    afternoon: "Cook (and eat!) your own green curry, tom yum soup, and spring rolls.",
                    evening: "Stroll along the calmer sands of Kamala Beach, enjoying cocktails at a beach club."
                },
                {
                    title: "Elephant Sanctuary Visit",
                    morning: "Visit an ethical elephant jungle sanctuary. Learn about elephant conservation and feed them bananas.",
                    afternoon: "Walk with the elephants to a mud spa and help bathe them in a natural pool.",
                    evening: "Celebrate your final night with a seafood feast on Rawai Beach beach-mat dining."
                }
            ]
        },
        high: {
            name: "Bora Bora, French Polynesia",
            badge: "Ultra-Luxury Lagoon",
            description: "Indulge in absolute luxury featuring turquoise waters, private overwater bungalows, and premier spas.",
            dailyRates: { stay: 380, transit: 60, food: 90, fun: 110 },
            tips: "Many luxury resorts offer complimentary water sports gear; take advantage of free kayaks and snorkel gear.",
            days: [
                {
                    title: "Arrival & Overwater Welcome",
                    morning: "Fly into Bora Bora. Board a luxury private yacht transfer to your resort's overwater villa.",
                    afternoon: "Unpack, swim directly from your villa deck into the turquoise lagoon, and enjoy champagne.",
                    evening: "Fine-dining at the resort's lagoon-side restaurant featuring French-Polynesian fusion cuisine."
                },
                {
                    title: "Private Lagoon Safari",
                    morning: "Private boat excursion to swim with gentle stingrays and blacktip reef sharks in crystal-clear waters.",
                    afternoon: "Gourmet barbecue lunch served on a private white-sand motu (islet) with your toes in the water.",
                    evening: "Return to your villa; order a floating tray of evening cocktails to enjoy in your plunge pool."
                },
                {
                    title: "Mount Otemanu Helicopter Tour",
                    morning: "Take a scenic helicopter flight over the island, viewing the spectacular volcanic peaks and coral reefs.",
                    afternoon: "Pamper yourself with a volcanic dust body wrap and massage at the resort's award-winning overwater spa.",
                    evening: "Dine at the legendary Bloody Mary's restaurant, a favorite spot for global celebrities."
                },
                {
                    title: "Deep Sea Fishing & Sailing",
                    morning: "Embark on a half-day chartered deep-sea fishing trip targetting mahi-mahi and marlin.",
                    afternoon: "Have your morning catch prepared fresh by the chef. Relax on a catamaran sailing tour around the main island.",
                    evening: "Private beachside candlelit dinner under the stars with traditional Tahitian fire dancers."
                },
                {
                    title: "Jet Ski Adventure & Coral Gardens",
                    morning: "Thrilling guided jet ski tour circling the entire island, with a brief stop for coconut husking demos.",
                    afternoon: "Snorkel in the famous Coral Gardens, viewing thousands of colorful tropical fish.",
                    evening: "Relax on your bungalow deck and enjoy a private stargazing experience guided by a local astronomer."
                },
                {
                    title: "Polynesian Outrigger Canoeing",
                    morning: "Learn how to paddle a traditional Polynesian outrigger canoe along the calm resort lagoons.",
                    afternoon: "Enjoy a luxury seafood beach picnic, complete with lobster tails and local tropical cocktails.",
                    evening: "Indulge in a 5-course tasting menu paired with fine wines at the resort's premier dining room."
                },
                {
                    title: "Leisure Day & Departure Prep",
                    morning: "Enjoy a lazy morning with breakfast delivered to your overwater bungalow by a decorated wooden canoe.",
                    afternoon: "Last-minute souvenir shopping for black pearls in Vaitape village.",
                    evening: "Watch your final Bora Bora sunset over the lagoon with a private beach bonfire."
                }
            ]
        }
    },
    hill: {
        low: {
            name: "Pokhara, Nepal",
            badge: "Himalayan Gateway",
            description: "Gaze at the snow-capped Annapurna peaks, float on peaceful lakes, and enjoy Nepalese culture affordably.",
            dailyRates: { stay: 12, transit: 4, food: 8, fun: 10 },
            tips: "Eat local meals like Dal Bhat (which has free refills) to stay full all day for less than $3.",
            days: [
                {
                    title: "Arrival & Phewa Lake Walk",
                    morning: "Arrive in Pokhara, check in to a cozy lakeside guesthouse with mountain views.",
                    afternoon: "Walk along Lakeside, rent a wooden rowboat (doonga) and paddle out on Phewa Lake.",
                    evening: "Dine at a local tavern, tasting fresh momos (dumplings) while listening to live acoustic folk music."
                },
                {
                    title: "Sarangkot Sunrise & Temples",
                    morning: "Wake up at 4:30 AM. Taxi to Sarangkot hill for a breathtaking sunrise over the Annapurna range.",
                    afternoon: "Hike down the hill, visit the Bindhyabasini Temple, and grab local flatbread and tea.",
                    evening: "Walk up to the World Peace Pagoda on the ridge, watching the sunset illuminate Pokhara valley."
                },
                {
                    title: "Caves, Waterfalls & Museums",
                    morning: "Explore the depths of Gupteshwor Mahadev Cave and view the roaring Devi's Falls from inside.",
                    afternoon: "Visit the International Mountain Museum to learn about Everest history and Sherpa culture.",
                    evening: "Enjoy a budget-friendly dinner of traditional Dal Bhat (lentil soup, rice, and curries)."
                },
                {
                    title: "Tibetan Cultural Day",
                    morning: "Visit the Tashiling Tibetan Refugee Settlement. Learn about carpet weaving and Buddhist heritage.",
                    afternoon: "Dine at a Tibetan kitchen, trying Thukpa (warm noodle soup) and butter tea.",
                    evening: "Watch the sunset from the northern shores of Phewa Lake, away from the tourist crowds."
                },
                {
                    title: "Begnas Lake Excursion",
                    morning: "Take a local bus to the quieter, pristine Begnas Lake, surrounded by terraced green hills.",
                    afternoon: "Rent a boat, swim in the clean water, and enjoy a lunch of fresh lake fish at a local shack.",
                    evening: "Return to Pokhara Lakeside, enjoy a local craft beer, and relax."
                },
                {
                    title: "Kahun Danda Hike",
                    morning: "Embark on a half-day trek up to Kahun Danda hill. Walk through charming Gurung villages.",
                    afternoon: "Reach the hilltop watchtower for views of Mount Machapuchare (Fishtail). Pack a local lunch.",
                    evening: "Descend back to Lakeside. Unwind at a traveler cafe with warm apple pie."
                },
                {
                    title: "Lakeside Bazaars & Departure",
                    morning: "Shop for hand-woven pashminas, singing bowls, and local tea packages in the markets.",
                    afternoon: "Walk through the old bazaar area of Pokhara, viewing historic brick architecture.",
                    evening: "Farewell dinner at a cozy garden restaurant, overlooking the quiet lake."
                }
            ]
        },
        medium: {
            name: "Interlaken, Switzerland",
            badge: "Alpine Adventure Hub",
            description: "Explore the Swiss Alps, majestic emerald lakes, and ride scenic cogwheel trains through mountain villages.",
            dailyRates: { stay: 90, transit: 40, food: 30, fun: 45 },
            tips: "Get the Interlaken Guest Card from your hotel for free local bus transit, and buy picnic food at Coop supermarkets.",
            days: [
                {
                    title: "Arrival & Harder Kulm Sunset",
                    morning: "Arrive in Interlaken, check in to your chalet-style hotel, and stroll through the Hohematte park.",
                    afternoon: "Take the funicular railway up to Harder Kulm (the Top of Interlaken) at 1,322 meters.",
                    evening: "Enjoy panoramic views of Lake Thun and Lake Brienz, and eat a traditional Swiss Rösti at the summit."
                },
                {
                    title: "Lauterbrunnen & Waterfalls",
                    morning: "Take a regional train to Lauterbrunnen, the valley of 72 waterfalls. See Staubbach Falls cascading off cliffs.",
                    afternoon: "Ride the cable car to the car-free mountain village of Mürren. Walk past wooden chalets.",
                    evening: "Return to Interlaken. Warm up with a traditional Swiss cheese fondue dinner."
                },
                {
                    title: "Lake Brienz Cruise & Giessbach",
                    morning: "Board a historic steam paddle boat for a scenic cruise on the turquoise waters of Lake Brienz.",
                    afternoon: "Disembark at Giessbach. Walk up to see the roaring waterfalls and the grand historic hotel.",
                    evening: "Return via the village of Brienz. Grab wood-fired pizza and walk along the lake promenade."
                },
                {
                    title: "Grindelwald First Adventure",
                    morning: "Take a train to Grindelwald and ride the gondola up to First summit.",
                    afternoon: "Walk the cliff-side metal bridge (First Cliff Walk) and hike to the alpine Bachalpsee Lake.",
                    evening: "Dine on rustic macaroni (Älplermagronen) at a mountain restaurant before taking the gondola down."
                },
                {
                    title: "Lake Thun & Spiez Castle",
                    morning: "Take a scenic train ride along Lake Thun to the charming lakeside town of Spiez.",
                    afternoon: "Visit the medieval Spiez Castle, strolling through surrounding vineyards and lake harbors.",
                    evening: "Head back to Interlaken; enjoy a local Swiss chocolate tasting tour."
                },
                {
                    title: "Schynige Platte Alpine Garden",
                    morning: "Board the vintage cogwheel train up to Schynige Platte, feeling like a traveler from the 19th century.",
                    afternoon: "Explore the unique Alpine Garden, home to over 600 species of high-altitude Swiss plants.",
                    evening: "Relax with coffee and cake on the terrace of the mountain hotel, taking in massive glacier views."
                },
                {
                    title: "Aare Gorge & Meiringen",
                    morning: "Take a short train ride to Meiringen and walk the narrow wooden pathways through the deep Aare Gorge.",
                    afternoon: "Visit the nearby Reichenbach Falls (famed as the site of Sherlock Holmes' final duel).",
                    evening: "Farewell dinner in Interlaken, enjoying Swiss draft beers and traditional live yodeling."
                }
            ]
        },
        high: {
            name: "St. Moritz, Switzerland",
            badge: "Luxury Alpine Retreat",
            description: "World-class ski slopes, premium wellness resorts, Michelin-starred dining, and luxury shopping overlooking frozen lakes.",
            dailyRates: { stay: 320, transit: 55, food: 85, fun: 120 },
            tips: "Book a hotel that includes the 'Engadin Card' which provides free access to all regional cable cars and mountain railways.",
            days: [
                {
                    title: "Arrival & Lakeside Splendor",
                    morning: "Arrive in St. Moritz via the panoramic Glacier Express. Transfer to your 5-star mountain palace hotel.",
                    afternoon: "Walk along the pristine St. Moritz Lake, breathing in the crisp, sun-drenched alpine air.",
                    evening: "Champagne welcome at the hotel bar, followed by a fine-dining experience from a Michelin chef."
                },
                {
                    title: "Corvatsch Glacier & Spa",
                    morning: "Take the cable car up to Corvatsch (3,303m), the highest station in the Eastern Alps.",
                    afternoon: "Gourmet lunch at the summit restaurant. Return down to indulge in a luxurious thermal pool and alpine sauna spa session.",
                    evening: "Private horse-drawn carriage ride through the snow-laden Staz forest, followed by a cozy fondue dinner in a mountain cabin."
                },
                {
                    title: "Luxury Shopping & High Tea",
                    morning: "Stroll down Via Serlas, the world's highest luxury shopping street, browsing high-end fashion boutiques.",
                    afternoon: "Classic Afternoon High Tea at Badrutt's Palace Hotel, listening to live harp music.",
                    evening: "Dine at a historic, candlelit farmhouse restaurant specializing in regional Engadin specialties."
                },
                {
                    title: "Muottas Muragl Funicular",
                    morning: "Ride the red funicular railway up to Muottas Muragl. Take in the dramatic view of the Engadin lake plateau.",
                    afternoon: "Walk along the philosopher's path or enjoy a fast-paced sledding run down the mountain route.",
                    evening: "Watch a spectacular sunset from the terrace restaurant, sipping premium Swiss wines."
                },
                {
                    title: "Diavolezza Glacier View",
                    morning: "Travel to Diavolezza. Take the cable car to stand face-to-face with massive glacier peaks.",
                    afternoon: "Soak in Europe's highest outdoor jacuzzi (3,000m) overlooking the Bernina massif. Lunch at the mountain house.",
                    evening: "Return to town. Enjoy a night of gaming and drinks at the high-end Casino St. Moritz."
                },
                {
                    title: "Bernina Express Day Excursion",
                    morning: "Board the Bernina Express train, crossing spectacular viaducts and climbing up to the Ospizio Bernina pass.",
                    afternoon: "Descent into the Italian border town of Tirano. Enjoy a gourmet Italian lunch and local red wines.",
                    evening: "Return to St. Moritz. Unwind in your hotel's library lounge by a crackling fireplace."
                },
                {
                    title: "Wellness Luxury Day",
                    morning: "Indulge in a customized full-body massage utilizing local organic pine extracts.",
                    afternoon: "Leisurely afternoon exploring local modern art galleries in the town center.",
                    evening: "Grand farewell dinner at the resort's flagship restaurant, celebrating the end of your luxury Swiss trip."
                }
            ]
        }
    },
    adventure: {
        low: {
            name: "Rishikesh, India",
            badge: "Ganges River Adventure",
            description: "Conquer white-water rapids, hike to hidden forest waterfalls, and experience mountain bungee jumping affordably.",
            dailyRates: { stay: 10, transit: 4, food: 7, fun: 15 },
            tips: "Stay in hostels near Lakshman Jhula to connect with other adventurers and split costs for local excursions.",
            days: [
                {
                    title: "Arrival & Suspension Bridges",
                    morning: "Arrive in Rishikesh, check in to a riverside hostel, and walk across the famous Ram Jhula suspension bridge.",
                    afternoon: "Explore the bustling streets, grab a cheap lunch of chole bhature and sweet lassi.",
                    evening: "Sit on the sandy ghats of the Ganges, feeling the cool mountain breeze and listing to temple bells."
                },
                {
                    title: "White-Water Rafting Thrills",
                    morning: "Gear up for an adrenaline-fueled 16km white-water rafting trip down the Ganges, navigating rapids like 'Roller Coaster'.",
                    afternoon: "Try cliff jumping into the freezing river. Head back for a lunch of hot momos.",
                    evening: "Walk to the Beatles Ashram, exploring the graffiti-covered meditation domes inside the jungle."
                },
                {
                    title: "Waterfall Hike & Cave Exploration",
                    morning: "Hike through the Rajaji National Park forest to reach the hidden Neer Garh waterfalls.",
                    afternoon: "Take a dip in the cold natural pools. Hike back and visit the historic Vashishta Meditation Cave.",
                    evening: "Enjoy a traditional dinner of wood-fired thin-crust pizza at a bohemian rooftop cafe."
                },
                {
                    title: "Bungee Jumping Adrenaline",
                    morning: "Travel to Mohan Chatti for India's highest fixed-platform bungee jump (83 meters over a rocky river valley).",
                    afternoon: "Recover from the adrenaline rush with a hearty budget lunch of local thali (rice, lentils, vegetables).",
                    evening: "Rent a scooter and ride up to the Kunjapuri Temple path, watching the sky glow over the valley."
                },
                {
                    title: "Kunjapuri Sunrise Trek",
                    morning: "Wake up early for a trek up to the Kunjapuri Temple summit. Watch the sun rise over the high Himalayan peaks.",
                    afternoon: "Hike back down through small mountain hamlets and terraced farms, stopping for local chai.",
                    evening: "Attend the grand, rhythmic evening Ganga Aarti ceremony at Parmarth Niketan Ashram."
                },
                {
                    title: "Kayaking & Paddle Boarding",
                    morning: "Learn the basics of river kayaking in a calm stretch of the Ganges from a local guide.",
                    afternoon: "Relax on the sandy shores of Shivpuri beach, playing volleyball and enjoying a picnic lunch.",
                    evening: "Unwind at a local organic cafe, enjoying vegan burgers and listening to live sitar music."
                },
                {
                    title: "Market Exploration & Departure",
                    morning: "Hunt for local wooden handicrafts, cotton yoga gear, and organic honey in the local bazaars.",
                    afternoon: "Take a final walk along the river, visiting the historic Geeta Bhawan temple walls.",
                    evening: "Farewell dinner at a cozy garden cafe, overlooking the illuminated suspension bridges."
                }
            ]
        },
        medium: {
            name: "Queenstown, New Zealand",
            badge: "Adventure Capital of the World",
            description: "The ultimate hub for bungee jumping, skydiving, high-speed jet boating, and gorgeous glacier carvings.",
            dailyRates: { stay: 75, transit: 25, food: 25, fun: 75 },
            tips: "Avoid eating out for breakfast; buy fresh bakery items and cook simple dinners in your hostel/motel kitchen.",
            days: [
                {
                    title: "Arrival & Skyline Gondola",
                    morning: "Arrive in Queenstown, check in to your cozy motel, and walk along the scenic Lake Wakatipu shore.",
                    afternoon: "Ride the Skyline Gondola up to Bob's Peak. Race down the mountain tracks on the Skyline Luge.",
                    evening: "Stand in line for the legendary Fergburger (worth the wait!), and eat it by the lake."
                },
                {
                    title: "Shotover Jet & Bungee Jump",
                    morning: "Take a thrilling jet boat ride through the narrow, high-walled Shotover River Canyons, spinning 360 degrees.",
                    afternoon: "Head to the Kawarau Bridge, the birthplace of commercial bungee jumping. Leap 43 meters towards the river.",
                    evening: "Calm down with a craft beer tasting at a local microbrewery in Arrowtown."
                },
                {
                    title: "Milford Sound Wilderness Cruise",
                    morning: "Embark on a scenic coach ride along the spectacular Milford Road, passing through glaciers and mountains.",
                    afternoon: "Board a cruise ship in Milford Sound. Sail past towering waterfalls and spot wild dolphins and seals.",
                    evening: "Return to Queenstown late evening; grab a warm bowl of gourmet ramen in the town center."
                },
                {
                    title: "Glenorchy & Lord of the Rings Tour",
                    morning: "Drive along the edge of Lake Wakatipu to the stunning town of Glenorchy, surrounded by beech forests.",
                    afternoon: "Explore famous filming locations from 'Lord of the Rings' on an off-road 4WD adventure tour.",
                    evening: "Enjoy a scenic lakeside dinner of New Zealand lamb or venison at a cozy pub."
                },
                {
                    title: "Canyon Swing & Zipline",
                    morning: "Head to the Shotover Canyon Swing. Choose a creative leap style (like backwards or on a chair) off the 109m cliff.",
                    afternoon: "Go ziplining through the pine forest canopy on Bob's Peak, learning about local eco-conservation.",
                    evening: "Dine on fresh green-lipped mussels at a lakeside seafood bistro."
                },
                {
                    title: "Wanaka Day Trip & Hiking",
                    morning: "Drive over the Crown Range to Wanaka. Hike up Mt Iron for panoramic views of Lake Wanaka.",
                    afternoon: "Visit the famous 'That Wanaka Tree' in the water, and have lunch at a trendy organic cafe.",
                    evening: "Return to Queenstown. Relax at the beachside bath house hot pools."
                },
                {
                    title: "Skydiving Adventure",
                    morning: "Conquer your fears with a tandem skydive from 15,000 feet over the spectacular Remarkables mountain range.",
                    afternoon: "Spend a quiet afternoon exploring the boutique galleries and souvenir shops in Queenstown Mall.",
                    evening: "Farewell dinner at a lake-view steakhouse, raising a glass of local Pinot Noir to an epic trip."
                }
            ]
        },
        high: {
            name: "Reykjavik, Iceland",
            badge: "Land of Fire & Ice",
            description: "Explore tectonic rifts, active volcanoes, hike massive glaciers, and soak in premium geothermal lagoons.",
            dailyRates: { stay: 200, transit: 70, food: 60, fun: 150 },
            tips: "Rent a 4WD SUV with GPS included. Geothermal water is free everywhere; bring a reusable water bottle.",
            days: [
                {
                    title: "Arrival & Blue Lagoon Soak",
                    morning: "Arrive at Keflavík Airport. Grab your rental SUV and drive through volcanic lava fields.",
                    afternoon: "Check in to the exclusive Blue Lagoon Retreat. Soak in mineral-rich geothermal waters with silica mud masks.",
                    evening: "Enjoy a Michelin-recommended dining experience at LAVA Restaurant, built into a natural lava cliff."
                },
                {
                    title: "Golden Circle & Snorkeling Tectonic Fissure",
                    morning: "Drive the Golden Circle. Witness the roaring Gullfoss waterfall and erupting Strokkur geyser.",
                    afternoon: "Put on a drysuit and snorkel between the North American and Eurasian tectonic plates at Silfra Fissure.",
                    evening: "Return to Reykjavik. Dine on fresh Icelandic cod and craft beers at a trendy downtown eatery."
                },
                {
                    title: "Glacier Hike & Ice Climbing",
                    morning: "Drive to Sólheimajökull glacier. Put on crampons and grab ice axes for a guided hike across the ice cap.",
                    afternoon: "Try ice climbing up a vertical glacier wall. Drive past Seljalandsfoss waterfall (walk behind the cascading water).",
                    evening: "Relax at a coastal hotel in Vik. Dine on local lamb shank and enjoy views of black sand beaches."
                },
                {
                    title: "Volcano Superjeep Tour",
                    morning: "Board a customized 8x8 Superjeep to cross deep glacier rivers into the volcanic valley of Thórsmörk.",
                    afternoon: "Hike up to the volcanic craters of Magni and Módi, formed during the famous 2010 Eyjafjallajökull eruption.",
                    evening: "Gourmet mountain grill barbecue prepared by your guide, surrounded by glaciers."
                },
                {
                    title: "Black Sand Beaches & ATV Ride",
                    morning: "Explore the dramatic basalt columns at Reynisfjara black sand beach, watching crashing Atlantic waves.",
                    afternoon: "Thrilling 2-hour ATV tour across black volcanic sand plains to the famous Sólheimasandur plane wreck.",
                    evening: "Return to Reykjavik. Indulge in a 7-course tasting menu featuring local game and seafood."
                },
                {
                    title: "Into the Volcano Excursion",
                    morning: "Unique adventure hiking to the Thrihnukagigur crater. Descend 120 meters inside a dormant volcano magma chamber.",
                    afternoon: "Explore the colorful mineral walls of the interior magma chamber. Have hot traditional meat soup at the site.",
                    evening: "Back in the city. Stroll along Laugarvegur street for premium outdoor gear shopping."
                },
                {
                    title: "Whale Watching & Departure",
                    morning: "Board a luxury yacht from Reykjavik harbor for a whale watching cruise, spotting humpbacks and puffins.",
                    afternoon: "Visit the iconic Hallgrimskirkja church and check out the Harpa Concert Hall architecture.",
                    evening: "Farewell dinner at a premium Nordic restaurant, reflecting on your sub-arctic adventure."
                }
            ]
        }
    },
    historical: {
        low: {
            name: "Cairo, Egypt",
            badge: "Ancient Wonders",
            description: "Gaze at the legendary Giza Pyramids, explore ancient pharaonic tombs, and bargain in historic bazaars.",
            dailyRates: { stay: 15, transit: 6, food: 8, fun: 15 },
            tips: "Use Uber instead of local taxis to avoid fare negotiations, and hire local guides directly at historical sites.",
            days: [
                {
                    title: "Arrival & Nile Felucca",
                    morning: "Arrive in Cairo, check in to a hostel with a rooftop view of the city.",
                    afternoon: "Stroll along the Nile corniche and board a traditional wooden sailboat (felucca) for an hour-long cruise.",
                    evening: "Eat Koshary (Egypt's national dish of pasta, rice, lentils, and spicy tomato sauce) at Abu Tarek."
                },
                {
                    title: "Pyramids of Giza & Sphinx",
                    morning: "Take an early ride to the Giza Plateau. Stand in awe of the Great Pyramid and the Sphinx.",
                    afternoon: "Visit a local papyrus institute to learn ancient paper-making. Grab a lunch of falafel and flatbread.",
                    evening: "Head to the sound and light show at the Pyramids, watching them illuminate against the dark night sky."
                },
                {
                    title: "Museum Treasures & Bazaars",
                    morning: "Explore the historic Egyptian Museum in Tahrir Square, viewing King Tutankhamun's solid gold mask.",
                    afternoon: "Visit the massive Citadel of Saladin and the beautiful Mosque of Muhammad Ali.",
                    evening: "Get lost in the colorful, crowded alleys of Khan el-Khalili bazaar, bargaining for spices and souvenirs."
                },
                {
                    title: "Coptic & Islamic Old Cairo",
                    morning: "Walk through Coptic Cairo. See the Hanging Church and the Church of St. Sergius (where the Holy Family hid).",
                    afternoon: "Explore the historic Al-Muizz street, home to the greatest concentration of medieval Islamic architecture.",
                    evening: "Watch a traditional Sufi dance performance (Tannoura) at the Al-Ghouri Caravanserai."
                },
                {
                    title: "Saqqara & Memphis Ruins",
                    morning: "Travel south to Saqqara to see the Step Pyramid of Djoser, the oldest stone pyramid in the world.",
                    afternoon: "Explore the ancient open-air museum of Memphis, the first capital of unified Egypt.",
                    evening: "Dine at a budget local kebab house, enjoying grilled meats, tahini, and freshly baked Aish Baladi bread."
                },
                {
                    title: "Al-Azhar Park Views",
                    morning: "Spend a peaceful morning walking through the lush gardens of Al-Azhar Park, built over a historic dump site.",
                    afternoon: "Enjoy a cheap lunch overlooking the city skyline and historic minarets. Visit the Sultan Hassan Mosque.",
                    evening: "Watch the city lights turn on from the park terrace, listening to the call to prayer echoing across Cairo."
                },
                {
                    title: "Royal Mummies & Departure",
                    morning: "Visit the modern National Museum of Egyptian Civilization to view the royal mummies of famous pharaohs.",
                    afternoon: "Final souvenir shopping for miniature alabaster pyramids, cartouche necklaces, and local perfumes.",
                    evening: "Farewell dinner at a traditional restaurant overlooking the Nile."
                }
            ]
        },
        medium: {
            name: "Rome, Italy",
            badge: "The Eternal City",
            description: "Step back in time at the Colosseum, wander the ruins of the Roman Forum, and enjoy exquisite Italian cuisine.",
            dailyRates: { stay: 80, transit: 15, food: 30, fun: 30 },
            tips: "Carry a reusable water bottle; Rome has hundreds of 'nasoni' (public fountains) offering cold drinking water.",
            days: [
                {
                    title: "Arrival & Piazza Walk",
                    morning: "Arrive in Rome, check in to your boutique hotel, and head out to explore.",
                    afternoon: "Walk to the Spanish Steps, stroll through Villa Borghese gardens, and visit Piazza del Popolo.",
                    evening: "Walk to the Trevi Fountain, toss a coin to ensure your return, and dine on fresh pasta in a cozy trattoria."
                },
                {
                    title: "Colosseum & Roman Forum",
                    morning: "Skip-the-line guided tour of the majestic Colosseum, learning about gladiators and ancient spectacles.",
                    afternoon: "Wander through the ruins of the Roman Forum and Palatine Hill, where Rome was founded.",
                    evening: "Stroll through the lively Piazza Navona, admiring Bernini's fountains. Enjoy a artisanal gelato."
                },
                {
                    title: "Vatican City & Sistine Chapel",
                    morning: "Cross the Tiber to Vatican City. Tour the Vatican Museums and stand under Michelangelo's Sistine Chapel ceiling.",
                    afternoon: "Enter St. Peter's Basilica, marveling at Pieta. Climb the dome for views of St. Peter's Square.",
                    evening: "Explore the bohemian neighborhood of Trastevere, dining on wood-fired Roman pizza."
                },
                {
                    title: "The Pantheon & Jewish Ghetto",
                    morning: "Visit the Pantheon, the best-preserved ancient Roman temple, marveling at the giant open dome.",
                    afternoon: "Wander through the historic Jewish Ghetto, tasting traditional fried artichokes (Carciofi alla Giudia).",
                    evening: "Visit Campo de' Fiori square. Browse the evening market and enjoy local white wines."
                },
                {
                    title: "Appian Way Catacombs",
                    morning: "Rent bicycles and ride down the ancient Appian Way, one of the earliest Roman military roads.",
                    afternoon: "Take a guided underground tour of the historic Catacombs of San Callisto.",
                    evening: "Dine at a local osteria, enjoying classic Roman pasta dish Cacio e Pepe."
                },
                {
                    title: "Tivoli Gardens Day Trip",
                    morning: "Take a regional train to Tivoli to visit the spectacular Renaissance gardens of Villa d'Este.",
                    afternoon: "Explore the cascading waterfalls, fountains, and walk the ruins of Hadrian's Villa.",
                    evening: "Return to Rome. Enjoy a glass of Chianti wine at a quiet enoteca (wine bar) near the Pantheon."
                },
                {
                    title: "Capitoline Museums & Farewell",
                    morning: "Visit the Capitoline Museums, viewing the iconic bronze statue of the Roman Wolf and ancient sculptures.",
                    afternoon: "Last-minute leather goods and fashion shopping along Via del Corso.",
                    evening: "Grand farewell dinner at an upscale trattoria, celebrating Roman history and culinary excellence."
                }
            ]
        },
        high: {
            name: "Kyoto, Japan",
            badge: "Ancient Imperial Japan",
            description: "Immerse yourself in imperial temples, golden shrines, bamboo forests, and traditional tea ceremonies.",
            dailyRates: { stay: 220, transit: 40, food: 70, fun: 80 },
            tips: "Purchase a Hankyu Tourist Pass for seamless regional transit, and book Kaiseki dinner reservations weeks in advance.",
            days: [
                {
                    title: "Arrival & Gion Walk",
                    morning: "Arrive in Kyoto via Shinkansen (Bullet Train). Check in to a premium traditional Ryokan with tatami mats.",
                    afternoon: "Stroll along the historic wooden houses of Gion district, keeping an eye out for Geishas in traditional kimonos.",
                    evening: "Multi-course Kaiseki dinner at a Michelin-starred restaurant overlooking the Kamogawa River."
                },
                {
                    title: "Fushimi Inari & Golden Pavilion",
                    morning: "Walk under the thousands of iconic vermilion Torii Gates at Fushimi Inari Shrine (go early to avoid crowds).",
                    afternoon: "Lunch of handmade Soba noodles. Visit the stunning Golden Pavilion (Kinkaku-ji) reflecting on a mirror pond.",
                    evening: "Participate in a private, authentic Chanoyu (Japanese Tea Ceremony) hosted by a master tea brewer."
                },
                {
                    title: "Arashiyama Bamboo Forest & Monkey Park",
                    morning: "Walk through the towering green stalks of Arashiyama Bamboo Grove, listening to the wind.",
                    afternoon: "Hike up to the Iwatayama Monkey Park to feed wild macaques. Enjoy lunch of fresh Kyoto tofu delicacies.",
                    evening: "Visit Tenryu-ji Temple and relax in its beautiful 14th-century landscape garden."
                },
                {
                    title: "Kiyomizu-dera Temple & Historic Streets",
                    morning: "Explore the historic wooden Kiyomizu-dera Temple, built without using a single nail, offering panoramic city views.",
                    afternoon: "Walk down the preserved historic streets of Sannenzaka and Ninenzaka, browsing traditional pottery and sweets.",
                    evening: "Enjoy a premium Wagyu beef teppanyaki dinner, cooked fresh in front of you."
                },
                {
                    title: "Nijo Castle & Imperial Palace",
                    morning: "Visit Nijo Castle, walking across 'nightingale floors' that chirp like birds to warn of assassins.",
                    afternoon: "Explore the vast Kyoto Imperial Palace gardens. Enjoy a premium lunch of Kyoto-style sushi.",
                    evening: "Stroll along Pontocho Alley, a narrow street packed with high-end lanterns, bars, and dining spots."
                },
                {
                    title: "Philosopher's Path & Silver Pavilion",
                    morning: "Walk along the Philosopher's Path, a stone canal route lined with cherry trees and Zen temples.",
                    afternoon: "Visit the Silver Pavilion (Ginkaku-ji) and marvel at its perfectly raked sand dry garden.",
                    evening: "Dine on traditional Tempura at a high-end specialty counter, watching each piece fried to order."
                },
                {
                    title: "Sake Tasting & Departure",
                    morning: "Tour the historic Fushimi Sake District, visiting ancient wooden cellars and tasting premium sake flights.",
                    afternoon: "Explore Nishiki Market (Kyoto's Kitchen) for skewered snacks, pickles, and green tea treats.",
                    evening: "Return to your Ryokan for a traditional hot spring bath (Onsen) and a farewell dinner."
                }
            ]
        }
    }
};

// --- Packing Lists Seeding ---
const basePackingList = [
    { text: "Passport & National ID", category: "Documents", checked: false, id: "p1" },
    { text: "Travel Insurance papers", category: "Documents", checked: false, id: "p2" },
    { text: "Hotel bookings printout", category: "Documents", checked: false, id: "p3" },
    { text: "Universal travel adapter", category: "Electronics", checked: false, id: "p4" },
    { text: "Phone charger & power bank", category: "Electronics", checked: false, id: "p5" },
    { text: "Toothbrush & toothpaste", category: "Essentials", checked: false, id: "p6" },
    { text: "First-aid kit & personal meds", category: "Essentials", checked: false, id: "p7" },
    { text: "Refillable water bottle", category: "Essentials", checked: false, id: "p8" }
];

const vibePackingList = {
    beach: [
        { text: "Swimwear (2-3 pairs)", category: "Clothing", checked: false, id: "vb1" },
        { text: "Broad spectrum SPF 50 sunscreen", category: "Essentials", checked: false, id: "vb2" },
        { text: "Polarized sunglasses", category: "Essentials", checked: false, id: "vb3" },
        { text: "Microfiber beach towel", category: "Clothing", checked: false, id: "vb4" },
        { text: "Flip flops / beach sandals", category: "Clothing", checked: false, id: "vb5" },
        { text: "Waterproof dry bag", category: "Electronics", checked: false, id: "vb6" }
    ],
    hill: [
        { text: "Warm windproof jacket", category: "Clothing", checked: false, id: "vh1" },
        { text: "Thermal innerwear layers", category: "Clothing", checked: false, id: "vh2" },
        { text: "Woolen socks & beanie", category: "Clothing", checked: false, id: "vh3" },
        { text: "High-traction walking shoes", category: "Clothing", checked: false, id: "vh4" },
        { text: "Heavy skin moisturizer/lip balm", category: "Essentials", checked: false, id: "vh5" },
        { text: "Small thermos flask", category: "Essentials", checked: false, id: "vh6" }
    ],
    adventure: [
        { text: "Sturdy trekking boots", category: "Clothing", checked: false, id: "va1" },
        { text: "Lightweight rain coat/windbreaker", category: "Clothing", checked: false, id: "va2" },
        { text: "Insect repellent spray", category: "Essentials", checked: false, id: "va3" },
        { text: "Quick-dry activewear", category: "Clothing", checked: false, id: "va4" },
        { text: "Flashlight / headlamp", category: "Electronics", checked: false, id: "va5" },
        { text: "Carabiner clips", category: "Essentials", checked: false, id: "va6" }
    ],
    historical: [
        { text: "Comfortable walking sneakers", category: "Clothing", checked: false, id: "vhi1" },
        { text: "Breathable cotton clothing", category: "Clothing", checked: false, id: "vhi2" },
        { text: "Sun-hat or cap", category: "Clothing", checked: false, id: "vhi3" },
        { text: "DSLR camera / extra SD card", category: "Electronics", checked: false, id: "vhi4" },
        { text: "Travel notepad & pen", category: "Essentials", checked: false, id: "vhi5" },
        { text: "Pocket city map / guide book", category: "Documents", checked: false, id: "vhi6" }
    ]
};

// --- DOM Cache Elements ---
const elements = {
    vibeCards: document.querySelectorAll('.vibe-card'),
    durationSlider: document.getElementById('duration-slider'),
    durationVal: document.getElementById('duration-val'),
    budgetSlider: document.getElementById('budget-slider'),
    budgetVal: document.getElementById('budget-val'),
    travelersSelect: document.getElementById('travelers-select'),
    btnGenerate: document.getElementById('btn-generate'),

    emptyState: document.getElementById('empty-state'),
    loadingState: document.getElementById('loading-state'),
    loadingTitle: document.getElementById('loading-title'),
    loadingSubtitle: document.getElementById('loading-subtitle'),
    errorState: document.getElementById('error-state'),
    errorMessage: document.getElementById('error-message'),
    btnErrorRetry: document.getElementById('btn-error-retry'),
    resultsContainer: document.getElementById('results-container'),

    destImage: document.getElementById('destination-image'),
    destName: document.getElementById('dest-name'),
    destType: document.getElementById('dest-type'),
    destDescription: document.getElementById('dest-description'),
    statDuration: document.getElementById('stat-duration'),
    statTravelers: document.getElementById('stat-travelers'),
    statBudget: document.getElementById('stat-budget'),

    tabLinks: document.querySelectorAll('.tab-link'),
    tabPanels: document.querySelectorAll('.tab-panel'),

    itineraryContent: document.getElementById('itinerary-content'),
    budgetTotal: document.getElementById('budget-total'),
    budgetPerPerson: document.getElementById('budget-per-person'),
    budgetBreakdownBars: document.getElementById('budget-breakdown-bars'),
    budgetTipText: document.getElementById('budget-tip-text'),

    packingListContent: document.getElementById('packing-list-content'),
    packingPercentage: document.getElementById('packing-percentage'),
    packingFraction: document.getElementById('packing-fraction'),
    packingProgressBar: document.getElementById('packing-progress-bar'),

    addItemForm: document.getElementById('add-item-form'),
    customItemInput: document.getElementById('custom-item-input'),
    customItemCategory: document.getElementById('custom-item-category'),
    btnAddItem: document.getElementById('btn-add-item'),

    themeToggleBtn: document.getElementById('theme-toggle'),
    savedTripsList: document.getElementById('saved-trips-list'),
    btnSaveItinerary: document.getElementById('btn-save-itinerary'),
    btnDownloadPdf: document.getElementById('btn-download-pdf'),
    btnPrintItinerary: document.getElementById('btn-print-itinerary'),
    btnCopyItinerary: document.getElementById('btn-copy-itinerary'),

    converterAmount: document.getElementById('converter-amount'),
    converterFrom: document.getElementById('converter-from'),
    converterTo: document.getElementById('converter-to'),
    btnConvert: document.getElementById('btn-convert'),
    converterResult: document.getElementById('converter-result')
};

// --- Initializing App Event Listeners ---
function init() {
    // 1. Vibe Selection
    elements.vibeCards.forEach(card => {
        card.addEventListener('click', () => {
            elements.vibeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.vibe = card.dataset.vibe;
        });
    });

    // 2. Duration Slider
    elements.durationSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        state.duration = val;
        elements.durationVal.textContent = val === 1 ? '1 Day' : `${val} Days`;
    });

    // 3. Budget Limit Slider
    elements.budgetSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        state.budgetLimit = val;
        elements.budgetVal.textContent = `₹${val.toLocaleString('en-IN')}`;
    });

    // 4. Travelers Select Dropdown
    elements.travelersSelect.addEventListener('change', (e) => {
        state.travelers = parseInt(e.target.value);
    });

    // 5. Tabs Management
    elements.tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            elements.tabLinks.forEach(t => t.classList.remove('active'));
            elements.tabPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.dataset.tab;
            document.getElementById(targetId).classList.add('active');

            // Trigger animation repaint for budget bars if switching to budget tab
            if (targetId === 'tab-budget') {
                animateBudgetBars();
            }
        });
    });

    // 6. Generate Action
    elements.btnGenerate.addEventListener('click', generateItinerary);

    // 7. Add Custom Packing Item
    elements.addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addCustomPackingItem();
    });

    // 8. Error Handling Event Listeners
    elements.btnErrorRetry.addEventListener('click', generateItinerary);

    // 9. Light/Dark Theme Toggle
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    if (elements.themeToggleBtn) {
        elements.themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }

    // 10. Saved Itineraries Action Event Listeners
    if (elements.btnSaveItinerary) {
        elements.btnSaveItinerary.addEventListener('click', saveCurrentItinerary);
    }
    if (elements.btnDownloadPdf) {
        elements.btnDownloadPdf.addEventListener('click', downloadPDF);
    }
    if (elements.btnPrintItinerary) {
        elements.btnPrintItinerary.addEventListener('click', () => window.print());
    }
    if (elements.btnCopyItinerary) {
        elements.btnCopyItinerary.addEventListener('click', copyItineraryToClipboard);
    }

    // 11. Initial Saved Trips Load
    renderSavedTrips();

    // 12. Currency Converter Action Listener
    if (elements.btnConvert) {
        elements.btnConvert.addEventListener('click', convertCurrency);
    }

    // 13. Initialize User Ratings & Feedback feature
    initUserFeedback();
}

// --- Loading Simulation & Generator Logic ---
function generateItinerary() {
    // Scroll results area into view on mobile
    if (window.innerWidth < 1024) {
        elements.loadingState.scrollIntoView({ behavior: 'smooth' });
    }

    // Reset views
    elements.emptyState.classList.add('hidden');
    elements.resultsContainer.classList.add('hidden');
    elements.errorState.classList.add('hidden');
    elements.loadingState.classList.remove('hidden');

    const loadingSteps = [
        { title: "Consulting Gemini AI...", sub: "Connecting to the next-gen itinerary planning engine." },
        { title: "Analyzing destination database...", sub: "Evaluating climate trends, local transport options, and tourist volume." },
        { title: "Drafting daily activities...", sub: "Optimizing itinerary routes to limit transit time and group activities by district." },
        { title: "Computing budget estimates...", sub: "Collating seasonal lodging costs and activity ticket values." },
        { title: "Formulating packing checklists...", sub: "Matching gear requirements against forecast destination weather conditions." }
    ];

    elements.loadingTitle.textContent = loadingSteps[0].title;
    elements.loadingSubtitle.textContent = loadingSteps[0].sub;

    let stepIndex = 1;
    let loadingInterval = setInterval(() => {
        elements.loadingTitle.textContent = loadingSteps[stepIndex].title;
        elements.loadingSubtitle.textContent = loadingSteps[stepIndex].sub;
        stepIndex = (stepIndex + 1) % loadingSteps.length;
    }, 1500);

    // Call Gemini API
    const category = state.vibe;
    let budgetLevel = 'medium';
    if (state.budgetLimit < 20000) budgetLevel = 'low';
    else if (state.budgetLimit > 60000) budgetLevel = 'high';
    const travelers = state.travelers;
    const duration = state.duration;

    // Enable generating loading state on button
    elements.btnGenerate.disabled = true;
    elements.btnGenerate.classList.add('loading');
    const btnText = elements.btnGenerate.querySelector('.btn-text');
    if (btnText) btnText.innerHTML = `<span class="loader-spinner"></span> Generating...`;

    const promptText = `Generate a detailed, custom travel itinerary for a trip with the following preferences:
- Vibe/Theme: ${category} (options: beach, hill, adventure, historical)
- Duration: ${duration} days (your output 'days' array MUST contain exactly ${duration} items)
- Budget level: ${budgetLevel} (options: low, medium, high)
- Number of travelers: ${travelers}

Select a real-world, famous, and relevant destination that matches this vibe and budget (e.g. if Beach & High budget, select Bora Bora, Amalfi Coast, or Maldives; if Hill & Low budget, select Pokhara, Nepal, etc.). Do not select general regions, choose a specific city/resort and country.
Provide realistic daily rates (average cost per person per day in USD) for:
- stay (low: 10-30, medium: 30-100, high: 150-500)
- transit
- food
- fun

Provide:
- bestTime: a short string describing the best time of year to visit this destination.
- transport: a short string describing the best local transportation modes for travelers.

Provide a matching short, actionable savings/advice tip.
Provide a tailored packing list containing 5 custom items specific to this destination and season/weather.

For each day in the itinerary, provide:
- title: a descriptive title for the day.
- morning: morning activities.
- afternoon: afternoon activities.
- evening: evening activities.
- attractions: an array of 2-3 specific sightseeing/attraction spots.
- restaurants: an array of 1-2 suggested restaurants or dining locations.
- localFood: an array of 1-2 local dishes, snacks, or specialties to try that day.
- travelTips: an array of 1-2 helpful tips specific to that day's logistics or places.
- estimatedCost: an estimated overall dollar amount in USD for one person's activities, transit, and food for that day (excluding stay).`;

    const requestBody = {
        contents: [{
            parts: [{
                text: promptText
            }]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    name: { type: "STRING" },
                    badge: { type: "STRING" },
                    description: { type: "STRING" },
                    bestTime: { type: "STRING" },
                    transport: { type: "STRING" },
                    dailyRates: {
                        type: "OBJECT",
                        properties: {
                            stay: { type: "INTEGER" },
                            transit: { type: "INTEGER" },
                            food: { type: "INTEGER" },
                            fun: { type: "INTEGER" }
                        },
                        required: ["stay", "transit", "food", "fun"]
                    },
                    tips: { type: "STRING" },
                    days: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                title: { type: "STRING" },
                                morning: { type: "STRING" },
                                afternoon: { type: "STRING" },
                                evening: { type: "STRING" },
                                attractions: {
                                    type: "ARRAY",
                                    items: { type: "STRING" }
                                },
                                restaurants: {
                                    type: "ARRAY",
                                    items: { type: "STRING" }
                                },
                                localFood: {
                                    type: "ARRAY",
                                    items: { type: "STRING" }
                                },
                                travelTips: {
                                    type: "ARRAY",
                                    items: { type: "STRING" }
                                },
                                estimatedCost: { type: "INTEGER" }
                            },
                            required: ["title", "morning", "afternoon", "evening", "attractions", "restaurants", "localFood", "travelTips", "estimatedCost"]
                        }
                    },
                    packingList: {
                        type: "ARRAY",
                        items: { type: "STRING" }
                    }
                },
                required: ["name", "badge", "description", "bestTime", "transport", "dailyRates", "tips", "days"]
            }
        }
    };

    fetch(`/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    const errMsg = (errData.error && errData.error.message) || `HTTP error ${response.status}`;
                    throw new Error(errMsg);
                }).catch(e => {
                    throw new Error(`HTTP error ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            clearInterval(loadingInterval);

            let jsonText = "";
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                jsonText = data.candidates[0].content.parts[0].text;
            } else {
                throw new Error("Invalid API response format");
            }

            const destinationData = JSON.parse(jsonText);
            if (!destinationData.days || !Array.isArray(destinationData.days)) {
                throw new Error("No itinerary days returned by AI");
            }

            finishGeneration(destinationData, true);
        })
        .catch(err => {
            clearInterval(loadingInterval);
            console.warn("Live Generation failed or key is not set. Falling back to pre-seeded Demo Mode.", err);

            setTimeout(() => {
                elements.btnGenerate.disabled = false;
                elements.btnGenerate.classList.remove('loading');
                if (btnText) btnText.textContent = "Generate AI Itinerary";

                let budgetKey = 'medium';
                if (state.budgetLimit < 20000) budgetKey = 'low';
                else if (state.budgetLimit > 60000) budgetKey = 'high';

                const destination = destinationsDb[category][budgetKey];
                finishGeneration(destination, false);
                showSuccessNotification("Offline Demo Mode: pre-seeded itinerary loaded!");
            }, 1500);
        });
}

function finishGeneration(destination, isRealAI = false) {
    // Save generated trip to active state
    state.activeDestination = destination;
    state.activeIsRealAI = isRealAI;

    // Re-enable generate button
    elements.btnGenerate.disabled = false;
    elements.btnGenerate.classList.remove('loading');
    const btnText = elements.btnGenerate.querySelector('.btn-text');
    if (btnText) btnText.textContent = "Generate AI Itinerary";

    // Reset Save button active state indicator if any
    const btnSave = document.getElementById('btn-save-itinerary');
    if (btnSave) {
        btnSave.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> <span>Save Trip</span>`;
        btnSave.classList.remove('saved-active');
    }

    // 1. Hide Loader and Error States
    elements.loadingState.classList.add('hidden');
    elements.errorState.classList.add('hidden');
    elements.resultsContainer.classList.remove('hidden');

    const category = state.vibe;
    let budgetLevel = 'medium';
    if (state.budgetLimit < 20000) budgetLevel = 'low';
    else if (state.budgetLimit > 60000) budgetLevel = 'high';

    // 3. Render Header Cards
    elements.destName.textContent = destination.name;
    elements.destType.innerHTML = isRealAI ? `✨ Gemini AI: ${destination.badge}` : destination.badge;
    elements.destDescription.textContent = destination.description;

    const cityName = destination.name.split(',')[0].trim();
    if (elements.destImage) {
        elements.destImage.src = `https://loremflickr.com/1200/600/travel,${encodeURIComponent(cityName)}`;
    }

    // Render Quick Stats
    elements.statDuration.textContent = state.duration === 1 ? '1 Day' : `${state.duration} Days`;
    elements.statTravelers.textContent = state.travelers === 1 ? '1 Traveler' : `${state.travelers} Travelers`;
    elements.statBudget.textContent = `Limit: ₹${state.budgetLimit.toLocaleString('en-IN')}`;

    // Render best visiting time & transit
    const metaDetails = document.getElementById('destination-meta-details');
    if (metaDetails) {
        const bestTime = destination.bestTime || "October to March (Excellent travel weather)";
        const transport = destination.transport || "Public train networks, walking trails, and local taxis.";
        metaDetails.innerHTML = `
            <div class="meta-detail-item">
                <strong>📅 Best Visiting Time:</strong> <span>${bestTime}</span>
            </div>
            <div class="meta-detail-item" style="margin-top: 6px;">
                <strong>🚗 Transit & Travel:</strong> <span>${transport}</span>
            </div>
        `;
    }

    // Render weather forecast
    fetchAndRenderWeather(cityName);

    // Populate Trip Summary Card values
    const summaryDest = document.getElementById('summary-dest');
    const summaryDuration = document.getElementById('summary-duration');
    const summaryTravelers = document.getElementById('summary-travelers');
    const summaryBudget = document.getElementById('summary-budget');
    const summaryCost = document.getElementById('summary-cost');

    const costPerPerson = (destination.dailyRates.stay + destination.dailyRates.transit + destination.dailyRates.food + destination.dailyRates.fun) * state.duration;
    const usdToInrRate = 83.5;
    const costPerPersonInr = Math.round(costPerPerson * usdToInrRate);

    if (summaryDest) summaryDest.textContent = destination.name;
    if (summaryDuration) summaryDuration.textContent = state.duration === 1 ? '1 Day' : `${state.duration} Days`;
    if (summaryTravelers) summaryTravelers.textContent = state.travelers === 1 ? '1 Traveler' : `${state.travelers} Travelers`;
    if (summaryBudget) summaryBudget.textContent = `₹${state.budgetLimit.toLocaleString('en-IN')}`;
    if (summaryCost) summaryCost.textContent = `$${costPerPerson.toLocaleString()} (≈ ₹${costPerPersonInr.toLocaleString('en-IN')})`;

    // 4. Render Day Itineraries
    renderItinerary(destination.days, destination.name);

    // 5. Calculate & Render Budget
    calculateBudget(destination.dailyRates, destination.tips);

    // 6. Seed & Render Packing List
    seedPackingList(category, destination.packingList);

    // Update map preview title & simulated distance
    const mapOverlayTitle = document.getElementById('map-overlay-title');
    const mapRouteDist = document.getElementById('map-route-dist');
    if (mapOverlayTitle) mapOverlayTitle.textContent = `${cityName} Route`;
    if (mapRouteDist) {
        const estimatedDist = (state.duration * 3.8 + 5).toFixed(1);
        mapRouteDist.textContent = `${estimatedDist} km`;
    }

    // Render hotel recommendations
    renderHotels(cityName, state.budgetLimit);

    // Reset tabs back to first panel (Itinerary)
    elements.tabLinks.forEach(t => t.classList.remove('active'));
    elements.tabPanels.forEach(p => p.classList.remove('active'));
    elements.tabLinks[0].classList.add('active');
    elements.tabPanels[0].classList.add('active');

    // Show toast success alert
    showSuccessNotification(isRealAI ? "AI Itinerary generated successfully!" : "Demo offline itinerary loaded successfully!");

    if (window.innerWidth < 1024) {
        elements.resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- Component Rendering functions ---

// 1. Render Itineraries dynamically
function renderItinerary(daysPool, destinationName) {
    elements.itineraryContent.innerHTML = '';
    const numDays = state.duration;
    const cityName = destinationName ? destinationName.split(',')[0].trim() : 'travel';

    for (let d = 1; d <= numDays; d++) {
        // Find or build a day
        let dayData;
        if (d <= daysPool.length) {
            dayData = daysPool[d - 1];
        } else {
            // Dynamically construct extra days for trips longer than 7 days
            const exDayIndex = (d - 1) % daysPool.length;
            const fallbackDays = [
                {
                    title: "Regional Day Excursion",
                    morning: "Travel to a nearby scenic valley or coastal stretch for custom outdoor explorations.",
                    afternoon: "Sample lunch at a small off-the-beaten-path family tavern and explore local heritage paths.",
                    evening: "Return to the main town area, check out local crafts stalls, and enjoy dinner."
                },
                {
                    title: "Culinary Tasting Tour",
                    morning: "Take a stroll through the local fruit and spice markets, enjoying street breakfast.",
                    afternoon: "Participate in a small culinary food tasting walk around historic central alleys.",
                    evening: "Sunset drinks at a scenic local viewpoint and a dinner showcasing traditional delicacies."
                },
                {
                    title: "Leisure Arts & Culture",
                    morning: "Explore local museums, modern art boutiques, and public parks at your own pace.",
                    afternoon: "Enjoy a relaxed lunch at an outdoor garden cafe with coffee/tea pairing.",
                    evening: "Watch a traditional theater performance or live music session at a local cultural hall."
                }
            ];
            dayData = fallbackDays[exDayIndex % fallbackDays.length];
        }

        const isExpanded = d === 1; // Auto expand first day

        const dayEl = document.createElement('div');
        dayEl.className = `timeline-day ${isExpanded ? 'expanded' : ''}`;

        dayEl.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="day-header" onclick="toggleDayAccordion(this.parentNode)">
                <div class="day-header-left">
                    <span class="day-number">Day ${d}</span>
                    <span class="day-title">${dayData.title}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="day-arrow">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            <div class="day-content">
                <div class="day-content-inner">
                    <div class="day-img-container">
                        <img src="https://loremflickr.com/800/400/travel,${encodeURIComponent(cityName)}?lock=${d}" alt="${cityName}" class="day-img" loading="lazy">
                    </div>
                    <div class="activity-item">
                        <div class="activity-time">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707-.707m12.728 12.728L5.636 5.636" />
                            </svg>
                            <span>Morning</span>
                        </div>
                        <div class="activity-body">
                            <h5>Explore & Sightseeing</h5>
                            <p>${dayData.morning}</p>
                        </div>
                    </div>
                    
                    <div class="activity-item">
                        <div class="activity-time">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                            </svg>
                            <span>Afternoon</span>
                        </div>
                        <div class="activity-body">
                            <h5>Local Discoveries</h5>
                            <p>${dayData.afternoon}</p>
                        </div>
                    </div>
                    
                    <div class="activity-item">
                        <div class="activity-time">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <span>Evening</span>
                        </div>
                        <div class="activity-body">
                            <h5>Dinner & Vibe</h5>
                            <p>${dayData.evening}</p>
                            <div class="activity-tips">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.443.263 2.443 1.542v.18c0 .502-.409.91-1.026.98l-1.085.12c-.521.058-.916.486-.916 1.01v.008c0 .49.37.91.869.954l.069.006c.465.04 1.01.215 1.488.665.318.3.498.718.498 1.155v.006c0 .888-.797 1.62-1.68 1.535l-.048-.004c-.382-.034-.73-.243-.956-.554l-.062-.086a1.225 1.225 0 01-.19-.893l.115-.812a.375.375 0 00-.317-.424l-.168-.023c-.352-.05-.62-.352-.62-.708v-.002c0-.52.404-.948.924-.99l.066-.005a2.22 2.22 0 001.378-3.327l-.053-.08a1.225 1.225 0 01.19-.894l.812-.115a.375.375 0 00.424-.317l.023-.168c.05-.352.352-.62.708-.62h.002zm1.611-3.693a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" clip-rule="evenodd" /></svg>
                                <span>Try seeking out locally recommended eateries on this street block!</span>
                            </div>
                        </div>
                    </div>

                    <!-- Dynamic Attractions, Local Food, Cost, & Tips Grid -->
                    <div class="day-details-grid">
                        <div class="day-detail-block">
                            <div class="day-detail-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                <span>Key Attractions</span>
                            </div>
                            <div class="day-detail-tags">
                                ${(dayData.attractions || ["Local Sights"]).map(attr => `<span class="day-detail-tag">${attr}</span>`).join('')}
                            </div>
                        </div>

                        <div class="day-detail-block">
                            <div class="day-detail-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                <span>Estimated Cost</span>
                            </div>
                            <span class="day-detail-cost">$${dayData.estimatedCost || 15} USD</span>
                        </div>
                    </div>

                    <div class="day-details-grid">
                        <div class="day-detail-block">
                            <div class="day-detail-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                <span>Dining & Local Food</span>
                            </div>
                            <p class="day-detail-text">
                                <strong>Food:</strong> ${(dayData.localFood || ["Traditional Food"]).join(', ')} <br>
                                <strong>Eat at:</strong> ${(dayData.restaurants || ["Cozy Dining Spot"]).join(', ')}
                            </p>
                        </div>

                        <div class="day-detail-block">
                            <div class="day-detail-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                <span>Day Wise Tip</span>
                            </div>
                            <p class="day-detail-text">${(dayData.travelTips || ["Stay hydrated and enjoy your day!"]).join(' ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        elements.itineraryContent.appendChild(dayEl);
    }
}

// Handles accordion toggling
window.toggleDayAccordion = function (dayElement) {
    const isExpanded = dayElement.classList.contains('expanded');

    document.querySelectorAll('.timeline-day').forEach(el => {
        el.classList.remove('expanded');
    });

    if (!isExpanded) {
        dayElement.classList.add('expanded');
    }
};

function renderHotels(cityName, budgetLimit) {
    const hotelsList = document.getElementById('hotels-list');
    if (!hotelsList) return;

    let tier = 'medium';
    if (budgetLimit < 20000) tier = 'low';
    else if (budgetLimit > 60000) tier = 'high';

    const hotelsData = {
        low: [
            { name: `${cityName} Backpackers Hostel`, price: '₹1,200', rating: '★ 4.2', tag: 'Social Vibe' },
            { name: `The Wanderer's Nest`, price: '₹1,500', rating: '★ 4.4', tag: 'Free Wi-Fi' },
            { name: `Nomad Cozy Dorms`, price: '₹1,800', rating: '★ 4.5', tag: 'City Center' }
        ],
        medium: [
            { name: `Comfort Suites ${cityName}`, price: '₹4,500', rating: '★ 4.5', tag: 'Free Breakfast' },
            { name: `Urban Boutique Lodge`, price: '₹5,200', rating: '★ 4.6', tag: 'Pool & Gym' },
            { name: `Garden Resort & Spa`, price: '₹6,000', rating: '★ 4.7', tag: 'Highly Rated' }
        ],
        high: [
            { name: `The Grand Imperial Palace`, price: '₹15,000', rating: '★ 4.9', tag: 'Luxury Dining' },
            { name: `Royal Regency & Spa`, price: '₹18,500', rating: '★ 4.8', tag: 'Scenic View' },
            { name: `Elite Heights Mansion`, price: '₹22,000', rating: '★ 5.0', tag: 'Personal Butler' }
        ]
    };

    const selectedHotels = hotelsData[tier];
    hotelsList.innerHTML = '';

    selectedHotels.forEach(hotel => {
        const item = document.createElement('div');
        item.className = 'hotel-item-row';
        item.innerHTML = `
            <div class="hotel-info-block">
                <h5>${hotel.name}</h5>
                <span class="hotel-tag">${hotel.tag}</span>
            </div>
            <div class="hotel-price-block">
                <span class="hotel-rating">${hotel.rating}</span>
                <span class="hotel-cost">${hotel.price} <small>/night</small></span>
            </div>
        `;
        hotelsList.appendChild(item);
    });
}

// 2. Budget Calculations
function calculateBudget(dailyRates, tip) {
    const days = state.duration;
    const travelers = state.travelers;

    // Multiply rates by parameters
    const totalStay = dailyRates.stay * days * travelers;
    const totalTransit = dailyRates.transit * days * travelers;
    const totalFood = dailyRates.food * days * travelers;
    const totalFun = dailyRates.fun * days * travelers;

    const grandTotal = totalStay + totalTransit + totalFood + totalFun;
    const perPerson = Math.round(grandTotal / travelers);

    // Convert to INR to compare with budget limit
    const usdToInrRate = 83.5;
    const grandTotalInr = Math.round(grandTotal * usdToInrRate);
    const perPersonInr = Math.round(perPerson * usdToInrRate);

    // Format totals
    elements.budgetTotal.textContent = `$${grandTotal.toLocaleString()} USD (≈ ₹${grandTotalInr.toLocaleString('en-IN')})`;
    elements.budgetPerPerson.textContent = `For ${travelers} travelers ($${perPerson.toLocaleString()} / person | ≈ ₹${perPersonInr.toLocaleString('en-IN')})`;

    // Check if it exceeds set budget limit
    if (grandTotalInr > state.budgetLimit) {
        elements.budgetTipText.innerHTML = `<span style="color:#ef4444; font-weight:700;">⚠️ Budget Exceeded:</span> Your estimated total cost (₹${grandTotalInr.toLocaleString('en-IN')}) exceeds your set budget limit of ₹${state.budgetLimit.toLocaleString('en-IN')}. Consider swapping accommodation types or reducing food/fun budgets. <br>${tip}`;
    } else {
        elements.budgetTipText.textContent = tip;
    }

    // Build visual progress bars
    elements.budgetBreakdownBars.innerHTML = '';
    const breakdown = [
        { name: "Accommodation", value: totalStay, class: "expense-bar-stay" },
        { name: "Transit & Logistics", value: totalTransit, class: "expense-bar-transit" },
        { name: "Food & Dinings", value: totalFood, class: "expense-bar-food" },
        { name: "Activities & Tickets", value: totalFun, class: "expense-bar-fun" }
    ];

    breakdown.forEach(item => {
        const percentage = grandTotal > 0 ? Math.round((item.value / grandTotal) * 100) : 0;

        const barEl = document.createElement('div');
        barEl.className = 'expense-item';
        barEl.innerHTML = `
            <div class="expense-meta">
                <span class="expense-name">${item.name} (${percentage}%)</span>
                <span class="expense-val">$${item.value.toLocaleString()}</span>
            </div>
            <div class="expense-bar-bg">
                <div class="expense-bar-fill ${item.class}" data-width="${percentage}%" style="width: 0%"></div>
            </div>
        `;
        elements.budgetBreakdownBars.appendChild(barEl);
    });
}

function animateBudgetBars() {
    const fills = elements.budgetBreakdownBars.querySelectorAll('.expense-bar-fill');
    fills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        // Small delay to allow element mounting and transition triggers
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 100);
    });
}

// 3. Packing Lists Management
function seedPackingList(vibe, aiPackingList = null) {
    // Merge base list and vibe specific list
    const categoryList = vibePackingList[vibe] || [];

    let aiItems = [];
    if (aiPackingList && Array.isArray(aiPackingList)) {
        aiItems = aiPackingList.map((text, idx) => ({
            text: text,
            category: "AI Recommendations",
            checked: false,
            id: `ai-${idx}`
        }));
    }

    // Unique deep copy of standard lists
    state.packingList = [
        ...basePackingList.map(item => ({ ...item })),
        ...categoryList.map(item => ({ ...item })),
        ...aiItems,
        ...state.customItems.map(item => ({ ...item }))
    ];

    renderPackingList();
}

function renderPackingList() {
    elements.packingListContent.innerHTML = '';

    // Group items by category
    const categories = ['Essentials', 'Clothing', 'Electronics', 'Documents', 'AI Recommendations'];
    const groups = {};

    categories.forEach(cat => {
        groups[cat] = state.packingList.filter(item => item.category === cat);
    });

    categories.forEach(cat => {
        const listItems = groups[cat];
        if (listItems.length === 0) return;

        const groupEl = document.createElement('div');
        groupEl.className = 'packing-group';

        let titleLabel = cat;
        if (cat === 'Clothing') titleLabel = 'Clothing & Gear';

        groupEl.innerHTML = `
            <h4>${titleLabel}</h4>
            <div class="checklist-items" id="group-${cat.toLowerCase()}">
                <!-- Checklist items injected -->
            </div>
        `;
        elements.packingListContent.appendChild(groupEl);

        const checklistItemsContainer = groupEl.querySelector(`.checklist-items`);

        listItems.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = `checklist-item ${item.checked ? 'checked' : ''}`;
            itemEl.dataset.id = item.id;

            itemEl.innerHTML = `
                <div class="checklist-item-left" onclick="togglePackingItem('${item.id}')">
                    <label class="custom-checkbox-wrapper">
                        <input type="checkbox" ${item.checked ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                    <span class="checklist-label">${item.text}</span>
                </div>
                <button type="button" class="checklist-delete-btn" onclick="deletePackingItem(event, '${item.id}')" title="Delete item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.34 6m-4.78 0L9 9m11 4a12 12 0 1 1-24 0 12 12 0 0 1 24 0ZM9.75 21h4.5a1.5 1.5 0 0 0 1.5-1.5v-11a1.5 1.5 0 0 0-1.5-1.5h-4.5A1.5 1.5 0 0 0 8.25 8.5v11A1.5 1.5 0 0 0 9.75 21Z" />
                    </svg>
                </button>
            `;
            checklistItemsContainer.appendChild(itemEl);
        });
    });

    updatePackingProgress();
}

window.togglePackingItem = function (itemId) {
    const item = state.packingList.find(i => i.id === itemId);
    if (item) {
        item.checked = !item.checked;

        // Also update in custom items if it is custom
        const customItem = state.customItems.find(i => i.id === itemId);
        if (customItem) {
            customItem.checked = item.checked;
        }

        renderPackingList();
    }
};

window.deletePackingItem = function (event, itemId) {
    event.stopPropagation(); // Avoid double toggling

    // Filter out from active lists
    state.packingList = state.packingList.filter(i => i.id !== itemId);
    state.customItems = state.customItems.filter(i => i.id !== itemId);

    renderPackingList();
};

function addCustomPackingItem() {
    const text = elements.customItemInput.value.trim();
    const category = elements.customItemCategory.value;

    if (!text) return;

    const newItem = {
        text: text,
        category: category,
        checked: false,
        id: 'c_' + Date.now()
    };

    // Save to custom items to persist across future regenerations during session
    state.customItems.push(newItem);

    // Add to active packing list
    state.packingList.push(newItem);

    // Clear input
    elements.customItemInput.value = '';

    renderPackingList();
}

function updatePackingProgress() {
    const total = state.packingList.length;
    const checked = state.packingList.filter(i => i.checked).length;

    const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

    elements.packingPercentage.textContent = `${percentage}%`;
    elements.packingFraction.textContent = `${checked} / ${total} Packed`;
    elements.packingProgressBar.style.width = `${percentage}%`;
}

// Start operations on DOM loaded
document.addEventListener('DOMContentLoaded', init);

// --- Extended Feature Helper Functions ---

function saveCurrentItinerary() {
    if (!state.activeDestination) return;

    // Get existing saved itineraries
    const saved = JSON.parse(localStorage.getItem('saved_itineraries') || '[]');

    // Check if it already exists (by name and duration)
    const exists = saved.some(item => item.name === state.activeDestination.name && item.duration === state.duration);
    if (exists) {
        alert("This itinerary is already saved!");
        return;
    }

    // Add current itinerary to list
    const newSaved = {
        id: 'trip_' + Date.now(),
        name: state.activeDestination.name,
        badge: state.activeDestination.badge,
        description: state.activeDestination.description,
        vibe: state.vibe,
        duration: state.duration,
        budget: state.budget,
        travelers: state.travelers,
        dailyRates: state.activeDestination.dailyRates,
        tips: state.activeDestination.tips,
        days: state.activeDestination.days,
        packingList: state.activeDestination.packingList,
        isRealAI: state.activeIsRealAI,
        dateSaved: new Date().toLocaleDateString()
    };

    saved.push(newSaved);
    localStorage.setItem('saved_itineraries', JSON.stringify(saved));

    // Animate save button or update label
    const btn = document.getElementById('btn-save-itinerary');
    if (btn) {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span>Saved!</span>`;
        btn.classList.add('saved-active');
        setTimeout(() => {
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> <span>Save Itinerary</span>`;
            btn.classList.remove('saved-active');
        }, 2000);
    }

    renderSavedTrips();
}

function renderSavedTrips() {
    const listContainer = document.getElementById('saved-trips-list');
    if (!listContainer) return;

    const saved = JSON.parse(localStorage.getItem('saved_itineraries') || '[]');
    listContainer.innerHTML = '';

    if (saved.length === 0) {
        listContainer.innerHTML = `
            <div class="saved-trips-empty">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                </svg>
                <p>No saved trips yet. Plan a trip and click 'Save Itinerary' to keep it here.</p>
            </div>
        `;
        return;
    }

    saved.forEach(trip => {
        const item = document.createElement('div');
        item.className = 'saved-trip-item';

        item.innerHTML = `
            <div class="saved-trip-info" onclick="loadSavedTrip('${trip.id}')">
                <h4>${trip.name}</h4>
                <p>${trip.vibe.charAt(0).toUpperCase() + trip.vibe.slice(1)} • ${trip.duration} Days • ${trip.dateSaved}</p>
            </div>
            <div class="saved-trip-actions">
                <button type="button" class="saved-trip-delete-btn" onclick="deleteSavedTrip('${trip.id}')" title="Delete Saved Trip">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.34 6m-4.78 0L9 9m11 4a12 12 0 1 1-24 0 12 12 0 0 1 24 0ZM9.75 21h4.5a1.5 1.5 0 0 0 1.5-1.5v-11a1.5 1.5 0 0 0-1.5-1.5h-4.5A1.5 1.5 0 0 0 8.25 8.5v11A1.5 1.5 0 0 0 9.75 21Z" />
                    </svg>
                </button>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

window.loadSavedTrip = function (id) {
    const saved = JSON.parse(localStorage.getItem('saved_itineraries') || '[]');
    const trip = saved.find(t => t.id === id);
    if (!trip) return;

    // Set global app state to match this trip
    state.vibe = trip.vibe;
    state.duration = trip.duration;
    state.budget = trip.budget;
    state.travelers = trip.travelers;

    // Update inputs to match loaded state
    elements.vibeCards.forEach(c => {
        c.classList.remove('active');
        if (c.dataset.vibe === trip.vibe) c.classList.add('active');
    });

    elements.durationSlider.value = trip.duration;
    elements.durationVal.textContent = trip.duration === 1 ? '1 Day' : `${trip.duration} Days`;

    elements.budgetBtns.forEach(b => {
        b.classList.remove('active');
        if (b.dataset.budget === trip.budget) b.classList.add('active');
    });

    elements.travelersCount.textContent = trip.travelers;

    // Populate active destination state
    state.activeDestination = trip;
    state.activeIsRealAI = trip.isRealAI;

    // Hide welcome state
    elements.emptyState.classList.add('hidden');
    elements.resultsContainer.classList.remove('hidden');
    elements.errorState.classList.add('hidden');
    elements.loadingState.classList.add('hidden');

    // Call finishGeneration to render it in the results pane
    finishGeneration(trip, trip.isRealAI);

    // Scroll results into view on mobile
    if (window.innerWidth < 1024) {
        elements.resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
};

window.deleteSavedTrip = function (id) {
    let saved = JSON.parse(localStorage.getItem('saved_itineraries') || '[]');
    saved = saved.filter(t => t.id !== id);
    localStorage.setItem('saved_itineraries', JSON.stringify(saved));
    renderSavedTrips();
};

function downloadPDF() {
    if (!state.activeDestination) return;

    const element = document.getElementById('results-container');
    if (!element) return;

    // Add temporary styling class for printing
    document.body.classList.add('pdf-printing');

    const opt = {
        margin: [10, 10, 10, 10],
        filename: `VoyageAI_Itinerary_${state.activeDestination.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: document.body.classList.contains('light-theme') ? '#ffffff' : '#070a13'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
        document.body.classList.remove('pdf-printing');
    }).catch(err => {
        console.error("PDF generation failed:", err);
        document.body.classList.remove('pdf-printing');
        alert("Failed to download PDF. Please try again.");
    });
}

async function convertCurrency() {
    const amountInput = elements.converterAmount;
    const fromSelect = elements.converterFrom;
    const toSelect = elements.converterTo;
    const resultBox = elements.converterResult;
    const btnConvert = elements.btnConvert;

    if (!amountInput || !fromSelect || !toSelect || !resultBox || !btnConvert) return;

    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount greater than 0");
        return;
    }

    const from = fromSelect.value;
    const to = toSelect.value;

    if (from === to) {
        resultBox.classList.remove('hidden');
        resultBox.className = 'converter-result-box';
        resultBox.innerHTML = `
            <div class="result-detail">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${from} =</div>
            <div class="result-main">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}</div>
            <div class="result-rate">1 ${from} = 1.0000 ${to}</div>
        `;
        return;
    }

    // Disable Convert button
    btnConvert.disabled = true;
    const originalBtnText = btnConvert.innerHTML;
    btnConvert.innerHTML = `<span class="loader-spinner"></span> Converting...`;
    resultBox.classList.add('hidden');

    try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const converted = data.rates[to];
        if (converted === undefined) {
            throw new Error("Target rate not found in API response");
        }

        const rate = converted / amount;

        resultBox.classList.remove('hidden');
        resultBox.className = 'converter-result-box';
        resultBox.innerHTML = `
            <div class="result-detail">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${from} =</div>
            <div class="result-main">${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}</div>
            <div class="result-rate">1 ${from} = ${rate.toFixed(4)} ${to}</div>
        `;
    } catch (err) {
        console.error("Currency Conversion Error:", err);
        resultBox.classList.remove('hidden');
        resultBox.className = 'converter-result-box error-result';
        resultBox.innerHTML = `
            <div class="error-title">Conversion Failed</div>
            <div class="error-desc">Unable to fetch live exchange rates. Please verify your internet connection and try again.</div>
        `;
    } finally {
        btnConvert.disabled = false;
        btnConvert.innerHTML = originalBtnText;
    }
}

async function fetchAndRenderWeather(cityName) {
    const weatherContent = document.getElementById('weather-forecast-content');
    if (!weatherContent) return;

    weatherContent.innerHTML = `<div class="weather-loading"><span class="loader-spinner"></span> Loading forecast...</div>`;

    try {
        // Step 1: Geocoding
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
        if (!geoResponse.ok) throw new Error("Geocoding failed");

        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("No location coordinates found");
        }

        const { latitude, longitude } = geoData.results[0];

        // Update map coordinates dynamically
        const coordsEl = document.getElementById('map-coords');
        if (coordsEl) {
            coordsEl.textContent = `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`;
        }

        // Step 2: Weather forecast
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
        if (!weatherResponse.ok) throw new Error("Weather forecast failed");

        const weatherData = await weatherResponse.json();
        const daily = weatherData.daily;

        weatherContent.innerHTML = '';

        // Weather code mapping to simple descriptions/icons
        const weatherMap = {
            0: { desc: 'Clear sky', icon: '☀️' },
            1: { desc: 'Mainly clear', icon: '🌤️' },
            2: { desc: 'Partly cloudy', icon: '⛅' },
            3: { desc: 'Overcast', icon: '☁️' },
            45: { desc: 'Foggy', icon: '🌫️' },
            48: { desc: 'Depositing rime fog', icon: '🌫️' },
            51: { desc: 'Light drizzle', icon: '🌧️' },
            53: { desc: 'Moderate drizzle', icon: '🌧️' },
            55: { desc: 'Dense drizzle', icon: '🌧️' },
            61: { desc: 'Slight rain', icon: '🌧️' },
            63: { desc: 'Moderate rain', icon: '🌧️' },
            65: { desc: 'Heavy rain', icon: '🌧️' },
            71: { desc: 'Slight snow', icon: '❄️' },
            73: { desc: 'Moderate snow', icon: '❄️' },
            75: { desc: 'Heavy snow', icon: '❄️' },
            80: { desc: 'Slight showers', icon: '🌦️' },
            81: { desc: 'Moderate showers', icon: '🌦️' },
            82: { desc: 'Violent showers', icon: '⛈️' },
            95: { desc: 'Thunderstorm', icon: '⛈️' }
        };

        for (let i = 0; i < Math.min(5, daily.time.length); i++) {
            const dateStr = new Date(daily.time[i]).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
            const maxTemp = Math.round(daily.temperature_2m_max[i]);
            const minTemp = Math.round(daily.temperature_2m_min[i]);
            const code = daily.weathercode[i];
            const weatherDetail = weatherMap[code] || { desc: 'Moderate weather', icon: '⛅' };

            const item = document.createElement('div');
            item.className = 'weather-item-card';
            item.innerHTML = `
                <div class="weather-date">${dateStr}</div>
                <div class="weather-icon-large">${weatherDetail.icon}</div>
                <div class="weather-temp-range">
                    <span class="max-temp">${maxTemp}°C</span>
                    <span class="min-temp">${minTemp}°C</span>
                </div>
                <div class="weather-desc">${weatherDetail.desc}</div>
            `;
            weatherContent.appendChild(item);
        }
    } catch (err) {
        console.error("Weather fetch failed:", err);
        weatherContent.innerHTML = `
            <div class="weather-error">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="weather-err-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                </svg>
                <p>Weather forecast offline or location geocoding failed. Weather updates are available online.</p>
            </div>
        `;
    }
}

function copyItineraryToClipboard() {
    if (!state.activeDestination) return;

    let text = `VOYAGEAI ITINERARY - ${state.activeDestination.name.toUpperCase()}\n`;
    text += `${state.activeDestination.badge}\n`;
    text += `${state.activeDestination.description}\n\n`;
    text += `Duration: ${state.duration} Days\n`;
    text += `Travelers: ${state.travelers}\n`;
    text += `Estimated Cost: $${((state.activeDestination.dailyRates.stay + state.activeDestination.dailyRates.transit + state.activeDestination.dailyRates.food + state.activeDestination.dailyRates.fun) * state.duration).toLocaleString()} USD\n\n`;

    state.activeDestination.days.forEach((day, index) => {
        text += `DAY ${index + 1}: ${day.title}\n`;
        text += `- Morning: ${day.morning}\n`;
        text += `- Afternoon: ${day.afternoon}\n`;
        text += `- Evening: ${day.evening}\n`;
        if (day.attractions) text += `- Attractions: ${day.attractions.join(', ')}\n`;
        if (day.restaurants) text += `- Restaurants: ${day.restaurants.join(', ')}\n`;
        if (day.localFood) text += `- Local Food: ${day.localFood.join(', ')}\n`;
        if (day.travelTips) text += `- Tip: ${day.travelTips.join(' ')}\n`;
        text += `\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy-itinerary');
        if (btn) {
            const original = btn.innerHTML;
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span>Copied!</span>`;
            showSuccessNotification("Itinerary copied to clipboard!");
            setTimeout(() => {
                btn.innerHTML = original;
            }, 2000);
        }
    }).catch(err => {
        console.error("Clipboard copy failed:", err);
        alert("Failed to copy itinerary.");
    });
}

function showSuccessNotification(message) {
    const toast = document.getElementById('success-notification');
    if (toast) {
        toast.querySelector('span').textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// --- User Feedback & Rating System Features ---

function initUserFeedback() {
    // 1. Pre-seed baseline ratings if none exist
    let reviews = JSON.parse(localStorage.getItem('voyage_reviews'));
    if (!reviews || !Array.isArray(reviews)) {
        reviews = [
            { id: 'seed_1', author: 'Aditi S.', rating: 5, comment: 'Amazing planner! The offline mode is super useful.' },
            { id: 'seed_2', author: 'Rohit K.', rating: 4, comment: 'Very detailed itineraries. The weather feature is spot-on.' },
            { id: 'seed_3', author: 'Priya M.', rating: 5, comment: 'Loved the currency converter and packing checklist!' }
        ];
        localStorage.setItem('voyage_reviews', JSON.stringify(reviews));
    }

    renderFeedbackSummary();
    renderReviewForm();
}

function renderFeedbackSummary() {
    const reviews = JSON.parse(localStorage.getItem('voyage_reviews') || '[]');
    const totalReviews = reviews.length;

    const sumRatings = reviews.reduce((sum, item) => sum + item.rating, 0);
    const avgRating = totalReviews > 0 ? (sumRatings / totalReviews).toFixed(1) : '0.0';

    // Render dynamic text values
    const avgRatingEl = document.getElementById('avg-rating');
    const totalReviewsEl = document.getElementById('total-reviews');
    const avgStarsEl = document.getElementById('avg-stars');

    if (avgRatingEl) avgRatingEl.textContent = avgRating;
    if (totalReviewsEl) totalReviewsEl.textContent = totalReviews === 1 ? '1 review' : `${totalReviews} reviews`;

    if (avgStarsEl) {
        const roundedAvg = Math.round(parseFloat(avgRating));
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= roundedAvg) {
                starsHTML += '★';
            } else {
                starsHTML += '☆';
            }
        }
        avgStarsEl.textContent = starsHTML;
    }
}

function renderReviewForm(editingReview = null) {
    const container = document.getElementById('review-container');
    if (!container) return;

    // Check if the user already submitted a review (and is not editing)
    const reviews = JSON.parse(localStorage.getItem('voyage_reviews') || '[]');
    const userReview = reviews.find(r => r.id === 'user_review');

    if (userReview && !editingReview) {
        // Render submitted review view
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += i <= userReview.rating ? '★' : '☆';
        }

        container.innerHTML = `
            <div class="user-review-display">
                <div class="user-review-header">
                    <span class="user-review-title">Your Feedback</span>
                    <div class="user-review-stars">${starsHTML}</div>
                </div>
                <p class="user-review-text" id="user-review-text"></p>
                <div class="user-review-actions">
                    <button type="button" class="btn-review-action edit" id="btn-edit-review">Edit Review</button>
                    <button type="button" class="btn-review-action delete" id="btn-delete-review">Delete</button>
                </div>
            </div>
        `;
        // Use textContent to safely prevent XSS injection from local storage text values
        const textEl = document.getElementById('user-review-text');
        if (textEl) textEl.textContent = userReview.comment;

        document.getElementById('btn-edit-review').addEventListener('click', () => {
            renderReviewForm(userReview);
        });
        document.getElementById('btn-delete-review').addEventListener('click', deleteUserReview);
        return;
    }

    // Render interactive rating input form
    const ratingValue = editingReview ? editingReview.rating : 0;
    const commentText = editingReview ? editingReview.comment : '';

    container.innerHTML = `
        <form id="review-form" onsubmit="event.preventDefault();" style="margin-top: 10px;">
            <div class="form-group">
                <label class="form-label">Your Rating</label>
                <div class="star-rating-input" id="star-rating-input">
                    <button type="button" class="star-btn" data-value="1">★</button>
                    <button type="button" class="star-btn" data-value="2">★</button>
                    <button type="button" class="star-btn" data-value="3">★</button>
                    <button type="button" class="star-btn" data-value="4">★</button>
                    <button type="button" class="star-btn" data-value="5">★</button>
                </div>
                <input type="hidden" id="selected-rating" value="${ratingValue}">
            </div>
            <div class="form-group" style="margin-top: 12px;">
                <label class="form-label" for="review-comment">Comments</label>
                <textarea id="review-comment" class="form-input text-area" placeholder="Share your feedback..." rows="3" required></textarea>
            </div>
            <button type="button" id="btn-submit-review" class="btn btn-secondary btn-block" style="margin-top: 14px;">
                ${editingReview ? 'Save Review' : 'Submit Review'}
            </button>
        </form>
    `;

    const commentInput = document.getElementById('review-comment');
    if (commentInput) commentInput.value = commentText;

    // Star hover & click effects
    const stars = container.querySelectorAll('.star-btn');
    const selectedRatingInput = document.getElementById('selected-rating');

    function updateStars(rating) {
        stars.forEach(s => {
            const val = parseInt(s.dataset.value);
            s.classList.toggle('active', val <= rating);
        });
    }

    updateStars(ratingValue);

    stars.forEach(star => {
        // Hover highlights
        star.addEventListener('mouseover', () => {
            const hoverValue = parseInt(star.dataset.value);
            stars.forEach(s => {
                const val = parseInt(s.dataset.value);
                s.classList.toggle('hovered', val <= hoverValue);
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach(s => s.classList.remove('hovered'));
        });

        // Click set value
        star.addEventListener('click', () => {
            const clickValue = parseInt(star.dataset.value);
            selectedRatingInput.value = clickValue;
            updateStars(clickValue);
        });
    });

    // Form submit listener
    const btnSubmit = document.getElementById('btn-submit-review');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', submitUserReview);
    }
}

function submitUserReview() {
    const selectedRating = parseInt(document.getElementById('selected-rating').value);
    const commentInput = document.getElementById('review-comment');

    if (selectedRating === 0) {
        alert("Please choose a star rating (1 to 5 stars) before submitting!");
        return;
    }

    const comment = commentInput ? commentInput.value.trim() : "";
    if (comment === "") {
        alert("Please write a short comment feedback!");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem('voyage_reviews') || '[]');

    // Upsert user review
    const existingIndex = reviews.findIndex(r => r.id === 'user_review');
    const userReview = {
        id: 'user_review',
        author: 'You',
        rating: selectedRating,
        comment: comment
    };

    if (existingIndex > -1) {
        reviews[existingIndex] = userReview;
    } else {
        reviews.push(userReview);
    }

    localStorage.setItem('voyage_reviews', JSON.stringify(reviews));

    showSuccessNotification("Thank you for your rating and feedback!");
    renderFeedbackSummary();
    renderReviewForm();
}

function deleteUserReview() {
    let reviews = JSON.parse(localStorage.getItem('voyage_reviews') || '[]');
    reviews = reviews.filter(r => r.id !== 'user_review');
    localStorage.setItem('voyage_reviews', JSON.stringify(reviews));

    showSuccessNotification("Your review was deleted.");
    renderFeedbackSummary();
    renderReviewForm();
}
