GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'Ybkk1027' WITH GRANT OPTION;
update user set host='%' where user='root' and host='localhost';