# Chat-app

chat-app is simple chating application helps users to send messages for one or group of users .


## Installation


```
Clone source code 

Cd simple-chat-app

docker build -t simplechatapp:1 .

docker run -it -p 3000:3000 --name="simple_chat_app" simplechatapp:1 

Now you can use it with simple GUI localhost:3000/register

```

## Technologies


[NodeJs](https://nodejs.org/en/)
```
Used to handle server side requests.
```
[Redis](https://redis.io/topics/quickstart)
```
Used to cache users status.
```
[Socket](socket.io)
```
Used to send messages in real time.
```
[Mysql](https://dev.mysql.com/downloads/installer/)
```
Used to store messages and users.
```
[Docker](https://www.docker.com/why-docker)
```
Used to containerize application.
```
[Bash script](https://www.learnshell.org/)
```
Used to handle project initiation.
```

## Assumptions

* This platform for trying only and it does't cover all logical or security cases .
* Messages are string only till now . 
* GUI doesn't cover all exist business.
* GUI is still simple and useing server side rendering ( any front-end framewark will be more helpful )
* Json web tokens doesn't expire.
* There is no validation layer.


## Architecture

* Used Expressjs to be my mvc framework.
* Handled business logic in seperated services.
* Every service contain (Manager, providers, repositories, models, migrations, seeds)
* Managers will handle our domain logic and will give tasks for providers
* Managers can communicate with each others too till now they communicate direct but the must communicate using events.
* Provider will handle business logic and can communicate with database usgin repositories
* Repositories will make queries using models
* Models is just database schema and contain relations with other models in the same service
* Migrations contain tables createion
* Seeds contain initiation data for application



## To-Do

* Add notifications using redis pubsub
* Add other types of messages like (files , audio)
* Use react, angular or vue to handle client side
* Add transformers layer
* Use response standers ( json:api or graphQl )
* Errors handleing




## Contributing

```

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

```

## License

```

[MIT](https://choosealicense.com/licenses/mit/)

```