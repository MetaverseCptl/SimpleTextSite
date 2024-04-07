
describe('POST /message-add', function() {
  it('responds with 200', function(done) {
    request(app)
      .post('/message-add')
      .send({message: 'Hello from test!'})
      .expect(200, done)
  })
  it('responds with 500 when message is not provided', function(done) {
    request(app)
     .post('/message-add')
     .send({})
     .expect(500, done)
  })
})

describe('GET /message-get', function() {
  it('responds with 200 and receives messages', function(done) {
    request(app)
     .get('/message-get')
     .expect(200, done)
  })