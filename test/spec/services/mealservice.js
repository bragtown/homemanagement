'use strict';

describe('Service: Mealservice', function () {

  // load the service's module
  beforeEach(module('homeManagementApp'));

  // instantiate service
  var Mealservice;
  beforeEach(inject(function (_Mealservice_) {
    Mealservice = _Mealservice_;
  }));

  it('should do something', function () {
    expect(!!Mealservice).toBe(true);
  });

});
