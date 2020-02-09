// A compiler for Ael.
//
// Example usage:
//
//   $ node ael-compiler.js --target=C 'print 42;'
//   $ node ael-compiler.js --target=JavaScript 'print 42;'
//   $ node ael-compiler.js --target=Stack 'print 42;'

// eslint-disable-next-line max-classes-per-file
const ohm = require('ohm-js')

// -----------------------------------------------------------------------------
// GRAMMAR
//
// We just specify it as a string and give it to Ohm.
// -----------------------------------------------------------------------------

const aelGrammar = ohm.grammar(`Ael {
    Program   = Block
    Block     = (Statement ";")+
    Statement = id "=" Exp                         --assign
              | print Exp                          --print
              | "while" "(" Exp ")" "{" Block "}"  --while
    Exp       = Exp ("+" | "-") Term               --binary
              | Term
    Term      = Term ("*" | "/") Pow               --binary
              | Pow
    Pow       = Factor "**" Pow                    --power
              | Factor
    Factor    = "-" Primary                        --negate
              | Primary
    Primary   = "(" Exp ")"                        --parens
              | number
              | id
    number    = digit+
    print     = "print" ~alnum
    id        = ~print letter alnum*
  }`)

// -----------------------------------------------------------------------------
// ABSTRACT SYNTAX TREE DEFINITION
//
// One class for each kind of AST Node. All we need here are constructors.
// Other phases of the compiler will add methods later.
// -----------------------------------------------------------------------------

class Program {
  constructor(body) {
    this.body = body
  }
}

class Block {
  constructor(statements) {
    this.statements = statements
  }
}

class Assignment {
  constructor(id, expression) {
    Object.assign(this, {
      id,
      expression,
    })
  }
}

class PrintStatement {
  constructor(expression) {
    this.expression = expression
  }
}

class WhileStatement {
  constructor(expression, block) {
    Object.assign(this, {
      expression,
      block,
    })
  }
}

class BinaryExp {
  constructor(left, op, right) {
    Object.assign(this, {
      left,
      op,
      right,
    })
  }
}

class Pow {
  constructor(left, right) {
    Object.assign(this, {
      left,
      right,
    })
  }
}

class UnaryExp {
  constructor(op, operand) {
    Object.assign(this, {
      op,
      operand,
    })
  }
}

class NumericLiteral {
  constructor(value) {
    this.value = value
  }
}

class Identifier {
  constructor(value) {
    this.value = value
  }
}

// -----------------------------------------------------------------------------
// PARSER
//
// Generates the AST. First we have a processor in Ohm so that Ohm can do things
// while it "matches" the source string to the grammar. The processor here is an
// "AST Builder" whose operation is called ast. Then, for fun, I added a parse
// function which hides the use of Ohm from the rest of the compiler.
// -----------------------------------------------------------------------------

const astBuilder = aelGrammar.createSemantics()
  .addOperation('ast', {
    Program(body) {
      return new Program(body.ast())
    },
    // eslint-disable-next-line no-unused-vars
    Block(statements, _) {
      return new Block(statements.ast())
    },
    Statement_assign(id, _, expression) {
      return new Assignment(id.sourceString, expression.ast())
    },
    Statement_print(_, expression) {
      return new PrintStatement(expression.ast())
    },
    // eslint-disable-next-line no-unused-vars
    Statement_while(_w, _openParen, expression, _closeParen, _openCurly, block, _closeCurly) {
      return new WhileStatement(expression.ast(), block.ast())
    },
    Exp_binary(left, op, right) {
      return new BinaryExp(left.ast(), op.sourceString, right.ast())
    },
    Term_binary(left, op, right) {
      return new BinaryExp(left.ast(), op.sourceString, right.ast())
    },
    Pow_power(left, _, right) {
      return new Pow(left.ast(), right.ast())
    },
    Factor_negate(_op, operand) {
      return new UnaryExp('-', operand.ast())
    },
    // eslint-disable-next-line no-unused-vars
    Primary_parens(_open, expression, _close) {
      return expression.ast()
    },
    // eslint-disable-next-line no-unused-vars
    number(_chars) {
      return new NumericLiteral(+this.sourceString)
    },
    // eslint-disable-next-line no-unused-vars
    id(_firstChar, _restChars) {
      return new Identifier(this.sourceString)
    },
  })

function parse(sourceCode) {
  const match = aelGrammar.match(sourceCode)
  if (!match.succeeded()) {
    throw new Error(match.message)
  }
  return astBuilder(match)
    .ast()
}

// -----------------------------------------------------------------------------
// STATIC SEMANTIC CHECKER
//
// Static semantic checking is the phase of compilation invoked right after the
// AST is made. It traverses the AST looking for errors that are too hard to
// put into the grammar. All that is needed in Ael is to check for uses of
// identifiers that have not been previously assigned to. So our "context" is
// nothing more than a set of identifiers! In a more realistic language, the
// context would be much more complex.
//
// To use, simply invoke the check() method on the root node of the AST. That's
// it. This method will return the AST, so you can chain your calls:
//
//     parse(source).check().gen()
// -----------------------------------------------------------------------------

