module.exports = function check(str, bracketsConfig) {
  let stack = [];

  const checkOpenBracket = (char) => {
    for (let i = 0, length = bracketsConfig.length; i < length; i++) {
      let item = bracketsConfig[i];
      let isCharOpenBracket = char === item[0];

      if (isCharOpenBracket) {
        let isBracketsEquals = item[0] === item[1],
            isStackHaveEqualsOpenBracket = stack.findIndex(item => item === char) > -1;

        if (!isBracketsEquals || (isBracketsEquals && !isStackHaveEqualsOpenBracket)) {
          stack.push(char)
          return true;
        }
      }
    }

    return false;
  }

  const checkCloseBracket = (char) => {
    for (let i=0, length = bracketsConfig.length; i < length; i++) {
      let item = bracketsConfig[i]

      if (char === item[1]) {
        let lastOpenBracket = stack.pop();

        if (lastOpenBracket !== item[0]) {
          return false;
        } 
      }
    }

    return true;
  }

  for (let i=0, length = str.length; i < length; i++) {
    let char = str[i];

    if (!checkOpenBracket(char)) {
      if (!checkCloseBracket(char)) {
        return false;
      }
    }
  }

  if (stack.length > 0) {
    return false;
  }
  
  return true;
}
