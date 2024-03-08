// not ready yet

import { prefix } from "../../stuff/consts";
import { GoToPoint, stopMove } from "../../stuff/path";
import RenderLib from "../../../RenderLib"

let moving = false;

let ex = null;
let ey = null; 
let ez = null;

register('renderWorld', () => {
    if(!moving) return;
    World.getAllEntities().forEach(entity => {
        if(entity.isDead()) return;
        let name = entity.getEntity().func_95999_t()
        if(name.includes("Zealot") && name.includes("13,000")) {
            ex = parseFloat(entity.getX())
            ey = parseFloat(entity.getY() - 3)
            ez = parseFloat(entity.getZ())
            ChatLib.chat(`${prefix} Moving To ${ex}, ${ey}, ${ez}`)
            RenderLib.drawEspBox(ex,ey,ez,1,1,1,0,0,1,true)
        }
    });
})

register("chat", () => {
    moving = false;    
    setTimeout(() => {
        GoToPoint(ex, ey, ez);
    }, 1000);
}).setCriteria(`[Debugtone] arrived.`);

register("command", () => {
    moving = true
    ChatLib.chat(`${prefix} Zealot Macro: ${moving}`)
    ChatLib.simulateChat(`[Debugtone] arrived.`)
}).setName("test-start")

register("tick", () => {
    if(moving) {
        if(Client.isInChat()) stopMove()
        if(Client.isInGui()) stopMove()
        if(Client.isInTab()) stopMove()
    }
})