Object.assign(Program.prototype, {
  check() {
    const context = new Set()
    this.body.check(context) // issue here
    return this
  },
})
Object.assign(Block.prototype, {
  check(context) {
    this.statements.forEach((s) => s.check(context))
  },
})
Object.assign(Assignment.prototype, {
  check(context) {
    this.expression.check(context)
    context.add(this.id)
  },
})
Object.assign(PrintStatement.prototype, {
  check(context) {
    this.expression.check(context)
  },
})
Object.assign(WhileStatement.prototype, {
  check(context) {
    this.expression.check(context)
    this.block.check(context)
  },
})
Object.assign(BinaryExp.prototype, {
  check(context) {
    this.left.check(context)
    this.right.check(context)
  },
})
Object.assign(UnaryExp.prototype, {
  check(context) {
    this.operand.check(context)
  },
})
Object.assign(Pow.prototype, {
  check(context) {
    this.left.check(context)
    this.right.check(context)
  },
})
Object.assign(NumericLiteral.prototype, {
  check() { /* Always fine */
  },
})
Object.assign(Identifier.prototype, {
  check(context) {
    if (!context.has(this.value)) {
      throw new Error(`Identifier ${this.value} has not been declared`)
    }
  },
})

// -----------------------------------------------------------------------------
// CODE GENERATOR(S)
//
// There are three different code generators here because this whole program
// is one big educational script, designed to be not only an intro to Ohm for
// compiler writing, but also to show off some concerns in compiler writing,
// like retargetability.
// -----------------------------------------------------------------------------

const generators = {}

generators.javascript = () => {
  Object.assign(Program.prototype, {
    gen() {
      return this.body.gen()
    },
  })
  Object.assign(Block.prototype, {
    gen() {
      return `${this.statements.map((s) => s.gen())
        .join('\n')}`
    },
  })
  Object.assign(Assignment.prototype, {
    gen() {
      return `let ${this.id} = ${this.expression.gen()};`
    },
  })
  Object.assign(PrintStatement.prototype, {
    gen() {
      return `console.log(${this.expression.gen()});`
    },
  })
  Object.assign(WhileStatement.prototype, {
    gen() {
      return `while (${this.expression.gen()}) {\n    ${this.block.gen()}\n}`
    },
  })
  Object.assign(BinaryExp.prototype, {
    gen() {
      return `(${this.left.gen()} ${this.op} ${this.right.gen()})`
    },
  })
  Object.assign(UnaryExp.prototype, {
    gen() {
      return `(${this.op} ${this.operand.gen()})`
    },
  })
  Object.assign(Pow.prototype, {
    gen() {
      return `${this.left.gen()} ** ${this.right.gen()}`
    },
  })
  Object.assign(NumericLiteral.prototype, {
    gen() {
      return this.value
    },
  })
  Object.assign(Identifier.prototype, {
    gen() {
      return this.value
    },
  })
}

generators.c = () => {
  generators.javascript()
  Object.assign(Program.prototype, {
    gen() {
      return `#include <stdio.h>\n#include <math.h>\nint main() {\n${this.body.gen()}\nreturn 0;\n}`
    },
  })
  Object.assign(Block.prototype, {
    gen() {
      return `${this.statements.map((s) => s.gen())
        .join('\n    ')}`
    },
  })
  Object.assign(Assignment.prototype, {
    gen() {
      return `int ${this.id} = ${this.expression.gen()};`
    },
  })
  Object.assign(PrintStatement.prototype, {
    gen() {
      return `printf("%d\\n", ${this.expression.gen()});`
    },
  })
  Object.assign(Pow.prototype, {
    gen() {
      return `pow(${this.left.gen()}, ${this.right.gen()}`
    },
  })
}

generators.stack = () => {
  const ops = {
    '+': 'ADD',
    '-': 'SUB',
    '*': 'MUL',
    '/': 'DIV',
  }

  const instructions = []

  function emit(instruction) {
    instructions.push(instruction)
  }

  Object.assign(Program.prototype, {
    gen() {
      this.body.gen()
      return instructions.join('\n')
    },
  })
  Object.assign(Block.prototype, {
    gen() {
      this.statements.forEach((s) => s.gen())
    },
  })
  Object.assign(Assignment.prototype, {
    gen() {
      this.expression.gen()
      emit(`STORE ${this.id}`)
    },
  })
  Object.assign(PrintStatement.prototype, {
    gen() {
      this.expression.gen()
      emit('OUTPUT')
    },
  })
  Object.assign(WhileStatement.prototype, {
    gen() {
      emit('LABEL L1')
      this.expression.gen()
      emit('JUMP L2')
      this.block.gen()
      emit('JUMP L1')
      emit('LABEL L2')
    },
  })
  Object.assign(Pow.prototype, {
    gen() {
      this.left.gen()
      for (let i = 0; i < this.right.value; i += 1) {
        this.left.gen()
        emit('MUL')
      }
    },
  })
  Object.assign(BinaryExp.prototype, {
    gen() {
      this.left.gen()
      this.right.gen()
      emit(ops[this.op])
    },
  })
  Object.assign(UnaryExp.prototype, {
    gen() {
      this.operand.gen()
      emit('NEG')
    },
  })
  Object.assign(NumericLiteral.prototype, {
    gen() {
      emit(`PUSH ${this.value}`)
    },
  })
  Object.assign(Identifier.prototype, {
    gen() {
      emit(`LOAD ${this.value}`)
    },
  })
}

// -----------------------------------------------------------------------------
// RUNNING THE COMPILER ON THE COMMAND LINE
// -----------------------------------------------------------------------------

if (process.argv.length !== 4 || !['-C', '-JavaScript', '-Stack'].includes(process.argv[2])) {
  console.error('Syntax: node ael-compiler.js -<C|JavaScript|Stack> program')
  process.exitCode = 1
} else {
  try {
    generators[process.argv[2].substring(1)
      .toLowerCase()]()
    // eslint-disable-next-line no-console
    console.log(parse(process.argv[3])
      .check()
      .gen())
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message)
    process.exitCode = 2
  }
}
