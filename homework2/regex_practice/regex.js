module.exports = {
  isAdaFloat(s) {
    return /^(\d_?)+((\.(\d_?)+)?((e|E)-?((\d_?)+)))?$|^(\d_?)+#\w+(.\w+)?#((e|E)-?((\d_?)+))?$/.test(s)
  },
  isEightThroughTwentyNine(s) {
    return /^([8-9]|((1|2)\d))(\.(\d*))?$/.test(s)
  },
  isNotDOgDoorDenNoLookAround(s) {
    return /^(?!(dog|door|den)$)[a-zA-Z]*$/.test(s)
  },
  isDivisibleBy64(s) {
    return /^1[0-1]*0{6}$|^0$/.test(s)
  },
}
