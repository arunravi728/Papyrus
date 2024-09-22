---
title: Derived Types
created: Wednesday - 8th November, 2023
updated: Friday - 10th November, 2023
consumed: 1
share: true
---

Self Link: [Derived Types](Derived%20Types.md)

##### Arrays

* Continuous collections of items of a singular type.

##### Pointers

* Store addresses of other variables.
* Memory location of variable is decided at run time.
* Pointer size is architecture dependent.

##### References

* These act as aliases to variables.
* They must always be initialized and never be null.

##### Functions

* Series of statements grouped together.
* Function's type = Return Type + {Type of Parameters}

````cpp
int add(int a, int b);  // Funtion Type - int(int, int)

// There is a difference in function types when they belong to a class.
// Member functions take an implicit `this` parameter.
class Divide{ 
	int subtract(int a, int b);  // Function Type - int (Divide*)(int, int)
	static float divide(int a, int b);  // Function Type - float(int, int)
}
````

* Pointers to functions can be passed to other functions.

````cpp
int multiply(int (*)(int, int));

multiply(&add);
````

##### User Defined Types

1. Enums
1. Enum Classes
1. Structs
1. Classes
1. Unions

 > 
 > \[!tip\]
 > Enum classes are scoped, as opposed to unscoped enums. Enum classes prohibit, direct comparison with integers.
