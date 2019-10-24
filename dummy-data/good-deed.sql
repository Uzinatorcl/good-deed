-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 24, 2019 at 11:25 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `good-deed`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` tinyint(8) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'automotive'),
(2, 'community'),
(3, 'computers'),
(4, 'delivery'),
(5, 'handy work'),
(6, 'house work'),
(7, 'mental health'),
(10, 'misc'),
(8, 'moving'),
(9, 'ride sharing');

-- --------------------------------------------------------

--
-- Table structure for table `commits`
--

CREATE TABLE `commits` (
  `commit_id` int(10) UNSIGNED NOT NULL,
  `request_id` int(10) UNSIGNED NOT NULL,
  `commit_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `commits`
--

INSERT INTO `commits` (`commit_id`, `request_id`, `commit_user_id`) VALUES
(71, 8, 1),
(72, 9, 1),
(73, 10, 1),
(74, 11, 1),
(75, 12, 1),
(79, 25, 3),
(77, 58, 3),
(78, 60, 3),
(80, 61, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(10) UNSIGNED NOT NULL,
  `commit_id` int(10) UNSIGNED NOT NULL,
  `sending_user_id` int(10) UNSIGNED NOT NULL,
  `recieving_user_id` int(10) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `requesters_user_id` int(10) UNSIGNED NOT NULL,
  `commiters_user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `commit_id`, `sending_user_id`, `recieving_user_id`, `message`, `requesters_user_id`, `commiters_user_id`) VALUES
(3, 71, 1, 20, 'Hi, How can I help?', 20, 1),
(4, 72, 1, 21, 'Hi, How can I help?', 21, 1),
(5, 73, 1, 19, 'Hi, How can I help?', 19, 1),
(6, 74, 1, 22, 'Hi, How can I help?', 22, 1),
(7, 75, 1, 23, 'Hi, How can I help?', 23, 1),
(9, 77, 3, 1, 'Hi, How can I help?', 1, 3),
(10, 78, 3, 1, 'Hi, How can I help?', 1, 3),
(11, 79, 3, 32, 'Hi, How can I help?', 32, 3),
(12, 80, 1, 3, 'Hi, How can I help?', 3, 1),
(13, 80, 3, 1, 'Yea bro my tire flew off where you at', 3, 1),
(14, 80, 1, 3, 'Yea I\'m right off the 405 if you need something done.', 3, 1),
(15, 80, 3, 1, 'Well what time can you come by?', 3, 1),
(16, 80, 1, 3, 'Im currently at learningFuze, I get out of work in 20 minutes, where do you want to meet up?', 3, 1),
(17, 80, 3, 1, 'Well I dont know where it went , do you have another tire?', 3, 1),
(18, 80, 1, 3, 'I dont have another tire here', 3, 1),
(19, 80, 3, 1, 'can you get another tire though', 3, 1),
(20, 80, 1, 3, 'No I cant go get another tire', 3, 1),
(21, 80, 3, 1, 'Im gonna give you a one star if you dont.', 3, 1),
(22, 80, 1, 3, 'Well I dont care if you do.', 3, 1),
(23, 80, 1, 3, 'So you dont want it orrr', 3, 1),
(24, 80, 3, 1, 'I still want to but my friend mitch is coming', 3, 1),
(25, 80, 1, 3, 'whos mitch', 3, 1),
(26, 80, 3, 1, 'Yo pls come help', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(10) UNSIGNED NOT NULL,
  `category_id` tinyint(10) UNSIGNED NOT NULL,
  `headline` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `request_user_id` int(10) UNSIGNED NOT NULL,
  `completed` bit(1) NOT NULL DEFAULT b'0',
  `zipcode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `category_id`, `headline`, `summary`, `request_user_id`, `completed`, `zipcode`) VALUES
