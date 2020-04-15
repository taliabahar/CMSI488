# Homework #3 Exercises

### 1. (8 pts) Classify the following as a syntax error, semantic error, or not a compile time error. In the case where code is given, assume all identifiers are properly declared and in scope. All items refer to the Java language.

a. x+++-y   

    Not a Compile Time Error

b. x---+y

    Not a Compile Time Error

c. incrementing a read-only variable

    Semantic Error

d. accessing a private field in another class

    Semantic Error

e. Using an uninitialized variable

    Semantic Error

f. Dereferencing a null reference

    Not a Compile Time Error

g. null instanceof C

    Not a Compile Time Error

h. !!x

    Not a Compile Time Error


### 2. (6 pts) Here’s a code fragment in some generic language:


 ![Code Fragment](https://i.imgur.com/Lf4e6Xd.png)



For each of the following outputs, state scope rules that would have caused them:

#### a. 3
#### 5

The scope of a variable begins after its declaration is complete and ends and the end of the block in which the variable is declared in. In this case, the scope of x begins after its declaration on line 1, and local scopes can access variables in the global scope, so the first print statement on line 3 prints 3. Then x is redeclared on line 4 and the scope of the redeclared x begins after redeclaration is complete. Since the declaration is not complete yet, the x is x + 2 still holds the original value of 3, so x is redeclared to hold the value of 3 + 2, which is 5. When x is printed again on line 5, the program is accessing the value of the redeclared x, so 5 is printed.


#### b. undefined NaN

In this language, the scope of a variable is the entire function in which the variable is declared in. This has the effect of completely shadowing global scope. Prior to declaration, variables are undefined. Since the first print statement is within the scope of where x is declared in f(), but is before the declaration of x, x at line 3 is undefined. Then on line 4, x is declared and assigned a value of x + 2 in the local scope of f(). When evaluated, x+2 is undefined + 2. which is not a number, so the second print statement on line 5 prints NaN.


#### c. Error on line 3: x is not declared

In this case, language does not allow for global scope to be accessed in local scopes. The code results in an error on line 3 because it is trying to access a variable that has not been declared in the scope of f() yet. The variable x is not declared in the local scope of the function f() before line 3, and so f() does not know what x is, thus throwing an error.


#### d. 75354253672
#### 75354253674


In this language, the scope of x begins after it is declared, but in order for x to be used within the local scope, x needs to be defined within that scope too, so in the local scope of f(), the program can see that x held in memory: 75354253672. Then when x is declared to be x + 2, x + 2 is evaluated first to be the value of where x is pointing to in memory plus 2, so 75354253672 + 2 which is 75354253674, which is printed by the print statement on line 5.


#### e. 3
#### -23482937128


  In this language, the scope of a variable begins after its declaration, and local scope can access global scope when local scope is not present. Since x has not been declared in the local scope of f(), the program prioritizes the global scope, so the first print statement prints 3, but after x is redeclared, the x in x+2 now sees the new binding that is not longer from the global scope, so x now holds the value of what it was pointing to in memory plus 2, which in this case happens to be -23482937128


#### f. Error on line 4: x used in its own declaration


This language allows redeclaration, but does not retain old bindings upon creating new ones. On line 4 of the code, the left side is evaluated first, so var x is being assigned a value of x + 2, however since x does not hold a value yet, the declaration uses itself. This means that the program is trying to assign a value to x that is dependent on itself, however x has not been assigned anything yet, therefore the code throws an error.



### 3. (5 pts) Describe the semantics of private in Ruby and C#. (Hint: they’re quite different.) Write well. You won’t get any points for a poorly written description.


| Language | 'private' Semantics |
| --- | --- |
| Ruby | Ruby uses keywords ‘public’, ‘protected’, or ‘private’ to manage visibility of code. By default, all methods in Ruby are public, however global methods under the Object class and instance methods are implicitly private. When programming in Ruby, you can use ‘private’ with or without an argument- passing an argument with ‘private’ assigns that particular method private accessibility, however using ‘private’ with no argument assigns all methods following the keyword private accessibility. Unlike C#, ‘private’ in Ruby means that the member is private to only the instance the member belongs to. In Ruby private is often referred to as a keyword, but in reality it is a method that is defined on the kernel module. In Ruby, visibility defined by ‘public’, ‘protected’, and ‘private’ is dynamic, meaning you can modify the visibility later on. For example, we can initialize d as public and modify the visibility to be private after the declaration. Additionally, if you try to access a restricted method you will receive an ‘access violation runtime error.’ |
| C# | Similar to Ruby, C# also uses ‘public’, ‘protected’, and ‘private’ for accessibility management throughout a program. However, the semantics of the keyword ‘private’ differ from those of Ruby. In C#, ‘private’ only grants access to the member within the same class or struct (unlike Ruby in which the member is private to the instance that it is declared in). Also in C#, classes and structs have private access by default. In C#, if you attempt to access a private member outside of a class, C# throws a Compile-Time error. |

Information researched from 

https://cs.lmu.edu/~ray/notes/introruby/
http://rubylearning.com/satishtalim/ruby_access_control.html
http://ruby-for-beginners.rubymonstas.org/advanced/private_methods.html
https://www.rubyguides.com/2018/10/method-visibility/

https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/private
https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers
https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/accessibility-levels
