const express = require('express');
const redis = require('redis');
const app = express();

//Provide DNS name/IP address and port
const client = redis.createClient({
  host: 'my-redis-server',
  port: 6379
});

// client.on('connect', () => {
//   console.log('Redis client connected:', client.connected);
// });

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

client.on('end', () => {
  console.log('Redis client connection closed');
});

client.on('ready', () => {
  console.log('Redis client connected');
});

app.get('/', (req, res) => {

  //Read key from the database
  client.get('visitors', (err, visitors) => {

    //Convert the value into integer
    var currVisits = parseInt(visitors);

    //If visitors is not present in database then initilize 1
    if(isNaN(currVisits)) {
      currVisits = 1;
    }

    //Send the response back to the user
    res.send('You are visitor: ' + currVisits);

    //Increment and save the new value to the database
    client.set('visitors', currVisits + 1);
  });

});

app.listen(6666, () => {
  console.log('visitorsapp started on port 6666');
});

// Log client status after some operations
// console.log('Redis client connected:', client.connected);