(1, 1, 'Please help my tc broke down', 'Im looking for someone with automtotive experience, im a student and dont have the technical skills to repair my car, thank you!', 2, b'1', '92618'),
(2, 8, 'moving to irvine, need help!', 'Im currently moving to irvine to attend a coding bootcamp, I need someone who is willing to help me get my stuff out of my house, I can pay in costco hotdogs', 3, b'1', '92618'),
(3, 9, 'need a ride to pet store', 'my dog aiko has been hungry for a while now and I havent been able to get a ride to the pet store, was hoping someone in irvine can drive me down to the pet store', 4, b'1', '92618'),
(4, 3, 'my computer crashed, need ubuntu expert', 'was doing some stuff on my laptop and it crashed.  Need someone who has experience working with ubuntu and help me repair it.', 5, b'1', '92618'),
(5, 5, 'my toilet exploded, pls', 'yo wussup its ya boi chrispy, i had people over last night and this morning my toilet was exploded, need someone with plumbing experience to save me', 6, b'1', '92618'),
(6, 7, 'I cant stop vaping', 'Hello, my name is kevin and I am addicted to my juul,  Looking for someone to get me to stop, please.', 7, b'1', '92618'),
(7, 1, 'car wouldnt start this morning', 'this morning when I was leaving for work my car wasnt starting if anyone can come by or even help me diagnose the problem over the phone that would be really appreciated', 8, b'0', '92618'),
(8, 1, 'stuck on the side of the road', 'need some help, had a blowout, car is currently on the side of the 405 freeway', 20, b'0', '92618'),
(9, 1, 'my son wants to learn to drive..', 'i dont have a license or a car and my son really wants to get his drivers license, looking for someone to help out, would really appreciate it.', 21, b'0', '92618'),
(10, 2, 'need people to adopt pets!', 'we are meeting up at the park to get our pets adopted from the local shelter! the more the merrier', 19, b'0', '92618'),
(11, 2, 'the river is full of trash', 'the local river is full of trash and we are meeting on thursday to clean it up.  We will be starting bright and early so come on by!', 22, b'0', '92618'),
(12, 2, 'graffiti removal under the old bridge', 'my friends and I are getting together and cleaning up the graffiti under the bridge, come with clothes you can get dirty in!', 23, b'0', '92618'),
(13, 3, 'learning javascript, would love some help', 'looking for someone to help tutor me on the weekends about how javascript works , Ill buy the coffee!', 9, b'0', '92618'),
(14, 3, 'got blue screen of death..', 'was playing fortnite and my computer got the blue screen of death, now it wont turn on, will teach fortnite in exchange for helping me out', 24, b'0', '92618'),
(15, 3, 'building a pc', 'i decided to get into pc building and ended up buying a bunch of parts.  I have no idea what I am doing and would love someone with experience to help.', 25, b'0', '92618'),
(16, 4, 'my corgi needs food! :(', 'my kia is in the shop and my dog is hungry, looking for someone who can deliver , could really use the help', 10, b'0', '92618'),
(17, 4, 'senior in need of his meds', 'disabled, currently cant go to the store to get my meds, looking for someone to help me out, my darn no good kids dont have time for me', 26, b'0', '92618'),
(18, 4, 'broke my leg, need groceries', 'hi, I live alone currently and my apartment makes it difficult for me to leave my house.  I work from home and would love someone to deliver groceries to my house', 27, b'0', '92618'),
(19, 5, 'building a shed', 'I was playing badmitton and destroyed my moms shed, and she wants me to rebuild it.  I have tools just needs someone to show me the way', 11, b'0', '92618'),
(20, 5, 'light fixtures', 'just started a new business and currently theres no lighting.  i invested all my money into this place, could really use someone to help me install these lights. have no idea what im doin', 28, b'0', '92618'),
(21, 5, 'water everywhere', 'had a pipe burst at the house and have no water running through the house now.  I have children please send help', 29, b'0', '92618'),
(22, 6, 'no time to clean need help', 'im really busy with school and would love someone to help me clean my house', 12, b'0', '92618'),
(23, 6, 'single mom dishes piling up', 'i come home late and leave early for work, would love a sanitary place for my kids but too busy.  Really looking for someone to help out', 30, b'0', '92618'),
(24, 6, 'need help with my home', 'I am very old and have trouble walking.  I live alone and would really appreciate someone to help me clean my house', 31, b'0', '92618'),
(25, 7, 'everyday gets harder', 'struggling with my depression alot more lately, would love someone to talk to and vibe with', 32, b'0', '92618'),
(26, 7, 'my anxiety is all over the place', 'with my new job and my life becoming more stagnant my anxiety is getting worse as the days go on.  Would really love to talk to someone who has ever experienced the same.', 33, b'0', '92618'),
(27, 7, 'dont know where else to turn', 'been having alot of issues lately.  Just tired of the same thing everyday.  talking to someone new would be a nice change a pace. lets get coffee.', 34, b'0', '92618'),
(28, 8, 'moving in with my girlfriend!', 'hi! have alot of stuff to move from house to my girlfriends place.  I would really appeciate anyone that can lend a hand.  Im a web developer so I can offer my services in exchange for yours!', 13, b'0', '92618'),
(29, 8, 'moving out of state', 'heading back to my home town in louisiana. im a single father and i dont know many people here, need some help packing up and loading into a truck.  Ill take anyone I can get, just need somebody with arms and legs.', 35, b'0', '92618'),
(30, 8, 'need to leave', 'my apartment is evicting me and I have a very short period of time to get my stuff into my moms place, I would appreciate anybody willing to lend me a hand', 36, b'0', '92618'),
(31, 9, 'need a ride to school!', 'if anybody that lives in irvine and has a local job in the same city, I would really appreciate a ride until I get my car back from the shop! Thanks', 14, b'0', '92618'),
(32, 9, 'san diego to irvine school', 'Would really appreciate someone to carpool with.  I head to irvine from san diego every day, and would like to be productive during the car ride.  Willing to drive every other day for someone to do the same for me', 15, b'0', '92618'),
(33, 9, 'vegas this weekend!', 'trying to meet up with my friends in vegas, if you are heading there lets go together!', 37, b'0', '92618'),
(34, 10, 'my chickens aint eatin', 'My chickens aint eatin the feed i got them.  If anyone has chicken feed they can donate, I would really appreciate it', 38, b'0', '92618'),
(35, 10, 'trying to party', 'im new to irvine, and looking to have some fun on the weekend!', 16, b'0', '92618'),
(36, 10, 'need new recipes', 'I was a cook for seven years, been meaning to try new foods and cook some for my children.  If you have any recipes send them my way.', 17, b'0', '92618'),
(54, 1, 'help', 'asdafasvasd asd asd asdfa sdjfhlkjadsfh asdfhalskdjhflaksdf asdhvabv hbvcbzvjhxbv a fsdhfaisdygf asdgashdfui asdhfashdf asudhfasudhf sadfh asdhf asduhf asuidhf asiudfh aiusdfh ausidf hasoiudfh aisoudhf aousidfh asiudfh aisoudfh asiudfhi asuodhfiuasdhfaosiudhf aiousdhfiuaos dfhiuashd foiuashdf iuashdfoiuahsdoifuh asudhf ouahd foiuhas oduifh', 1, b'1', '92881'),
(56, 9, 'sfsdfsdf', 'adsfj;lasi df aids aiosdjfioasjdfoiajsdfuvnasjb s dsauhdf nakjcbnkljxcnvlkjznlkj nzkljn j ashdfn auhsksdjnc kj nahdlkjncklzjnx,cnv a sdlkfhnuicn ahdnfiuah nashdnfuias fhasdu hfkjn hdfkjnnxkjsdkj', 1, b'1', '92881'),
(57, 1, 'car wont pass smog', 'need some help from someone that can help me get my car to pass smog, because shop wants to change me $$$, thank u', 1, b'1', '92881'),
(58, 2, 'trying to host event at park', 'looking to host a get together at the park, need new people to hang out and bbq', 1, b'0', '92881'),
(59, 3, 'graphics card wont read', 'I think my motherboard doesnt support my new graphics card, need some help putting it together', 1, b'1', '92881'),
(60, 4, 'dfgdfgs', '', 1, b'0', '92881'),
(61, 1, 'My cars tire flew off', 'Please send help, find me my tire.', 3, b'0', '92881');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(10) UNSIGNED NOT NULL,
  `rating` tinyint(5) UNSIGNED NOT NULL,
  `review_message` text,
  `sending_user_id` int(10) UNSIGNED NOT NULL,
  `recieving_user_id` int(10) UNSIGNED NOT NULL,
  `request_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `rating`, `review_message`, `sending_user_id`, `recieving_user_id`, `request_id`) VALUES
(1, 5, 'Dan came by my house with an amazing attitude and a toolbox.  He fixed up my tc and its never ran better!', 2, 1, 1),
(2, 5, 'I will never forget my experience with dan, he helped me move and went to costco with me afterwards.  It was awesome', 3, 1, 2),
(3, 5, 'Dan came by my house and drove me to the pet store, it was an amazing time.  Aiko and I made a new friend!', 4, 1, 3),
(4, 5, 'For some reason I can never find anyone that uses that ubuntu os, thank god dan came and helped me fix my laptop', 5, 1, 4),
(5, 5, 'yo dan came by my house with a plunger and wet suit.  Really fixed up the place, come by next time dan we gon get litty', 6, 1, 5),
(6, 3, 'dan was able to get me to quit smoking, but he yelled at me afterwards and that made me want to smoke again', 7, 1, 6),
(7, 5, 'Thanks tarun!', 1, 3, 54),
(8, 5, 'Mitch came by in an orderly fashion and fixed up my computer and its better than ever!', 1, 13, 59),
(9, 5, 'Tarun came by again and did an incredible job, thanks sir!', 1, 3, 56),
(10, 5, 'thanks james!', 1, 17, 57);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `username` varchar(62) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(62) NOT NULL,
  `lastname` varchar(62) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `image_url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `firstname`, `lastname`, `zipcode`, `image_url`) VALUES
