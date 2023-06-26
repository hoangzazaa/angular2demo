CREATE TABLE `sfr_sf_comment_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `created_user` int(11) DEFAULT NULL,
  `updated_user` int(11) DEFAULT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `file_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `comment_file_id` varchar(255) DEFAULT NULL,
  `comment_file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE,
  KEY `fk_sfr_sf_comment_file_sfr_sf_file1_idx` (`file_id`) USING BTREE,
  KEY `fk_sfr_sf_comment_file_sfr_sf_comment1_idx` (`comment_id`) USING BTREE,
  CONSTRAINT `sfr_sf_comment_file_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `sfr_sf_comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sfr_sf_comment_file_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `sfr_sf_file` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;