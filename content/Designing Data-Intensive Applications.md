---
tags: BookNote
title: Designing Data-Intensive Applications
author: Martin Kleppmann
status: Reading
category: Non-Fiction
genre: Technology
share: true
---

Software architectures are constructed using a variety of tools, each with its strengths and weaknesses. But, underlying these new frameworks and tools are three fundamental concepts that all computer systems must observe -

* [Reliability](./Reliability.md) - Ability of a system to work correctly even when things go wrong.
* [Scalability](./Scalability.md) - Ability of a system to handle increased loads.
* [Maintainability](./Maintainability.md) - Ability of a system to be simple, operable, and evolvable.

### Data Models

Data models form an important layer of software architecture, as they have a profound impact on system design. The goal of data models is to abstract the internal representation of the data. The most commonly used data model is the relational database.

 > 
 > Data is organized into tables (relations) and columns in relational databases.

Recently, there has been a proliferation of NoSQL databases (databases that don't follow the relational paradigm). NoSQL databases hope to solve the following problems - 

1. Improve write throughputs.
1. Open source data solutions.
1. Provide a more dynamic and expressive data representation.
1. Improved one-to-many data representation.

Refer to [Relational vs NoSQL Databases](./Relational%20vs%20NoSQL%20Databases.md) for information on how these two paradigms of database management systems differ from one another.
