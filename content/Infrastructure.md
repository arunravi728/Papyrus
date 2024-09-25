---
title: Infrastructure
created: Saturday - 17th February, 2024
updated: Tuesday - 24th September, 2024
consumed: 1
share: true
---

Self Link: [Infrastructure](Infrastructure.md)

Distributed systems is a means to provide infrastructure for scalable and reliable applications. The different types of distributed infrastructure that can be provided are - 

1. Storage
1. Networking (What I work on at Google)
1. Compute
1. [ML Systems](ML%20Systems.md) (more recent, same as compute maybe?)

A really well designed distributed systems would be able to hide the fact that the underlying infrastructure is distributed -> Note this is very hard to achieve.

Infrastructure in general needs to be - 

1. Scalable
1. Available
1. Recoverable
1. Replicated
1. Consistent

 > 
 > \[!Note\] Strong vs Weak Consistency
 > Strong consistency ensures that a read always returns the value from the latest write. Weak consistency is more flexible and does not guarantee that the latest write will be returned on a read.
