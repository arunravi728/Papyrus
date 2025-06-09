---
title: Scalability
share: true
---


 > 
 > Scalability is the ability of a system to cope with increased loads.

The load on a system is defined by various load parameters based on the architecture of the system. An example of a load parameter would be the number of requests per second for an RPC server. The performance of the system is evaluated as the load parameter changes along with the change in resources required to serve that load.

### Performance Metrics

Generally, average performance (the mean) is not a very good indicator, as it does not tell us anything about the number of users/services experiencing performance degradation. Percentiles and median measures are widely used, as they give us clear indicators of the percentage of users/services experiencing regressions. Most services have their Service Level Agreements (SLAs) and Service Level Objectives (SLOs) described in terms of percentiles.

There are two approaches to make a system scalable - 

1. Vertical Scaling - using more powerful machines
1. Horizontal Scaling - Distributing load across multiple machines.
   Usually, good architectures are a combination of vertical and horizontal scaling.
