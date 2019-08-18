//"use strict";
//exports.__esModule = true;
// var Queues = [];
// for (var id = 1; id <= 10; id++) {
//     Queues.push({
//         id: id,
//         name: "Queue " + id
//     });
// }
// exports["default"] = Queues;

class Queue {
    constructor() {
        this.queues = [];
    }

    add(id, name) {
        this.queues.push({id, name});
    }

    get Queues() {
        return this.queues;
    }

    count() {
        return this.Queues.length;
    }

    pushRandomQueues(count) {
        let ids = this.Queues.map(a => a.id).sort((a, b) => Math.sign(a - b)), id = 1;
        while (this.count() < count) {
            while (ids.length > 0 && ids[0] <= id++) {
                ids.pop();
            }
            this.add(id, `Queue ${id++}`);
        }
    }
}
