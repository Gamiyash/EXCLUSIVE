const mongoose = require('mongoose');
const FlashProduct = require('../models/Flashproduct');

mongoose.connect(`${process.env.MONGO_URI}/EcommorceSignup`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return FlashProduct.deleteMany(); // Clear existing data
  })
  .then(() => {
    // Array of products to insert
    const Flashproducts = [
      { name: 'Noise Thrive 1.85 smart watch', image: '../Smartwatch.webp', offerPrice: 2010, actualPrice: 3000, discount: "33", rating: 3.5, discription: "Featuring a unisex design, this Noise Thrive Smartwatch effortlessly blends style and functionality, appealing to both men and women. Sporting a sleek metallic finish, it adds a touch of sophistication to any outfit, making it a versatile accessory for various occasions. Courtesy of its compatibility with both Android and iOS devices, you can effortlessly sync this smartwatch with your preferred mobilephone operating system. Boasting a metallic finish, this smartwatch exudes a sophisticated look, elevating the overall aesthetic appeal if you are a tech-savvy individual.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"watch",keyword:["Smartwatch","digitalwatch" ,"handSmartWatch"].join(' '), },
      { name: 'vivo T2 Pro 5G (New Moon Black, 128 GB) (8 GB RAM) ', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/y/8/-original-imagtt4mhqrzjs9r.jpeg?q=70', offerPrice: 22999, actualPrice: 29999, discount: "33", rating: 4.5, discription: "The T2 Pro 5G smartphone features a 3D curved AMOLED screen providing a bright display with a peak brightness of 1300 nits. Improve your performance with the MediaTek Dimensity 7200 processor. Powered with a 64 MP main camera with OIS and a night camera with Aura Light, keep clicking stunning pictures all day and night. This smartphone is slim, lightweight and boasts a premium design with AG glass back cover. Available in 8 GB+8 GB RAM, and ROM fused together with an optimised algorithm, you can easily use around 27 apps simultaneously. Powered by a 4600 mAH large battery, you can quickly boost your phone’s charge with the 66 W Flash Charge.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"Phone",keyword:["Smartphone", "SmartMobile","Mobile", "vivophone", "vivomobile"].join(' '), },
      { name: 'Day and Date Functioning Steel Strap New Quartz Analog Watch - For Men LS2978', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/watch/2/d/p/-original-imagrgwwjpbf8zhg.jpeg?q=70', offerPrice: 3599, actualPrice: 5000, discount: "33", rating: 5, discription: "EDDY FASHION PRIVATE LIMITED Presents All New Collection of EDDY HAGER Watches. This Attractive Watch Comes With Working Day Date Feature. In This Watch You Will Get Stainless Steel Chain Which Easily Fit On Your Wrist And With Charming Olive Dial Which Highlights Your Personality. Wearing This Watch Will Help You To Discover The New Time. Thanks For Being A Part Of Eddy Fashion Private Limited We Take Care Of Your Precious Time.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"watch",keyword:["watch", "handwatch", "wristWatch" ,"MaleWatch", "malewristWatch" ,"Wrist Hand"].join(' '), },
      { name: 'Mi A Series 80 cm (32 inch) HD Ready LED Smart Google TV 2024 Edition', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/television/b/i/b/l32ma-ain-mi-original-imah2pgfzpg3zuys.jpeg?q=70', offerPrice: 49999, actualPrice:69999, discount: "33", rating: 2, discription: "Experience the Mi A Series TV, where stunning design meets exceptional performance. Its sleek metal frame and immersive fullscreen display offer captivating visuals. Enjoy high-quality 20W sound powered by Dolby Audio for an unparalleled audio experience. Google TV organizes movies, shows, and live TV from your apps and subscriptions, providing personalized recommendations. With Xiaomi TV+, access 150+ free live TV channels. Powered by a Quad Core A35 chip, the TV ensures smooth, responsive performance. The minimalistic remote offers effortless control. Redefine your home entertainment with the Mi A Series TV for an extraordinary, seamless viewing experience.", size: ['S', 'M', 'L', 'XL'] ,sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"TV",keyword:["xiaomiTV","Xiaomi", "SmartTV", "TV", "digitalTV"].join(' '),},
      { name: 'realme P1 5G (Peacock Green, 128 GB) (8 GB RAM)', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/b/n/-original-imahyuhfzvybhaat.jpeg?q=70', offerPrice: 20100, actualPrice: 30000, discount: "33", rating: 1, discription: "Handset, Adapter, USB Cable, Important Info Booklet with Warranty Card, Quick Guide, Sim Card Tool, Screen Protect Film, TPU Case", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false" ,type:"Phone",keyword:["realme" ,"SmartPhone", "SmartMobile", "Mobile", "AmoledDisplay","AmoledDisplayPhone" ,"AmoledDisplayMobile"].join(' '), },
      { name: 'BOSCH 9 kg Fully Automatic Front Load Washing Machine with In-built Heater White (WGA14200IN)', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/washing-machine-new/m/1/f/-original-imagu2rt8bmhhkys.jpeg?q=70', offerPrice: 38990, actualPrice: 47800, discount: "33", rating: 4, discription: "You can effortlessly manage all your laundry requirements with the MOTOROLA 10 kg Fully Automatic Front-loading Washing Machine. It comes equipped with temperature, water level, weight, door, foam level, and speed sensors, offering an ideal washing performance for each cycle. With Super Steam technology, this washing machine not only sanitises clothes by removing bacteria and viruses but also handles tough stains effectively. Moreover, this washing machines quick wash cycle, lasting up to 18 minutes, is ideal for swiftly cleaning small laundry loads.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"Electronics",keyword:["Smart", "SmartWashingMachine", "DigitalWashingMashine"].join(' '), },
      { name: 'Noise Thrive 1.85 smart watch', image: '../Smartwatch.webp', offerPrice: 2010, actualPrice: 3000, discount: "33", rating: 3.5, discription: "Featuring a unisex design, this Noise Thrive Smartwatch effortlessly blends style and functionality, appealing to both men and women. Sporting a sleek metallic finish, it adds a touch of sophistication to any outfit, making it a versatile accessory for various occasions. Courtesy of its compatibility with both Android and iOS devices, you can effortlessly sync this smartwatch with your preferred mobilephone operating system. Boasting a metallic finish, this smartwatch exudes a sophisticated look, elevating the overall aesthetic appeal if you are a tech-savvy individual.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"watch",keyword:["Smartwatch","digitalwatch" ,"handSmartWatch"].join(' '), },
      { name: 'vivo T2 Pro 5G (New Moon Black, 128 GB) (8 GB RAM) ', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/5/y/8/-original-imagtt4mhqrzjs9r.jpeg?q=70', offerPrice: 22999, actualPrice: 29999, discount: "33", rating: 4.5, discription: "The T2 Pro 5G smartphone features a 3D curved AMOLED screen providing a bright display with a peak brightness of 1300 nits. Improve your performance with the MediaTek Dimensity 7200 processor. Powered with a 64 MP main camera with OIS and a night camera with Aura Light, keep clicking stunning pictures all day and night. This smartphone is slim, lightweight and boasts a premium design with AG glass back cover. Available in 8 GB+8 GB RAM, and ROM fused together with an optimised algorithm, you can easily use around 27 apps simultaneously. Powered by a 4600 mAH large battery, you can quickly boost your phone’s charge with the 66 W Flash Charge.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"Phone",keyword:["Smartphone", "SmartMobile","Mobile", "vivophone", "vivomobile"].join(' '), },
      { name: 'Day and Date Functioning Steel Strap New Quartz Analog Watch - For Men LS2978', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/watch/2/d/p/-original-imagrgwwjpbf8zhg.jpeg?q=70', offerPrice: 3599, actualPrice: 5000, discount: "33", rating: 5, discription: "EDDY FASHION PRIVATE LIMITED Presents All New Collection of EDDY HAGER Watches. This Attractive Watch Comes With Working Day Date Feature. In This Watch You Will Get Stainless Steel Chain Which Easily Fit On Your Wrist And With Charming Olive Dial Which Highlights Your Personality. Wearing This Watch Will Help You To Discover The New Time. Thanks For Being A Part Of Eddy Fashion Private Limited We Take Care Of Your Precious Time.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"watch",keyword:["watch", "handwatch", "wristWatch" ,"MaleWatch", "malewristWatch" ,"Wrist Hand"].join(' '), },
      { name: 'Mi A Series 80 cm (32 inch) HD Ready LED Smart Google TV 2024 Edition', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/television/b/i/b/l32ma-ain-mi-original-imah2pgfzpg3zuys.jpeg?q=70', offerPrice: 49999, actualPrice:69999, discount: "33", rating: 2, discription: "Experience the Mi A Series TV, where stunning design meets exceptional performance. Its sleek metal frame and immersive fullscreen display offer captivating visuals. Enjoy high-quality 20W sound powered by Dolby Audio for an unparalleled audio experience. Google TV organizes movies, shows, and live TV from your apps and subscriptions, providing personalized recommendations. With Xiaomi TV+, access 150+ free live TV channels. Powered by a Quad Core A35 chip, the TV ensures smooth, responsive performance. The minimalistic remote offers effortless control. Redefine your home entertainment with the Mi A Series TV for an extraordinary, seamless viewing experience.", size: ['S', 'M', 'L', 'XL'] ,sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"TV",keyword:["xiaomiTV","Xiaomi", "SmartTV", "TV", "digitalTV"].join(' '),},
      { name: 'realme P1 5G (Peacock Green, 128 GB) (8 GB RAM)', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/b/n/-original-imahyuhfzvybhaat.jpeg?q=70', offerPrice: 20100, actualPrice: 30000, discount: "33", rating: 1, discription: "Handset, Adapter, USB Cable, Important Info Booklet with Warranty Card, Quick Guide, Sim Card Tool, Screen Protect Film, TPU Case", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false" ,type:"Phone",keyword:["realme" ,"SmartPhone", "SmartMobile", "Mobile", "AmoledDisplay","AmoledDisplayPhone" ,"AmoledDisplayMobile"].join(' '), },
      { name: 'BOSCH 9 kg Fully Automatic Front Load Washing Machine with In-built Heater White (WGA14200IN)', image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/washing-machine-new/m/1/f/-original-imagu2rt8bmhhkys.jpeg?q=70', offerPrice: 38990, actualPrice: 47800, discount: "33", rating: 4, discription: "You can effortlessly manage all your laundry requirements with the MOTOROLA 10 kg Fully Automatic Front-loading Washing Machine. It comes equipped with temperature, water level, weight, door, foam level, and speed sensors, offering an ideal washing performance for each cycle. With Super Steam technology, this washing machine not only sanitises clothes by removing bacteria and viruses but also handles tough stains effectively. Moreover, this washing machines quick wash cycle, lasting up to 18 minutes, is ideal for swiftly cleaning small laundry loads.", size: ['S', 'M', 'L', 'XL'],sideimg1:"https://rukminim2.flixcart.com/image/832/832/xif0q/watch/l/m/e/-original-imagz4hkqpmhh6gd.jpeg?q=70&crop=false", sideimg2:"https://rukminim2.flixcart.com/image/128/128/xif0q/watch/l/c/z/-original-imaghny5zgcpvwet.jpeg?q=70&crop=false", sideimg3:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/7/q/a/ls2978-limestone-original-imagf8assmvzdshh.jpeg?q=70&crop=false", sideimg4:"https://rukminim2.flixcart.com/image/128/128/kmax8y80/watch/l/a/m/ls2978-limestone-original-imagf8ascyfpkr9j.jpeg?q=70&crop=false",type:"Electronics",keyword:["Smart", "SmartWashingMachine", "DigitalWashingMashine"].join(' '), },
    ];

    return FlashProduct.insertMany(Flashproducts);
  })
  .then(() => {
    console.log('Products inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });
