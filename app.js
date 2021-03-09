//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const mongoose= require("mongoose");
const md5=require("md5");
let users=[];
var i;
const productquantity=[];

const items=[
  {
    id:1,
    name:"Colour Padded Chair",
    imgURL:"https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?cs=srgb&dl=pexels-eric-montanah-1350789.jpg&fm=jpg",
    cost: "399.00",
    material: "Fabric",
    color: "Orange , Green",
    dimensions: "65cm (W) x 73cm (D) x 75cm (H)",
    description: "This Modern Padded Chair with Striking legs and extra wooden support gives this Padded chair a sturdy look. Perfect for your dining area that likes a mix of modern and classic. The lightly padded seat and back keeps you comfortable and at ease. This handcrafted wooden dining chair is a must have for dining areas that like it stylish. ",
    weight: "5 kg",
    stock: "In stock.",
    review_name:["John Fud Zavacki","Angelina","Jess0548","Kj","AmyFen"],
    review_content:["This couch is exactly as pictured. The color is as listed, and the comfort rating in the product description is accurate. I think it's very comfortable.",
"It has now been a year. I am still totally in love with these chairs. I ended up getting a second chair and the ottoman. The ottoman is HUGE!!!! But it worked out great for our library/sitting area. The chairs have held up wonderfully and get used everyday by people and all the fur monsters.",
"This “46 in overstuffed chair has so far proven to be a solidly built, quality piece of furniture. The chair comes with a seat cushion and a back pillow cushion that have so far retained their shape. In many cases, these separate pieces tent to either settle or bunch within the first month of use. ",
"It’s bigger than you think. Probably bigger than you’re thinking after I said that. I’m a big dude, and the majority of my body will fit if I lye corner to corner.",
"A bit skeptical ordering without trying it out but, I absolutely love this chair. First, it is the perfect color for my formal living room - it's a light-medium grey. I'm a petite woman and I fit in the chair with my 7yo and 2 shi-tzus :-)."]
  },
  {
    id:2,
    name:"Bistro Chair",
    imgURL:"https://image.freepik.com/free-photo/blue-white-chair_1203-2058.jpg",
    cost: " 215.00",
    material: "Fabric Cushion" ,
    color: "Blue and White",
    dimensions: "40 cm (L) x 42 cm (W) x 87cm (H)",
    description: "Bring an Element of Class to your dining room with these Bistro-dining chairs. The classic styling fits well with traditional decor schemes, while the minimalist look blends seamlessly with contemporary decorative furnishings. The wood construction provides stability with a 250-pound weight limit that can accommodate most guests.",
    weight: "4.25 kg",
    stock: "Only 1 left in stock.",
    review_name:["Kelly Madds", "Angela Kate", "Toya Hall", "Eric Nirschel","Nil805"],
    review_content:["Very Good Chair!! Very much liked it..","Awesome Chair! giving 5 stars for its appearance.","I really love the chair but giving less stars due to poor packing and did'nt gave any instruction manual to assemble the chair.","Poor product will not recommend to anyone.","This chair is very comfy but it has one drawback that stiching of the fabric is visually seaable." ]

  },
  {
    id:3,
    name:"Wingback Chair",
    imgURL:"https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?cs=srgb&dl=pexels-dmitry-zvolskiy-2082090.jpg&fm=jpg",
    cost: "1499.00",
    material: "Velvet" ,
    color: "Grey",
    dimensions: "85cm (L) x 87cm (W) x 92cm (H)",
    description: "A fabulous focal point for your room that combines charming style and superior comfort. This stunning high back wing chair is timeless yet so of-the-now, with its sensually curved design and spotlight on snugness. Nestle it in a cozy nook, grab a hot chocolate, and curl up contentedly, knowing you're interior-style-savvy. ",
    weight: "6.75 kg",
    stock: "Only 2 left in stock.",
    review_name:["Sabby J.","Jgeet420","Mike Shin.","Jayz_120","Carl Grimes"],
    review_content:["This chair is lit. It enhances your living room experience.","I love this product. Firstly i was scared to buy chair online but it was way beyond my expectation.","The product scales the description of the package.","Defective Piece. They gave me a defective chair with holes in every corner of it. If you are seeing this review please dont buy it.","This chair is legit!!, I have an XBOX, I  play comfortably without aching my back. Good Product for price range."]

  },
  {
    id:4,
    name:"Wooden Lounger",
    imgURL:"https://images.pexels.com/photos/106839/pexels-photo-106839.jpeg?cs=srgb&dl=pexels-mike-106839.jpg&fm=jpg",
    cost: "155.00",
    material: "Textile" ,
    color: "White",
    dimensions: "149cm (W) x 60cm (D) x 55cm (H)",
    description: "When you are outdoors with friends or with your family. You always want to have such comfortable and stylish outdoor furniture. Our LOKATSE HOME store will create a high quality, stylish and comfortable home brand. ",
    weight: "2.5 kg",
    stock: "Only 3 left in stock.",
    review_name:["Kelly Madds", "Angela Kate", "Toya Hall", "Eric Nirschel","Nil805"],
    review_content:["Very Good Chair!! Very much liked it..","Awesome Chair! giving 5 stars for its appearance.","I really love the chair but giving less stars due to poor packing and did'nt gave any instruction manual to assemble the chair.","Poor product will not recommend to anyone.","This chair is very comfy but it has one drawback that stiching of the fabric is visually seaable." ]

  },
  {
    id:5,
    name:"Rolling Armchair",
    imgURL:"https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?cs=srgb&dl=pexels-lisa-fotios-1957478.jpg&fm=jpg",
    cost: "279.00",
    material:  "Cushion",
    color: "Creme",
    dimensions:"53cm (W) x 52cm (D) x 80cm (H)",
    description: "Give your desk a glamorous seating spot with this distinctive vanity chair, sure to stand out as it pulled up to your make up desk. Founded atop five wheels for easy mobility, its adjustable height base is crafted from iron and features a beautiful white finish for metallic appeal. Up top, its mid-back seat offers a shaggy faux fur design over a metal frame and foam padding for added comfort. ",
    weight: "12.52 kg ",
    stock: "In stock.",
    review_name:["Yudmelys","Stan Delahoydei","jcf","Sandra Hall Flavin","ganesan"],
    review_content:["The chair came damaged I hope they solve me because I pay for a new item that is not damaged ",
"Have an extra long chair that I bought back in 1972. Had been looking for a new one for for a very long time. This one is great. ",
"Easy to wash used as a quick cover for ugly old chair these covers were an inexpensive fix until our new chair came in",
"This chair isn't bad looking, but it has to be tucked in again whenever someone sits on the chair.",
"I got large size attached photos and using more than a week so good so far and sometimes the cover is moving but it fits correctly all the edges, since it has elastic it fits good and now it's easy to clean & wash.Any doubt ask questions."]

  },
  {
    id:6,
    name:"Genoa Wing Chair",
    imgURL:"https://image.freepik.com/free-photo/blue-chair-room_53876-88595.jpg",
    cost: "819.00",
    material: "Stuffed Fabric" ,
    color: "Blue",
    dimensions:"82cm (W) x 85cm (D) x 86cm (H)",
    description: "This wingback chair cover is made of durable premium fabric. Our sofa covers can protect your furniture from pet scratches, pet hair, daily damage and stains. The advanced color lock process makes our wingback cover not easy to fade and has a longer use. An ideal low-cost and high-efficiency choice for refreshing your old furniture. ",
    weight: "25 kg",
    stock: "In stock.",
    review_name: ["John Fud Zavacki","Angelina","Jess0548","Kj","AmyFen"],
    review_content:["I recently moved to a third floor apartment. There was no way my old chair would fit up the stairs It was too wide. So I ordered this bad boy- NICE! Firm, but comfy, super easy to assemble.",
"I'm very happy with this sofa especially for the price. It's comfortable, a little on the hard side, but that makes it easier to get up. I have a small living room and this chair is the perfect size. It arrived almost 2 weeks early and was set up in no time. ",
"So this chair came a week before it was suppose to so that a plus for me it took me about 15-20mins to assemble and its sturdy. I love the color",
"It was very easy to assemble. The chair is firm but not hard. It’s also pretty easy to bring in my house since it’s not that heavy.",
"Product is defective. I was sent a return shipping label for which I was being charged $300 to return ship. This is completely unacceptable. Do not purchase."]

  },
  {
    id:7,
    name:"Studio Chair",
    imgURL:"https://image.freepik.com/free-photo/comfy-wing-chair-carpenter-s-workshop_181624-25989.jpg",
    cost: "121.00",
    material: "Fabric" ,
    color: "Dark Grey",
    dimensions: "65cm (W) x 73cm (D) x 75cm (H)",
    description: "The Black crest studio chair by Studio Designs features a thick, contoured Seat and backrest for added form-fitting support. The striking combination of Tufted, Black vinyl with a chrome base, make it the perfect modern seating option for your studio. ",
    weight: "4 kg",
    stock: "Only 1 left in stock.",
    review_name:["Melissa","Shannon","James Choma","sjk","Tracy Elliott"],
    review_content:["This chair is exactly as pictured. The color is as listed, and the comfort rating in the product description is accurate. I think it's very comfortable.",
"It has now been a year. I am still totally in love with these chairs. I ended up getting a second chair and the ottoman. The ottoman is HUGE!!!! But it worked out great for our library/sitting area. The chairs have held up wonderfully and get used everyday by people and all the fur monsters.",
"This “46 in overstuffed chair has so far proven to be a solidly built, quality piece of furniture. The chair comes with a seat cushion and a back pillow cushion that have so far retained their shape. In many cases, these separate pieces tent to either settle or bunch within the first month of use. ",
"It’s bigger than you think. Probably bigger than you’re thinking after I said that. I’m a big dude, and the majority of my body will fit if I lye corner to corner.",
"A bit skeptical ordering without trying it out but, I absolutely love this chair. First, it is the perfect color for my formal living room - it's a light-medium grey. I'm a petite woman and I fit in the chair with my 7yo and 2 shi-tzus :-)."]

  },
  {
    id:8,
    name:"Egg Leather Chair",
    imgURL:"https://image.freepik.com/free-photo/modern-leather-armchair-studio_23-2148422265.jpg",
    cost: "1,419.00",
    material: "Leather" ,
    color: "Brown",
    dimensions: "83cm (L) x 77cm (W) x 82cm (H)",
    description: "This button-tufted leather Egg chair in dark gray leather combines contemporary flair and comfort with sturdy materials and construction. Spruce up any room with this eye-catching accent. ",
    weight: "13.05 kg",
    stock: "In stock.",
    review_name:["Manuel E. Moncada Jr.","ES","Mayya","JOSL BKLYN","Micah Renee"],
    review_content:["Great chair! Large enough to seat three people. The bottom cushions are rather firm, which I’m fine with. The back cushions are comfy.",
"We received our couch a few days early, which is great! Unfortunately, it didn’t come with any legs.Not the greatest, but what can you expect?",
"I have a studio apartment,It’s awesome, great for small spaces, easy to assemble, comfortable, beautiful, and I use sometimes to sleep :)",
"I got this chair today. I realize it's inexpensive but it fell apart as soon as I got it. There's something wrong with one of the back legs. When I screw the bolt in the leg just falls right off. ",
"Took a while to realize the cushions and hardware are zipped into the bottom of the couch base... Excited to put it together though."]


  },
  {
    id:9,
    name:"Desk Chair",
    imgURL:"https://image.freepik.com/free-photo/office-chair_1203-2719.jpg",
    cost: "279.00",
    material: "Stuffed Leather" ,
    color: "Purple",
    dimensions: "48 cm (L) x 48 cm (W) x 99cm (H)",
    description: "Soft and breathable fabric is durable and long lasting,also soft to the touch allow you to have an excellent comfortable experience. Dual-wheel casters for 360° free rolling, easy mobility around the room Ideal for home office, dorm room or professional workspaces. ",
    weight: "7 kg",
    stock: "In stock.",
    review_name:["Kelly Madds", "Angela Kate", "Toya Hall", "Eric Nirschel","Nil805"],
    review_content:["Very Good Chair!! Very much liked it..","Awesome Chair! giving 5 stars for its appearance.","I really love the chair but giving less stars due to poor packing and did'nt gave any instruction manual to assemble the chair.","Poor product will not recommend to anyone.","This chair is very comfy but it has one drawback that stiching of the fabric is visually seaable." ]

  },
  {
    id:10,
    name:"Windsor Chair",
    imgURL:"https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?cs=srgb&dl=pexels-hormel-2762247.jpg&fm=jpg",
    cost: "180.00",
    material: "Teawood" ,
    color: "Black",
    dimensions: "78 cm (L) x 74 cm (W) x 80cm (H)",
    description: "Mid-century modern and contemporary but can blend into any design providing an inviting centerpiece for your guests. Plush upholstered seat and back are accented by a sturdy walnut shell. Solid walnut wood finish for durability and longevity. Great for kitchen, dining, home office spaces, commercial settings or any living space in your home ",
    weight: "3.2 kg",
    stock: "In stock on Jan 20, 2021.",
    review_name:["Melissa","Shannon","James Choma","sjk","Tracy Elliott"],
    review_content:["This chair is exactly as pictured. The color is as listed, and the comfort rating in the product description is accurate. I think it's very comfortable.",
"It has now been a year. I am still totally in love with these chairs. I ended up getting a second chair and the ottoman. The ottoman is HUGE!!!! But it worked out great for our library/sitting area. The chairs have held up wonderfully and get used everyday by people and all the fur monsters.",
"This “46 in overstuffed chair has so far proven to be a solidly built, quality piece of furniture. The chair comes with a seat cushion and a back pillow cushion that have so far retained their shape. In many cases, these separate pieces tent to either settle or bunch within the first month of use. ",
"It’s bigger than you think. Probably bigger than you’re thinking after I said that. I’m a big dude, and the majority of my body will fit if I lye corner to corner.",
"A bit skeptical ordering without trying it out but, I absolutely love this chair. First, it is the perfect color for my formal living room - it's a light-medium grey. I'm a petite woman and I fit in the chair with my 7yo and 2 shi-tzus :-)."]



  }

];

