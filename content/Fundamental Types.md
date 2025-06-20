---
title: Fundamental Types
share: true
---

These are built-in types that the C++ compiler implicitly understands. Some of the built-in types are - 

1. Booleans
1. Characters
1. Integers
1. Single Precision Floats
1. Double Precision Floats
1. Void

 > 
 > \[!note\] Void Variables
 > 
 > No variable can be of type `void`; it is primarily used to indicate a function returning nothing. A `void *` can point to any variable, and needs to be cast to another type before being dereferenced.

These fundamental types can further be modified using type specifiers. These set the size and the values allowed to be stored in these types.

1. `short`
1. `long`
1. `unsigned`
1. `signed`

 > 
 > \[!note\] Integer Overflow
 > 
 > Overflow behavior is well defined for `unsigned` integers (equivalent to the modulo operator or wrap around), but that's not the case for `signed` integers. Also, conversion from `unsigned` to `signed` integers is well defined. The reverse is true from C++20.
