(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var row = this.get(rowIndex);
      var result;
      var counter = 0;
      _.each(row, function(value){
        if(value == 1){
          counter++;
        }
        if(counter > 1){
          result = true;
        } else{
          result = false;
        }
      });
      return result;
    },

    hasAnyRowConflicts: function(){
      var totalRows =_.range(this.get("n"));
      return _.reduce(totalRows, function(memo, row){
        memo = memo || this.hasRowConflictAt(row);
        return memo;
      },false,this);
    },

    columns: function(input){
      var matrix = this.rows();
      var result = _(matrix).map(function(row){
        return row[input];
      },this);
      return result;
    },

    hasColConflictAt: function(colIndex){
      var col = this.columns(colIndex);
      var result;
      var counter = 0;
      _.each(col, function(value){
        if(value == 1){
          counter++;
        }
        if(counter > 1){
          result = true;
        } else{
          result = false;
        }
      });
      return result;
    },

    hasAnyColConflicts: function(){
      var totalcols =_.range(this.get("n"));
      return _.reduce(totalcols, function(memo, col){
        memo = memo || this.hasColConflictAt(col);
        return memo;
      },false,this);
    },

    getMajorDiagonal: function(majorDiagonalColumnIndexAtFirstRow){
      var matrix = this.rows();
      var count = majorDiagonalColumnIndexAtFirstRow;
      var resultDiagonal = [];
       _.each(matrix, function(row){
        resultDiagonal.push(row[count]);
        count++;
      });
       return resultDiagonal;
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var diagonal = this.getMajorDiagonal(majorDiagonalColumnIndexAtFirstRow);
      var result;
      var counter = 0;
      _.each(diagonal, function(value){
        if(value == 1){
          counter++;
        }
        if(counter > 1){
          result = true;
        } else{
          result = false;
        }
      });
      return result;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var allDiagonals =_.range(this.get("n"));
      return _.reduce(allDiagonals, function(memo, diagonal){
        memo = memo || this.hasMajorDiagonalConflictAt(diagonal);
        return memo;
      },false,this);
    },

    getMinorDiagonal: function(minorDiagonalColumnIndexAtFirstRow){
      var matrix = this.rows();
      var count = minorDiagonalColumnIndexAtFirstRow;
      var resultDiagonal = [];
       _.each(matrix, function(row){
        resultDiagonal.push(row[count]);
        count--;
      });
       return resultDiagonal;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var diagonal = this.getMinorDiagonal(minorDiagonalColumnIndexAtFirstRow);
      var result;
      var counter = 0;
      _.each(diagonal, function(value){
        if(value == 1){
          counter++;
        }
        if(counter > 1){
          result = true;
        } else{
          result = false;
        }
      });
      return result;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var allDiagonals =_.range(this.get("n"));
      return _.reduce(allDiagonals, function(memo, diagonal){
        memo = memo || this.hasMinorDiagonalConflictAt(diagonal);
        return memo;
      },false,this);
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
