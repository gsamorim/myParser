// move from char to char
// classify substrings as:
// 	EOF
// 	Number
// 	String
// 		(start and end with double quotes)
// 		(32~255? for the rest)
// 		(must block 92, '\')
// 	Word
// 		(letters from start to end)
// 		(first is uppercase 65~90)
// 		(rest 65~90 or 97~122)
// 			Update/Evolve command
// 	dot
// 		(46 char code)		.
// 	comma
// 		(44 char code)		,
// 	bracket
// 		left round		(
// 		right round		)
// 		left square		[
// 		right square		]
// 	angle brackets
// 		left	(langle)	<
// 		right	(rangle)	>
// 	symbols
// 		||		or
// 		&&		and
// 		==		equals
// 		!=		different
// 		->		implication
// 		:=		consequence
// 	Variables (or statement storer)
// 		(uppercase single char 65~90)

/**
 * This tokenizer model tokenize everything before any parsing
 */
class Tokenizer {
  _string;
  _cursor;
  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  //EOF - End of File
  isEOF() {
    return this._cursor === this._string.length;
  }

  checkIfEmpty(ccode) {
    if (ccode == 9 || ccode == 32) return true;
    return false;
  }

  checkIfNumber(ccode) {
    if (ccode >= 47 && ccode <= 57) return true;
    return false;
  }

  checkIfQuote(ccode) {
    if (ccode >= 34) return true;
    return false;
  }

  checkIfString(ccode) {
    if (ccode >= 32 && ccode <= 255 && ccode != 92) return true;
    return false;
  }

  /**
   * Obtains next token.
   */
  getNextToken() {
    console.log("Getting next token...");

    //check for Empty Spaces
    if (this.checkIfEmpty(this._string.charCodeAt(this._cursor))) {
      this._cursor++;
      console.log("empty space.");
      return null;
    }

    //check for Numbers
    if (this.checkIfNumber(this._string.charCodeAt(this._cursor))) {
      let number = this._string[this._cursor++];
      while (this.checkIfNumber(this._string.charCodeAt(this._cursor)))
        number += this._string[this._cursor++];
      return {
        type: "NUMBER",
        value: number,
      };
    }

    //check for string
    //start+finish with 34, cannot 92, 32~255
    if (this.checkIfQuote(str.charCodeAt(0))) {
      var i = 1;
      for (var wstring = ""; i < str.length; i++) {
        if (this.checkIfQuote(str.charCodeAt(i))) {
          if (i == 1) return null; //empty string
          else
            return {
              type: "STRING",
              value: wstring,
            };
        }
        if (this.checkIfString(str.charCodeAt(i))) wstring += str[i];
      }
    }

    subCursor++;
  }

  tokenize() {
    var tokens = [];
    while (!this.isEOF()) {
      //prune the string and reset cursor
      this._string = this._string.slice(this._cursor);
      this._cursor = 0;

      //call for next token
      var token = this.getNextToken();
      //add next token if found
      if (token) tokens.push(token);
    }
    console.log(JSON.stringify(tokens, null, 2));
  }
}

module.exports = {
  Tokenizer,
};
