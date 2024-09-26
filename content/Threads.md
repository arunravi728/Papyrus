---
title: RPCs and Threads
created: Wednesday - 25th September, 2024
updated: Wednesday - 25th September, 2024
consumed: 1
share: true
---

Self Link: [Threads](Threads.md)

Threads enable the following - 

* Concurrency
* Multicore Parallelism
* Convenience (periodic background tasks)

### RPCs and Threads

* We generally have an RPC service which listens for incoming requests.
* For each request, the service will spawn a separate thread to construct a response.
* On the client side, we can separate threads sending RPC requests to different RPC services.

### Asynchronous Programming

* Also called event driven programming.
* We have a task which waits for a particular event (eg: an interrupt).
* This is an alternate to concurrent programming.
* Lower overhead than concurrent programming.

### Threads vs Processes

* A process is a single program that runs with a single address space.
* A process can consist of multiple threads, where the process address space is divided up between the threads.

### Thread Challenges

1. Shared data handling
1. Thread coordination (thread communication - notifications)
1. Deadlocks (multiple threads waiting on each other)

### Open Questions

1. When a operating system context switches, does it operate on threads or processes? If it operates on processes, how does it decide which thread to run?
