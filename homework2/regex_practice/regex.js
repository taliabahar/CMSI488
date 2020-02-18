module.exports = {
  isAdaFloat(s) {
    return /^(\d_?)+((\.(\d_?)+)?(([eE])-?((\d_?)+)))?$|^(\d_?)+#\w+(.\w+)?#(([eE])-?((\d_?)+))?$/.test(s)
  },
  isEightThroughTwentyNine(s) {
    return /^([8-9]|(([12])\d))(\.(\d*))?$/.test(s)
  },
  isNotDOgDoorDenNoLookAround(s) {
    return /^(?!(dog|door|den)$)[a-zA-Z]*$/.test(s)
  },
  isDivisibleBy64(s) {
    return /^1[0-1]*0{6}$|^0$/.test(s)
  },
  isCanadianPostalCode(s) {
    return /^(?![DFIOQU]).*[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/.test(s)
  },
  isMLComment(s) {
    return /^\(\*[^(*)]*(\**)?\*\)$/.test(s)
  },
  isVisa(s) {
    return /^5[0-5][0-9]{2}([0-9]{4}){3}/.test(s)
  },
  isMasterCard(s) {
    return /^4[0-9]{3}([0-9]{4}){3}/.test(s)
  },
}
