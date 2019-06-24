BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Alex', 'alex@gmail.com', 3, '2019-01-01');
INSERT into login (hash, email) values ('$2a$10$DG2TjIY/u7/AmG66/V1f6uyJz1xH0YmjMsHmPzH.W19fTQcUq4092', 'alex@gmail.com');

COMMIT;