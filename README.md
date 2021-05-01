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
docker-compose run
```



## Add an npm package to the project 

If you want to add a new package to the project you need to run :

```text
docker-compose exec -it ${container-name} npm install ${package-name}

```

