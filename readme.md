Validate parameters from an object (such as express's ```req.query```) and return any errors based on a schema defined.  

```npm install acceptance```
  
Any parameters not defined in the schema will be discarded in the output ```accepted```  
  
```javascript
var accept = require('acceptance').accept;

var schema = {
  name: {
    required: true,
    validation: { regex: /^[a-zA-Z0-9]+$/, message: 'Not alpha numeric' }
  },
  phone: {
    required: false,
    validation: { regex: /^-?[0-9]+$/, message: 'Not a valid integer' }
  },
  location: {
    required: true,
    validation: false
  }
}

var params = { name: 'bradley', phone: '012345hello', random: 'a random param' };

accept(params, schema, function(err, accepted){
  if(err) console.log(err);
  else console.log(accepted);
});
```
Will output:

```
[ { field: 'phone', message: 'Not a valid integer' }, // Invalid match with regex
  { field: 'location', message: 'Missing Field' } ]   // Not present in the params given
```
  
Run the tests ```make test```  

[![Build Status](https://secure.travis-ci.org/bradleyg/acceptance.png)](http://travis-ci.org/bradleyg/acceptance) 