// // An interpreter for Ael.
// //
// // Example usage:
// //
// //   $ node ael-interpreter.js 'print 2; x = 22; print 1 + x / 2;'
// //   2
// //   12
// //Add to the language Ael a (1)right-associative exponentiation operator
// //and (2) a while-statement, and (3) write an interpreter for the extended language.

// const ohm = require("ohm-js");
// const aelGrammar = ohm.grammar(`Ael {
//   Program = (Statement ";")+
//   Statement = id "=" Exp       --assign
//             | "while" "(" Exp ")" "{" Program "}" --while
//             | print Exp        --print
//   Exp       = Exp "+" Term     --plus
//             | Exp "-" Term     --minus
//             | Term
//   Term      = Term "*" Pow  --times
//             | Term "/" Pow  --divide
//             | Pow
//   Pow       = Factor "**" Pow --power
//             | Factor
//   Factor    = "-" Primary      --negate
//             | Primary
//   Primary   = "(" Exp ")"      --parens
//             | number
//             | id
//   number    = digit+
//   print     = "print" ~alnum
//   id        = ~print letter alnum*
// }`);
// const memory = new Map();
// // This language is so simple, we don't need an AST.
// const interpreter = aelGrammar
//   .createSemantics()
//   .addOperation("exec", {
//     Program(ss, _semicolons) {
//       ss.exec();
//     },
//     Statement_assign(i, _eq, e) {
//       memory.set(i.sourceString, e.eval());
//     },
//     Statement_while(
//       _w,
//       _openParen,
//       e,
//       _closeParen,
//       _openCurly,
//       p,
//       _closeCurly
//     ) {
//       while (e.eval()) {
//         p.exec();
//       }
//     },
//     Statement_print(_, e) {
//       console.log(e.eval());
//     }
//   })
//   .addOperation("eval", {
//     Exp_plus(e, _op, t) {
//       return e.eval() + t.eval();
//     },
//     Exp_minus(e, _op, t) {
//       return e.eval() - t.eval();
//     },
//     Pow_power(f, _op, p) {
//       return f.eval() ** p.eval();
//     },
//     Term_times(t, _op, f) {
//       return t.eval() * f.eval();
//     },
//     Term_divide(t, _op, f) {
//       return t.eval() / f.eval();
//     },
//     Factor_negate(_op, p) {
//       return -p.eval();
//     },
//     Primary_parens(_open, e, _close) {
//       return e.eval();
//     },
//     number(_chars) {
//       return +this.sourceString;
//     },
//     id(_firstChar, _restChars) {
//       return memory.get(this.sourceString);
//     }
//   });
// const match = aelGrammar.match(process.argv[2]);
// if (match.succeeded()) {
//   interpreter(match).exec();
// } else {
//   console.error(match.message);
//   process.exitCode = 1;
// }

// An interpreter for Ael.
//
// Example usage:
//
//   $ node ael-interpreter.js 'print 2; x = 22; print 1 + x / 2;'
//   2
//   12
//Add to the language Ael a (1)right-associative exponentiation operator
//and (2) a while-statement, and (3) write an interpreter for the extended language.

const ohm = require("ohm-js");
const aelGrammar = ohm.grammar(`Ael {
  Program = (Statement ";")+
  Statement = id "=" Exp       --assign
            | print Exp        --print
            | "while" "(" Exp ")" "{" Program "}"  --while
  Exp       = Exp "or" Exp1    --binary
            | Exp1
  Exp1      = Exp1 "and" Exp2  --binary
            | Exp2
  Exp2      = Exp2 relop Exp3  --binary
            | Exp3
  Exp3      = Exp3 "+" Term     --plus
            | Exp3 "-" Term     --minus
            | Term
  Term      = Term "*" Pow  --times
            | Term "/" Pow  --divide
            | Pow
  Pow       = Factor "**" Pow --power
            | Factor
  Factor    = "-" Primary      --negate
            | Primary
  Primary   = "(" Exp ")"      --parens
            | number
            | id
  number    = digit+
  relop     =  LessThanOrEqual | LessThan | Equal | NotEqual | GreaterThanOrEqual | GreaterThan
  LessThanOrEqual = "<="
  LessThan = "<"
  Equal = "==="
  NotEqual = "!=="
  GreaterThanOrEqual = ">="
  GreaterThan = ">"
  print     = "print" ~alnum
  id        = ~print letter alnum*
}`);
const memory = new Map();
// This language is so simple, we don't need an AST.
const interpreter = aelGrammar
  .createSemantics()
  .addOperation("exec", {
    Program(ss, _semicolons) {
      ss.exec();
    },
    Statement_assign(i, _eq, e) {
      memory.set(i.sourceString, e.eval());
    },
    Statement_print(_, e) {
      console.log(e.eval());
    },
    Statement_while(_w, _openParen, e, _closeParen, _openCurly, p, _closeCurly) {
      while (e.eval()) {
        p.exec()
      }
    },
  })
  .addOperation("eval", {
    Exp_binary(e, _op, t) {
      return e.eval() || t.eval();
    },
    Exp1_binary(e, _op, t) {
      return e.eval() && t.eval();
    },
    Exp2_binary(e, op, t) {
      return e.eval() op t.eval();  //need to parse the op here, online research seems to suggest we might need an AST. basically just need some way to translate the op to a js function ie <=
    },
    Exp3_plus(e, _op, t) {
      return e.eval() + t.eval();
    },
    Exp3_minus(e, _op, t) {
      return e.eval() - t.eval();
    },
    Pow_power(f, _op, p) {
      return f.eval() ** p.eval();
    },
    Term_times(t, _op, f) {
      return t.eval() * f.eval();
    },
    Term_divide(t, _op, f) {
      return t.eval() / f.eval();
    },
    Factor_negate(_op, p) {
      return -p.eval();
    },
    Primary_parens(_open, e, _close) {
      return e.eval();
    },
    number(_chars) {
      return +this.sourceString;
    },
    id(_firstChar, _restChars) {
      return memory.get(this.sourceString);
    }
  });
const match = aelGrammar.match(process.argv[2]);
if (match.succeeded()) {
  interpreter(match).exec();
} else {
  console.error(match.message);
  process.exitCode = 1;
}
