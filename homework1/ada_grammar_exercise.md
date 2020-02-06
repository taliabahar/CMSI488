a. Relative to the other grammar rules, Exp has the lowest precedence since it is the highest rule in the tree. Compared to each other, “and” and “or” have left most precedence.
b. This AST is not possible to complete because a top level rule above Exp is necessary that allows a statement with multiple binary operators to be evaluated. 

![ADA 3b AST](https://i.imgur.com/6OOwV5w.jpg)


c. The additive operators have left associativity. This is because we evaluate everything on the left side of the operator before adding to one expression on the right side- we evaluate the expression on the left fully before evaluating the expression on the right. The relational operators are non-associative since it is not possible to have multiple relational comparisons within the same expression. For example, a < b < c is illegal.

d.

e.  Negation is given a lower precedence because in this language, multop cannot be followed by the negation of a number. For example, 8 * -5 is an illegal expression. Also, we want to avoid a double negation since comments also begin with “—“.


f. ![ADA 3b AST](https://i.imgur.com/pcfjlxE.jpg)

g. ![ADA 3b AST](https://i.imgur.com/J09DcrD.jpg) 
