---
title: Cargo
share: true
---

* Cargo is Rust's build system and package manager.
* Cargo handles the following - 
  * Building code.
  * Downloading libraries.
  * Build libraries/dependencies.
* You can use Cargo to create packages. Doing so does the following - 
  * `Cargo.toml` file - Cargo configuration file.
  * `src` directory - `contains main.rs`.
  * Initializes a git repository with a `.gitignore` file.
* Packages of code are called crates.
* Building a Cargo project gives a `Cargo.lock` file.
  * This is important for reproducible builds.
  * Sets the versions on the initial `cargo build` run.
  * Versions are not changed until an explicit update is called.

### Cargo Commands

1. Create a new project - `cargo new`
1. Build - `cargo build`
   * By default, build an executable with debug info.
   * Use `cargo build --release` for optimized binary.
   * Note, this would increase compile time.
1. Run - `cargo run`
1. Compilation check - `cargo check`
1. Update crate - `cargo update`
1. Format code - `cargo fmt`
