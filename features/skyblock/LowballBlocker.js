import { prefix, data } from "../../stuff/consts";

function handleEvent(event) {
    cancel(event)
    ChatLib.chat("test test test test test")
}

register("chat", (event) => {
    if(!data.lowball_blocker) return;
    cancel(event)
})

register("command", () => {
    
})