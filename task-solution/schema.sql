CREATE SCHEMA `audiobee_task` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `audiobee_task`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL DEFAULT NULL,
  `lastName` VARCHAR(50) NULL DEFAULT NULL,
  `mobile` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `password` VARCHAR(32) NOT NULL,
  `roles` VARCHAR(50) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `lastLogin` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_mobile` (`mobile` ASC),
  UNIQUE INDEX `uq_email` (`email` ASC));

CREATE TABLE `audiobee_task`.`language` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `uq_name` (`name` ASC));

CREATE TABLE `audiobee_task`.`category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `uq_name` (`name` ASC));

CREATE TABLE `audiobee_task`.`type` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `uq_name` (`name` ASC));


CREATE TABLE `audiobee_task`.`test` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `languageId`BIGINT NOT NULL,
  `categoryId`BIGINT NOT NULL,
  `typeId` BIGINT NOT NULL,
  `title` VARCHAR(75) NOT NULL,
  `metaTitle` VARCHAR(100) NULL,
  `slug` VARCHAR(100) NOT NULL,
  `summary` TINYTEXT NULL,
  `score` SMALLINT(6) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_slug` (`slug` ASC),
  INDEX `idx_test_user` (`userId` ASC),
  CONSTRAINT `fk_test_user`
    FOREIGN KEY (`userId`)
    REFERENCES `audiobee_task`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION); 


ALTER TABLE `audiobee_task`.`test`
ADD INDEX `idx_test_language` (`languageId` ASC);
ALTER TABLE `audiobee_task`.`test`
ADD CONSTRAINT `fk_test_language`
    FOREIGN KEY (`languageId`)
    REFERENCES `audiobee_task`.`language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

ALTER TABLE `audiobee_task`.`test`
ADD INDEX `idx_test_category` (`categoryId` ASC);
ALTER TABLE `audiobee_task`.`test`
ADD CONSTRAINT `fk_test_category`
    FOREIGN KEY (`categoryId`)
    REFERENCES `audiobee_task`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

ALTER TABLE `audiobee_task`.`test`
ADD INDEX `idx_test_type` (`typeId` ASC);
ALTER TABLE `audiobee_task`.`test`
ADD CONSTRAINT `fk_test_type`
    FOREIGN KEY (`typeId`)
    REFERENCES `audiobee_task`.`type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;