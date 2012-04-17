module.exports.accept = function(params, schema, cb) {
  var errors = [];
  var accepted = {};

  var addError = function(key, message) {
    errors.push({
      field: key,
      message: message
    });
  }

  Object.keys(schema).forEach(function(key){
    var option = schema[key];
    var value = params[key];

    if(option.required && ! value){
      addError(key, 'Missing field');
    }
    else if(value && option.validation && ! value.match(option.validation.regex)){
      addError(key, option.validation.message);
    }

    if(params[key]){
      accepted[key] = params[key];  
    }
  });

  var err = errors.length ? errors : null;

  process.nextTick(function(){
    cb(err, accepted);  
  });
}