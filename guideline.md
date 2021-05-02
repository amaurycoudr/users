# GuideLine BackEnd

## BackEnd Structure

Currently the project follow this structure :

```text
- src
    - error
        errorHandler.ts
        errorMessage.ts
    - user
        - userControllers
        - userMiddlewares
        - userDB
        - userRoutes
        - userServices
        - userUtils
        - userTest
    app.ts
    server.ts
    db.ts
    routes.ts
    
```

### Important files

* **app.ts** : this is the main file. The **express app** is create here. The links to the **rooter** and to the error **handler** are also made here.
* **server.ts** : creation of the http server 
* **db.ts :** this file handles the connection to the DB.
* **routes.ts** _:_ this files brings together the routes of the different services.
* **erroHandler.ts** _:_ this files handle all the Errors in the application. 

### App service structure

* **serviceRoutes**  the router handles **endpoints** and http **methods**
* **servicesControllers** the controllers handles the body of the **req** call a **service** and then thanks to the service handles the **res**
* **servicesMiddlewares** same behavior as controllers but only call **next** and doesn't send a **res**  a middlewares is used by other controllers from the same or another service
* **servicesDB** handle db **models** et and db **interactions** for a service
* **servicesServices** interface between **controllers** and **db.** Here is all the **business logic**. But doesn't manipulate any db object or express objet like req, res 
* **servicesTest** all the tests for a services. Contains sub folder for each part of the service \(routes, controllers, dB...\)
* **servicesUtils** here we define some useful functions like checkers...  



