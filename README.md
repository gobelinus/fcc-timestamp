Timestamp Microservice
======================

User Stories
------------

+ I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
+ If it does, it returns both the Unix timestamp and the natural language form of that date.
+ If it does not contain a date or Unix timestamp, it returns null for those properties.

Example Usage
-------------

+ [https://warm-ocean-90449.herokuapp.com/December%2015,%202015](https://warm-ocean-90449.herokuapp.com/December%2015,%202015)
+ [https://warm-ocean-90449.herokuapp.com/1450137600](https://warm-ocean-90449.herokuapp.com/1450137600)

Example output
--------------

    { "unix": 1450137600, "natural": "December 15, 2015" }