module.exports = {
    isCanadianPostalCode(s) {
      return /^(?![ DFIOQU]).*[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/.test(s)
    },
    isVisa(s) {
      return /^4\d{3}(\d{4}){2}(\d{1,4})$/.test(s)
    },
    isMasterCard(s) {
      return /^5[0-5]\d{2}(\d{4}){3}$/.test(s)
    },
    isAdaFloat(s) {
      return /^(\d(_\d)?)+((\.(\d_?)+)?(([eE])[+-]?((\d_?)+)))?$|^(\d_?)+#\w+(.\w+)?#(([eE])-?((\d_?)+))?$/.test(s)
    },
    isDivisibleBy64(s) {
      return /^1[0-1]*0{6}$|^0+$/.test(s)
    },
    isEightThroughTwentyNine(s) {
      return /^([8-9]|(([12])\d))(\.(\d*))?$/.test(s)
    },
    isMLComment(s) {
      return /^\(\*((?!\*\)).)*(\*\))$/.test(s)
    },
    isNotDogDoorDenWithLookAround(s) {
      return /^(?!(dog|door|den)$)[a-zA-Z]*$/.test(s)
    },
    isNotDogDoorDenNoLookAround(s) {
      return /^(d?o?o?e?|[^d][a-zA-z]*|[d][^(o|e)][[a-zA-z]*|[d][e][^n][[a-zA-z]*|[d][e][n][[a-zA-z]+|[d][o][^(g|o)][[a-zA-z]*|[d][o][g][[a-zA-z]+|[d][o][o][^r][[a-zA-z]*|[d][o][o][r][[a-zA-z]+)$/gm.test(s)
    },
    isNotThreeEndingInOO(s) {
      return /^(?!^[a-z](oo)$)[a-z]*$/i.test(s)
    },
  }
  