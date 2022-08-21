/**
 * Main test runner.
 */

const { Tokenizer } = require("../src/tokenizer");
const { Parser } = require("../src/parser");
const { TxtWoker } = require("../src/txtWorker");
const { Simple } = require("../src/simplifier");

const tokenizer = new Tokenizer();
const parser = new Parser();
const txtWorker = new TxtWoker();
const simple = new Simple();

//const program = `42`;
//const program = `42 1`;
// const program = `42"
// bu"1`;
//const program = `42 "àb%&c" ddd 1`;
//const program = `42 "àb%&c" ddd() 1, [] & - # ! > <=:.`;
//const program = ` 42`; //tab
//const program = ` 42`; //space
//const program = ` "42"`;
//const program = `"hellow my brodi"`;
//const program = `[adopt] (![adopt]&&PHI)3`;
//const program = `42`;
//const program = `42`;
//const program = `(![adopt]N(a,b)&&![adopt]N(a,b))&&![adopt]N(a,b)`;
//const program = `(![adopt]N(a,b)&&![adopt]N(a,b))&&![adopt]N(a,b)`;
//const program = `([adopt][adopt](B(a,b1)) && N(a,b))`;
//const program = `([adopt][adopt][adopt](B( a,b1)) && ((N(a a,3))))`;
const program = `([adopt][adopt, 1][adopt, a a](B(a,b1)) && ((N(a a,3))))`;
//const program = `B(a,b1) && B(a,b1)`;
//const program = `[adopt][adopt](((B(a,b1))))`;

//const program = `!(N(ana,joao))B(ana,teste)`;
//const program = `N(ana,joao)&&N(ana,maria)`;

let tokens = tokenizer.tokenize(program);
let jsonTokens = JSON.stringify(tokens, null, 2);
txtWorker.tokensToTxt(jsonTokens, "tokens.json");
let parseTree = parser.parse(tokens);
let jsonTree = JSON.stringify(parseTree, null, 2);
txtWorker.tokensToTxt(jsonTree, "parseTree.json");
let simplifiedTree = simple.startReduction(jsonTree);
let simplifiedJSONTree = JSON.stringify(simplifiedTree, null, 2);
txtWorker.tokensToTxt(simplifiedJSONTree, "simplifiedTree.json");
//let arrayTree = simple.goTru(simplifiedTree);
let arrayTree = simple.addChildsToArray(simplifiedTree);
simple.goTru2(arrayTree);
let simplifiedArrayJSONTree = JSON.stringify(arrayTree, null, 2);
txtWorker.tokensToTxt(simplifiedArrayJSONTree, "simplifiedArrayTree.json");

// console.log(JSON.stringify(ast, null, 2));

// //const program = `42`;
// //const program = `"42"`;
// const program2 = `"hellow my brodi"12"aa" adasrzz . as <"`;

// const ast2 = parser.parse(program2);

// console.log(JSON.stringify(ast2, null, 2));

// const string = program2.slice(17);
// console.log(string);

//  -----examples of query codes: (Phi between quotes)
// N(a,b)
// B(a,behav1)
// B(a,c,d_behav1,behavior2)
// !Phi
// Phi && Phi
// [adopt] Phi
// <adopt> Phi
// KaPhi
// [adopt](Phi && Phi) && [adopt]Phi
// [adopt]Phi && [adopt]Phi
// [adopt,3]Phi
// [adopt]([adopt]([adopt]Phi))
// [adopt] (B(a) && B(c)) == ([adopt]B(a)) && ([adopt]B(c))
// 	return true, both are considering same M(world)
// !([adopt]B(a)) == [adopt] !B(a)

// -----Others

// ancestor(mary, shelley) :- mother(mary, shelley).
// states that if mary is the mother of shelley, then mary is an ancestor of
// shelley.

// father(X, mike).
// can be asked. The system will then attempt, through unification, to find an
// instantiation of X that results in a true value for the goal.

// 5X.(woman(X) human(X))
// EX.(mother(mary, X) x male(X))
// The first of these propositions means that for any value of X, if X is a woman,
// then X is a human. The second means that there exists a value of X such that
// mary is the mother of X and X is a male; in other words, mary has a son.

// -----
