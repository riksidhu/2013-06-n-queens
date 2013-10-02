// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)


   var makeEmptyMatrix = function(n){
      return _(_.range(n)).map(function(){
        return _(_.range(n)).map(function(){
          return 0;
        });
      });
    };

window.toggle = function (array) {
  if (array[0] === 1) {
    array[0] = 0;
    return array[0];
  }
  if (array[0] === 0) {
     array[0]  = 1;
     return array[0];
  }
};

window.findNRooksSolution = function(n){

  var solution = undefined;

  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){

  var factorial = function (n){ 
    if (n===0){
      return 1;
    } else {
      return (n * factorial(n - 1));
    }
  };
  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// N-queens solution
var nQueens = function(n, solutionCount, row, columnCollisions, majorDiaCollisions, minorDiaCollisions){
  columnCollisions = columnCollisions || {};
  majorDiaCollisions = majorDiaCollisions || {};
  minorDiaCollisions = minorDiaCollisions || {};
  row = row || 0;
  solutionCount = solutionCount || 0;

  for(var i = 0; i < n; i++) {
    if (row < n) {
      // if there are no conflicts...
      if (columnCollisions[i] !== true || columnCollisions[i] === undefined) {
        if (majorDiaCollisions[i - row] !== true || majorDiaCollisions[i - row] === undefined) {
          if (minorDiaCollisions[i + row] !== true || minorDiaCollisions[i + row] === undefined) {
            columnCollisions[i] = true;
            majorDiaCollisions[i - row] = true;
            minorDiaCollisions[i + row] = true;
            // do a deep copy of each object
            var cloneColumnCollisions = deepCopy(columnCollisions);
            var cloneMajorDiaCollisions = deepCopy(majorDiaCollisions);
            var cloneMinorDiaCollisions = deepCopy(minorDiaCollisions);
            nQueens(n, solutionCount, row + 1, cloneColumnCollisions, cloneMajorDiaCollisions, cloneMinorDiaCollisions);
          }
        }
      }
    } else {
      solutionCount += 1;
    }
  }
  return solutionCount;
};

var deepCopy = function(obj) {
  var clone = {};
  for (var key in obj) {
    clone[key] = obj[key];
  }
  return clone;
};

console.log(nQueens(4));

// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
