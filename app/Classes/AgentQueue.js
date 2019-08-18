//"use strict";
//exports.__esModule = true;
// var Agent_1 = require("/app/Database/Agent");
// var Queue_1 = require("/app/Database/Queue");
// var AgentQueues = [];
// Agent_1["default"].forEach(function (Agent) {
//     Queue_1["default"].forEach(function (Queue) {
//         if (Math.random() > .5)
//             AgentQueues.push({
//                 agent_id: Agent.id,
//                 queue_id: Queue.id
//             });
//     });
// });
// exports["default"] = AgentQueues;

class AgentQueue {
    constructor(queues, agents) {
        this.queues = queues.Queues;
        this.agents = agents.Agents;
    }

    get Queues() {
        return this.queues;
    }

    get Agents() {
        return this.agents;
    }

    enqueue() {
        let mixed = [], queues = this.queues;
        this.agents.forEach(a => {
            queues.forEach(q => {
                if (Math.random() > .5) {
                    mixed.push({
                        agent_id: a.id,
                        queue_id: q.id
                    })
                }
            })
        });
        console.log(mixed)
        return mixed;
    }
}