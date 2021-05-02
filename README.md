# Intro

## Install Locally the project 

 - If you want to install the project you **must have docker install** on your computer. Check [docker](https://docs.docker.com/get-docker/) documentation for more informations.

{% hint style="info" %}
you can check if docker is already install with this command :
{% endhint %}

```bash
docker version
```

 - You also need to ask for the .**env file** \(this file must no be in the git repo\). 

Now you can run this command :

```text
git clone git@github.com:amaurycoudr/users.git
cd users
docker-compose build
```

Congratulation the project is install in your local machine🥳and you can run it with the command :

```text
NODE_ENV=dev docker-compose up
```

## The Tests

If you want to run the test you have to run the command :

```text
NODE_ENV=test docker-compose run --rm api sh -c "npm test"
```

{% hint style="info" %}
thanks to the variable **NODE\_ENV** we can handle the DB used. The **container db** is used for the **dev**, and the datas of this container are stock in a container. The container **db-test** is used for the **tests**, there is no volume for this one because we don't care about this datas.
{% endhint %}

## Add an npm package to the project 

If you want to add a new package to the project you need to run :

```text
docker-compose exec -it ${container-name} npm install ${package-name}
//exemple 
docker-compose exec -it api npm install helmet
```



