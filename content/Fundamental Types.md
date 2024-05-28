---
title: Fundamental Types
created: Wednesday - 8th November, 2023
updated: Wednesday - 8th November, 2023
consumed: 1
share: true
---

Self Link: [Fundamental Types](Fundamental%20Types.md)

These are built in types that the C++ compiler implicitly understands. Some of the built in types are - 

1. Booleans
1. Characters
1. Integers
1. Single Precision Floats
1. Double Precision Floats
1. Void

 > 
 > \[!note\]
 > No variable can be of type `void`, it is primarily used to indicate a function returning nothing. `void *` can point to any variable, and needs to be casted to another type before being dereferenced.

These fundamental types can further be modified using type specifiers. These set the size and the values allowed to be stored in these types.

1. `short`
1. `long`
1. `unsigned`
1. `signed`

 > 
 > \[!note\]
 > Overflow behavior is well defined for `unsigned` integers (equivalent to the modulo operator or wrap around), but that's not the case for `signed` integers. Also, conversion from `unsigned` to `signed` integers is well defined. The reverse is true from C++20.