(1, 'dantheman', NULL, 'daniel.paschal@gmail.com', 'daniel', 'paschal', '92618', 'images/5dae75ede6fc7IMG_1964.JPG'),
(2, 'ayyyron', NULL, 'aaron.domingo@gmail.com', 'aaron', 'domingo', '92618', 'images/aaron.png'),
(3, 'taruntula', NULL, 'tarun.padath@gmail.com', 'tarun', 'padath', '92618', 'images/taruntula.png'),
(4, 'ads', NULL, 'adison.lay@gmail.com', 'adison', 'lay', '92618', 'images/ads.png'),
(5, 'ed', NULL, 'edward.lee@gmail.com', 'edward', 'lee', '92618', 'images/ed.png'),
(6, 'chrispy', NULL, 'christie.hui@gmail.com', 'christie', 'hui', '92618', 'images/crispy.png'),
(7, 'kevooo', NULL, 'kevin.ihm@gmail.com', 'kevin', 'ihm', '92618', 'images/kevin.png'),
(8, 'lilmichael', NULL, 'michael.chang@gmail.com', 'michael', 'chang', '92618', 'images/michael.png'),
(9, 'yoitbrena', NULL, 'brena.patel@gmail.com', 'brena', 'patel', '92618', 'images/brena.png'),
(10, 'ilovemykiario', NULL, 'christine.le@gmail.com', 'christine', 'le', '92618', 'images/christine.png'),
(11, 'badmittonboi', NULL, 'noel.carino@gmail.com', 'noel', 'carino', '92618', 'images/noel.png'),
(12, 'russianhackergirl', NULL, 'lena.porina@gmail.com', 'lena', 'porina', '92618', 'images/lena.png'),
(13, 'mitchdotdeveloper', NULL, 'mitch.ohair@gmail.com', 'mitch', 'ohair', '92618', 'images/mitch.png'),
(14, 'dontstealmykeyboard', NULL, 'anjaleena.barclay@gmail.com', 'anjaleena', 'barclay', '92618', 'images/anjaleena.png'),
(15, 'smashpro', NULL, 'joe.moberly@gmail.com', 'joe', 'moberly', '92618', 'images/joe.png'),
(16, 'pbandjan', NULL, 'jan.toong@gmail.com', 'jan', 'toong', '92618', 'images/jan.png'),
(17, 'cookingismylife', NULL, 'james.cho@gmail.com', 'james', 'cho', '92618', 'images/james.png'),
(18, 'deathby3d', NULL, 'sean.hughes@gmail.com', 'sean', 'hughes', '92618', 'images/sean.png'),
(19, 'clickityclack', NULL, 'heondo.kim@gmail.com', 'heondo', 'kim', '92618', 'images/heondo.png'),
(20, 'poppygooey', NULL, 'poppygooey@yahoo.com', 'fabian', 'sims', '92618', 'images/empty.png'),
(21, 'oreolurch', NULL, 'oreolurch@yahoo.com', 'aedan', 'becker', '92618', 'images/empty.png'),
(22, 'mittenstrek', NULL, 'mittenstrek@yahoo.com', 'maisie', 'aguilar', '92618', 'images/empty.png'),
(23, 'fraidycable', NULL, 'fraidycable@yahoo.com', 'cayden', 'magana', '92618', 'images/empty.png'),
(24, 'georgestaff', NULL, 'georgestaff@yahoo.com', 'jaidan', 'boyce', '92618', 'images/empty.png'),
(25, 'babyslash', NULL, 'babyslash@yahoo.com', 'teddie', 'gates', '92618', 'images/empty.png'),
(26, 'batmansteam', NULL, 'batmansteam@yahoo.com', 'rehan', 'hassan', '92618', 'images/empty.png'),
(27, 'fionaivory', NULL, 'fionaivory@yahoo.com', 'sama', 'rogers', '92618', 'images/empty.png'),
(28, 'luckycoast', NULL, 'luckycoast@yahoo.com', 'stephen', 'waller', '92618', 'images/empty.png'),
(29, 'nalaheap', NULL, 'nalaheap@yahoo.com', 'tyler', 'dalby', '92618', 'images/empty.png'),
(30, 'tomswan', NULL, 'tomswan@yahoo.com', 'tabatha', 'phelps', '92618', 'images/empty.png'),
(31, 'edgartiara', NULL, 'edgartiara@yahoo.com', 'laurence', 'skinner', '92618', 'images/empty.png'),
(32, 'socksdarn', NULL, 'socksdarn@yahoo.com', 'ameen', 'camacho', '92618', 'images/empty.png'),
(33, 'lilysaint', NULL, 'lilysaint@yahoo.com', 'kohen', 'mcdonald', '92618', 'images/empty.png'),
(34, 'charlyunify', NULL, 'charlyunify@yahoo.com', 'polly', 'moss', '92618', 'images/empty.png'),
(35, 'pilchardtask', NULL, 'pilchardtask@yahoo.com', 'lex', 'cook', '92618', 'images/empty.png'),
(36, 'kittystomp', NULL, 'kittystomp@yahoo.com', 'sameer', 'ayala', '92618', 'images/empty.png'),
(37, 'sugartamer', NULL, 'sugartamer@yahoo.com', 'liana', 'hughes', '92618', 'images/empty.png'),
(38, 'dianafeed', NULL, 'dianafeed@yahoo.com', 'sarah', 'duncan', '92618', 'images/empty.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `commits`
--
ALTER TABLE `commits`
  ADD PRIMARY KEY (`commit_id`),
  ADD UNIQUE KEY `unique_commit` (`request_id`,`commit_user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` tinyint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `commits`
--
ALTER TABLE `commits`
  MODIFY `commit_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
