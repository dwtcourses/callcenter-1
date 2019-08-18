class CallEvents {
    constructor() {
        this.RINGING = "RINGING";
        this.ANSWERING = "ANSWER";
        this.HANGINGUP = "HANGUP";
    }

    imageUrl(event){
        console.log(event)
        switch (event) {
            case this.RINGING: return "/img/ringing.jpg";
            case this.ANSWERING: return "/img/answering.png";
            case this.HANGINGUP: return "/img/hangup.png";
            default: return "/img/default.png";
        }
    }

    imageMap() {
        let RINGING = {event: this.RINGING, url: this.imageUrl(this.RINGING)},
            ANSWERING = {event: this.ANSWERING, url: this.imageUrl(this.ANSWERING)},
            HANGUP = {event: this.HANGINGUP, url: this.imageUrl(this.HANGINGUP)};
        return {
            ANSWERING, RINGING, HANGUP
        }
    }
}
