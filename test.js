var JSON = require('./libs/json-serialize/json-serialize');

var embedded_date_objects = [
  new Date(),
  {to: new Date, from: new Date},
  [1, new Date]
];

var json = JSON.serialize(embedded_date_objects);
console.log(json);
var deserialized_embedded_date_objects = JSON.deserialize(json);
console.log(deserialized_embedded_date_objects);