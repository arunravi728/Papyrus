---
title: Stack and Heap
created: Saturday - 21st September, 2024
updated: Saturday - 21st September, 2024
consumed: 1
share: true
---

Self Link: [Stack and Heap](Stack%20and%20Heap.md)

Both the stack and heap are parts of memory that are available to the code to use at runtime.

### Stack

* The stack uses the LIFO paradigm.
* All data in the stack is of a known fixed length.
* Memory management on the stack is faster than using the Heap.

### Heap

* When data is added to the heap, the program needs to request some amount of space.
* One receiving a request, the memory monitor finds a chunk large enough and returns a pointer to the block.
* The pointer to this data block is generally stored on the stack.
