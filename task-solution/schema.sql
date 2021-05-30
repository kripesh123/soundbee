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

CREATE TABLE `audiobee_task`.`worker` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL DEFAULT NULL,
  `lastName` VARCHAR(50) NULL DEFAULT NULL,
  `mobile` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `password` VARCHAR(32) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
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

CREATE TABLE `audiobee_task`.`test_set` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(50) NOT NULL,
  `attempt` SMALLINT(6) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `audiobee_task`.`test` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `workerId` BIGINT NOT NULL,
  `languageId`BIGINT NOT NULL,
  `categoryId`BIGINT NOT NULL,
  `typeId` BIGINT NOT NULL,
  `testSetId` BIGINT NOT NULL,
  `title` VARCHAR(75) NOT NULL,
  `metaTitle` VARCHAR(100) NULL,
  `slug` VARCHAR(100) NOT NULL,
  `summary` TINYTEXT NULL,
  `score` SMALLINT(6) NOT NULL DEFAULT 0,
  `position` SMALLINT(6) NOT NULL DEFAULT 0,
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
ADD INDEX `idx_test_worker` (`workerId` ASC);
ALTER TABLE `audiobee_task`.`test`
ADD CONSTRAINT `fk_test_worker`
    FOREIGN KEY (`workerId`)
    REFERENCES `audiobee_task`.`worker` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

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

ALTER TABLE `audiobee_task`.`test`
ADD INDEX `idx_test_test_set` (`testSetId` ASC);
ALTER TABLE `audiobee_task`.`test`
ADD CONSTRAINT `fk_test_test_set`
    FOREIGN KEY (`testSetId`)
    REFERENCES `audiobee_task`.`test_set` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

CREATE TABLE `audiobee_task`.`test_question` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `testId` BIGINT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 0,
  `level` SMALLINT(6) NOT NULL DEFAULT 0,
  `score` SMALLINT(6) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_question_test` (`testId` ASC),
  CONSTRAINT `fk_question_test`
    FOREIGN KEY (`testId`)
    REFERENCES `audiobee_task`.`test` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `audiobee_task`.`test_answer` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `testId` BIGINT NOT NULL,
  `questionId` BIGINT NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 0,
  `correct` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_answer_test` (`testId` ASC),
  CONSTRAINT `fk_answer_test`
    FOREIGN KEY (`testId`)
    REFERENCES `audiobee_task`.`test` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `audiobee_task`.`test_answer` 
ADD INDEX `idx_answer_question` (`questionId` ASC);
ALTER TABLE `audiobee_task`.`test_answer` 
ADD CONSTRAINT `fk_answer_question`
  FOREIGN KEY (`questionId`)
  REFERENCES `audiobee_task`.`test_question` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `audiobee_task`.`take` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `workerId` BIGINT NOT NULL,
  `testId` BIGINT NOT NULL,
  `status` SMALLINT(6) NOT NULL DEFAULT 0,
  `score` SMALLINT(6) NOT NULL DEFAULT 0,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `startedAt` DATETIME NULL DEFAULT NULL,
  `finishedAt` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_take_worker` (`workerId` ASC),
  CONSTRAINT `fk_take_worker`
    FOREIGN KEY (`workerId`)
    REFERENCES `audiobee_task`.`worker` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `audiobee_task`.`take` 
ADD INDEX `idx_take_test` (`testId` ASC);
ALTER TABLE `audiobee_task`.`take` 
ADD CONSTRAINT `fk_take_test`
  FOREIGN KEY (`testId`)
  REFERENCES `audiobee_task`.`test` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `audiobee_task`.`take_answer` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `takeId` BIGINT NOT NULL,
  `questionId` BIGINT NOT NULL,
  `answerId` BIGINT NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_answer_take` (`takeId` ASC),
  CONSTRAINT `fk_answer_take`
    FOREIGN KEY (`takeId`)
    REFERENCES `audiobee_task`.`take` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `audiobee_task`.`take_answer` 
ADD INDEX `idx_tanswer_question` (`questionId` ASC);
ALTER TABLE `audiobee_task`.`take_answer` 
ADD CONSTRAINT `fk_tanswer_question`
  FOREIGN KEY (`questionId`)
  REFERENCES `audiobee_task`.`test_question` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `audiobee_task`.`take_answer` 
ADD INDEX `idx_tanswer_answer` (`answerId` ASC);
ALTER TABLE `audiobee_task`.`take_answer` 
ADD CONSTRAINT `fk_tanswer_answer`
  FOREIGN KEY (`answerId`)
  REFERENCES `audiobee_task`.`test_answer` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
