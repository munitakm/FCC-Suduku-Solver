'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log(req.body)
      const sSolver = new SudokuSolver();
      let validateString = sSolver.validate(req.body.puzzle);
      if(validateString == true) { 
        if(!req.body.coordinate || !req.body.value) return res.json({error: 'Required field missing'})
        if(!(/^[A-I]{1}[1-9]{1}$/).test(req.body.coordinate)) return res.json({error: 'Invalid coordinate'});
        if(!(/^[1-9]{1}$/).test(req.body.value)) return res.json({error: 'Invalid value'})
    let grid = montaGrid(req.body.puzzle);
        console.log("passou")
    } else { 
      console.log(validateString)
      res.json({error: validateString})
    }
});
    
  app.route('/api/solve')
    .post((req, res) => {
      console.log(req.body);
      const sSolver = new SudokuSolver();
      const validateString = sSolver.validate(req.body.puzzle);
      if(!req.body.puzzle) return res.json({error: 'Required field missing'});
      if(validateString == true) { 
      if(!valid(montaGrid(req.body.puzzle)))
        return res.json({error: 'Puzzle cannot be solved'});
        let grid = montaGrid(req.body.puzzle)

        console.log(sSolver.solve(grid));
        console.log(grid);
        let sPuzzle = montaString(grid);
        res.json({solution: sPuzzle});
      } else { 
        res.json({error: validateString});
      }
    });
};

const montaGrid = (str) => {
    let linhas = []; 
    for(let i = 0; i < 9; i++) { 
        linhas.push(str.slice((8*i)+(i*1), (9*(1+i))));
    }
    return linhas.map(i => i.split(''));
}

const valid = (bo) => { 
    //check row
    for(let i = 0; i < 9; i++) { 
      for(let j = 0; j < 9; j++) { 
        if(bo[i][j] !== '.' &&
        bo[i].indexOf(bo[i][j]) !== bo[i].lastIndexOf(bo[i][j]))
       return false;
      }
    }
    //check col
    for(let i = 0; i < 9; i++) {
      let coluna = [];
      for(let j = 0; j < 9; j++) { 
        coluna.push(bo[i][j])
      } 
      for(let i of coluna) { 
          if(i !== '.' &&
          coluna.indexOf(i) !== coluna.lastIndexOf(i)) return false;
      }
      return true;
        } 
    //check box 3x3
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) { 
          let region = [];
        for(let y = i*3; y < 3*i + 3; y++) {
            
          for(let x = j*3; x < 3*j + 3; x++) { 
            region.push(bo[y][x])
          } 
        } for(let i of region) { 
            if(i !== '.' && 
            region.indexOf(i) !== region.lastIndexOf(i)
            ) return false;
        }
      }
    }
    return true;
}

const montaString = (bo) => { 
  let string = [];
  for(let i of bo) { 
    string.push(...i)
  }
  return string.join('')
}
