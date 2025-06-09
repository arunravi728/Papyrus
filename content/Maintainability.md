---
title: Maintainability
share: true
---


 > 
 > Maintainability of a system determines to what degree it is simple, operable, and evolvable.

### Operability

Systems should be designed and built in a way that makes it easy for system operators to keep the service running. Good operability means making routine tasks easier, so more time can be freed up for high-priority tasks. This can be done as follows - 

1. Build good monitoring to provide visibility into runtime behavior.
1. Having meaningful default behavior with the provision to override if necessary.
1. Programming self-healing behaviors (like retries) where applicable.

### Simplicity

As software systems get larger, they become more complex and difficult to understand. With an increase in complexity, there is an increase in the chance of bugs as the underlying assumptions of the environment have a greater chance of being overlooked.

The best way to remove complexity is through good abstractions. A good abstraction can hide away a lot of complex implementation behind a clean, ready-to-use interface. Abstractions also have the added advantage of code reusability.

### Evolvability

Evolvability is the ease with which a system adapts to unprecedented future use cases and requirement changes. The evolvability of a system is closely linked to how simple it is and the quality of the abstractions it uses.
