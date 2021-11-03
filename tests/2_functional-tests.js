const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const validPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const invalidCharacter = '..n..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const invalidLength = '...1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const invalidPuzzle = validPuzzle.replace('..9..5', '9.9..5') 
    const solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';


suite('Functional Tests', () => {
  suite('api/Solve', () => { 
    test('Solve a valid puzzle', (done) => { 
      chai.request(server)
      .post('/api/solve')
      .send({puzzle: validPuzzle})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.equal(res.body.solution, solution);
        done()
      })
    });

    test('Solve a puzzle with a missing string', (done) => { 
      chai.request(server)
      .post('/api/solve')
      .send({puzzle: ""})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field missing');
        done()
      })
    });
    test('Solve a puzzle with a invalid character', (done) => { 
      chai.request(server)
      .post('/api/solve')
      .send({puzzle: invalidCharacter})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done()
      })
    });
    test('Solve a puzzle with a invalid length', (done) => { 
      chai.request(server)
      .post('/api/solve')
      .send({puzzle: invalidLength})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done()
      })
    });
    test('Solve a puzzle that cannot be solved', (done) => { 
      chai.request(server)
      .post('/api/solve')
      .send({puzzle: invalidPuzzle})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Puzzle cannot be solved');
        done()
      })
    });
})
  suite('api/Check', () => {
    test('Check a puzzle with all fields', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: solution, coordinate: 'A1', value: '7' })
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {valid: true});
        done();
      })
    })
    test('Check a puzzle with single placement conflict', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: validPuzzle, coordinate: 'B5', value: '6'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {valid: false, conflict: ['column']});
        done();
      })
    })
    test('Check a puzzle with multiple placement conflicts', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: validPuzzle, coordinate: 'B5', value: '4'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {valid: false, conflict: ['row', 'region']});
        done();
      })
    })
    test('Check a puzzle with all placement conflicts', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: validPuzzle, coordinate: 'A1', value: '5'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {valid: false, conflict: ['row', 'column', 'region']});
        done();
      })
    })
    test('Check a puzzle with missing required field', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: validPuzzle, coordinate: '', value: '9'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Required field(s) missing'} );
        done();
      })
    })
    test('Check a puzzle placement with invalid character', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: invalidCharacter, coordinate: 'A1', value: '9'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Invalid characters in puzzle'});
        done();
      })
    })
    test('Check a puzzle with incorrect length', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: invalidLength, coodinate: 'A1', value: '9'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Expected puzzle to be 81 characters long'} );
        done();
      })
    })
    test('Check a puzzle placement with invalid placement coordinate', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: validPuzzle, coordinate: 'A19', value: '7'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Invalid coordinate'});
        done();
      })
    })
    test('Check a puzzle placement with invalid placement value', (done) => { 
      chai.request(server)
      .post('/api/check')
      .send({puzzle: validPuzzle, coordinate: 'A1', value: '78'})
      .end((err,res) => { 
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Invalid value'});
        done();
      })
    })
  })
});

