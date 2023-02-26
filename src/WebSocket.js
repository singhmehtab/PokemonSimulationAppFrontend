import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let stompClient = null;

const uniqId = "Mehtab"

export function connect(callback) {
    var socket = new SockJS("http://localhost:8080/pokemon-game");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        const endpoint = "/pokemon-client/data/" + uniqId;
        stompClient.subscribe(endpoint, function (data) {
            callback(JSON.parse(data.body))
        });
    });
    return "connected"
}

export function sendMessage(data) {
    var from = "Mehtab"
    var text = "Hello"
    console.log("sending message")
    stompClient.send("/pokemon/game", {}, JSON.stringify(data));
}
export default WebSocket;