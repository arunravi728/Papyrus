---
title: First Rust Program
share: true
---

* Rust, like C/C++, is an ahead-of-time statically compiled language.
* The Rust compiler uses [LLVM](./LLVM.md) on the backend.

### Anatomy of a Rust Program

````rust
// By default, Rust brings in items defined in the Standard Library.
// This is called the prelude.
//
// Anything not in the prelude can be brought in through the `use` statement.
use std::io;
use std::cmp::Ordering;
use rand::Rng;

// The fn keyword is used to specify a Rust function.
//
// The `main` function is special. It is similar to the C/C++ main function.
// It is the first piece of code that runs in every executable Rust program.
fn main() {

	// The `!` after println indicates a Rust macro and not a function.
	// This is done because Rust functions do not take a variable number of
	// function arguments. Thus, using a macro for printing circumvents that,
	// as prints generally have a variable number of arguments.
	println!("Guess the number!");

	// The `let` statement is used to create variables.
	// Rust variables are statically typed.
	let secret_number = rand::thread_rng().gen_range(1..=100);

	loop {
		println!("Please input your guess!");

		// In Rust, variables are immutable by default.
		// The `mut` keyword specifies that the variable is mutable.
		let mut guess = String::new();
	
		// The `&` indicates a reference.
		// References are immutable by default.
		// The `mut` keyword makes it a mutable reference.
		//
		// The read_line function returns a `Result` value, encoding the error
		// This is an `enum`. Each state of an `enum` is a `variant`.
		// An instance of `Result` has an `expect` method.
		io::stdin()
			.read_line(&mut guess)
			.expect("Failed to read line");
	
		// Here we employ shadowing. It allows us to reuse variable names.
		// Used frequently when converting variables from one type to another.
		// There is no implicit type conversion in Rust, and hence we use shadowing.
		//
		// The type specified after `:` tells the parse function what type to
		// convert the string into. The `:` is used for time annotating types.
		//
		// Here we use a match instead of an expect.
		// This helps us handle the error instead of crashing.
		let guess: u32 = match guess.trim().parse() {
			Ok(num) => num,
			Err(_) => continue,    // _ is a catch all value
		};
	
		// Here we compare `guess` and `secret_number`.
		// Returns a variant of the `Ordering` enum.
		// The `match` statement is a control statement on the variant returned.
		match guess.cmp(&secret_number) {
			Ordering::Less => println!("Too Small");
			Ordering::Greater => println!("Too Big");
			Ordering::Equal => {
				println!("You Win!");
				break;
			}
		}
	}
}
````

### Crates

* A crate is a collection of Rust source files.
* There are two types of crates - 
  1. Binary crates
  1. Library crates

When using new crates, add them to the `Cargo.toml` file along with the required version number. While building dependencies, [Cargo](./Cargo.md) build everything from the registry that the dependency needs.

The registry is where people from Rust ecosystem post their libraries.
