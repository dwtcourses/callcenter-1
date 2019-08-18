"use strict";
// exports.__esModule = true;

const DB = new Database(); //import("./Database");
const Helper_1 = new Helper(); //import("./Helper");
const callEvents = new CallEvents()

// Create new payload element
const renderPayload = (payload) => {
    if (!payload.id) return

    let imgsrc = callEvents.imageUrl(payload.event);
    let agent_id = payload.agent_id ? ("/" + payload.agent_id) : "";
    // Payload HTML
    let payloadHTML = `
    <div style="display:none;" class="row payload bg-light mb-2 rounded shadow">
      <div class="col-2 p-1">
        <img src="${imgsrc}" class="photo w-100 rounded">
      </div>
      <div class="col-10 p-1 payload-vm alert-secondary rounded">[${payload.id}] ${payload.queue_id}${agent_id} (${payload.event})</div>
    </div>`;


    // Prepend to #payloads
    $(payloadHTML).prependTo('#payloads').show(500)

    // Bind a click handler on new img element to show in modal
        .find('div.col-10').on("click", showPhoto);
};

// Show message photo in modal
const showPhoto = (e) => {
    // Get photo src
    let t1 = $(e.currentTarget).text().replace(/[\(\)\[\]]/g,"");
    let t2 = t1.split(/[\s\/]+/g), l = t2.length;
    let src = callEvents.imageUrl(t2[l-1]);
    console.log(t2)
    let th = `<th>ID</th><th>Queue ID</th><th>Event</th>`,
        td = `<td>${t2[0]}</td><td>${t2[1]}</td><td>${t2[l-1]}</td>`;
    if (l === 4) {
        th += `<th>Agent ID</th>`;
        td += `<td>${t2[2]}</td>`;
    }

    // Set to and show photoframe modal
    $('#photoframe span').html(`<table width="80%" class="table table-info" align="center" border="1"><tr>${th}</tr><tr>${td}</tr></table>`);
    $('#photoframe img').attr('src', src);
    $('#photoframe').modal('show');
};

const eventHandler = renderPayload
const WebsocketEmitter = () => {
}
// DO NOT CHANGE
const CallSimulator = function () {
    var CallID = 0;
    var TOTAL_INDEX = DB.AgentQueues.length;
    setInterval(function () {
        var AgentQueue = DB.AgentQueues[Helper_1.RandomNumber(TOTAL_INDEX)];
        var payload = {
            id: CallID++,
            event: "RINGING",
            queue_id: AgentQueue.queue_id
        };
        eventHandler(payload);
        var TIMEOUT = Helper_1.RandomNumber(5, 1);
        setTimeout(function () {
            payload.event = "ANSWER";
            payload.agent_id = AgentQueue.agent_id;
            eventHandler(payload);
        }, TIMEOUT * 1e3);
        TIMEOUT += Helper_1.RandomNumber(15, 5);
        setTimeout(function () {
            payload.event = "HANGUP";
            payload.agent_id = AgentQueue.agent_id;
            eventHandler(payload);
        }, TIMEOUT * 1e3);
    }, 250);
};

// Main app logic
const _init = () => {

    console.log("Initializing the application...")
    // Init new payload instance
    const payloads = new Payload();

    // Notify user of connection errors
    window.addEventListener('payloads_error', () => {
        toastr.error('Payloads could not be retreived.<br>Will keep trying.', 'Network Connection Error');
    });

    // Listen for existing payloads from server
    window.addEventListener('payloads_ready', () => {

        // Remove the loader
        $('#loader').remove();

        // Check some payloads exist
        /*if (payloads.all.length == 0)*/
        toastr.info('Add the first payload.', 'No Payloads');

        // Empty out existing payloads if this update is from a reconnection
        $('#payloads').empty();

        // Loop and render all payloads (reverse as we're prepending)
        payloads.all.reverse().forEach(renderPayload);
    });

    // Listen for new payload event
    window.addEventListener('new_payload', (e) => {
        renderPayload(e.detail);
    });

    CallSimulator();
}
