const WEBSOCKET_URL = 'wss://hamfler.com:1337'

const RTCPC_CONFIG = {
    iceServers: [
        {urls: 'stun:stun.l.google.com:19302'}
    ]
};

/*************************************/




// send all ICE candidates from buffer to partner
function emptyIceBuffer() {
    iceActive = true;

    // send ice candidates from buffer
    for(var i = (iceBuffer.length - 1); i >= 0; i--) {
        sendIceCandidate(iceBuffer[i]);
        iceBuffer.splice(i, 1);
    }
}

// send one ICE candidate to partner
function sendIceCandidate(cand) {
    var msg = {
        type: 'icecandidate',
        to: partner,
        candidate: cand
    }

    sendMessage(partner, msg);
}

// handler for received ICE candidate from partner
function handleIceCandidate(msg) {
    let cand = new RTCIceCandidate(msg.body.candidate);
    pc.addIceCandidate(cand);
}


// login with user name
function login(name) {
    console.log('logging in as', name);

    var msg = {
        type: 'login',
        from: name
    }
    conn.send(JSON.stringify(msg));
}


// send Websocket message
function sendMessage(to, body) {
    var msg = {
        id: uid(30),
        type: 'message',
        from: me,
        to: to,
        body: body
    }
    console.log('sending', msg);
    conn.send(JSON.stringify(msg));
}


function uid(len) {
    var buffer = [];
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; ++i) {
        var rand = Math.floor(Math.random() * (chars.length + 1));
        buffer.push(chars[rand]);
    }

    return buffer.join('');
};