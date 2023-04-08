
//working with local storage

// create array
let arr = [1,2,3];
// set it in the local storage
localStorage.setItem("array", JSON.stringify(arr));

//parse it from the local storage
let arrayBack = JSON.parse(localStorage.getItem("array"));
console.log(arrayBack);
// iterate through the element in the local storage
for(let element of arrayBack){
  console.log(element);
}
// push in the array
arrayBack.push(5);
// set it back to the local storage
localStorage.setItem("array", JSON.stringify(arrayBack));
// gethe array from local storage
arrayBack = JSON.parse(localStorage.getItem("array"))
console.log(arrayBack)
// iterate throug it
for(let i of arrayBack){
  console.log(i);
}
//get the array from the local storage
console.log(localStorage.getItem("array"))
// take elements from the array
arrayBack.pop();
arrayBack.pop();
//get back the local storeage
localStorage.setItem("array", JSON.stringify(arrayBack));

console.log(JSON.parse(localStorage.getItem("array")))