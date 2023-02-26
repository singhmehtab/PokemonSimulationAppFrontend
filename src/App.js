import React, {useState} from 'react';
import './App.css';
import SockJS from 'sockjs-client'
import {Stomp} from "@stomp/stompjs";
import GameStart from "./GameStart";
import Battle from "./Battle";
import {connect, sendMessage} from "./WebSocket";

function App() {
    const[showMainPage, setShowMainPage] = useState(true)
    const[showBattlePage, setShowBattlePage] = useState(false)
    const[battleData, setBattleData] = useState({
        "firstPlayerDetails": {},
        "secondPlayerDetails": {}
    })
    const[gameData, setGameData] = useState({});
    const callBack =(data) => {
        setBattleData(data)
    }

    const playTurn = (props) => {
        var data = {
            "to": "Mehtab",
            "battleId": battleData["battleId"],
            "initialData": {
                "firstPlayerName": gameData["firstPlayerName"],

                "secondPlayerName": gameData["secondPlayerName"],

                "firstPlayerPokemonName": gameData["firstPlayerPokemonName"],

                "secondPlayerPokemonName": gameData["secondPlayerPokemonName"]
            },
            "attackType": props.attackType
        }
        sendMessage(data)
    }
    const prepareBattle =() => {
        const myPromise = new Promise((resolve, reject) => {
            var connection = connect(callBack)
            if(connection === "connected") resolve("Connection Completed")
            else reject("Error")
        });
        console.log(myPromise)
        myPromise.then(function successValue(result) {
            console.log(result);
            playTurn(gameData)
        })
        var data = {
            "to": "Mehtab",
            "battleId": null,
            "initialData": {
                "firstPlayerName": gameData["firstPlayerName"],

                "secondPlayerName": gameData["secondPlayerName"],

                "firstPlayerPokemonName": gameData["firstPlayerPokemonName"],

                "secondPlayerPokemonName": gameData["secondPlayerPokemonName"]
            },
            "attackType":null
        }
        setTimeout(() => {sendMessage(data)}, 200);
        setShowMainPage(false)
        setShowBattlePage(true)

    }
  return (
    <div>
       {showMainPage && <GameStart prepareBattle={prepareBattle} gameData={gameData} setGameData={setGameData}></GameStart>}
       {showBattlePage && <Battle prepareBattle={prepareBattle} setShowMainPage={setShowMainPage} setShowBattlePage={setShowBattlePage} battleData={battleData} playTurn={playTurn}></Battle>}
    </div>
  );
}
export default App;
