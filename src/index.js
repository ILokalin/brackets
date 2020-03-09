module.exports = function check(str, bracketsConfig) {
  let stack = [];

  const checkOpenBracket = (char) => {
    bracketsConfig.forEach(item => {
      let isCharOpenBracket = item[0] === char;

      if (isCharOpenBracket) {
        let isBracketsEquals = item[0] === item[1],
            isStackHeadEqualsOpenBracket = stack[stack.length - 1] === item[0]

        if (!isBracketsEquals || (isBracketsEquals && !isStackHeadEqualsOpenBracket)) {
          stack.push(char)
        }
      }
    })
  }

  const checkCloseBracket = (char) => {
    for (let i=0, length = bracketsConfig.length; i < length; i++) {
      let item = bracketsConfig[i]

      if (char === item[1]) {
        let lastOpenBracket = stack.pop();
        console.log(lastOpenBracket, char)

        if (lastOpenBracket !== item[0]) {
          console.log('finita', lastOpenBracket, item[0], char)
          return false;
        } 
      }
    }

    return true;
  }

  for (let i=0, length = str.length; i < length; i++) {
    let char = str[i];

    checkOpenBracket(char);
    if (!checkCloseBracket(char)) {
      return false;
    }
  }

  if (stack.length > 0) {
    return false;
  }
  
  return true;
}
