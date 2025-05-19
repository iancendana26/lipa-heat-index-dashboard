-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2025 at 10:09 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heat_index_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `daily_readings`
--

CREATE TABLE `daily_readings` (
  `id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `temperature` decimal(5,2) DEFAULT NULL,
  `humidity` decimal(5,2) DEFAULT NULL,
  `heat_index` decimal(5,2) DEFAULT NULL,
  `weather` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daily_readings`
--

INSERT INTO `daily_readings` (`id`, `location_id`, `date`, `temperature`, `humidity`, `heat_index`, `weather`, `description`) VALUES
(1, 1, '2025-05-19 17:39:01', 30.70, 49.90, 26.94, NULL, NULL),
(2, 1, '2025-05-19 07:39:01', 31.12, 56.65, 42.15, NULL, NULL),
(3, 1, '2025-05-18 21:39:01', 20.59, 64.99, 25.10, NULL, NULL),
(4, 1, '2025-05-19 16:39:01', 22.27, 69.71, 30.17, NULL, NULL),
(5, 1, '2025-05-19 06:39:01', 20.95, 61.72, 35.49, NULL, NULL),
(6, 1, '2025-05-18 20:39:01', 34.88, 55.54, 44.32, NULL, NULL),
(7, 1, '2025-05-19 15:39:01', 29.97, 57.06, 27.75, NULL, NULL),
(8, 1, '2025-05-19 05:39:01', 26.10, 64.92, 42.88, NULL, NULL),
(9, 1, '2025-05-18 19:39:01', 29.03, 53.09, 41.60, NULL, NULL),
(10, 1, '2025-05-19 14:39:01', 22.54, 54.24, 30.45, NULL, NULL),
(11, 1, '2025-05-19 04:39:01', 24.41, 66.06, 32.52, NULL, NULL),
(12, 1, '2025-05-18 18:39:01', 33.88, 60.00, 39.47, NULL, NULL),
(13, 1, '2025-05-19 13:39:01', 21.75, 56.52, 39.30, NULL, NULL),
(14, 1, '2025-05-19 03:39:01', 25.03, 61.30, 38.13, NULL, NULL),
(15, 1, '2025-05-19 12:39:01', 30.27, 58.21, 29.43, NULL, NULL),
(16, 1, '2025-05-19 02:39:01', 31.14, 41.89, 25.18, NULL, NULL),
(17, 1, '2025-05-19 11:39:01', 33.56, 59.72, 40.06, NULL, NULL),
(18, 1, '2025-05-19 01:39:01', 24.29, 46.83, 44.92, NULL, NULL),
(19, 1, '2025-05-19 10:39:01', 27.02, 54.13, 32.21, NULL, NULL),
(20, 1, '2025-05-19 00:39:01', 31.16, 65.51, 44.13, NULL, NULL),
(21, 1, '2025-05-19 09:39:01', 33.04, 59.14, 40.68, NULL, NULL),
(22, 1, '2025-05-18 23:39:01', 27.28, 42.92, 43.19, NULL, NULL),
(23, 1, '2025-05-19 08:39:01', 24.94, 76.71, 37.01, NULL, NULL),
(24, 1, '2025-05-18 22:39:01', 23.73, 57.67, 34.26, NULL, NULL),
(32, 1, '2025-05-19 18:39:09', 25.50, 65.00, 27.80, 'Clear', 'Clear sky'),
(33, 1, '2025-05-19 18:39:22', 25.46, 76.46, 29.51, 'Rain', 'Clear sky'),
(34, 1, '2025-05-19 17:39:22', 26.13, 77.98, 29.46, 'Clouds', 'Light rain'),
(35, 1, '2025-05-19 16:39:22', 27.71, 61.29, 29.09, 'Clouds', 'Partly cloudy'),
(36, 1, '2025-05-19 15:39:22', 28.95, 79.38, 28.42, 'Clouds', 'Sunny with few clouds'),
(37, 1, '2025-05-19 14:39:22', 29.97, 66.90, 29.24, 'Rain', 'Clear sky'),
(38, 1, '2025-05-19 13:39:22', 25.49, 75.56, 28.79, 'Rain', 'Partly cloudy'),
(39, 1, '2025-05-19 12:39:22', 27.12, 73.75, 27.50, 'Sunny', 'Partly cloudy'),
(40, 1, '2025-05-19 11:39:22', 26.74, 75.15, 29.23, 'Clouds', 'Sunny with few clouds'),
(41, 1, '2025-05-19 10:39:22', 27.51, 72.34, 28.75, 'Clear', 'Light rain'),
(42, 1, '2025-05-19 09:39:22', 27.87, 64.38, 28.12, 'Clear', 'Sunny with few clouds'),
(43, 1, '2025-05-19 08:39:22', 29.45, 74.94, 27.20, 'Clear', 'Partly cloudy'),
(44, 1, '2025-05-19 07:39:22', 25.80, 78.46, 27.41, 'Sunny', 'Clear sky'),
(45, 1, '2025-05-19 06:39:22', 25.43, 78.69, 28.23, 'Clouds', 'Clear sky'),
(46, 1, '2025-05-19 05:39:22', 27.15, 60.60, 29.59, 'Clear', 'Light rain'),
(47, 1, '2025-05-19 04:39:22', 29.92, 66.51, 29.03, 'Clouds', 'Sunny with few clouds'),
(48, 1, '2025-05-19 03:39:22', 28.57, 72.36, 29.84, 'Sunny', 'Light rain'),
(49, 1, '2025-05-19 02:39:22', 26.39, 72.56, 27.92, 'Rain', 'Partly cloudy'),
(50, 1, '2025-05-19 01:39:22', 28.19, 64.82, 27.88, 'Rain', 'Sunny with few clouds'),
(51, 1, '2025-05-19 00:39:22', 29.64, 62.97, 29.88, 'Clouds', 'Sunny with few clouds'),
(52, 1, '2025-05-18 23:39:22', 26.29, 74.25, 29.36, 'Sunny', 'Light rain'),
(53, 1, '2025-05-18 22:39:22', 28.68, 76.14, 29.47, 'Rain', 'Clear sky'),
(54, 1, '2025-05-18 21:39:22', 29.99, 78.63, 29.00, 'Rain', 'Light rain'),
(55, 1, '2025-05-18 20:39:22', 28.99, 78.98, 28.05, 'Sunny', 'Partly cloudy'),
(56, 1, '2025-05-18 19:39:22', 27.97, 71.74, 27.47, 'Clear', 'Light rain'),
(64, 1, '2025-05-19 18:39:30', 25.78, 91.00, 27.51, 'Clouds', 'overcast clouds'),
(65, 1, '2025-05-19 18:39:39', 25.78, 91.00, 27.51, 'Clouds', 'overcast clouds'),
(66, 1, '2025-05-19 18:41:25', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(67, 1, '2025-05-19 18:42:47', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(68, 1, '2025-05-19 18:42:54', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(69, 1, '2025-05-19 18:43:43', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(70, 1, '2025-05-19 18:43:47', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(71, 1, '2025-05-19 18:44:39', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(72, 1, '2025-05-19 18:44:48', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(73, 1, '2025-05-19 18:46:13', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(74, 1, '2025-05-19 18:46:18', 25.78, 91.00, 22.34, 'Clouds', 'overcast clouds'),
(75, 1, '2025-05-19 18:48:04', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(76, 1, '2025-05-19 18:48:09', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(77, 1, '2025-05-19 18:50:30', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(78, 1, '2025-05-19 18:50:33', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(79, 1, '2025-05-19 18:51:42', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(80, 1, '2025-05-19 18:51:52', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(81, 1, '2025-05-19 18:53:26', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(82, 1, '2025-05-19 18:53:34', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(83, 1, '2025-05-19 18:55:04', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(84, 1, '2025-05-19 18:55:09', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(85, 1, '2025-05-19 18:56:33', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(86, 1, '2025-05-19 18:56:48', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(87, 1, '2025-05-19 18:58:05', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(88, 1, '2025-05-19 18:59:47', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(89, 1, '2025-05-19 18:59:47', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(90, 1, '2025-05-19 19:00:11', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(91, 1, '2025-05-19 19:01:29', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(92, 1, '2025-05-19 19:01:43', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(93, 1, '2025-05-19 19:02:55', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(94, 1, '2025-05-19 19:03:01', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(95, 1, '2025-05-19 19:04:19', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(96, 1, '2025-05-19 19:04:22', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(97, 1, '2025-05-19 19:05:33', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(98, 1, '2025-05-19 19:05:37', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(99, 1, '2025-05-19 19:07:03', 25.79, 90.00, 22.30, 'Clouds', 'overcast clouds'),
(100, 1, '2025-05-19 19:07:47', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(101, 1, '2025-05-19 19:08:09', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(102, 1, '2025-05-19 19:08:22', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(103, 1, '2025-05-19 19:09:01', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(104, 1, '2025-05-19 19:10:06', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(105, 1, '2025-05-19 19:10:34', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(106, 1, '2025-05-19 19:13:24', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(107, 1, '2025-05-19 19:13:25', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(108, 1, '2025-05-19 19:13:33', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(109, 1, '2025-05-19 19:15:08', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(110, 1, '2025-05-19 19:15:09', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(111, 1, '2025-05-19 19:15:33', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(112, 1, '2025-05-19 19:16:23', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(113, 1, '2025-05-19 19:16:23', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(114, 1, '2025-05-19 19:17:01', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(115, 1, '2025-05-19 19:17:01', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(116, 1, '2025-05-19 19:17:03', 25.80, 87.00, 22.17, 'Clouds', 'overcast clouds'),
(117, 1, '2025-05-19 19:17:10', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(118, 1, '2025-05-19 19:17:10', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(119, 1, '2025-05-19 19:17:11', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(120, 1, '2025-05-19 19:17:59', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(121, 1, '2025-05-19 19:18:00', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(122, 1, '2025-05-19 19:18:35', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(123, 1, '2025-05-19 19:18:42', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(124, 1, '2025-05-19 19:19:07', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(125, 1, '2025-05-19 19:19:07', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(126, 1, '2025-05-19 19:20:30', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(127, 1, '2025-05-19 19:20:33', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(128, 1, '2025-05-19 19:20:40', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(129, 1, '2025-05-19 19:21:55', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(130, 1, '2025-05-19 19:21:58', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(131, 1, '2025-05-19 19:22:07', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(132, 1, '2025-05-19 19:22:17', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(133, 1, '2025-05-19 19:22:17', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(134, 1, '2025-05-19 19:24:03', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(135, 1, '2025-05-19 19:25:00', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(136, 1, '2025-05-19 19:25:04', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(137, 1, '2025-05-19 19:25:14', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(138, 1, '2025-05-19 19:25:33', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(139, 1, '2025-05-19 19:27:06', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(140, 1, '2025-05-19 19:28:37', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(141, 1, '2025-05-19 19:28:54', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(142, 1, '2025-05-19 19:29:40', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(143, 1, '2025-05-19 19:29:48', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(144, 1, '2025-05-19 19:29:49', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(145, 1, '2025-05-19 19:30:34', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(146, 1, '2025-05-19 19:31:06', 25.86, 87.00, 22.23, 'Clouds', 'overcast clouds'),
(147, 1, '2025-05-19 19:35:05', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(148, 1, '2025-05-19 19:35:13', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(149, 1, '2025-05-19 19:35:15', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(150, 1, '2025-05-19 19:35:20', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(151, 1, '2025-05-19 19:35:33', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(152, 1, '2025-05-19 19:35:59', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(153, 1, '2025-05-19 19:37:05', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(154, 1, '2025-05-19 19:37:28', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(155, 1, '2025-05-19 19:38:24', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(156, 1, '2025-05-19 19:38:28', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(157, 1, '2025-05-19 19:39:29', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(158, 1, '2025-05-19 19:40:29', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(159, 1, '2025-05-19 19:40:33', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(160, 1, '2025-05-19 19:41:17', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(161, 1, '2025-05-19 19:41:22', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(162, 1, '2025-05-19 19:41:26', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(163, 1, '2025-05-19 19:41:28', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(164, 1, '2025-05-19 19:42:22', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(165, 1, '2025-05-19 19:42:27', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(166, 1, '2025-05-19 19:43:10', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(167, 1, '2025-05-19 19:43:16', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(168, 1, '2025-05-19 19:44:16', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(169, 1, '2025-05-19 19:45:34', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(170, 1, '2025-05-19 19:45:36', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(171, 1, '2025-05-19 19:46:37', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(172, 1, '2025-05-19 19:47:37', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(173, 1, '2025-05-19 19:47:43', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(174, 1, '2025-05-19 19:47:51', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(175, 1, '2025-05-19 19:47:57', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(176, 1, '2025-05-19 19:48:57', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(177, 1, '2025-05-19 19:49:57', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(178, 1, '2025-05-19 19:50:34', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(179, 1, '2025-05-19 19:50:57', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(180, 1, '2025-05-19 19:51:12', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(181, 1, '2025-05-19 19:51:14', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(182, 1, '2025-05-19 19:52:12', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds'),
(183, 1, '2025-05-19 19:53:10', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(184, 1, '2025-05-19 19:53:12', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(185, 1, '2025-05-19 19:53:13', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(186, 1, '2025-05-19 19:54:12', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(187, 1, '2025-05-19 19:55:12', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(188, 1, '2025-05-19 19:55:34', 25.77, 90.00, 22.28, 'Clouds', 'overcast clouds'),
(189, 1, '2025-05-19 19:56:12', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds'),
(190, 1, '2025-05-19 19:57:13', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds'),
(191, 1, '2025-05-19 19:58:54', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds'),
(192, 1, '2025-05-19 19:59:54', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds'),
(193, 1, '2025-05-19 20:00:34', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds'),
(194, 1, '2025-05-19 20:00:54', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds'),
(195, 1, '2025-05-19 20:01:54', 25.80, 89.00, 22.26, 'Clouds', 'overcast clouds');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Lipa City', 'Main monitoring location in Lipa City, Batangas', '2025-05-19 18:39:01'),
(2, 'Main Building', 'Primary school building', '2025-05-19 18:39:01'),
(3, 'Gymnasium', 'Sports and physical education facility', '2025-05-19 18:39:01'),
(4, 'Library', 'School library and study area', '2025-05-19 18:39:01'),
(5, 'Cafeteria', 'School dining area', '2025-05-19 18:39:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daily_readings`
--
ALTER TABLE `daily_readings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daily_readings`
--
ALTER TABLE `daily_readings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daily_readings`
--
ALTER TABLE `daily_readings`
  ADD CONSTRAINT `daily_readings_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
