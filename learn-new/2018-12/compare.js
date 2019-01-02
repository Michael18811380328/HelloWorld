compareTwoWord: function(wordA, wordB) {
  // compare wordA and wordB at lower case
  // if wordA >= wordB, return 1
  // if wordA < wordB, return -1

  var a_val, b_val,
    a_uni = wordA.charCodeAt(0),
    b_uni = wordB.charCodeAt(0);

  if ((19968 < a_uni && a_uni < 40869) && (19968 < b_uni && b_uni < 40869)) {
    // both are chinese words
    a_val = strChineseFirstPY.charAt(a_uni - 19968).toLowerCase();
    b_val = strChineseFirstPY.charAt(b_uni - 19968).toLowerCase();
  } else if ((19968 < a_uni && a_uni < 40869) && !(19968 < b_uni && b_uni < 40869)) {
    // a is chinese and b is english
    return 1;
  } else if (!(19968 < a_uni && a_uni < 40869) && (19968 < b_uni && b_uni < 40869)) {
    // a is english and b is chinese
    return -1;
  } else {
    // both are english words
    a_val = wordA.toLowerCase();
    b_val = wordB.toLowerCase();
    return this.compareStrWithNumbersIn(a_val, b_val);
  }

  return a_val >= b_val ? 1 : -1;
}

// compare two strings which may have digits in them
// and compare those digits as number instead of string
compareStrWithNumbersIn: function(a, b) {
  var reParts = /\d+|\D+/g;
  var reDigit = /\d/;
  var aParts = a.match(reParts);
  var bParts = b.match(reParts);
  var isDigitPart;
  var len = Math.min(aParts.length, bParts.length);
  var aPart, bPart;

  if (aParts && bParts &&
    (isDigitPart = reDigit.test(aParts[0])) == reDigit.test(bParts[0])) {
    // Loop through each substring part to compare the overall strings.
    for (var i = 0; i < len; i++) {
      aPart = aParts[i];
      bPart = bParts[i];

      if (isDigitPart) {
        aPart = parseInt(aPart, 10);
        bPart = parseInt(bPart, 10);
      }

      if (aPart != bPart) {
        return aPart < bPart ? -1 : 1;
      }

      // Toggle the value of isDigitPart since the parts will alternate.
      isDigitPart = !isDigitPart;
    }
  }

  // Use normal comparison.
  return (a >= b) - (a <= b);
}