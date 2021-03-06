const ohm = require('ohm-js')

function isCanadianPostalCode(s) {
  const grammar = ohm.grammar(`CanadianPostalCode {
      postalCode = ~("D" | "F" | "I" | "O" | "Q" | "U" | "W" | "Z") upper digit upper " " digit upper digit
   }`)
  return grammar.match(s).succeeded()
}

function isVisa(s) {
  const grammar = ohm.grammar(`VisaNumber {
      visaNumber = "4" digit digit digit digit digit digit digit digit digit digit digit digit (digit digit digit)?
   }`)
  return grammar.match(s).succeeded()
}

function isMasterCard(s) {
  const grammar = ohm.grammar(`MastercardNumber {
      mastercardNumber = "5" "0" .. "5" digit digit digit digit digit digit digit digit digit digit digit digit digit digit
   }`)
  return grammar.match(s).succeeded()
}

function isDivisibleBy64(s) {
  const grammar = ohm.grammar(`IsDivisibleBy64 {
      isDivisibleBy64 = (~("000000" end) ("0"|"1"))* "000000"   -- nonzero
                      | "0"+                                    -- zero
   }`)
  return grammar.match(s).succeeded()
}

function isAdaFloat(s) {
  const grammar = ohm.grammar(`AdaFloat {
      float = digits (frac | based)? exp?
      digits = digit ("_"? digit)*
      frac = "." digits
      based = "#" hexDigits ("." hexDigits)? "#"
      hexDigits = hexDigit ("_"? hexDigit)*
      exp = ("E" | "e") ("+" | "-")? digits
   }`)
  return grammar.match(s).succeeded()
}

function isEightThroughTwentyNine(s) {
  const grammar = ohm.grammar(`IsEightThroughTwentyNine {
        isEightThroughTwentyNine = "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20"
                                 | "21" | "22"|  "23" | "24" | "25" | "26" | "27" | "28" | "29"
    }`)
  return grammar.match(s).succeeded()
}

function isMLComment(s) {
  const grammar = ohm.grammar(`IsMLComment {
      comment = "(*"  (~("*)") (any))* "*)"
   }`)
  return grammar.match(s).succeeded()
}

function isNotDogDoorDenWithLookAround(s) {
  const grammar = ohm.grammar(`IsNotDogDoorDenWithLookAround {
      isNotDogDoorDenWithLookAround = ~keyword  alnum*
      keyword                       = ("dog" | "door"  | "den") ~alnum
   }`)
  return grammar.match(s).succeeded()
}

function isNotDogDoorDenNoLookAround(s) {
  const grammar = ohm.grammar(`isNotDogDoorDenNoLookAround {
      comment = ("a".."c" | "e".."z" | "A".."Z") letter*                     --noD
              | "d" ("a".."d" | "f".."n" | "p".."z" | "A".."Z") letter*      --dWithoutOE
              | "do" ("a".."f" | "h".."n" | "p".."z" | "A".."Z") letter*     --doWithoutGO
              | "dog" letter+                                                --dog
              | "doo" ("a".."q" | "s".."z" | "A".."Z") letter*               --dooWithoutR
              | "door" letter+                                               --door
              | "doo"                                                        --doo
              | "de" ("a".."m" | "o".."z" | "A".."Z") letter*                --denWithoutN
              | "den" letter+                                                --den
              | letter letter letter letter letter+                          --bigWords
              | letter? letter?                                              --smolWords
   }`)
  return grammar.match(s).succeeded()
}

module.exports = {
  isCanadianPostalCode,
  isVisa,
  isMasterCard,
  isEightThroughTwentyNine,
  isMLComment,
  isDivisibleBy64,
  isAdaFloat,
  isNotDogDoorDenWithLookAround,
  isNotDogDoorDenNoLookAround,
}
