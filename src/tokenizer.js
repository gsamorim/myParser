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
  _tokenLenght;

  prune(str) {
    let aux = this._tokenLenght;
    this._tokenLenght = 0;
    return str.slice(aux);
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
    if (ccode === 34) return true;
    return false;
  }

  checkIfString(ccode) {
    if (ccode >= 32 && ccode <= 255 && ccode != 92) return true;
    return false;
  }

  /**
   * Obtains next token.
   */
  getNextToken(str) {
    console.log("Getting next token...: " + str);
    let cursor = 0;

    //check for Empty Spaces
    if (this.checkIfEmpty(str.charCodeAt(cursor))) {
      this._tokenLenght = 1;
      return null;
    }

    //check for Numbers
    if (this.checkIfNumber(str.charCodeAt(cursor))) {
      let number = str[cursor++];
      while (this.checkIfNumber(str.charCodeAt(cursor)))
        number += str[cursor++];
      this._tokenLenght = cursor;
      return {
        type: "NUMBER",
        value: number,
      };
    }

    //check for string
    //start+finish with 34, cannot 92, 32~255
    //if first quote
    if (this.checkIfQuote(str.charCodeAt(cursor))) {
      cursor++;
      for (let wstring = ""; cursor < str.length; cursor++) {
        //if second quote found
        if (this.checkIfQuote(str.charCodeAt(cursor))) {
          if (cursor == 1) {
            this._tokenLenght = 2;
            return null; //empty string
          } else {
            this._tokenLenght = cursor + 1;
            return {
              type: "STRING",
              value: wstring,
            };
          }
        }
        //if possible charcode add to substring
        else if (this.checkIfString(str.charCodeAt(cursor))) {
          wstring += str[cursor];
        }
        //string malfunction
        else {
          wstring += str[cursor];
          this._tokenLenght = cursor + 1;
          return {
            type: "ERROR",
            description: "Error: String malfunction after quote.",
            value: wstring,
            position: cursor,
          };
        }
      }
    }

    console.log("not found char");
    this._tokenLenght = 1;
    return null;
  }

  tokenize(str) {
    let tokens = [];
    let walked = 0;
    while (str.length !== 0) {
      //call for next token
      var token = this.getNextToken(str);
      //add next token if found
      if (token) {
        if (token.type == "ERROR") {
          token.position += walked;
          tokens.push(token);
        } else {
          token.start = walked;
          token.length = this._tokenLenght;
          tokens.push(token);
        }
      }

      //prune str
      walked += this._tokenLenght;
      str = this.prune(str);
    }
    console.log("finish");
    console.log(JSON.stringify(tokens, null, 2));
  }
}

module.exports = {
  Tokenizer,
};
