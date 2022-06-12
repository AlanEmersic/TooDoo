-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema TooDoo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema TooDoo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TooDoo` DEFAULT CHARACTER SET utf8 ;
USE `TooDoo` ;

-- -----------------------------------------------------
-- Table `TooDoo`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TooDoo`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TooDoo`.`lists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TooDoo`.`lists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_todos_users_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_todos_users`
    FOREIGN KEY (`userId`)
    REFERENCES `TooDoo`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `TooDoo`.`todos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TooDoo`.`todos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `listId` INT NOT NULL,
  `text` TEXT NOT NULL,
  `completed` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_table1_todos1_idx` (`listId` ASC) VISIBLE,
  CONSTRAINT `fk_table1_todos1`
    FOREIGN KEY (`listId`)
    REFERENCES `TooDoo`.`lists` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