const sofa_items=[
  {
    id:11,
    name:"2 Seater Blue Sofa with Teawood Frame",
    imgURL:"https://image.freepik.com/free-photo/comfortable-pillow-sofa_74190-10005.jpg",
    cost: "189.00",
    material: "Acrylic Fabric",
    color: "Blue",
    dimensions: "165.1cm (W) x 71.52cm (D) x 45cm (H)",
    description: "Febonic range of sofa set brings impeccable aesthetics and design value to your interiors. It is made with finest fabric and takes hours of craftsmanship before we ship it to our beloved customers. Mid Century Modern is a throwback to the design style of mid 50s and 60s, its minimalist design style is fuss free and its key design influences are splayed legs, geometric graphic patterns, natural organic shapes, mixed elements and contrasting textures. No ornate furnishings and excessive decoration for this distinct vintage style.",
    weight: "15 kg",
    stock: "In stock.",
    review_name:["John Fud Zavacki","Angelina","Jess0548","Kj","AmyFen"],
    review_content:["I recently moved to a third floor apartment. There was no way my old couch would fit up the stairs It was too wide. So I ordered this bad boy- NICE! Firm, but comfy, super easy to assemble.",
"I'm very happy with this couch especially for the price. It's comfortable, a little on the hard side, but that makes it easier to get up. I have a small living room and this couch is the perfect size. It arrived almost 2 weeks early and was set up in no time. ",
"So this couch came a week before it was suppose to so that a plus for me it took me about 15-20mins to assemble and its sturdy. I love the color",
"It was very easy to assemble. The couch is firm but not hard. It’s also pretty easy to bring in my house since it’s not that heavy.",
"Product is defective. I was sent a return shipping label for which I was being charged $300 to return ship. This is completely unacceptable. Do not purchase."]
  },
  {
    id:12,
    name:"2.5 Seater Tuxedo Blue Sofa",
    imgURL:"https://image.freepik.com/free-photo/decoration-livingroom-interior_74190-5758.jpg",
    cost: "215.00",
    material: "Fabric Cushion with Timber Frame" ,
    color: "Blue and White",
    dimensions: "40 cm (L) x 42 cm (W) x 87cm (H)",
    description: "Bring an Element of Class to your dining room with these Bistro-dining chairs. The classic styling fits well with traditional decor schemes, while the minimalist look blends seamlessly with contemporary decorative furnishings. The wood construction provides stability with a 250-pound weight limit that can accommodate most guests.",
    weight: "14.25 kg",
    stock: "Only 1 left in stock.",
    review_name:["Manuel E. Moncada Jr.","ES","Mayya","JOSL BKLYN","Micah Renee"],
    review_content:["Great sofa! Large enough to seat three people. The bottom cushions are rather firm, which I’m fine with. The back cushions are comfy.",
"We received our couch a few days early, which is great! Unfortunately, it didn’t come with any legs.Not the greatest, but what can you expect?",
"I have a studio apartment,It’s awesome, great for small spaces, easy to assemble, comfortable, beautiful, and I use sometimes to sleep :)",
"I got this sofa today. I realize it's inexpensive but it fell apart as soon as I got it. There's something wrong with one of the back legs. When I screw the bolt in the leg just falls right off. ",
"Took a while to realize the cushions and hardware are zipped into the bottom of the couch base... Excited to put it together though."]
  },
  {
    id:13,
    name:"2.5 Seater Lady Bug Blue Sofa",
    imgURL:"https://cdn.pixabay.com/photo/2017/08/06/15/44/house-2593570_1280.jpg",
    cost: "499.00",
    material: "Acrylic Fabric" ,
    color: "Blue",
    dimensions: "85cm (L) x 87cm (W) x 92cm (H)",
    description: "A fabulous focal point for your room that combines charming style and superior comfort. This stunning high back wing chair is timeless yet so of-the-now, with its sensually curved design and spotlight on snugness. Nestle it in a cozy nook, grab a hot chocolate, and curl up contentedly, knowing you're interior-style-savvy. ",
    weight: "16.75 kg",
    stock: "Only 2 left in stock.",
    review_name:["Yudmelys","Stan Delahoydei","jcf","Sandra Hall Flavin","ganesan"],
    review_content:["The sofa came damaged I hope they solve me because I pay for a new item that is not damaged ",
"Have an extra long couch that I bought back in 1972. Had been looking for a new one for for a very long time. This one is great. ",
"Easy to wash used as a quick cover for ugly old sofas these covers were an inexpensive fix until our new sofas came in",
"This sofa isn't bad looking, but it has to be tucked in again whenever someone sits on the chair.",
"I got large size attached photos and using more than a week so good so far and sometimes the cover is moving but it fits correctly all the edges, since it has elastic it fits good and now it's easy to clean & wash.Any doubt ask questions."]
  },
  {
    id:14,
    name:"Indoor Resort-Style Barwon Sofa",
    imgURL:"https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cost: "350.00",
    material: "PU " ,
    color: "Black and Creme",
    dimensions: "149cm (W) x 60cm (D) x 55cm (H)",
    description: "When you are outdoors with friends or with your family. You always want to have such comfortable and stylish outdoor furniture. Our LOKATSE HOME store will create a high quality, stylish and comfortable home brand. ",
    weight: "22.5 kg",
    stock: "Only 3 left in stock.",
    review_name:["CharleenL","kerry pence","Claire Landry","Sandra","Benjamin Block"],
    review_content:["This sofa cover is very soft, stretchy and comfortable. I got it in balck creme color to match my furnitures in the living room. It completely cover the back and arms of my sofa.",
"I really love the color, it matches really well, it also fits almost perfectly. I wish there were directions to install it but it's pretty self explanatory from looking at te reviews.",
"This cover is soft, stretchy, and great quality! We prefer using sofa covers because we have a toddler. This is a great way to protect our sofa from my son’s grubby paws!",
"The cover was too small for my sofa. I double checked the dimensions and mine is within the ones advertised.",
"Very nice!"]
  },
  {
    id:15,
    name:"English Rolled Arm Sofa",
    imgURL:"https://image.freepik.com/free-photo/pillow-sofa-decoration-interior-living-room-area_74190-12634.jpg",
    cost: "279.00",
    material:  "Cushion",
    color: "Brown",
    dimensions:"53cm (W) x 52cm (D) x 80cm (H)",
    description: "Give your desk a glamorous seating spot with this distinctive vanity chair, sure to stand out as it pulled up to your make up desk. Founded atop five wheels for easy mobility, its adjustable height base is crafted from iron and features a beautiful white finish for metallic appeal. Up top, its mid-back seat offers a shaggy faux fur design over a metal frame and foam padding for added comfort. ",
    weight: "12.52 kg ",
    stock: "In stock.",
    review_name:["Melissa","Shannon","James Choma","sjk","Tracy Elliott"],
    review_content:["This couch is exactly as pictured. The color is as listed, and the comfort rating in the product description is accurate. I think it's very comfortable.",
"It has now been a year. I am still totally in love with these chairs. I ended up getting a second chair and the ottoman. The ottoman is HUGE!!!! But it worked out great for our library/sitting area. The chairs have held up wonderfully and get used everyday by people and all the fur monsters.",
"This “46 in overstuffed chair has so far proven to be a solidly built, quality piece of furniture. The chair comes with a seat cushion and a back pillow cushion that have so far retained their shape. In many cases, these separate pieces tent to either settle or bunch within the first month of use. ",
"It’s bigger than you think. Probably bigger than you’re thinking after I said that. I’m a big dude, and the majority of my body will fit if I lye corner to corner.",
"A bit skeptical ordering without trying it out but, I absolutely love this chair. First, it is the perfect color for my formal living room - it's a light-medium grey. I'm a petite woman and I fit in the chair with my 7yo and 2 shi-tzus :-)."]
  },
  {
    id:16,
    name:"Melrose Chaise Sofa",
    imgURL:"https://image.freepik.com/free-photo/modern-living-room-interior-background-dark-wall-scandinavian-style-3d-illustration-3d-rendering_208753-98.jpg",
    cost: "819.00",
    material: "Stuffed Fabric" ,
    color: "Black",
    dimensions:"82cm (W) x 85cm (D) x 86cm (H)",
    description: "This wingback chair cover is made of durable premium fabric. Our sofa covers can protect your furniture from pet scratches, pet hair, daily damage and stains. The advanced color lock process makes our wingback cover not easy to fade and has a longer use. An ideal low-cost and high-efficiency choice for refreshing your old furniture. ",
    weight: "25 kg",
    stock: "In stock.",
    review_name:["Zach Fischer", "Legitpotato", "Pat","LuAnne Featherstone","MayK"],
    review_content:["Great little sofa set for the money. Arrived 3 days early. Slightly smaller than I expected but the perfect size for my apartment. Sturdy, sleek, and very lightweight due to the metal legs. This will be very easy to clean/vacuum around.",
"This set is so beautiful, I’m so in love! This black navy blue looks so professional and slick i can’t stop looking at it. The cushions are very nice also, but you can tell the stitching isn’t expensively made but it still looks great and doesn’t alter the review.",
"Definitely smaller than I thought even after looking at some of the pictures but that’s not an issue, especially living as a single male in an apartment. My issue was that one of the cushions I received arrived all crumpled up in one corner.Also one of the screws needed to mount the seat was completely stripped and they didn’t have any extra ones. I hope they send a replacement cushion and extra screws so I can update my 1 star review.",
"I'm so upset I received the sofaa but no cushions!!!!!","The sofa itself is very attractive. I love the black backing with the fabric top. However, I hate the cushions. I thought that they would be a padded pleather seat but it really is more like a pleather slipcover over a metal frame. You can still feel the frame of the sofa through the pleather on both the back and the seat. It's not comfortable at all."]
  },
  {
    id:17,
    name:"Linen Blend Slip Wash Sofa",
    imgURL:"https://image.freepik.com/free-photo/horizontal-blank-poster-frames-gray-wall-mockup-modern-luxury-interior-design-with-dark-blue-sofa_180507-451.jpg",
    cost: "221.00",
    material: "Linen and Velvet" ,
    color: "Dark Blue",
    dimensions: "65cm (W) x 73cm (D) x 75cm (H)",
    description: "The Black crest studio chair by Studio Designs features a thick, contoured Seat and backrest for added form-fitting support. The striking combination of Tufted, Black vinyl with a chrome base, make it the perfect modern seating option for your studio. ",
    weight: "14 kg",
    stock: "Only 1 left in stock.",
    review_name:["John Fud Zavacki","Angelina","Jess0548","Kj","AmyFen"],
    review_content:["I recently moved to a third floor apartment. There was no way my old couch would fit up the stairs It was too wide. So I ordered this bad boy- NICE! Firm, but comfy, super easy to assemble.",
"I'm very happy with this couch especially for the price. It's comfortable, a little on the hard side, but that makes it easier to get up. I have a small living room and this couch is the perfect size. It arrived almost 2 weeks early and was set up in no time. ",
"So this couch came a week before it was suppose to so that a plus for me it took me about 15-20mins to assemble and its sturdy. I love the color",
"It was very easy to assemble. The couch is firm but not hard. It’s also pretty easy to bring in my house since it’s not that heavy.",
"Product is defective. I was sent a return shipping label for which I was being charged $300 to return ship. This is completely unacceptable. Do not purchase."]
  },
  {
    id:18,
    name:"Modern styled ChesterField Sofaa",
    imgURL:"https://image.freepik.com/free-photo/modern-fashionable-red-leather-couch-with-cushions-cropped-christmas-tree-brick-wall-loft-design_132075-6153.jpg",
    cost: "519.00",
    material: "Leather" ,
    color: "Orange Brown",
    dimensions: "83cm (L) x 77cm (W) x 82cm (H)",
    description: "This button-tufted leather Egg chair in dark gray leather combines contemporary flair and comfort with sturdy materials and construction. Spruce up any room with this eye-catching accent. ",
    weight: "13.05 kg",
    stock: "In stock.",
    review_name:["TheCabinCoder","lexii","E. Fox","Neeners503","Veronika Khanisenko"],
    review_content:["Great sofa! Large enough to seat three people. The bottom cushions are rather firm, which I’m fine with. The back cushions are comfy.",
"We received our couch a few days early, which is great! Unfortunately, it didn’t come with any legs.Not the greatest, but what can you expect?",
"I have a studio apartment,It’s awesome, great for small spaces, easy to assemble, comfortable, beautiful, and I use sometimes to sleep :)",
"I got this sofa today. I realize it's inexpensive but it fell apart as soon as I got it. There's something wrong with one of the back legs. When I screw the bolt in the leg just falls right off. ",
"Took a while to realize the cushions and hardware are zipped into the bottom of the couch base... Excited to put it together though."]
  },
  {
    id:19,
    name:"ChesterField Creme ",
    imgURL:"https://image.freepik.com/free-photo/front-view-modern-living-room_23-2148369613.jpg",
    cost: "679.00",
    material: "Velvet" ,
    color: "Creme",
    dimensions: "48 cm (L) x 48 cm (W) x 99cm (H)",
    description: "Soft and breathable fabric is durable and long lasting,also soft to the touch allow you to have an excellent comfortable experience. Dual-wheel casters for 360° free rolling, easy mobility around the room Ideal for home office, dorm room or professional workspaces. ",
    weight: "17 kg",
    stock: "In stock.",
    review_name:["Yudmelys","Stan Delahoydei","jcf","Sandra Hall Flavin","ganesan"],
    review_content:["The sofa came damaged I hope they solve me because I pay for a new item that is not damaged ",
"Have an extra long couch that I bought back in 1972. Had been looking for a new one for for a very long time. This one is great. ",
"Easy to wash used as a quick cover for ugly old sofas these covers were an inexpensive fix until our new sofas came in",
"This sofa isn't bad looking, but it has to be tucked in again whenever someone sits on the chair.",
"I got large size attached photos and using more than a week so good so far and sometimes the cover is moving but it fits correctly all the edges, since it has elastic it fits good and now it's easy to clean & wash.Any doubt ask questions."]
  },
  {
    id:20,
    name:"Scandinavian Sofaa",
    imgURL:"https://image.freepik.com/free-psd/minimal-living-room-with-classic-sofa-carpet-interior-design-ideas_176382-1531.jpg",
    cost: "780.00",
    material: "Woolen" ,
    color: "Creme",
    dimensions: "78 cm (L) x 74 cm (W) x 80cm (H)",
    description: "Mid-century modern and contemporary but can blend into any design providing an inviting centerpiece for your guests. Plush upholstered seat and back are accented by a sturdy walnut shell. Solid walnut wood finish for durability and longevity. Great for kitchen, dining, home office spaces, commercial settings or any living space in your home ",
    weight: "23.2 kg",
    stock: "In stock on Jan 20, 2021.",
    review_name:["Kelly Madds", "Angela Kate", "Toya Hall", "Eric Nirschel","Nil805"],
    review_content:["Very Good Sofa!! Very much liked it..","Awesome sofa! giving 5 stars for its appearance.","I really love the sofa but giving less stars due to poor packing and did'nt gave any instruction manual to assemble the sofa.","Poor product will not recommend to anyone.","This sofa is very comfy but it has one drawback that stiching of the fabric is visually seaable." ]

  },
  {
    id:201,
    name:"Bridgewater Sofaa",
    imgURL:"https://images.pexels.com/photos/5998023/pexels-photo-5998023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cost: "680.00",
    material: "Fabric" ,
    color: "Whitish Grey",
    dimensions: "78 cm (L) x 74 cm (W) x 80cm (H)",
    description: "Mid-century modern and contemporary but can blend into any design providing an inviting centerpiece for your guests. Plush upholstered seat and back are accented by a sturdy walnut shell. Solid walnut wood finish for durability and longevity. Great for kitchen, dining, home office spaces, commercial settings or any living space in your home ",
    weight: "22.2 kg",
    stock: "Only 1 left in stock.",
    review_name:["Sabby J.","Jgeet420","Mike Shin.","Jayz_120","Carl Grimes"],
    review_content:["This sofaa is lit. It enhances your living room experience.","I love this product. Firstly i was scared to buy sofa online but it was way beyond my expectation.","The product scales the description of the package.","Defective Piece. They gave me a defective sofa with holes in every corner of it. If you are seeing this review please dont buy it.","This sofa is legit!!, I have an XBOX, me and my friends now can play comfortably without aching our hips. Good Product for price range."]
  }
];


