import { emannuker, prefix } from "../../stuff/consts";
import { leftClick, rightClick } from "../../stuff/functions";
import { setInterval } from "../../../setTimeout"
import ServerRotations from "../../stuff/serverside";
import ClientRotations from "../../stuff/clientside";
import RenderLib from "../../../RenderLib";

const getAdjustment = (x, y, z) => {
    const x_dist = x - Player.getX();
    const y_dist = y - Player.getY();
    const z_dist = z - Player.getZ();

    const dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(z_dist, 2))
    const yaw = (Math.atan2(z_dist, x_dist) * 180 / Math.PI) - 90
    const pitch = -Math.atan2(y_dist, dist) * 180 / Math.PI

    return [yaw, pitch];
}

let attacking = false;
let entitiesAttacked = []
let messagesent = false;

register("renderWorld", () => {
    World.getAllEntities().forEach(e => {
        if(!emannuker.range) return;
        if(!emannuker.toggle) return;

        if(!emannuker.leftclickmode && !emannuker.rightclickmode && !messagesent) {
            ChatLib.chat(`${prefix} Left Click/Right Click Mode Must Be Set`)
            messagesent = true;
        }
        if(Client.isInGui()) return;
        if(Client.isInChat()) return;
        if(Client.isInTab()) return;

        if(entitiesAttacked.includes(e.getUUID())) return;
        if(e.getName().toLowerCase().includes("zealot")) return;
        if(Player.asPlayerMP().distanceTo(e) > emannuker.range) return;
        if(!Player.asPlayerMP().canSeeEntity(e)) return;
        if(e.isDead()) return;
        if(!e.getName()) return;
        if(e.getName() == Player.getName()) return;
        if(e.getClassName() == "EntityPlayerSP") return;
        if(e.getClassName() == "EntityOtherPlayerMP") return;
        if(e.getClassName() == "EntityEnderman") {
            if(emannuker.esp) {
                RenderLib.drawInnerEspBox(e.getX(), e.getY(), e.getZ(), e.getWidth(), e.getHeight(), 1,0,0,0.5,true)
                RenderLib.drawEspBox(e.getX(), e.getY(), e.getZ(), e.getWidth(), e.getHeight(), 1,0,0,1,true)
            }
            const py = Player.getYaw()
            const pp = Player.getPitch()
            const angles = getAdjustment(e.getX(), e.getY() - 0.5, e.getZ())
            if(attacking) return;
            attacking = true;
            if(!emannuker.client_side) {
                ServerRotations.set(angles[0], angles[1])
            } else {
                ClientRotations.setAngles(angles[0], angles[1])
            }
            setTimeout(() => {
                if(emannuker.leftclickmode) leftClick();
                else if(emannuker.rightclickmode) rightClick();
                entitiesAttacked.push(e.getUUID())
                setTimeout(() => {
                    if(!emannuker.client_side) {
                        ServerRotations.resetRotations()
                    } else {
                        ClientRotations.setAngles(py, pp)
                    }
                    setTimeout(() => {
                        attacking = false;
                    }, 65);
                }, 65);
            }, 65)
        }
    })
})

setInterval(() => {
    entitiesAttacked = []
}, 10000)