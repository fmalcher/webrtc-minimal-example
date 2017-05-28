
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
