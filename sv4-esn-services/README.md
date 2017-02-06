#sv4-esn-services

Backend Rest API for Emergency Social Network

### MongoDB

See config.js

-MongoConnection class handles connection to the database.
    "mongo_url": "mongodb://localhost:32768/sv4-esn",

All the members of the team should install mongodb locally and a visualization tool. 
I recommend Robomongo for Mac users. Get it here: https://robomongo.org/
But feel free to use whatever visualization tool you guys prefer.

The FSE sv4 team decided to use Express Mongoose Generator ES6
Credits: https://www.npmjs.com/package/express-mongoose-generator-es6

> npm install -g express-mongoose-generator

Every time we need to create a new Entity in the project let's try to follow
the workflow and instructions outlined below. 

This is just a summary from what we could gather for the mongoose-generator project.

Complete info at: https://github.com/johanpedroo/express-mongoose-generator

###Important: 
    I Recommend we keep the standard of using the Interactive Model. 

## Usage
### Non-Interactive mode
Generates a Mongoose model, a REST controller and Express router :
```bash
$ mongoose-gen -m car -f carDoor:number,color -r
        create: ./models/cardModel.js
        create: ./routes/cards.js
        create: ./controllers/cardController.js
```

##### Options

  - `-m, --model <modelName>` - the model name.
  - `-f, --fields  <fields>` - the fields (name1:type,name2:type).
  - `-r, --rest` - enable generation REST.

##### Available types
  - string
  - number
  - date
  - boolean
  - array
  - objectId

### Interactive mode

Generates a Mongoose model, a REST controller and Express router :
```bash
$ mongoose-gen
Model Name : car
Available types : string, number, date, boolean, array
Field Name (press <return> to stop adding fields) : door
Field Type [string] : number
Field Name (press <return> to stop adding fields) : color
Field Type [string] : 
Field Name (press <return> to stop adding fields) : owner
Field Type [string] : objectId
Reference (model name referred by the objectId field) : User
Field Name (press <return> to stop adding fields) : 
Generate Rest (yes/no) ? [yes] : 
        create: ./models/carModel.js
        create: ./routes/cars.js
        create: ./controllers/carController.js
```

###Integrating
    We then only have to add router in app.js file and MongoDB connection whit Mongoose. app.js :

```
var routes = require('./routes/index');
var cars = require('./routes/cars');
 ...

app.use('/', routes);
app.use('/cars', cars);
 ...
 ```