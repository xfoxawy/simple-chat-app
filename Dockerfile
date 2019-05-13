FROM ubuntu:16.04

RUN apt-get update 
RUN apt-get -y install curl
RUN apt-get -y install curl python-software-properties

RUN apt-get install -y sudo
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

RUN apt-get -y install nodejs

RUN apt-get -y update


ENV MYSQL_PWD password
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
RUN apt-get -y install mysql-server



RUN apt-get update

RUN apt-get -y install redis-server

RUN mkdir -p /code/node_modules 

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ./initiate.sh 