const table_items=[
  {
    id:21,
    name:"Round Wooden Table",
    imgURL:"https://images.pexels.com/photos/1668860/pexels-photo-1668860.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cost: "189.00",
    material: "Wood",
    color: "Brown",
    dimensions: "165.1cm (W) x 71.52cm (D) x 45cm (H)",
    description: "Febonic range of sofa set brings impeccable aesthetics and design value to your interiors. It is made with finest fabric and takes hours of craftsmanship before we ship it to our beloved customers. Mid Century Modern is a throwback to the design style of mid 50s and 60s, its minimalist design style is fuss free and its key design influences are splayed legs, geometric graphic patterns, natural organic shapes, mixed elements and contrasting textures. No ornate furnishings and excessive decoration for this distinct vintage style.",
    weight: "3 kg",
    stock: "In stock.",
    review_name:["Sabby J.","Jgeet420","Mike Shin.","Jayz_120","Carl Grimes"],
    review_content:["Good one under $200, review after using a week.", "Table feels very polished","Love the shape, thickness and look of the log tables. Its was on my list since a long time.","Very beautiful table , just be careful with the size as it has very big size options. Looks good. It's just that the colour isn't as vibrant as the picture. But yet looks good."," Not happy with the product, need to return it and seek a refund."]
  },
  {
    id:22,
    name:"6 Seater Dining Table",
    imgURL:"https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cost: "215.00",
    material: "Timber Wood" ,
    color: "Brown",
    dimensions: "40 cm (L) x 42 cm (W) x 87cm (H)",
    description: "Bring an Element of Class to your dining room with these Bistro-dining chairs. The classic styling fits well with traditional decor schemes, while the minimalist look blends seamlessly with contemporary decorative furnishings. The wood construction provides stability with a 250-pound weight limit that can accommodate most guests.",
    weight: "10 kg",
    stock: "Only 1 left in stock.",
    review_name:["Kelly Madds", "Angela Kate", "Toya Hall", "Eric Nirschel","Nil805"],
    review_content:["Perfect for 6! , but the quality of wood seems very light. Will not recommend to buy.","Assembly was fool proof. I put this together in 45 minutes by myself with the help of my 3 year old son. It looks amazing and its much bigger than i assumed. ","Worst purchase ever! 2 screws wouldn't screw because the caps inside the legs that the screw screws into to tighten it were missing. And 1 hole was too high","The set would probably be good quality, if they remembered to ship the whole thing. Best Choice Products apparently had no tables in stock, so they just shipped me the chairs and hoped I wouldn't notice.","beautiful beautiful beautiful. I received BOTH packages. However, one part had an issue with the threading in a hole in the chair but they sent me a replacement. I love this table."]
  },
  {
    id:23,
    name:"6 Seater rectangular Dining Table",
    imgURL:"https://images.pexels.com/photos/238377/pexels-photo-238377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    cost: "499.00",
    material: "Acrylic Fabric" ,
    color: "Blue",
    dimensions: "85cm (L) x 87cm (W) x 92cm (H)",
    description: "A fabulous focal point for your room that combines charming style and superior comfort. This stunning high back wing chair is timeless yet so of-the-now, with its sensually curved design and spotlight on snugness. Nestle it in a cozy nook, grab a hot chocolate, and curl up contentedly, knowing you're interior-style-savvy. ",
    weight: "16.75 kg",
    stock: "Only 2 left in stock.",
    review_name:["Zach Fischer", "Legitpotato", "Pat","LuAnne Featherstone","MayK"],
    review_content:["I’m pretty happy with these chairs. They are exactly like on the website pictures. The plush seats aren’t too soft but very comfortable.",
"I would love to give this table and chair set 5 stars, but there are a few things I think should be addressed. Over all I think this is a very cute and well made set. I love the design! ",
"This is a sturdy and beautiful dining table and chairs! Invest in this table as it will last! I already own the Svan highchair for my grandkids and now this table and I know I've made a great investment!",
"Got my product in the correct time, but it was the wrong product. It was the table and chairs in the wrong color. By the time I realized it, the kids already had it put together and I'm not about to take it apart to send it back.",
"The set arrived quickly. It is a simple design and easy to assemble. The finished product is sturdy and attractive." ]
  },
  {
    id:24,
    name:"Metal Tabletops",
    imgURL:"https://homestratosphere.s3.amazonaws.com/wp-content/uploads/2014/12/steeltoptable-870x870.jpeg",
    cost: "350.00",
    material: "PU " ,
    color: "Black",
    dimensions: "149cm (W) x 60cm (D) x 55cm (H)",
    description: "When you are outdoors with friends or with your family. You always want to have such comfortable and stylish outdoor furniture. Our LOKATSE HOME store will create a high quality, stylish and comfortable home brand. ",
    weight: "12.5 kg",
    stock: "Only 3 left in stock.",
    review_name:["TheCabinCoder","lexii","E. Fox","Neeners503","Veronika Khanisenko"],
    review_content:["Love the table and all for 350 bucks. It feels very sturdy and assembly took about 10-15 mins. The color is a deep black glossy black so it goes well with the rest of the furniture. Other places sell for twice the price so if u can get this at under 300 it’s a steal! ",
"Okay so this product came in completely undamaged. My one and only complain was the screwscame lose and the top of the table came away from the legs. Easy fit honestly just re screwed the legs back on in a different spot(no pilot hole needed).So easy to put together after that!, Definitely love this table and it brings in much needed brightness to the room!",
"This is a very good looking side table for a budget price. This piece was less expensive than a lot of similar-looking pieces at discount stores, and it does what it is supposed to do (be a table and not fall over). The glass is thick and nice, and the base was pretty easy to put together and is a matte blackish color.",
"I love this table, it's larger than I expected. The quality is great for the price, its comparable to one I wanted from West Elm without the huge price tag which is always a plus.Everything arrived in perfect a condition without a scratch packaging was very good inspite of the box.",
"This is almost half the price of the same thing on other websites and same quality. Nice and sturdy. Thick heavy tempered glass - I'm not worried about it breaking. Table moves easily and smoothly across my rug. Nice and stable. Super easy to put together." ]
  },
  {
    id:25,
    name:"Modern Aesthetc Table",
    imgURL:"https://homestratosphere.s3.amazonaws.com/wp-content/uploads/2014/12/moderntable1-870x870.jpg",
    cost: "279.00",
    material:  "Cushion",
    color: "Brown",
    dimensions:"53cm (W) x 52cm (D) x 80cm (H)",
    description: "Give your desk a glamorous seating spot with this distinctive vanity chair, sure to stand out as it pulled up to your make up desk. Founded atop five wheels for easy mobility, its adjustable height base is crafted from iron and features a beautiful white finish for metallic appeal. Up top, its mid-back seat offers a shaggy faux fur design over a metal frame and foam padding for added comfort. ",
    weight: "12.52 kg ",
    stock: "In stock.",
    review_name:["Katie McGowan","Lauren","Fred B","Crys","Rdub17"],
    review_content:["Great little dining set for the money. Arrived 3 days early. Slightly smaller than I expected but the perfect size for my apartment. Sturdy, sleek, and very lightweight due to the metal legs. This will be very easy to clean/vacuum around.",
"This set is so beautiful, I’m so in love! The black table top is black glass and looks so professional and slick i can’t stop looking at it. The chairs are very nice also, but you can tell the stitching isn’t expensively made but it still looks great and doesn’t alter the review.",
"Definitely smaller than I thought even after looking at some of the pictures but that’s not an issue, especially living as a single male in an apartment. My issue was that one of the cushions I received arrived all crumpled up in one corner.Also one of the screws needed to mount the seat was completely stripped and they didn’t have any extra ones. I hope they send a replacement cushion and extra screws so I can update my 1 star review.",
"I'm so upset I received the table but no chair's!!!!!","The table itself is very attractive. I love the black backing with the glass table top. However, I hate the chairs. I thought that they would be a padded pleather seat but it really is more like a pleather slipcover over a metal frame. You can still feel the frame of the chair through the pleather on both the back and the seat. It's not comfortable at all."]
  }


]


