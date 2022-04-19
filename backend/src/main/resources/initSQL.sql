CREATE TABLE `user` (
    `user_id`   int(11)         NOT NULL    AUTO_INCREMENT,
    `email`     varchar(255)    NOT NULL    UNIQUE,
    `password`  varchar(255)    NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `log`
(
    `log_id`    int(11)         NOT NULL    AUTO_INCREMENT,
    `user_id`   int(11),
    `scene`     VARCHAR(255)    NOT NULL,
    `time`      TIMESTAMP       NOT NULL,
    PRIMARY KEY (`log_id`),
    FOREIGN KEY (`user_id`) REFERENCES user (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
);
