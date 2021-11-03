'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const form = req.body;
      console.log(form)
      const sSolver = new SudokuSolver();
      let validateString = sSolver.validate(form.puzzle);
      if(validateString == true) { 
        if(!form.coordinate || !form.value) return res.json({error: 'Required field(s) missing'})
        if(!(/^[A-I]{1}[1-9]{1}$/).test(form.coordinate)) return res.json({error: 'Invalid coordinate'});
        if(!(/^[1-9]{1}$/).test(form.value)) return res.json({error: 'Invalid value'})
    let grid = montaGrid(form.puzzle);
    let conf = [];
    const row = ('ABCDEFGHI').indexOf(form.coordinate[0]);
    const col = form.coordinate[1] - 1;
    const val = form.value;
        console.log(row, col, val)
        if(sSolver.checkRowPlacement(grid,row,col,val) == false &&
        grid[row][col] !== val
        ) conf.push('row');
        if(sSolver.checkColPlacement(grid,row,col,val) == false && 
        grid[row][col] !== val
        ) conf.push('column');
        if(sSolver.checkRegionPlacement(grid,row,col,val) == false && 
        grid[row][col] !== val
        ) conf.push('region');
        console.log(conf)
        if(conf == '') { 
        return res.json({valid: true});
      } else {
      console.log(conf)
      return res.json({valid: false, conflict: conf});
      }
      
    } else { 
      console.log(validateString)
      res.json({error: validateString})
    }
});
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle) return res.json({error: 'Required field missing'});
      const sSolver = new SudokuSolver();
      const validateString = sSolver.validate(req.body.puzzle);
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
