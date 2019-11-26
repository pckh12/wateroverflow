# Water Overflow Challenge
Water Overflow Coding Challenge

Calculates the amout of water held by each glass when water is poured into the top of a triangle stack of glasses.

Any excess water overflows to the glasses below with even distibution.

## Assumptions:
- All glasses have a 250ml capacity
- The co-ordinates of the glasses on the base row of the supplied diagram is incorrect as the two middle glasses have the same co-ordinates. The assumption here is that the co-ordinates of the glasses on the base row from left to right should be: 
(3,0), (3,1), (3,2), (3,3)

## Install
Clone the repository and install via `npm` with:

``` bash
npm install
```


## Usage
To run the simulation, run the following from the command line:

``` bash
node pour-water <amount> [<heightOfStack>]
```
where 

*amount* is the amount of water to pour

*heightOfStack* is the number of rows in the stack. Default is 4

eg.
``` bash
node pour-water 2000
node pour-water 2000 5
```

The results should look like the following:

``` bash
[ [ '(0,0): 250' ],
  [ '(1,0): 250', '(1,1): 250' ],
  [ '(2,0): 250', '(2,1): 250', '(2,2): 250' ],
  [ '(3,0): 31.25',
    '(3,1): 218.75',
    '(3,2): 218.75',
    '(3,3): 31.25' ] ]
```    

where the results from each glass has the following format:

*(row, position): amountHeld*


## Unit test
The unit tests can be executed using:

``` bash
npm test
```