const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_ID,{useNewUrlParser:true, useUnifiedTopology: true});


const userSchema=new mongoose.Schema({
  email: String,
  password: String
});

const User=new mongoose.model("User", userSchema);

app.get("/",function(req,res){
  res.render("home");
})

app.get("/contact",function(req,res){
  res.render("contact");
})

app.get("/signup",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.get("/register",function(req,res){
  res.sendFile(__dirname+"/register.html");
})
app.get("/shop",function(req,res){
  res.sendFile(__dirname+"/shop.html");
})
app.get("/shop-chair",function(req,res){
  res.render("shop-chair");
})
app.get("/buy-chair",function(req,res){
  res.render("buy-chair");
})
app.get("/shop-sofa",function(req,res){
  res.render("shop-sofa");
})
app.get("/shop-table",function(req,res){
  res.render("shop-table");
})
app.get("/chair-detail",function(req,res){
  res.render("chair-detail");
})

app.get("/add-cart/:id",function(req,res){
  const reqid= req.params.id;
  res.render("add-cart");
})


app.get("/shop-chair/:chairId", function(req, res){
const requestedPostId = req.params.chairId;

for(i=0;i<items.length;i++)
{
  if(requestedPostId == items[i].id)
  {
    res.render("buy-chair",{
      id: items[i].id,
      name: items[i].name,
      imgurl: items[i].imgURL,
      cost: items[i].cost,
      material: items[i].material ,
      color: items[i].color,
      dimensions: items[i].dimensions,
      items:items,
      weight:items[i].weight,
      description: items[i].description,
      stock: items[i].stock,
      review_name:items[i].review_name,
      review_content: items[i].review_content
    });
  }
}
  });

app.post("/shop-chair/:chairId",function(req,res){
  const reqid= req.params.chairId;
  const quantity=req.body.qnty;
  productquantity.push(quantity);

  for(i=0;i<items.length;i++)
  {
    if(reqid == items[i].id)
    {
      res.render("add-cart",{
        id: items[i].id,
        name: items[i].name,
        imgurl: items[i].imgURL,
        cost: items[i].cost,
        material: items[i].material ,
        color: items[i].color,
        dimensions: items[i].dimensions,
        items:items,
        weight:items[i].weight,
        description: items[i].description,
        stock: items[i].stock,
        review_name:items[i].review_name,
        review_content: items[i].review_content,
        quantity: quantity
      });
    }
  }
    });




  app.get("/shop-sofa/:sofaID",function(req,res){
    const reqsofaID=req.params.sofaID;

    for(i=0;i<sofa_items.length;i++)
    {
      if(reqsofaID == sofa_items[i].id)
      {
        res.render("buy-sofa",{
          id: sofa_items[i].id,
          name: sofa_items[i].name,
          imgurl: sofa_items[i].imgURL,
          cost: sofa_items[i].cost,
          material: sofa_items[i].material ,
          color: sofa_items[i].color,
          dimensions: sofa_items[i].dimensions,
          sofa_items:sofa_items,
          weight:sofa_items[i].weight,
          description: sofa_items[i].description,
          stock: sofa_items[i].stock,
          reqsofaID: reqsofaID,
          review_name:sofa_items[i].review_name,
          review_content:sofa_items[i].review_content
        });
      }
    }

  })

  app.post("/shop-sofa/:sofaID",function(req,res){
    const reqsofaID=req.params.sofaID;
    const quantity=req.body.qnty;
    productquantity.push(quantity);

    for(i=0;i<sofa_items.length;i++)
    {
      if(reqsofaID == sofa_items[i].id)
      {
        res.render("add-cart",{
          id: sofa_items[i].id,
          name: sofa_items[i].name,
          imgurl: sofa_items[i].imgURL,
          cost: sofa_items[i].cost,
          material: sofa_items[i].material ,
          color: sofa_items[i].color,
          dimensions: sofa_items[i].dimensions,
          sofa_items:sofa_items,
          weight:sofa_items[i].weight,
          description: sofa_items[i].description,
          stock: sofa_items[i].stock,
          review_name:sofa_items[i].review_name,
          review_content: sofa_items[i].review_content,
          quantity: quantity
        });
      }
    }
      });




  app.get("/shop-table/:tableID",function(req,res){
    const reqtableID=req.params.tableID;

    for(i=0;i<table_items.length;i++)
    {
      if(reqtableID == table_items[i].id)
      {
        res.render("buy-table",{
          id: table_items[i].id,
          name: table_items[i].name,
          imgurl: table_items[i].imgURL,
          cost: table_items[i].cost,
          material: table_items[i].material ,
          color: table_items[i].color,
          dimensions: table_items[i].dimensions,
          table_items:table_items,
          weight:table_items[i].weight,
          description: table_items[i].description,
          stock: table_items[i].stock,
          reqtableID: reqtableID,
          review_name:table_items[i].review_name,
          review_content: table_items[i].review_content
        })
      }
    }

  })

  app.post("/shop-table/:tableID",function(req,res){
    const reqtableID=req.params.tableID;
    const quantity=req.body.qnty;
    productquantity.push(quantity);

    for(i=0;i<table_items.length;i++)
    {
      if(reqtableID == table_items[i].id)
      {
        res.render("add-cart",{
          id: table_items[i].id,
          name: table_items[i].name,
          imgurl: table_items[i].imgURL,
          cost: table_items[i].cost,
          material: table_items[i].material ,
          color: table_items[i].color,
          dimensions: table_items[i].dimensions,
          table_items:table_items,
          weight:table_items[i].weight,
          description: table_items[i].description,
          stock: table_items[i].stock,
          review_name:table_items[i].review_name,
          review_content: table_items[i].review_content,
          quantity: quantity
        });
      }
    }
      });





// LOGIN AND REGISTER ROUTE
app.post("/register",function(req,res){
  const newUser=new User({
    email: req.body.username,
    password:md5(req.body.password)
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("home");
    }
  })
  });


app.get("/login",function(req,res){
  res.sendFile(__dirname+"/login.html");
})


app.post("/login",function(req,res){
  const username=req.body.username;
  const password=md5(req.body.password);

  User.findOne({email: username},function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
            res.redirect('/');
        }else{
          console.log("Wrong password");
        }
      }
    }
  })
  })


  let port = process.env.PORT;
  if(port== null || port== ""){
    port = 3000;
  }


  app.listen(port,function(){
    console.log("server started");
  });
