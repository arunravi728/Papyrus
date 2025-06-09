---
title: Reliability
share: true
---


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
* A good example of this in practice is the [Netflix Chaos Monkey](https://netflixtechblog.com/the-netflix-simian-army-16e57fbab116).

### Hardware Faults

Includes hard disk crashes, RAM corruption, power outages, etc. The first response to hardware faults is to add redundancy, such that when one instance dies, the redundant component takes its place and the broken one can be replaced.

 > 
 > It is highly unlikely that a large number of hardware components fail at the same time.

### Software Faults

Software faults occur when the system makes some kind of assumption about the environment it runs in, which might not be true. These types of bugs stay dormant for a long time before some unusual set of conditions triggers them. Software faults tend to cause cascading errors in other dependent components, potentially leading to system failure.

### Human Error

 > 
 > Configuration errors by operators are the leading cause of internet service outages.

The following steps can be taken to keep systems reliable despite human errors - 

1. Design APIs and abstractions that minimize the chance of errors.
1. Provide sandbox environments where people can experiment safely.
1. Test thoroughly - unit tests, integration tests, and E2E tests.
1. Allow quick and easy recovery from errors - 
   * Fast rollback of configuration changes.
   * Staged rollout of new code to catch bugs early.
1. Set up detailed monitoring and alerting.
