CREATE DATABASE  IF NOT EXISTS `apnamart` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `apnamart`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: apnamart
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `a_id` bigint NOT NULL AUTO_INCREMENT,
  `a_email` varchar(255) NOT NULL,
  `a_name` varchar(255) DEFAULT NULL,
  `a_pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`a_id`),
  UNIQUE KEY `UK8ov9f94wuo8a44ig5alkcyceq` (`a_email`),
  UNIQUE KEY `UKdbywks5qnwhi5ka5k7rec8dgx` (`a_name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (8,'afzal@gmail.com','afzal','$2a$10$Ia9vePGSDeTMoh/TB4dj2Os9dmTK3j4pbkYNYxyjU.l41U9rvYdmq'),(10,'cali@gmail.com','cali','$2a$10$ioUbeewPfvPARskLqeUSROm75pdAJMvvsDkVJQYH6GzoDDgOKRh/u'),(11,'capmask@gmail.com','capmask','$2a$10$OeKvC4UqmE5qcS4Gaq798O8Y8qEGQjDyKbg98c5lqiGyZPgTqh3dG'),(18,'admin@gmail.com','admin','$2a$10$vsKmd9fvMABbgPkfUMPhj.tjDgoj8aqmy5EWjSbmRw3ncg/pey6bW');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `i_id` bigint NOT NULL AUTO_INCREMENT,
  `i_availability` bit(1) DEFAULT NULL,
  `i_description` varchar(255) DEFAULT NULL,
  `i_image` varchar(255) DEFAULT NULL,
  `i_name` varchar(255) DEFAULT NULL,
  `i_price` bigint DEFAULT NULL,
  `i_quantity` bigint DEFAULT NULL,
  `i_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`i_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (36,_binary '','Highly sweet and nutty, pomegranates are packed with multiple health benefits. ','http://localhost:8085/images/e23f57ba-5a7c-44db-923a-721a9f79ce10.jpg','Fresh Pomegranate (Anar)',410,4,'image/jpeg'),(37,_binary '','Relish the juicy taste of fresh watermelon. Slice and enjoy every bite or make fresh watermelon juice. You can also use watermelon to make desserts like ice cream. Watermelon seeds can also be dried, roasted and consumed.','http://localhost:8085/images/5dae743c-5a9d-4e0a-a47e-ca1ab15b00cc.jpg','Fresh Watermelon (Tarbooj)',160,5,'image/jpeg'),(38,_binary '','Avocados are a versatile and nutritious fruit that has gained immense popularity in recent years. Known for their creamy texture and rich flavour, avocados have become a staple ingredient in many households.','http://localhost:8085/images/20b6127a-d2a8-4a00-a73c-125760d95d45.jpg','Avocado Hass Premium Imported',130,6,'image/jpeg'),(39,_binary '','An Apple a day keeps the doctor away. Red Delicious Apples are crunchy juicy and sweet. They are extremely beneficial for your family\'s health. They are a good source of Fibre and contain valuable anti-oxidants and poly-nutrients.','http://localhost:8085/images/de25c30a-69a5-42b9-8cca-ed1dfb1ebdcd.jpg','Apple Royal Gala (Seb)',254,8,'image/jpeg'),(40,_binary '','Enjoy the taste of banana elaichi or Yelakki, which is consumed across the world for its distinctive flavour and taste.','http://localhost:8085/images/76ffe649-42cf-4650-bcb1-76ca5466a158.jpg','Fresh Banana (Kela)',89,9,'image/jpeg'),(41,_binary '','Packed with nutrition, papaya is a healthy addition to your daily quota of fruit consumption. Relish its sweet and fresh flavours!','http://localhost:8085/images/6bbba081-34c9-4002-aa94-daf2dc8f6e74.jpg','Fresh Papaya (Papita)',88,10,'image/jpeg'),(42,_binary '','The most versatile melon around and aptly named honeydew is both sweet and succulent. Its celery-coloured flesh looks like a green-tinged precious stone.','http://localhost:8085/images/bdc0c8ea-1778-4e5a-8164-563acd4cf504.jpg','Fresh Muskmelon (Kharbooja)',125,11,'image/jpeg'),(43,_binary '','While we work to ensure that the product information is correct, actual product packaging and material may contain more or different information from what is given here.','http://localhost:8085/images/3915b744-d239-4de4-9831-15ecdcd1e990.jpg','Fresh Pineapple (Ananas)',108,12,'image/jpeg'),(44,_binary '','While we work to ensure that the product information is correct, actual product packaging and material may contain more or different information from what is given here.','http://localhost:8085/images/ce1e6df1-7985-479a-b3a8-5ab520aa7114.jpg','Fresh Orange (Santra)',195,4,'image/jpeg'),(45,_binary '','Dragon fruits are oval to oblong in shape and size','http://localhost:8085/images/5f95b320-be6e-4037-8ae8-c4de2093d083.jpg','Fresh Dragon Fruit',139,1,'image/jpeg'),(46,_binary '','While we work to ensure that the product information is correct, actual product packaging and material may contain more or different information from what is given here.','http://localhost:8085/images/922664c1-6898-4371-8d11-25bcdaf3129f.jpg','Fresh Kiwi',175,3,'image/jpeg');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` bigint NOT NULL AUTO_INCREMENT,
  `price_at_purchase` bigint DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  `i_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `FK5m45t4d6he3185oeygf2w4hin` (`i_id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  CONSTRAINT `FK5m45t4d6he3185oeygf2w4hin` FOREIGN KEY (`i_id`) REFERENCES `item` (`i_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `total_price` bigint DEFAULT NULL,
  `u_id` bigint NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FKiv32t7blhajf06yb56uol6mnj` (`u_id`),
  CONSTRAINT `FKiv32t7blhajf06yb56uol6mnj` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (14,'2024-09-10 17:30:12.971479','Pending',10100,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `u_id` bigint NOT NULL AUTO_INCREMENT,
  `u_address` varchar(255) DEFAULT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_name` varchar(255) DEFAULT NULL,
  `u_pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `UK16c3bxqq7t0jlm31mupreqntr` (`u_email`),
  UNIQUE KEY `UKkl51hjsu0irrl3dev4v48nmj4` (`u_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'test1@gmail.com','test1','$2a$10$/i.g.FWYugkEQM.yJEGoquZlh4YcVG/AZmUc68CktColj5Ctf2TIO'),(3,NULL,'afzal@gmail.com','afzal','$2a$10$ATaSeWPWRZYSp0r31mKjcO3X0U8xvF8yu3.0Yhakud8TQQqu7b73i'),(4,NULL,'aish@gmail.com','aish','$2a$10$gPBCxIr95neFqAUpeAD8P.0vtYwoLmNqZJq9kZLLFP2ut1Oyipc8y'),(5,NULL,'some@gmail.com','some','$2a$10$7KV6uNtxN90F3We7y61k1.kDElf6/UUpSHVqZmJT/pb16h1Jjv0Wq'),(6,NULL,'adasas@dsadasda','adsadas','$2a$10$VtSErHf7bc5ZG.OOC/qTiuMIvV4Stkv4BwmyGJaxMnIsFkmC1bc3u'),(7,NULL,'asfsd@sdfsdfsd','fasdf','$2a$10$qfymBBi07RIJWt2ue6k1c.matVHFZsfIEVOVVnANQci0Tx46wNiGG'),(8,NULL,'user@gmail.com','user','$2a$10$5dF1DW36JO7S.clHLI0LOe7Y.C24jfI3Wy5yJ.sOZKJWJ8wRsMhaa');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-19 21:33:19
