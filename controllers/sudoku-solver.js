class SudokuSolver {

  validate(puzzleString) {
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

let grid = [
  [ '1', '.', '.', '7', '6', '2', '.', '8', '4' ],
  [ '9', '.', '6', '.', '8', '1', '2', '5', '7' ],
  [ '7', '2', '8', '4', '5', '9', '6', '1', '3' ],
  [ '6', '9', '4', '5', '1', '7', '8', '3', '2' ],
  [ '8', '1', '2', '9', '3', '6', '7', '4', '5' ],
  [ '3', '5', '7', '8', '2', '4', '1', '9', '6' ],
  [ '4', '7', '3', '2', '9', '8', '5', '6', '1' ],
  [ '5', '8', '1', '6', '7', '3', '4', '2', '9' ],
  [ '2', '6', '9', '1', '4', '5', '3', '7', '8' ] ];

let gridR = [
  [ '1', '.', '5', '7', '6', '2', '9', '8', '4' ],
  [ '.', '.', '6', '3', '.', '1', '2', '.', '7' ],
  [ '.', '2', '.', '.', '5', '.', '.', '.', '.' ],
  [ '.', '9', '.', '.', '1', '.', '.', '.', '.' ],
  [ '8', '.', '2', '.', '3', '6', '7', '4', '.' ],
  [ '3', '.', '7', '.', '2', '.', '.', '9', '.' ],
  [ '4', '7', '.', '.', '.', '8', '.', '.', '1' ],
  [ '.', '.', '1', '6', '.', '.', '.', '.', '9' ],
  [ '2', '6', '9', '1', '4', '.', '3', '7', '.' ] ];
 
const validator = (str) => { 
    return str.length == 81;

}

const pegaNumero = (str) => { 
    str = str.split('').filter(i => (/[0-9]/).test(i))
    return str.length;

}

const montaGrid = (str) => {
    let linhas = []; 
    for(let i = 0; i < 9; i++) { 
        linhas.push(str.slice((8*i)+(i*1), (9*(1+i))));
    }
    return linhas.map(i => i.split(''));
}

const montaColunas = () => { 
    let colunas = [];
    for(let i = 0; i < 9; i++) {
        let coluna = [];
        for(let n of linhasArray) { 
        coluna.push(n[i])
    }
        colunas.push(coluna)
    }
    return colunas;
}    

const valid = (bo, num, pos) => { 
  let row = pos[0];
  let col = pos[1];
    //check row
    for(let i = 0; i < 9; i++) { 
        if(bo[row][i] == num && pos != [row , i])
        return false;
    }
    //check col
    for(let j = 0; j < 9; j++) { 
        if(bo[j][col] == num && pos != [j, col])
        return false;
    }
    //check box 3x3
    let boxX = Math.floor(pos[1] / 3); console.log(boxX);
    let boxY = Math.floor(pos[0] / 3); console.log(boxY);
    for(let i = boxY * 3 ; i < boxY*3 + 3; i++) {
        for(let j = boxX * 3 ; j < boxX*3 + 3; j++) {
            if(bo[i][j] == num && pos !== [i,j]) {
                return false
            }
        }
    }
    return true;
}

const findEmpty = (bo) => { 
    for(let row in bo) { 
        for(let col in bo[row]) { 
            if(bo[row][col] === '.') return [row,col];
            
        }
    }
    return false;
}

const solve = (bo) => {
    let find = findEmpty(bo);
    let row = find[0];
    let col = find[1]
    console.log(find)
    if(!find) return true;
    for(let i = 1; i < 10; i++) {
      if(valid(bo,i,find)) { 
        bo[row][col] = i.toString();
          if(solve(bo) == true) return true;
          bo[row][col] = '.';
      }
    }
    return false;
}

//------------------------
console.log(solve(gridR))
console.log(gridR)
