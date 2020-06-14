-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `tb_barang`;
CREATE TABLE `tb_barang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barcode` varchar(25) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `kategori` int NOT NULL,
  `satuan` varchar(25) NOT NULL,
  `harga_beli` int NOT NULL,
  `harga_jual` int NOT NULL,
  `stok` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tb_barang` (`id`, `barcode`, `nama`, `kategori`, `satuan`, `harga_beli`, `harga_jual`, `stok`) VALUES
(1,	'123456789',	'BLACKPINK Square Up',	1,	'PCS',	250000,	260000,	5),
(2,	'123435231',	'Samsung Smart TV',	2,	'Unit',	3400000,	3500000,	10);

DROP TABLE IF EXISTS `tb_kategori_barang`;
CREATE TABLE `tb_kategori_barang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(125) NOT NULL,
  `keterangan` varchar(125) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tb_kategori_barang` (`id`, `nama`, `keterangan`) VALUES
(1,	'Album',	'Kategori Album'),
(2,	'Elektronik',	'Kategori Elektronik'),
(3,	'Test 2',	'Kategori testing 2'),
(5,	'Bjir',	'bjirrrr');

DROP TABLE IF EXISTS `tb_penjualan`;
CREATE TABLE `tb_penjualan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kode_penjualan` varchar(25) NOT NULL,
  `id_barang` int NOT NULL,
  `jumlah` int NOT NULL,
  `total` int NOT NULL,
  `tanggal` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE `tb_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `surel` varchar(50) NOT NULL,
  `password` varchar(125) NOT NULL,
  `level` int NOT NULL,
  `foto` varchar(125) NOT NULL,
  `createdAt` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tb_users` (`id`, `username`, `nama`, `surel`, `password`, `level`, `foto`, `createdAt`) VALUES
(1,	'admin',	'Saya Admin',	'admin@pos.com',	'$2b$10$aIqUHhP8TPmxU4ni5pcv6ueebUOH8JonWwk5UEEYvjAvEn9uNZHoq',	0,	'1591709671404Jennie.jpg',	'2020-06-09 13:34:31'),
(2,	'kasircoy',	'Saya kasir',	'kasir@pos.com',	'$2b$10$jJZmnwdaq2uB20ZEntdCqeIAtGR.h2QuAnQu9yGhxSY/rivEdof1e',	1,	'1591713777493jeongyeon-twice-yes-or-yes-u7513.jpg',	'2020-06-09 14:42:58');

-- 2020-06-14 02:19:17