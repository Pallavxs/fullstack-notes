import { io } from "socket.io-client";

export const initalizeSocketConnection = () => {
    const socket = io("http://localhost:3000", {
        withCredentails: true
    })

    socket.on("connect",() => {
        console.log("Connected to Socket.IO server")
    })
}