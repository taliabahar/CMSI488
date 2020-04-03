# Homework #3 Exercises

1. (8 pts) Classify the following as a syntax error, semantic error, or not a compile time error. In the case where code is given, assume all identifiers are properly declared and in scope. All items refer to the Java language.

a. x+++-y   

    Syntax Error

b. x---+y

    Syntax Error

c. incrementing a read-only variable

    Semantic Error

d. accessing a private field in another class

    Semantic Error

e. Using an uninitialized variable

    Semantic Error

f. Dereferencing a null reference

    Semantic Error

g. null instanceof C

    Not a Compiler Error

h. !!x

    Not a Compiler Error


2. (6 pts) Here’s a code fragment in some generic language:


 ![Code Fragment](https://i.imgur.com/Lf4e6Xd.png)



For each of the following outputs, state scope rules that would have caused them:

a. 3
   5

b. undefined NaN

c. Error on line 3: x is not declared

d. 75354253672
   75354253674

e. 3
  -23482937128

f. Error on line 4: x used in its own declaration


3. (5 pts) Describe the semantics of private in Ruby and C#. (Hint: they’re quite different.) Write well. You won’t get any points for a poorly written description.

| Language | 'private' Semantics |
| --- | --- |
| Ruby | Ruby uses keywords ‘public’, ‘protected’, or ‘private’ to manage visibility of code. By default, all methods in Ruby are public, however global methods under the Object class and instance methods are implicitly private. When programming in Ruby, you can use ‘private’ with or without an argument- passing an argument with the keyword ‘private’ assigns that particular method private accessibility, however using ‘private’ with no argument assigns all methods following the keyword private accessibility. Unlike in C#, ‘private’ in Ruby means that the member is private to only the instance the member belongs to. |
| C# | Similar to Ruby, C# also uses ‘public’, ‘protected’, and ‘private’ to accessibility management throughout a program. However, the semantics of the keyword ‘private’ differ from those of Ruby. In C#, ‘private’ only grants access to the member within the same class or struct (unlike Ruby in which the member is private to the instance that it is declared in). Also in C#, classes and structs have private access by default. |