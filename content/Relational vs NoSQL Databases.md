---
title: Relational vs NoSQL Databases
share: true
---

The earliest databases were called hierarchical models, which represented data as a tree of records nested within records. This model worked very well for one-to-many relationships, but struggled to scale for many-to-many relations due to the excessive duplication of data required. There were two solutions explored to solve this problem - 

1. Network Model - Generalized hierarchical model.
1. Relational Model - Tabular data storage model.

### Network Model

* In the hierarchical model, each record had one parent.
* In the network model, each record could have multiple parents.
* Used pointers instead of foreign keys for accessing other records.
* Querying data was akin to moving in an n-dimensional space.
* Querying and updating data were inflexible and complex.

### Relational Model

* Data is organized into tables and rows.
* No complicated nested structures to store data.
* The query optimizer eliminated programmers from making access path decisions.
* Data in different tables is linked via the foreign key.

Given the simplicity and ease of modifying relational databases, the network model was slowly phased out. However, a fundamental drawback exists in the data representation used by relational models, known as the **Object-Relation mismatch**. This referred to the incoherence between how data was represented in a database (as relations) compared to how programming languages operated on data (as objects). This required a translation layer between the two, impacting database performance.

Modern NoSQL databases - also called Document databases - revert to storing nested records for improved coherency between data representation and data processing, which leads to improved performance.

Document databases are called schemaless, as the implicit schema is not enforced by the database. The schema is only interpreted when the data is read (schema-on-read), as opposed to traditional databases, which enforce the schema on writes (schema-on-write).

A major disadvantage of Document databases is the inherent inability to represent many-to-many relationships. This is done in relational databases through the use of joins between different tables.
