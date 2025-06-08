---
title: Reliability
share: true
---

Self Link: [Reliability](Reliability.md)

 > 
 > Reliability is the ability of a system to work as expected even when something goes wrong.

### Faults vs Failures

 > 
 > Things that can go wrong are called faults. Systems that are resilient to faults are fault-tolerant.

* A fault is defined as a component of a system deviating from the normal behavior.
* A failure is when the entire system does not behave as the user expects.
* Fault-tolerant systems prevent cascading faults from leading to a full system failure.

#### Fault Injection

* The technique of creating deliberate faults is called fault-injection.
* This keeps systems continuously tested for fault-tolerance.
* A good example of this in practice is the [Netflix Chaos Monkey](./Netflix%20Chaos%20Monkey.md).
