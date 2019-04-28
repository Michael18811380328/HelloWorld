CREATE TABLE `drafts_draft` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `username` varchar(255) NOT NULL,
  `origin_repo_id` varchar(36) NOT NULL,
  `origin_file_version` varchar(100) NOT NULL,
  `draft_file_path` varchar(1024) NOT NULL,
  `origin_file_uuid_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drafts_draft_origin_file_uuid_id_f150319e_fk_tags_file` (`origin_file_uuid_id`),
  KEY `drafts_draft_created_at_e9f4523f` (`created_at`),
  KEY `drafts_draft_updated_at_0a144b05` (`updated_at`),
  KEY `drafts_draft_username_73e6738b` (`username`),
  CONSTRAINT `drafts_draft_origin_file_uuid_id_f150319e_fk_tags_file` FOREIGN KEY (`origin_file_uuid_id`) REFERENCES `tags_fileuuidmap` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

CREATE TABLE `drafts_draftreview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `origin_repo_id` varchar(36) NOT NULL,
  `draft_file_path` varchar(1024) NOT NULL,
  `origin_file_version` varchar(100) NOT NULL,
  `publish_file_version` varchar(100) DEFAULT NULL,
  `draft_id_id` int(11) DEFAULT NULL,
  `origin_file_uuid_id` char(32) NOT NULL,
  `author` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `draft_id_id` (`draft_id_id`),
  KEY `drafts_draftreview_created_at_1e4356bb` (`created_at`),
  KEY `drafts_draftreview_updated_at_ad2a1471` (`updated_at`),
  KEY `drafts_draftreview_creator_ecbc7e5e` (`creator`),
  KEY `drafts_draftreview_origin_file_uuid_id_113d5031_fk_tags_file` (`origin_file_uuid_id`),
  KEY `drafts_draftreview_author_2ed48342` (`author`),
  CONSTRAINT `drafts_draftreview_draft_id_id_9e6babe7_fk_drafts_draft_id` FOREIGN KEY (`draft_id_id`) REFERENCES `drafts_draft` (`id`),
  CONSTRAINT `drafts_draftreview_origin_file_uuid_id_113d5031_fk_tags_file` FOREIGN KEY (`origin_file_uuid_id`) REFERENCES `tags_fileuuidmap` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

CREATE TABLE `drafts_reviewreviewer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reviewer` varchar(255) NOT NULL,
  `review_id_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drafts_reviewreviewe_review_id_id_fc6bd0fd_fk_drafts_dr` (`review_id_id`),
  KEY `drafts_reviewreviewer_reviewer_65880f6e` (`reviewer`),
  CONSTRAINT `drafts_reviewreviewe_review_id_id_fc6bd0fd_fk_drafts_dr` FOREIGN KEY (`review_id_id`) REFERENCES `drafts_draftreview` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

CREATE TABLE `drafts_reviewcomment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `author` varchar(255) NOT NULL,
  `resolved` tinyint(1) NOT NULL,
  `comment` longtext NOT NULL,
  `detail` longtext NOT NULL,
  `review_id_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `drafts_reviewcomment_review_id_id_1645670c_fk_drafts_dr` (`review_id_id`),
  KEY `drafts_reviewcomment_created_at_370dbc87` (`created_at`),
  KEY `drafts_reviewcomment_updated_at_46073bd4` (`updated_at`),
  KEY `drafts_reviewcomment_author_5498ceea` (`author`),
  KEY `drafts_reviewcomment_resolved_94bcb8e6` (`resolved`),
  CONSTRAINT `drafts_reviewcomment_review_id_id_1645670c_fk_drafts_dr` FOREIGN KEY (`review_id_id`) REFERENCES `drafts_draftreview` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
    

ALTER TABLE `options_useroptions` ADD INDEX `options_useroptions_option_key_7bf7ae4b` (`option_key`);

ALTER TABLE TotalStorageStat DROP primary key;
ALTER TABLE TotalStorageStat ADD `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE TotalStorageStat ADD `org_id` INT NOT NULL DEFAULT -1;
ALTER TABLE TotalStorageStat ADD INDEX `idx_storage_time_org` (`timestamp`, `org_id`);

ALTER TABLE FileOpsStat ADD `org_id` INT NOT NULL DEFAULT -1;
ALTER TABLE FileOpsStat ADD INDEX `idx_file_ops_time_org` (`timestamp`, `org_id`);

ALTER TABLE UserActivityStat DROP primary key;
ALTER TABLE UserActivityStat ADD `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE UserActivityStat ADD UNIQUE (name_time_md5);
ALTER TABLE UserActivityStat ADD `org_id` INT NOT NULL DEFAULT -1;
ALTER TABLE UserActivityStat ADD INDEX `idx_activity_time_org` (`timestamp`, `org_id`);

DROP TABLE UserTrafficStat;



CREATE TABLE `repo_tags_repotags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `repo_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `repo_tags_repotags_repo_id_1163a48f` (`repo_id`),
  KEY `repo_tags_repotags_name_3f4c9027` (`name`),
  KEY `repo_tags_repotags_color_1292b6c1` (`color`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;



CREATE TABLE `file_tags_filetags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_uuid_id` char(32) NOT NULL,
  `parent_folder_uuid_id` char(32) NOT NULL,
  `repo_tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `file_tags_filetags_file_uuid_id_e30f0ec8_fk_tags_file` (`file_uuid_id`),
  KEY `file_tags_filetags_parent_folder_uuid_i_df56f09b_fk_tags_file` (`parent_folder_uuid_id`),
  KEY `file_tags_filetags_repo_tag_id_c39660cb_fk_repo_tags_repotags_id` (`repo_tag_id`),
  CONSTRAINT `file_tags_filetags_file_uuid_id_e30f0ec8_fk_tags_file` FOREIGN KEY (`file_uuid_id`) REFERENCES `tags_fileuuidmap` (`uuid`),
  CONSTRAINT `file_tags_filetags_parent_folder_uuid_i_df56f09b_fk_tags_file` FOREIGN KEY (`parent_folder_uuid_id`) REFERENCES `tags_fileuuidmap` (`uuid`),
  CONSTRAINT `file_tags_filetags_repo_tag_id_c39660cb_fk_repo_tags_repotags_id` FOREIGN KEY (`repo_tag_id`) REFERENCES `repo_tags_repotags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;