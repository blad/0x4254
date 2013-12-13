// Count the number of row collisions
var rowCollisions = function (a) {
  collision = 0;
  for (var i in a) {
    for (var j in a) {
      if (j != i) {
        collision = a[i] == a[j] ? collision+1 : collision;
      }
    }
  }
  return collision;
};

// Count the number of diagonal collisions
var diaCollisions = function (a) {
  collision = 0;
  for (var i in a){
    for (var j in a){
      if (i != j) {
        dp = Math.abs(i-j);
        collision = a[i] == a[j]+dp ? collision+1 : collision;
        collision = a[i] == a[j]-dp ? collision+1 : collision;
      }
    }
  }
  return collision / 2;
};

// Heuristic Evaluation Function for N Queens
var evaluate = function (s) {
  return diaCollisions(s) + rowCollisions(s);
};

var generateCandidates = function(current) {
    candidates = [];
    for (var i = 0; i < current.length; i++) {
        var start = current.slice(0, i);
        var end = current.slice(i+1,current.length);
        for (j = 1; j <= current.length; j++) {
            var c = start.concat([(Math.floor((Math.random()*current.length)+1))].concat(end));
            candidates.push(c);
        }
    }
    return candidates;
};

// Generate a random new state for the N Queens problem of size n
var generateState = function(n) {
    state = [];
    for(var i = 0; i < n; i++){
        state[i] = Math.floor(Math.random() * x + 1);
    }
    return state;
};

// Helper Function to tell us if our configuration is a solution.
var isSolution = function (config) {
    return (evaluate(config) === 0);
};

// Workhorse Hill Climbing Algorithm
var nQueensBestFirstHillClimbing = function (start) {
    var best = start;
    var current;
    var currentEval = evaluate(start);
    
    while (true) {
        current = best;
        var candidates = generateCandidates(current);
        for (var i in candidates){
          var candidateEval = evaluate(candidates[i]);
          if (candidateEval < currentEval) {
              current =  candidates[i] ;
              currentEval = candidateEval;
          }
        }

        // If current & best are STILL the same, then we reached a peak.
        if (best == current)
            return best;

        best = current;
    }
};

// Solve the N Queens problem using Random Restart Hill Climbing.
var solveNQueens = function(state) {
    count = 1;
    state = nQueensBestFirstHillClimbing(state);
    
    while (!isSolution(state)){
        // Random Restart If not a Solution.
        state = generateState(state.length);
        count++;
        state = nQueensBestFirstHillClimbing(state);
    }
    
    // Return the Number of Hill Climbing Random Restarts & the SOlution.
    return [count, state];
};


// Running the Solver for: 4 Queens
solveNQueens(generateState(4));
// or
solveNQueens([1,2,3,4]);

// Running the Solver for: 8 Queens
solveNQueens(generateState(8));
solveNQueens([1,2,3,4,5,6,7,8]);