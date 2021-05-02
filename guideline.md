# GuideLine

## BackEnd Structure

Currently the project follow this structure :

```text
- src
    - error
        errorHandler.ts
        errorMessage.ts
    - user
        - userMiddlewares
        - userDB
        - userRoutes
        - userServices
        - userUtils
        - user
    app.ts
    server.ts
    db.ts
    routes.ts
    
```

### Important file

* **app.ts** : this is the main file. The **express app** is create here. The link to the **rooter** and to the error **handler** are his also made here.
* **server.ts** : creation of the http server 
* **db.ts :** this file handles the connection to the DB.
* **routes.ts** _:_ this files brings together the routes of the different services.
* **erroHandler.ts** _:_ this files handle all the Errors in the application. 





