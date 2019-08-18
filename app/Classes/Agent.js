//"use strict";
// exports.__esModule = true;
// var Agents = [];
// for (var id = 1; id <= 100; id++) {
//     Agents.push({
//         id: id,
//         name: "Agent " + id
//     });
// }
// exports["default"] = Agents;

class Agent {
    constructor() {
        this.agents = [];
    }

    add(agent_id, agent_name) {
        this.agents.push({id:agent_id, name:agent_name});
    }

    get Agents() {
        return this.agents;
    }

    count(){
        return this.Agents.length;
    }

    pushRandomAgents(count) {
        let ids = this.Agents.map(a => a.agent_id).sort((a, b) => Math.sign(a - b)), id = 1;
        while (this.count() < count) {
            while (ids.length > 0 && ids[0] <= id++) {
                ids.pop();
            }
            this.add(id,`Agent ${id++}`);
        }
    }
}
