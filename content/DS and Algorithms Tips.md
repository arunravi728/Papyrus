---
title: DS and Algo Tips
created: Wednesday - 1st January, 2025
updated: Monday - 6th January, 2025
share: true
---

Self Link: [DS and Algorithms Tips](DS%20and%20Algorithms%20Tips.md)

### STL

1. When comparing C++ `qsort` vs STL `sort`, STL `sort` runs a lot faster than `qsort` as it is not optimized for one type of data structure - https://www.geeksforgeeks.org/c-qsort-vs-c-sort/.

### Arrays

1. Always look for edge cases, specifically if the array is empty or smaller than the required length.
1. When dealing with string, check if the characters are lowercase, uppercase, alphanumeric etc.

### Min Heap

1. General structure of using priority queues to implement heaps. The following code block shows the implementation of a min heap - 

````c++
struct compare {
	bool operator() (Object a, Object b) {
		return a.value() < b.value();
	}
};

priority_queue<Object obj, vector<Object>, compare> pq();
````
