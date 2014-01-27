console.log("welcome to your calc app");

while(true){
  var operator = prompt("Add (+) or Subtract (-) or Multiply (*) or Divide (/) or power (P) or factoral (!), or quit (Q)");
  if ((operator === "Q" || operator === "q"))
    break;
  console.log("Operator:", operator);
  var x = prompt("Enter your first number:");
  if (operator !== "!") //factoral operations require only one number
    var y = prompt("Enter your second number:");
  else
    var y = "0";
  console.log("Numbers:", x, y);
  x = parseFloat(x);
  y = parseFloat(y);

  if (operator === "+")
    var result = add(x, y);
  else if (operator === "-")
    var result = subtract(x, y);
  else if (operator === "*")
    var result = multiply(x, y);
  else if (operator === "/")
    var result = divide(x, y);
  else if (operator === "P")
    var result = pow(x, y);
  else if (operator === "!")
    var result = factoral(x);
  else
    var result = "you did it wrong";

  console.log(result);
}
function add(a, b){
  return a + b;
}
function subtract(a, b){
   return a - b;
}
function multiply(a, b){
  return a * b;
}
function divide(a, b){
  return a / b;
}
function pow(a, b){
  var orig = a;
  for (var count = 1;count < b;count++)
    a = a * orig;
  return a;
}
function factoral(a){
  var orig = a;
  for (var count = (orig - 1);count > 0;count--)
    a = a * (count);
  return a;
}
