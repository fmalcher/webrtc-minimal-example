// configuration
const WEBSOCKET_URL = 'wss://msg.hamfler.com:1337'

const RTCPC_CONFIG = {
    iceServers: [
        {urls: 'stun:hamfler.com:3478'},
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            urls: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        }
    ]
};

const RTCPC_CONFIG_A = RTCPC_CONFIG;
const RTCPC_CONFIG_B = RTCPC_CONFIG;
/*
const RTCPC_CONFIG_A = {
    iceServers: [
        {urls: 'stun:stun.l.google.com:19302'}
    ]
};

const RTCPC_CONFIG_B = {
    iceServers: [
        {urls: 'stun:hamfler.com:3478'}
    ]
};
*/

/*************************************/
// events and functions

// event handler for when remote stream is added to peer connection
function onAddStream (obj) {
    console.log('onaddstream', pc);
    document.getElementById('remoteVideo').srcObject = obj.stream;
}

// event handler for when local ICE candidate has been found
function onIceCandidate (c) {
    let cand = c.candidate;

    // end if candidate is null (last candidate is!)
    if(!cand) return;

    // if ICE is not enabled yet, push to buffer first
    if(!iceActive) {
        iceBuffer.push(cand);
    } else {
        sendIceCandidate(cand);
    }
}

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

// close peer connection
function closePC() {
    pc.close();
}

/*************************************/
// Messaging

// login with user name
function login(name) {
    me = document.getElementById('me').value;
    name = me;
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
