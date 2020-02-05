const ohm = require("ohm-js");
const aelGrammar = ohm.grammar(`Ael {
  Program = (Statement ";")+
  Statement = id "=" Exp       --assign
            | print Exp        --print
            | "while" "(" Exp ")" "{" Program "}"  --while
  Exp       = Exp "+" Term     --plus
            | Exp "-" Term     --minus
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
      while (e.eval() != 0) {
        p.exec()
      }
    },
  })
  .addOperation("eval", {
    Exp_plus(e, _op, t) {
      return e.eval() + t.eval();
    },
    Exp_minus(e, _op, t) {
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