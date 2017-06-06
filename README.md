# webrtc-minimal-example

This is a very basic example for audio/video communication between two browsers.
It shall demonstrate how the WebRTC API works.

The example uses [SimpleMS](https://github.com/fmalcher/webrtc-simplems) as messaging server.
Feel free to fork or contribute! :smile:

> **It's a basic example! Error handling and features beyond basic communication have been dropped intentionally!**







# Getting Started (Example for Debian)


Install Node.js for the WebSocket server and a simple web server that serves the client app.

```
sudo apt-get install nodejs nodejs-legacy
sudo npm install -g http-server
```


Clone the repository.
```
git clone https://github.com/fmalcher/webrtc-minimal-example.git
cd webrtc-minimal-example
```


Edit the addresses in `helpers.js`:

* URL of the simplems server (`WEBSOCKET_URL`)
* URLs of STUN/TURN servers (in `RTCPC_CONFIG`) 

```
$EDITOR helpers.js
```


Start the webserver.
```
http-server -S -K key.pem -C cert.pem
```


Open another terminal and clone and start the messaging server.
```
git clone https://github.com/fmalcher/webrtc-simplems.git
cd webrtc-simplems
npm install
node server.js
```

Open your Browser and go to `http://127.0.0.1:8080/`. You will see an error like in this picture after hitting F12.
![Image of an error](error.png)

Go ahead and open this URL in a new tab: `https://127.0.0.1:1337/` and confirm the security exception.
![Image of an error](sec.png)


Don't worry, in this case it is local connection to your own computer.
The page will try to load but nothing will happen so close it. Reload the tab `http://127.0.0.1:8080/` again (F5). Then open another tab and type the same URL in. The rest is too simple to explain it.
