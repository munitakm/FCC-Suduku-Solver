class SudokuSolver {
  
  validate(string) {
    if(string.length !== 81) return 'Expected puzzle to be 81 characters long';
    if(string.match(/[1-9.]/g).length == 81) return true;
    return 'Invalid characters in puzzle';
  }

  checkRowPlacement(g, row, col, value) {
    for(let i = 0; i < 9; i++) { 
      if(g[row][i] == value && [row, col] != [row, i]) return false;
    }
    return true;
  }

  checkColPlacement(g, row, col, value) {
    for(let i = 0; i < 9; i++) { 
      if(g[i][col] == value && [row,col] != [i, col]) return false; 
    }
    return true;
  }

  checkRegionPlacement(g, row, col, value) {
    let boxX = Math.floor(col / 3);
    let boxY = Math.floor(row / 3);
    for(let i = boxY*3; i < boxY*3 + 3; i++) { 
      for(let j = boxX*3; j < boxX*3 + 3; j++) { 
        if(g[i][j] == value && [row,col] != [i,j]) return false;
      }
    }
    return true;
  }
  findEmpty(bo) { 
    for(let row in bo) { 
        for(let col in bo[row]) { 
            if(bo[row][col] === '.') return [row,col];
        }
    }
    return false;
}
  solve(bo) {
    let find = this.findEmpty(bo);
    if(!find) return true;
    const row = find[0];
    const col = find[1];
    for(let i = 1; i < 10; i++) { 
      if(this.checkRowPlacement(bo, row, col, i) &&
         this.checkColPlacement(bo, row, col, i) &&
         this.checkRegionPlacement(bo, row, col, i)
      ) { 
        bo[row][col] = i.toString();
        if(this.solve(bo)) return true;
        bo[row][col] = '.'
      }
    }
  }

  montaGrid(str) {
    let linhas = []; 
    for(let i = 0; i < 9; i++) { 
        linhas.push(str.slice((8*i)+(i*1), (9*(1+i))));
    }
    return linhas.map(i => i.split(''));
}

  valid(bo) { 
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
  montaString(bo) { 
  let string = [];
  for(let i of bo) { 
    string.push(...i)
  }
  return string.join('')
}

}
module.exports = SudokuSolver;

