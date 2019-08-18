
class Payload {
    constructor() {

        this.payloads = [];

        // Connect to socket server
        this.socket = io();

        // Handle connection error
        this.socket.once('connect_error', () => {

            // Notify main.js via an Event
            window.dispatchEvent(new Event('payloads_error'));
        });

        // Listen for all server payloads (sent on connect)
        this.socket.on('all_payloads', (payloads) => {

            // Update local payloads array
            this.payloads = payloads;

            // Notify client via an Event
            window.dispatchEvent(new Event('payloads_ready'));
        });

        // Listen for new payload from server
        this.socket.on('new_payload', (payload) => {

            // Add to local payloads
            this.payloads.unshift(payload);

            // Notify client via custom Event
            window.dispatchEvent(new CustomEvent('new_payload', {detail: payload}));
        });
    }

    // Get all payloads
    get all() {
        return this.payloads;
    }

    // Add a new payload
    add(id, event, queue_id, agent_id) {

        // Create payload obj
        let payload = {id, event, queue_id, agent_id}

        // Add to local payload
        this.payloads.unshift(payload);

        // Emit to server
        this.socket.emit('new_payload', payload);

        // Return formatted payload obj
        return payload;
    }
}

