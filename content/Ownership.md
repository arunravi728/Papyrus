---
title: Ownership
created: Saturday - 21st September, 2024
updated: Saturday - 21st September, 2024
consumed: 1
share: true
---

Self Link: [Ownership](Ownership.md)

 > 
 > Ownership enables Rust to make memory safety guarantees without needing a garbage collector.

* Ownership is a set of rules that state how a Rust program manages memory.
* Generally languages use one of two ways to manage memory - 
  * Run a garbage collector that looks for no longer used memory.
  * Explicitly allow and free memory.
* Rust uses a set of ownership rules that the compiler checks.
  * If any of the rules are violated, the program won't compile.
  * Since the rules are tested at compile time, the program won't have a performance hit.

### Ownership Rules

1. Each value in Rust must have an owner.
1. Each value can have only one owner at a time.
1. When the owner goes out of scope, the value is dropped.

### Memory Allocation

For allocating dynamic objects like vectors and strings at runtime, we need to do the following - 

1. Memory must be requested from the memory monitor at runtime.
1. Memory needs to be returned to the memory allocator when the object is no longer needed.

Traditionally languages have dealt with this in one of two ways - 

1. Use a garbage collector - makes the program slower.
1. Put the onus to return memory on the programmer - is error prone, the programmer can waste memory, cause either use-after-frees or double-frees.

Rust deals with this by returning memory when an object goes out of scope. It does so by calling the `drop` function.

#### Move Semantics

Generally for objects allocated on the heap, the stack stores the corresponding pointer to memory. 
Most languages, employ a shallow-copy when assigning one object to another. In other words, only the contents on the stack get assigned to the new object, thus, the program has two objects pointing to the same address in memory. If the programmer frees both objects, a double free occurs, possibly causing memory corruption and security vulnerabilities.

Rust instead of using a shallow-copy, uses moves by default. The move invalidates the older object when it is assigned to a newer one. This way the program has only one object pointing to a particular point in memory, avoiding double frees.

````rust
let s1 : String::from("Hello");

let s2 = s1;

// The string s2 is valid here, and hello is printed.
println!("{}", s2);

// The string s1 is not valid here.
// Rust invalidated s1 when it moved it's contents to s2.
println!("{}", s1);
````

 > 
 > \[!note\]  Rust Deep Copy
 > 
 > Rust never deep copies any objects by default. Thus, any automatic copying can be considered to be inexpensive in terms of runtime performance. The programmer needs to explicitly request a deep copy by using the `copy` method.
