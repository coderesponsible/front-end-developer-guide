var url = 'http://www.imdbapi.com/?t=weeds';

var fileJSON = require(url);
console.log(JSON.parse(fileJSON));