const request = require('supertest');
const url = 'http://localhost:3000';
const should = require('should');

describe('User', function() {
    it('CREATE_USER_WITH_INVALID_GEO', function(done) {
      request(url)
        .post('/api/user/')
        .send({
          data: {
            name: "James",
            dob: "1998-02-01",
            description: "test",
            latitude: 'as',
            longitude: 32.4538
          }  
        })
        .expect(500)
        .end(function(err, res) {
          res.body.should.containEql({
            msg: 'CREATE_USER_FAILURE'
          });
          if (err) throw err;
          done();
      });
    });
    it('CREATE_USER_WITH_INVALID_DOB', function(done) {
      request(url)
        .post('/api/user/')
        .send({
          data: {
            name: "James",
            dob: "1998-2-01",
            description: "test",
            latitude: 31.937,
            longitude: 132.4538
          }  
        })
        .expect(200)
        .end(function(err, res) {
          res.body.should.containEql({
            msg: 'INVALID_DATE_OF_BIRTH'
          });
          if (err) throw err;
          done();
      });
    });
    // it('CREATE_USER', function(done) {
    //     request(url)
    //       .post('/api/user/')
    //       .send({
    //         data: {
    //           name: "James",
    //           dob: "1998-02-01",
    //           description: "test",
    //           latitude: 26.2372,
    //           longitude: 32.4538
    //         }  
    //       })
    //       .expect(200)
    //       .end(function(err, res) {
    //         res.body.should.containEql({
    //           msg: 'GET_USER_SUCCESS'
    //         });
    //         if (err) throw err;
    //         done();
    //     });
    // });
    // it('GET_USER', function(done) {
    //   request(url)
    //     .get('/api/user/5ffd6d78bff028e93deef6a7')
    //     .expect(200)
    //     .end(function(err, res) {
    //       res.body.should.containEql({
    //         msg: 'get user successfully.'
    //       });
    //       if (err) throw err;
    //       done();
    //   });
    // });
    // it('UPDATE_USER', function(done) {
    //   request(url)
    //     .post('/api/user/5ffd6d78bff028e93deef6a7')
    //     .send({
    //       data: {
    //         name: "Schmo",
    //         dob: "1993-02-09",
    //         description: "test update",
    //         addressName: "Middle Huaihai Rd",
    //         latitude: 26.2372,
    //         longitude: 32.4538
    //       }
    //     })
    //     .expect(200)
    //     .end(function(err, res) {
    //       res.body.should.containEql({
    //         msg: 'updated user successfully.'
    //       });
    //       if (err) throw err;
    //       done();
    //   });
    // });
    // it('DELETE_USER', function(done) {
    //   request(url)
    //     .delete('/api/user/5')
    //     .expect(200)
    //     .end(function(err, res) {
    //       res.body.should.containEql({
    //         msg: 'get user successfully.'
    //       });
    //       if (err) throw err;
    //       done();
    //   });
    // });
});