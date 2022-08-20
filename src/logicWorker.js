/**
 * Do the Update Method and Eval Method
 */

class Assumption {
  agent;
  behavior;
  constructor(agent, behavior) {
    this.agent = agent;
    this.behavior = behavior;
  }
}

var test = {
  nodes: [
    {
      id: 0,
      name: "White King",
      symbol: "♔",
    },
    {
      id: 1,
      name: "Thunderstorm",
      symbol: "⛈",
    },
    {
      id: 2,
      name: "Comet",
      symbol: "☄",
    },
  ],
  links: [
    {
      source: 2,
      target: 1,
    },
    {
      source: 1,
      target: 0,
    },
  ],
  behaviors: [
    {
      id: 0,
      short: "Vota",
      description: "Vota",
    },
    {
      id: 1,
      short: "Sugar!",
      description: "Use Sugar",
    },
  ],
  assumptions: [
    {
      agent: 2,
      behavior: 0,
    },
    {
      agent: 1,
      behavior: 1,
    },
  ],
};

class LogicWorker {
  /**
   * Input: M=(A,N ,β,θ) & Bi
   * Output: M′=(A,N ,β′,θ)
   * database contains (mapping: logic -> dataArray):
   *    Agents -> nodes
   *    Network -> links
   *    List of B -> behaviors
   *    β -> assumptions
   * θ -> threshold
   * Bi -> current behavior being treated
   * I made a reducedDatabase without plotting informations
   * that's the one planed to be used
   *
   * agents assume the received behavior when the result of:
   *    "conections" divided by "holders" is greater than "threshold"
   * "conections" being the number of neighbors
   * "holders" being the number of neighbors that have the assumption Bi
   */
  update(rDatabase, thresold, behaviorID) {
    //check all agents
    for (let agent in rDatabase.nodes) {
      //if the agent already assume Bi the test isn't needed
      if (this.checkAgentBiPair(agent.assumption, agent.id, behaviorID))
        continue;
      else {
        let conections = 0;
        let holders = 0;
        for (let link in rDatabase.links) {
          linkedTo = this.agentLinkedTo(agent.id, link);
          //if found conections
          if (linkedTo != null) {
            conections++;
            //if linkedTo already assumes Bi
            if (this.checkAgentBiPair(agent.assumption, linkedTo, behaviorID))
              holders++;
          }
        }
        if (holders / conections >= thresold)
          rDatabase = insertAssumptionForAgent(agent.id, behaviorID, rDatabase);
      }
    }
    return rDatabase;
  }

  checkAgentBiPair(assumptions, agent, Bi) {
    for (let assumption in assumptions)
      if (assumption.behavior == Bi && assumption.agent == agent) return true;
    return false;
  }

  //return false when agentId not found in this link
  //otherwise return id of the linked element
  agentLinkedTo(agentID, link) {
    if (link.source === agentID) return link.target;
    else if (link.target === agentID) return link.source;
    return false;
  }

  insertAssumptionForAgent(agentID, behaviorID, rDatabase) {
    rDatabase.assumption.push(new Assumption(agentID, behaviorID));
  }
}

module.exports = { LogicWorker };

/**
 * ###Update
Precisa considerar quatro databases:
-Agents {ID:integer, name:string}
-Behaviors {ID:integer, desc:string}
-Links {firstAgentID:integer, secondAgentID:integer}
-Assumptions {agentID: integer, behaviorID: integer}
E o threshold

Uma vez que o modelo tende a atingir estabilidade quando todos 
agentes assumirem, acredito que começar o algoritmo pela lista 
de elementos seja a opção menos custosa.

for each agent 
if (already got assumption) //function to check inside assumptions list
	not plausible / continue
else
	for each behavior
		var conections=0;	//conections counters
		var holders=0;		//counter for neighbor with assumption of behavior
		for each link
			if (link contains agent)	//check according first and second element of link
				conections++;
				if (linked element has assumption) //function to check if linked A has assumption of current behavior
					holders++;
		if (holders/conections>=threhold)
			InsertNewAssumption(cur. agent, cur. behavior)

----------------------------------------------
###Function for logical command
-commands:
B(a,beh1) //for to check inside list of assumptions
N(a,b) //for to check inside list of Links
!Phi e Phi&&Phi //need to consider AST
[adopt] Phi //Update one time

var logicAST; //AST three of logical command
//"cur" for current
var cur = logicAST.first; //define o topo da tree em cur
var retorno = eval(cur); // chama a function mandando cur
eval(cur){
	if(cur.type=="AND")
		var firstRetorno = eval(cur.firstChild);
		var secondRetorno = eval(cur.secondChild);
		if(firstRetorno && secondRetorno)
			return true;
	else if(cur.type=="NOT")
		return !eval(cur.child);
	else if(cur.type=="ADOPT")
		updateFunction();
		return eval(cur.child);
	else if(cur.type=="NbStm")
		return checkNeighbor(cur.agent1, cur.agent2);	//check inside list of Links
	else if(cur.type=="AsStm")
		return checkAssumption(cur.agent, cur.assumption);	//check inside list of assumptions
}
functionShowResult(retorno);
 */
