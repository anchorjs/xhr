define(['xhr'],
function(xhr) {

  describe("xhr", function() {
    
    it('should export request', function() {
      expect(xhr.request).to.exist;
      expect(xhr.request).to.be.a('function');
    });
    
    it('should export get', function() {
      expect(xhr.get).to.exist;
      expect(xhr.get).to.be.a('function');
    });
    
  });
  
  return { name: "test.xhr" }
});
