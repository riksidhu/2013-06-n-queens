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

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  //debugger;
  var matrix= makeEmptyMatrix(n); 
  var solutionCount = 0;
  //_.each(matrix, function(rows){
  var firstRow = matrix[0];
    var walkMatrix = function(firstRow){
        for( var i = 0; i < n; i++){
          board.togglePiece(firstRow, i);//toggle on
              if(this.hasAnyQueenConflictsOn(rowIndex,i)){
                board.togglePiece(firstRow,i);//toggle off
                walkMatrix(firstRow+1);
              } else {
                walkMatrix(firstRow +1);
              }
        }
    };
  //});
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
