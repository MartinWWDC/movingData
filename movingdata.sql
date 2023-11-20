-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Nov 21, 2023 alle 00:01
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movingdata`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `files`
--

CREATE TABLE `files` (
  `id` varchar(255) NOT NULL,
  `commento` text DEFAULT NULL,
  `isLocal` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `files`
--

INSERT INTO `files` (`id`, `commento`, `isLocal`) VALUES
('1700484800453.jpg', 'uploads\\1700484800453.jpg', 0),
('1700485764474.PNG', 'uploads\\1700485764474.PNG', 0),
('1700519925176.png', 'uploads\\1700519925176.png', 0),
('1700520044871.png', 'uploads\\1700520044871.png', 1),
('1700520045058.png', 'uploads\\1700520045058.png', 1),
('1700520045237.png', 'uploads\\1700520045237.png', 1),
('1700520045415.png', 'uploads\\1700520045415.png', 1),
('1700520045600.png', 'uploads\\1700520045600.png', 1),
('1700520045779.png', 'uploads\\1700520045779.png', 1),
('1700520045965.png', 'uploads\\1700520045965.png', 1),
('1700520046170.png', 'uploads\\1700520046170.png', 1),
('1700520046380.png', 'uploads\\1700520046380.png', 1),
('1700520046571.png', 'uploads\\1700520046571.png', 1),
('1700520046783.png', 'uploads\\1700520046783.png', 1),
('1700520046983.png', 'uploads\\1700520046983.png', 1),
('1700520047168.png', 'uploads\\1700520047168.png', 0),
('1700520047359.png', 'uploads\\1700520047359.png', 0),
('1700520430028.bmp', 'uploads\\1700520430028.bmp', 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
