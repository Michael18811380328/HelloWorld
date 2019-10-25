CREATE TABLE `admin_log_adminlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `operation` varchar(255) NOT NULL,
  `detail` longtext NOT NULL,
  `datetime` datetime(6) NOT NULL,
  PRIMARY KEY(`id`),
  KEY `admin_log_adminlog_email` (`email`),
  KEY `admin_log_adminlog_operation` (`operation`)
) ENGINE=InnDB DEFAULT CHARSET=utf8;

CREATE TABLE `api2_token` (
  `key` varchar(40) NOT NULL,
  `user` varchar(255) NOT NULL,
  `create` datetime(6) NOT NULL,
  PRIMARY KEY(`key`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnDB DEFAULT CHARSET=utf8;

CREATE TABLE `django_contnet_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

INSERT INTO `django_content_type` VALUES (31,'admin_log','adminlog'),(19,'api2','token'),(20,'api2','tokenv2'),(8,'auth','group'),(7,'auth','permission'),(9,'auth','user'),(21,'avatar','avatar'),(22,'avatar','groupavatar'),(4,'base','commandslastcheck'),(5,'base','socialauthuser'),(6,'base','userlastlogin'),(11,'captcha','captchastore'),(2,'constance','config'),(1,'contenttypes','contenttype'),(12,'database','constance'),(40,'dtable','dtableapitoken'),(41,'dtable','dtableformlinks'),(42,'dtable','dtablerowshares'),(37,'dtable','dtables'),(39,'dtable','dtableshare'),(43,'dtable','dtablesharelinks'),(38,'dtable','workspaces'),(23,'institutions','institution'),(24,'institutions','institutionadmin'),(25,'institutions','institutionquota'),(26,'invitations','invitation'),(27,'notifications','notification'),(28,'notifications','usernotification'),(29,'options','useroptions'),(44,'organizations','orgmemberquota'),(45,'organizations','orgsettings'),(13,'post_office','attachment'),(14,'post_office','email'),(15,'post_office','emailtemplate'),(16,'post_office','log'),(30,'profile','profile'),(10,'registration','registrationprofile'),(36,'role_permissions','adminrole'),(3,'sessions','session'),(17,'termsandconditions','termsandconditions'),(18,'termsandconditions','usertermsandconditions'),(32,'two_factor','phonedevice'),(33,'two_factor','staticdevice'),(34,'two_factor','statictoken'),(35,'two_factor','totpdevice');