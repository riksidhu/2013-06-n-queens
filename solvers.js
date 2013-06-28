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

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  debugger;

  var matrix = makeEmptyMatrix(n);
  var solutionCount = 0;
    for(var i = 0; i < n; i++){


    }

    // var walkMatrix = function(firstRow){
    //     for(var i = 0; i < n; i++){
    //       board.togglePiece(firstRow, i);//toggle on
    //           if(!this.hasAnyQueenConflictsOn(firstRow,i)){
    //             if(firstRow +1 < n){
    //               walkMatrix(firstRow+1);
    //             } else{
    //               solutionCount++;
    //             }
    //           //   board.togglePiece(firstRow,i);//toggle off
    //           // } else {
    //           //   walkMatrix(firstRow +1);
    //       }
    //       board.toggle(firstRow,i);
    //     }
    // };

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
