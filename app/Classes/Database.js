class Database {
    constructor() {
        let q = new Queue(), a = new Agent(), aq = new AgentQueue(q, a);
        this.queues = q.pushRandomQueues(10);
        this.agents = a.pushRandomAgents(100);
        this.agentQueues = aq.enqueue();
    }

    get AgentQueues() {
        return this.agentQueues;
    }

    get Agents() {
        return this.agents;
    }

    get Queues() {
        return this.queues;
    }
}