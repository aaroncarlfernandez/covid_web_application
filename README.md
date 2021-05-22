# COVID WEB APPLICATION
Loads and parses a CSV file of COVID cases into a PostgreSQL database and creates a GET endpoint that returns the list of top N countries with confirmed COVID cases for a given observation date.

## Tech Stack
- Node.js
- Express.js
- Postgresql

## Installation
```
git clone https://github.com/aaroncarlfernandez/covid_web_application.git
cd backend
npm i
```
## Modify the database configurations in db-config.json. Default parameters are as follows:  
```
    "host": "localhost",
    "port": 5432,
    "database": "postgres",
    "user": "postgres",
    "password": "password"
```
## Run the backend. 
_This drops any existing_ **covid_observations** _table and re-creates it_
```
node index.js
```
_If you would just like to load the CSV data into an already existing_ **covid_observations** _table. The following command just empties it:_
```
node index.js -to
```

## Test the backend - Default port is 5000
http://localhost:5000/top/confirmed?observation_date=yyyy-mm-dd&max_results=N

![ ](https://res.cloudinary.com/dyogexlcd/image/upload/v1621695130/PM_animation_nuib8e.gif)

## Testing through its frontend
Alternatively, you can test the API using its frontend:

![ ](https://res.cloudinary.com/dyogexlcd/image/upload/v1621695131/Web_Animation_mjppq3.gif)
```
cd frontend
open index.html
```
