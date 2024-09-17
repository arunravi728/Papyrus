---
title: Programming in Rust
created: Wednesday - 14th February, 2024
updated: Tuesday - 17th September, 2024
consumed: 1
share: true
---

Self Link: [Programming in Rust](Programming%20in%20Rust.md)

This note contains the various Rust concepts I picked up when reading the book - *The Rust Programming Language* by Steve Klabnik and Carol Nichols. Rust provides a variety of advantages over legacy programming languages - 

* Rust provides speed and stability - 
  * C/C++ lack stability.
  * Python lacks speed.
* Rust offers compile time memory safety -
  * No un-initialized variables.
  * No double-frees or use-after frees.
  * No `NULL` pointers.
  * No forgotten locked mutexes or data races.
  * No iterator invalidation.
* Rust has no undefined runtime behavior - 
  * Integer overflow is defined.
  * Array access is bounds checked.

List of topics to further explore - 

1. [Cargo](./Cargo.md)
1. [First Rust Program](./First%20Rust%20Program.md)
1. [Common Programming Concepts](Common%20Programming%20Concepts.md)
1. [Ownership](Ownership.md)
