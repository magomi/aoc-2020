Goal(s) for this day
* be consistent with style recommendations as described here: https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md

First solution
* build up an array with all numbers
* calculate the distance by searching the whole array

The first solution worked well for part 1 but failed because of long run time on finding the solution for more turns

Second solution
* I tried to find a mor effizient solution
* for calculating the distance only the last occurence of a number and the number of the turn it occures is necessary
* storing every number and the last occurence in a map is more efficient 
* the number is the key and the turn it last occured is the value within the map
* for calculating the distance it is only necessary to lookup the key in the map
* if the key is not found then it is the first occurance of the number
* this solution worked better, it took only five second to iterate over the necessary 300000000 turns