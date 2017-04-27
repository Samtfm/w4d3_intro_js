// Array.prototype.uniq = () => {
//   const uniques = [];
//   console.log(this);
//   this.forEach((el) => {
//     if (!(uniques.includes(el))) {
//       uniques.push(el) ;
//     }
//   });
//   return uniques;
// };
//
// [1,2,3,4,5].uniq();


Array.prototype.uniq = function(){
  const uniques = [];
  this.forEach((el) => {
    if (!(uniques.includes(el))) {
      uniques.push(el) ;
    }
  });
  return uniques;
};

// console.log([1,2,3,4,5, 5, 5, 5].uniq());


Array.prototype.twoSum = function() {
  const results = [];
  for (let i = 0; i < this.length-1; i++){
    for (let j = i + 1; j < this.length; j++ ) {

      if (this[i]+this[j] === 0){
        results.push([i,j]);
      }
    }
  }
  return results;
};

console.log([-1, 0, 2, -2, 1].twoSum());

Array.prototype.transpose = function() {
  const transposed = [];
  for (let i = 0; i < this.length; i++) {
    transposed[i] = [];
    for (let j = 0; j < this.length; j++) {
      transposed[i][j] = this[j][i];
    }
  }
  return transposed;
};

const transposed = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]].transpose();

console.log(transposed);

Array.prototype.myEach = function(callback){
  for (let i = 0; i < this.length; i++){
    callback(this[i]);
  }
};

Array.prototype.myMap = function(callback){
  const mapped = [];
  this.myEach(function(el){
    mapped.push(callback(el));
  });
  return mapped;
};
function timesTwo(num){
  return num * 2;
}
console.log([1,2,3].myMap(timesTwo));

Array.prototype.myInject = function(base, callback){
  let sum;
  if (base === undefined){
    sum = this[0];
  }
  else {
    sum = callback(base, this[0]);
  }
  this.slice(1).myEach((el) => {
    sum = callback(sum, el);
  });
  return sum;
};

console.log([1,2,3].myInject(5, function(sum, el) {
  return sum * el;
}));


Array.prototype.bubbleSort = function() {
  let flagSorted = false;
  while (!flagSorted) {
    flagSorted = true;
    for (let i = 0; i < this.length-1; i++){
      let prev = this[i];
      let next = this[i+1];
      if (prev > next){
        flagSorted = false;
        this[i] = next;
        this[i+1] = prev;
      }
    }
  }
  return this;
};

String.prototype.subStrings = function() {
  const results = [];
  for (let i = 0; i < this.length; i++){
    for (let j = i + 1; j <= this.length; j++){
      results.push(this.slice(i, j));
    }
  }
  return results;
};

console.log("Sam!".subStrings());

function range(start, end){
    if (end < start) return [];
    return range(start,end-1).concat([end]);
}

function sumArray(arr){
  let sum = 0;
  for (let i = 0; i < arr.length; i++){
    sum += arr[i];
  }
  return sum;
}

function recSumArray(arr) {
  if (arr.length === 1) return arr[0];

  return arr.pop() + recSumArray(arr);
}

function exponent(num, exp){
  if (exp === 0) {
    return 1;
  }
  return num * exponent(num, exp-1);
}

function exponent2(num, exp){
  if (exp === 0) {
    return 1;
  }
  if (exp === 1){
    return num;
  }
  if (num % 2 === 0){
    let expVal = exponent2(num, exp/2);
    return expVal * expVal;
  } else {
    let expVal = exponent2(num, (exp-1)) ;
    return num * expVal;
  }
}

function fib(n) { //recursive
  if (n === 1) return [1];
  if (n === 2 ) return [1, 1];
  const prevFibs = fib(n-1);
  const newNum = prevFibs[prevFibs.length - 1] + prevFibs[prevFibs.length - 2];
  prevFibs.push(newNum);
  return prevFibs;
}

function fib_iter(n) {
  if (n === 1) return [1];
  if (n < 1) return [];
  const fibArr = [1, 1];
  while (fibArr.length < n) {
    fibArr.push(fibArr[fibArr.length-1] + fibArr[fibArr.length-2]);
  }
  return fibArr;
}


function bSearch(array, target) {
  if (array.length === 0) return null;
  const midIndex = array.length / 2;
  if (array[midIndex] === target) {
    return midIndex;
  } else if (array[midIndex] < target) {
    const rightSide = bSearch(array.slice(midIndex+1), target);
    if (rightSide === null) return null;
    return 1 + midIndex + rightSide;
  } else {
    return bSearch(array.slice(0,midIndex));
  }
}


function makeWorseChange(amount, coins) {
  if (amount <= 0) return [];
  let biggestCoin;
  for (let i = 0; i < coins.length; i++){
    if (coins[i] <= amount) {
      biggestCoin = coins[i];
      amount -= biggestCoin;
      return [biggestCoin].concat(makeWorseChange(amount, coins));
    }
  }
}

// console.log(makeWorseChange(14, [10, 7, 1]));

function makeBetterChange(amount, coins){
  if (amount <= 0) return [];
  let maxLen = null;
  let bestChange;
  for (let i = 0; i < coins.length; i++){
    if (coins[i] > amount) continue;
    const change = [coins[i]].concat(makeBetterChange(amount-coins[i], coins));
    if (maxLen === null || change.length < maxLen) {
      bestChange = change;
      maxLen = change.length;
    }
  }
  return bestChange;
}

console.log(makeBetterChange(14, [10, 7, 1]));


function mergeSort(arr) {
  console.log(arr);
  if (arr.length === 0 || arr.length === 1){
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  const leftHalf = mergeSort(arr.slice(0, mid));
  const rightHalf = mergeSort(arr.slice(mid));

  return merge(leftHalf, rightHalf);
}

function merge(leftHalf, rightHalf) {
  console.log(leftHalf + " " + rightHalf);
  const merged = [];
  while (leftHalf.length > 0 && rightHalf.length > 0) {
    if (leftHalf[0] > rightHalf[0]){
      merged.push(rightHalf.shift());
    } else{
      merged.push(leftHalf.shift());
    }
  }
  return merged.concat(leftHalf).concat(rightHalf);
}

function subsets(arr) {
  if (arr.length === 0) return [[]];
  const el = arr.pop();
  const subs = [];
  const prev_subs = subsets(arr);
  for (let i = 0; i < prev_subs.length; i++){
    subs.push(prev_subs[i]);
    subs.push(prev_subs[i].concat([el]));
  }
  return subs;
}
console.log(subsets([1,2,3]));
