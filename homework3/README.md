# Homework #3 Exercises

### 1. (8 pts) Classify the following as a syntax error, semantic error, or not a compile time error. In the case where code is given, assume all identifiers are properly declared and in scope. All items refer to the Java language.

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


### 2. (6 pts) Here’s a code fragment in some generic language:


 ![Code Fragment](https://i.imgur.com/Lf4e6Xd.png)



For each of the following outputs, state scope rules that would have caused them:

#### a. 3
#### 5


The language prioritizes global scope over local scope if the local scope is not present. Scope in this language is dynamic.


There are two possibilities for what this language allows regarding scope and redeclaration. The more likely possibility is that the language allows for redeclaration of variables by making new bindings but retaining old ones. When f() is called, the first print statement prints the value of the variable x declared in the global scope- this occurs because x has not been declared in the local scope, so the code will prioritize the global scope where x is declared. Then, another binding for x is created and is defined to be x + 2. The language will evaluate the right side of the assignment first, evaluating x + 2 to be 3 + 2 which is 5, and then will assign that value to x, so the second variable x, which exists in the local scope of f(), holds the value of 5 which is then printed in the next line of the code. 


The other possibility is that the language treats redeclaration of a variable as an assignment. In the code above, x has been globally declared and defined to hold the value 3. When f() is called, the first print statement prints the value of x, which at this point is still 3. Then, the function reassigns x. Again, the language will evaluate the right side first, initially evaluating x + 2 to be 5 and then redeclaring that value of 5 to x, so the second print statement prints 5.


#### b. undefined NaN


This language does not allow for global scope to be accessed in local scopes. Also, variables must be declared in a local scope in order for it to be used within that scope, however the language does not throw an error when trying to access a variable in a local scope if the variable has not been declared in that scope. It instead returns undefined as the value for the variable. This is why the first print statement in f() prints undefined. Then on line 4, x is declared and assigned a value of x + 2 in the local scope of f(). When evaluated, x+2 is undefined + 2. which is not a number, so the second print statement on line 5 prints NaN.



#### c. Error on line 3: x is not declared

In this case, language does not allow for global scope to be accessed in local scopes. The code results in an error on line 3 because it is trying to access a variable that has not been declared in the scope of f() yet. The variable x is not declared in the local scope of the function f() before line 3, and so f() does not know what x is, thus throwing an error.


#### d. 75354253672
#### 75354253674


In this language, the scope of x begins after it is declared, but in order for x to be used within the local scope, x needs to be defined within that scope too, so in the local scope of f(), the program can see that x exists, but cannot see the value it holds. When the first print statement is called on line 3, it prints where x which is in memory: 75354253672. Then when x is declared to be x + 2, x + 2 is evaluated first to be the value of where x is pointing to in memory plus 2, so 75354253672 + 2 which is 75354253674, which is printed by the print statement on line 5.


#### e. 3
#### -23482937128


  In this language, the scope of a variable begins after its declaration, and local scope can access global scope when local scope is not present. Since x has not been declared in the local scope of f(), the program prioritizes the global scope, so the first print statement prints 3, but after x is redeclared, the x in x+2 now sees the new binding that is not longer from the global scope, so x now holds the value of where it is located in memory plus 2, which in this case is -23482937128


#### f. Error on line 4: x used in its own declaration


This language allows redeclaration, but does not retain old bindings upon creating new ones. On line 4 of the code, the left side is evaluated first, so var x is being assigned a value of x + 2, however since x does not hold a value yet, the declaration uses itself. This means that the program is trying to assign a value to x that is dependent on itself, however x has not been assigned anything yet, therefore the code throws an error.



### 3. (5 pts) Describe the semantics of private in Ruby and C#. (Hint: they’re quite different.) Write well. You won’t get any points for a poorly written description.


| Language | 'private' Semantics |
| --- | --- |
| Ruby | Ruby uses keywords ‘public’, ‘protected’, or ‘private’ to manage visibility of code. By default, all methods in Ruby are public, however global methods under the Object class and instance methods are implicitly private. When programming in Ruby, you can use ‘private’ with or without an argument- passing an argument with the keyword ‘private’ assigns that particular method private accessibility, however using ‘private’ with no argument assigns all methods following the keyword private accessibility. Unlike C#, ‘private’ in Ruby means that the member is private to only the instance the member belongs to. In Ruby, visibility defined by the keywords ‘public’, ‘protected’, and ‘private’ is dynamic, meaning you can modify the visibility later on. For example, we can initialize d as public and modify the visibility to be private after the declaration      def d; 2; end
public     private :d Additionally, if you try to access a restricted method you will receive an ‘access violation runtime error.’ |
| C# | Similar to Ruby, C# also uses ‘public’, ‘protected’, and ‘private’ for accessibility management throughout a program. However, the semantics of the keyword ‘private’ differ from those of Ruby. In C#, ‘private’ only grants access to the member within the same class or struct (unlike Ruby in which the member is private to the instance that it is declared in). Also in C#, classes and structs have private access by default. In C#, if you attempt to access a private member outside of a class, C# throws a Compile-Time error. |

Information researched from 

https://cs.lmu.edu/~ray/notes/introruby/
http://rubylearning.com/satishtalim/ruby_access_control.html
http://ruby-for-beginners.rubymonstas.org/advanced/private_methods.html
https://www.rubyguides.com/2018/10/method-visibility/

https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/private
https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers
https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/accessibility-levels
