-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2023 at 08:15 PM
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
-- Database: `remember_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `categoryId` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `categoryId`) VALUES
(1, 'dinner'),
(2, 'game'),
(3, 'sport'),
(4, 'outside'),
(5, 'shopping');

-- --------------------------------------------------------

--
-- Table structure for table `changelog`
--

CREATE TABLE `changelog` (
  `id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL,
  `task_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `changelog`
--

INSERT INTO `changelog` (`id`, `type`, `task_id`, `description`, `date`) VALUES
(1, 'Insert', 1, 'Inserted new task with id: 1', '2023-10-13'),
(2, 'Delete', 1, 'Deleted task id: 1 from datebase', '2023-10-21'),
(3, 'Insert', 2, 'Inserted new task with id: 2', '2023-10-21'),
(4, 'Insert', 3, 'Inserted new task with id: 3', '2023-10-21'),
(5, 'Insert', 4, 'Inserted new task with id: 4', '2023-10-21'),
(6, 'Update', 4, 'Updated task with id: 4', '2023-10-21'),
(7, 'Update', 4, 'Updated task with id: 4', '2023-10-21'),
(8, 'Update', 3, 'Updated task with id: 3', '2023-10-21'),
(9, 'Update', 2, 'Updated task with id: 2', '2023-10-21'),
(10, 'Update', 3, 'Updated task with id: 3', '2023-10-21'),
(11, 'Update', 3, 'Updated task with id: 3', '2023-10-21'),
(12, 'Update', 2, 'Updated task with id: 2', '2023-10-21'),
(13, 'Update', 4, 'Updated task with id: 4', '2023-10-21'),
(14, 'Update', 2, 'Updated task with id: 2', '2023-10-21'),
(15, 'Insert', 5, 'Inserted new task with id: 5', '2023-10-24'),
(16, 'Insert', 6, 'Inserted new task with id: 6', '2023-10-24'),
(17, 'Insert', 7, 'Inserted new task with id: 7', '2023-10-24'),
(18, 'Insert', 8, 'Inserted new task with id: 8', '2023-10-24'),
(19, 'Insert', 9, 'Inserted new task with id: 9', '2023-10-24'),
(20, 'Insert', 10, 'Inserted new task with id: 10', '2023-10-24'),
(21, 'Insert', 11, 'Inserted new task with id: 11', '2023-10-24'),
(22, 'Insert', 12, 'Inserted new task with id: 12', '2023-10-24');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `colorId` varchar(20) NOT NULL,
  `colorHex` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `colorId`, `colorHex`) VALUES
(1, 'light-blue', '#83b8df'),
(2, 'orange', '#ff8c00'),
(3, 'pink', '#ff5964'),
(4, 'green', '#59b90e'),
(5, 'cyan', '#14aeae'),
(6, 'magenta', '#ac7dd2'),
(7, 'violet', '#6562fc');

-- --------------------------------------------------------

--
-- Table structure for table `date`
--

CREATE TABLE `date` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `from_time` time NOT NULL,
  `to_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `date`
--

INSERT INTO `date` (`id`, `task_id`, `date`, `from_time`, `to_time`) VALUES
(2, 2, '2023-11-01', '18:57:00', NULL),
(3, 3, '2023-11-01', '14:04:00', NULL),
(4, 4, '2023-10-25', '15:05:00', NULL),
(5, 5, '2023-10-27', '20:12:00', NULL),
(6, 6, '2023-11-02', '20:11:00', NULL),
(7, 7, '2023-10-26', '20:13:00', NULL),
(8, 8, '2023-11-08', '12:12:00', NULL),
(9, 9, '2023-11-02', '12:12:00', NULL),
(10, 10, '2023-10-26', '13:13:00', NULL),
(11, 11, '2023-10-25', '20:17:00', NULL),
(12, 12, '2023-10-27', '13:14:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `icon`
--

CREATE TABLE `icon` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `color` varchar(7) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `icon`
--

INSERT INTO `icon` (`id`, `task_id`, `color`, `type`) VALUES
(2, 2, '#FFFFFF', 'default'),
(3, 3, '#FFFFFF', 'default'),
(4, 4, '#FFFFFF', 'default'),
(5, 5, '#FFFFFF', 'default'),
(6, 6, '#FFFFFF', 'default'),
(7, 7, '#FFFFFF', 'default'),
(8, 8, '#FFFFFF', 'default'),
(9, 9, '#FFFFFF', 'default'),
(10, 10, '#FFFFFF', 'default'),
(11, 11, '#FFFFFF', 'default'),
(12, 12, '#FFFFFF', 'default');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `reminder` tinyint(1) NOT NULL,
  `color` varchar(7) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `reminder`, `color`, `type`) VALUES
(2, 'Testessa', 0, '#ff5964', 'dinner'),
(3, 'Tahykwaaasfasfasf', 0, '#6562fc', 'dinner'),
(4, 'Te', 0, '#ac7dd2', 'dinner'),
(5, 'Test', 0, '#83b8df', 'dinner'),
(6, 'Test', 0, '#83b8df', 'dinner'),
(7, 'Test', 0, '#83b8df', 'dinner'),
(8, 'Test', 0, '#14aeae', 'dinner'),
(9, 'rr', 0, '#ff5964', 'dinner'),
(10, 'Test', 0, '#ff5964', 'dinner'),
(11, 'aaa', 0, '#14aeae', 'dinner'),
(12, '123', 0, '#59b90e', 'sport');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `changelog`
--
ALTER TABLE `changelog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `date`
--
ALTER TABLE `date`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `icon`
--
ALTER TABLE `icon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `changelog`
--
ALTER TABLE `changelog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `date`
--
ALTER TABLE `date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `icon`
--
ALTER TABLE `icon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `date`
--
ALTER TABLE `date`
  ADD CONSTRAINT `date_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

--
-- Constraints for table `icon`
--
ALTER TABLE `icon`
  ADD CONSTRAINT `icon_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
