const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  test('Logic handles a valid string of 81 characters', (done) => { 
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.validate(puzzle), true);
    done();
  });
  test('Logic handles a string with invalid characters(not 1-9 or .', (done) => { 
    const invalidPuzzle = '..a...c.85.4....2432...ds..1...69.83.9.....6.62.71...9..fd..1945....4.37.4.3..6..';
    assert.equal(solver.validate(invalidPuzzle), 'Invalid characters in puzzle');
    done();
  })
  test('Logic handles a string that is not 81 characters length', (done) => { 
    const invalidPuzzleLength = '.....4.37.4.3..6..';
    assert.equal(solver.validate(invalidPuzzleLength), 'Expected puzzle to be 81 characters long');
    done();
  })

  const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  const invalidString = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  let grid = solver.montaGrid(puzzleString);
  const invalidGrid = solver.montaGrid(invalidString);
  test('Logic handles a valid row placement', (done) => { 
    assert.equal(solver.checkRowPlacement(grid,0,0,7), true);
    done();
  })
  test('Logic handles a invalid row placement', (done) => { 
    assert.equal(solver.checkRowPlacement(grid,0,0,9), false);
    done();
  });
  test('Logic handles a valid column placement', (done) => { 
    assert.equal(solver.checkColPlacement(grid,0,0,2), true);
    done();
  });
  test('Logic handles a invalid column placement', (done) => { 
    assert.equal(solver.checkColPlacement(grid,0,0,8), false);
    done();
  });
  test('Logic handles a valid region placement', (done) => { 
    assert.equal(solver.checkRegionPlacement(grid,0,3,2), true);
    done();
  });
  test('Logic handles a invalid region placement', (done) => { 
    assert.equal(solver.checkRegionPlacement(grid,0,3,4), false);
    done();
  });
  test('Valid string puzzle pass the solver', (done) => { 
    assert.equal(solver.valid(grid), true)
    assert.equal(solver.solve(grid), true)
    done();
  });
  test('Invalid string puzzle fail the solver', (done) => { 
    assert.equal(solver.valid(invalidString), false)
    done();
  });
  test('Solver return the solution', (done) => { 
    const solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
    assert.equal(solver.solve(grid), true);
    assert.equal(solver.montaString(grid), solution);
    done();
  })

});
