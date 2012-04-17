var should = require('should');
var accept = require('../index.js').accept;

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

describe('acceptance', function(){
  
  describe('accept()', function(){
    
    it('should return an error if a field failed validation', function(done){
      var params = { phone: '012345hello' };
      accept(params, schema, function(err, accepted){
        should.exist(accepted);
        should.exist(err);        
        accepted.should.have.property('phone', '012345hello');
        err[1].should.have.property('field', 'phone');
        err[1].should.have.property('message', 'Not a valid integer');
        done();
      });
    });
    
    it('should return an error if a required field is missing', function(done){
      var params = { phone: '012345hello' };
      accept(params, schema, function(err, accepted){
        should.exist(err);
        should.exist(accepted);
        accepted.should.have.property('phone', '012345hello');
        err[2].should.have.property('field', 'location');
        err[2].should.have.property('message', 'Missing field');
        done();        
      });
    });
    
    it('should not return an error an error if valid fields are sent', function(done){
      var params = { name: 'Bradley', location: 'london' };
      accept(params, schema, function(err, accepted){
        should.exist(accepted);
        should.not.exist(err);
        accepted.should.have.property('name', 'Bradley');
        accepted.should.have.property('location', 'london');
        done();        
      });
    });
      
  });
  
});