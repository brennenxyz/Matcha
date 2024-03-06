import { prefix, prefix_color, data } from "../../stuff/consts";
import PogObject from "../../../PogData"
import { gui } from "../../gui/gui";

let entity = null; 
let tickRegister = false;

const ZealotCounter = new PogObject("Matcha", {
    total_counter: 0,
    counter: 0,
    eyes: 0
}, "zealots.json")
ZealotCounter.autosave(0.1)

register("AttackEntity", (e) => {
    if(!data.zealot_counter) return;
    entity = e
})

register("tick", () => {
    if(!data.zealot_counter) return;
    if(entity == null) return;
    if(tickRegister) return;
    tickRegister = true;
    setTimeout(() => {
        entity = null;
        tickRegister = false;
    }, 1000);
})

register("EntityDeath", (e) => {
    if(!data.zealot_counter) return;
    if(entity = e) {
        ZealotCounter.counter = ZealotCounter.counter++
        ZealotCounter.total_counter = ZealotCounter.total_counter++
        ZealotCounter.save()
    }
    if(e.getName().toLowerCase().includes("enderman")) {
        if(Player.asPlayerMP().distanceTo(e) <= 6) {
            ZealotCounter.counter = ZealotCounter.counter++
            ZealotCounter.total_counter = ZealotCounter.total_counter++
            ZealotCounter.save()
        }
    }
})

register("chat", (event) => {
    cancel(event)
    if(!data.zealot_counter) return;
    ZealotCounter.counter = 0;
    ChatLib.chat(`${prefix} Special Zealot Found!!\n\nZealot Data: \n${prefix_color}Found At: ${ZealotCounter.counter} Zealots\n${prefix_color}Total Zealots: ${ZealotCounter.total_counter}\n${prefix_color}Total Eyes: ${ZealotCounter.eyes}`)
    ZealotCounter.save()
}).setCriteria("A special Zealot has spawned nearby!")



function displayFunc() {
    if(!data.zealot_counter) return; 
    if(gui.isOpen()) return;
    let str1 = `Zealots: ${ZealotCounter.counter}`
    let length1 = str1.length

    let str2 = `Total Zealots: ${ZealotCounter.total_counter}`
    let length2 = str2.length

    Renderer.drawStringWithShadow(str1, Renderer.screen.getWidth() - (7*length1), 10)
    Renderer.drawStringWithShadow(str2, Renderer.screen.getWidth() - (8*length1) - 5, 20)  
}

register("renderOverlay", displayFunc)