a. Relative to the other grammar rules, Exp has the lowest precedence since it is the highest rule in the tree. Compared to each other, “and” and “or” have the same precedence.
b. This AST is not possible to complete because a top level rule above Exp is necessary that allows a statement with multiple binary operators to be evaluated. 

![ADA 3b AST](https://i.imgur.com/daEo9ln.jpg)


c. The additive operators are not associative because both sides of the addop have the same precedence. The relational operators are non-associative since it is not possible to have multiple relational comparisons within the same expression. For example, a < b < c is illegal.

d. No because the not operator cannot be chained together.

e.  Negation is given a lower precedence because in this language, multop cannot be followed by the negation of a number. For example, 8 * -5 is an illegal expression. Also, we want to avoid a double negation since comments also begin with “—“.


f. ![ADA 3f](https://i.imgur.com/pcfjlxE.jpg)

g. ![ADA 3g](https://i.imgur.com/J09DcrD.jpg) 
