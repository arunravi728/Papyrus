---
title: Classes
share: true
---

* Classes = Data Members + Member Functions
* An object is an instantiation of the class.
* Members of a class a guarded by access specifiers - 
  1. `private` - only accessible to members of the same class or friends (default).
  1. `protected`- accessible from derived classes.
  1. `public` - accessible anywhere the object is visible.
* Member functions can be explicitly made inline by writing the body inside the class.
  * We generally inline functions that are very simple, for example, getters and setters.

### Constructors

* Constructors are used to initialize data members of a class.
* These special functions have the same name as the class.
* Constructors don't have return types, not even void.
* Constructors are only executed when an object is created.
* Constructors can be overloaded.
* Default constructors take no arguments.

### References

* [Classes](https://cplusplus.com/doc/tutorial/classes/)
* [Templates](https://cplusplus.com/doc/tutorial/templates/)
