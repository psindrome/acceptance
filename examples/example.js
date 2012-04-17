var accept = require('../index').accept;

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
    required: true
  }
}

var params = { name: 'bradley', phone: '012345hello', random: 'a random param' };

accept(params, schema, function(err, accepted){
  if(err) console.log(err);
  else console.log(accepted);
});

// will output
//
// [ { field: 'phone', message: 'Not a valid integer' },
//   { field: 'location', message: 'Missing Field' } ]