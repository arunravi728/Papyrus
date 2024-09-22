---
title: Common Programming Concepts
created: Tuesday - 17th September, 2024
updated: Saturday - 21st September, 2024
consumed: 1
share: true
---

Self Link: [Common Programming Concepts](Common%20Programming%20Concepts.md)

### Variables and Mutability

 > 
 > By default Rust variables are immutable. This makes the programmer explicitly state the mutable nature of a variable if required.

* The `mut` keyword can be used make a variable mutable.
* Variables are different from constants in Rust - 
  * Constants can never be mutable.
  * Constants are declared using the `const` keyword instead of `let`.
  * Constants should always have their type annotated.
  * Constants can be declared in any scoped.
  * Constants can only be assigned constant expressions.

#### Shadowing

Shadowing is not the same as creating a mutable variable. We can only shadow by re-declaring the variable using the keyword `let`.  Shadowing allows us to carry out multiple transformations on a variable, after which it is still immutable.

````rust
// At this point the variable x has value 1.
let x = 1;

// At this point x is shdowing the earlier declaration.
// The new value of x here is 2.
let x = x + 1;

// The new value of x here is 4.
let x = 2 * x;

{
  // The new value of x here is 12.
  let x = 3 * x;
}

// The value of x within the above scope is 12.
// But outside the scope of the inner block,
// the value of x is still 4.
println!("{}", x);
````

````Rust
// At this point spaces is of type string.
let spaces = "This is a string!";

// Now spaces is type integer.
let spaces = spaces.len();
````

One of the major uses of shadowing is changing the type of a variable. Rust does not allow the user to change the type of a variable (even if it's mutable). Rust also does not support the implicit type conversion of variables like C or C++. Instead Rust uses shadowing to force the user to explicitly change the type if they need to.

### Data Types

Rust data types are of two types - 

1. Scalar - represents a single value (Integer, floating point, boolean, and characters).
1. Compound - can group multiple variables into one type (arrays and tuples).

#### Tuples

````Rust
let tup: (bool, char, u32, f64) = (true, 'a', 18, 4.2);

// This called destructing the tuple.
// Similary to structured bindings in C++.
let (a, b, c, d) = tup;

// Individual tuple elements can be accessed with indices.
let a : bool = tup.0;
let b : char = tup.1;
let c : u32 = tup.2;
let d : f64 = tup.3;
````

* General way of grouping types together.
* Have fixed length that can't be changed.
* Tuples can have variables of different types.
* Tuples are zero indexed.
* A tuple without any value is called a unit - `()`.

#### Arrays

````Rust
// This array consists 5 elements of u32.
let arr : [u32; 5] = [1, 2, 3, 4, 5];

// This is equivalent to [1, 1, 1, 1, 1]
let arr : [u32; 5] = [5; 1];
````

* Arrays unlike tuples consist of elements of the same type.
* Arrays are of fixed lengths. Use a vector from the standard library is a dynamic array is required.
* Arrays are useful when you want data on the stack instead of the heap.

### Functions

 > 
 > Functions are declared with the `fn` keyword.

* Rust does not care where a function is defined as long as it's within the scope.
* Function signatures must declare the type of each parameter.

#### Statements vs Expressions

````Rust
// Here the instructions in the block evaluates to 4.
// These instructions don't end with a semi-colon.
// Making this block an expression instead of a statement.
// Thus the value of y is cound to 4.
let y = {
	let x = 3;
	x + 1
}
````

* Rust is an expression based language.
* Statements are instructions that perform some action and do not return a value.
* Expressions evaluate to a resultant value.
* Expressions generally don't have semi-colons.

### Control Flow

````Rust
// Here the if statments acts like the ternary operator in C/C++.
// 
// Note that the expressions in both arms should return the same type.
// This allows the compiler to understand the type at compile time,
// allowing the compiler to make sure the variable is valid everywhere.
let var = if condition {5} else {2};

let mut counter = 0;

// Here the value of result is set to 20.
// The expression after the break keyword is the value of the loop.
let result = loop {
	counter += 1;

	if counter == 10 {
		break 2 * counter;
	}
}
````

* Rust has all the regular control flow constructs like `if`, `for` and `while`.
* The `if` and `loop` expression can be used with the `let` to assign values to variables.
