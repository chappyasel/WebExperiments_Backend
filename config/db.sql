-- phpMyAdmin SQL Dump
-- version 4.7.7
-- Generation Time: Apr 11, 2019 at 01:28 AM
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `weightliftingapp`
--
CREATE DATABASE IF NOT EXISTS `weightliftingapp`;
USE `weightliftingapp`;

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `image_url` varchar(50) DEFAULT NULL,
  `device_uuid` varchar(40) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active_now` tinyint(1) NOT NULL DEFAULT '0',
  `weight` float NOT NULL DEFAULT '0',
  `weight_in_lbs` tinyint(1) NOT NULL DEFAULT '1',
  `xp` mediumint(9) NOT NULL DEFAULT '0',
  `total_duration` int(11) NOT NULL DEFAULT '0',
  `total_volume` int(11) NOT NULL DEFAULT '0',
  `total_workouts` int(11) NOT NULL DEFAULT '0',
  `total_sets` int(11) NOT NULL DEFAULT '0',
  `total_exercises` int(11) NOT NULL DEFAULT '0',
  `powerlifting_total` smallint(6) NOT NULL DEFAULT '0',
  `current_streak` smallint(6) NOT NULL DEFAULT '0',
  `longest_streak` smallint(6) NOT NULL DEFAULT '0',
  `metadata` tinytext
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `image_url`, `device_uuid`, `date_created`, `last_activity`, `active_now`, `weight`, `weight_in_lbs`, `xp`, `total_duration`, `total_volume`, `total_workouts`, `total_sets`, `total_exercises`, `powerlifting_total`, `current_streak`, `longest_streak`, `metadata`) VALUES
('abcd', 'anc', NULL, '2018-07-12 00:00:00', '2018-08-05 07:22:25', 0, 0, 1, 13, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('xyzz', NULL, NULL, '2018-07-12 00:00:00', '2018-08-06 06:20:18', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('AEDCED', NULL, NULL, '2018-08-05 15:21:52', '2018-08-05 22:21:52', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('Bob', NULL, NULL, '2018-08-05 00:10:57', '2018-08-05 22:04:52', 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('def', NULL, NULL, '2018-08-05 07:27:23', '2018-08-05 07:27:23', 1, 112.453, 1, 13, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('Rick', NULL, NULL, '2018-08-05 14:24:24', '2018-08-05 21:24:24', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('AEDCEED', NULL, NULL, '2018-08-05 15:22:38', '2018-08-05 22:22:38', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('xy z', NULL, NULL, '2018-08-05 15:37:42', '2018-08-08 16:47:04', 0, 0, 1, 12, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
('User 47189914', NULL, NULL, '2018-08-08 16:54:55', '2018-08-08 16:54:55', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);
COMMIT;
