# Estates for sale - node.js API, project 4 on CodersCamp 2019

## Basic endpoints:

- Get all estates:

GET http://node-api-estates.herokuapp.com/api/v1/estates

- Get single estate:

GET http://node-api-estates.herokuapp.com/api/v1/estates/{id}

- Create new offer(auth required):

POST http://node-api-estates.herokuapp.com/api/v1/estates

req.body example:

```
{
"name": "Apartament w Gdańsku",
"area": 120,
"price": 3800,
"type": "mieszkanie",
"city": "Gdańsk",
"rooms": 4,
"description": "\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"",
"mainImage": {upload one}
}
```

- Update an offer(auth required):

PATCH http://node-api-estates.herokuapp.com/api/v1/estates/{id}

req.body example:

```
{
"price": 2990
}
```

- Delete an offer(auth required):

DELETE http://node-api-estates.herokuapp.com/api/v1/estates/{id}

- Sign up user:

POST http://node-api-estates.herokuapp.com/api/v1/users/signup

req.body example:

```
{
"name": "NewUser",
"email":"new.user@gmail.com",
"password": 123456
}
```

- Login user:

POST http://node-api-estates.herokuapp.com/api/v1/users/login

req.body example:

```
{
"email": "new.user@gmail.com",
"password":"123456"
}
```
