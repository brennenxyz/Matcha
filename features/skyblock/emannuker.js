import { guistuff } from "../../gui/gui";
import { leftClick, rightClick } from "../../stuff/functions";
import { setInterval } from "../../../setTimeout"
import ServerRotations from "../../stuff/serverside";

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

register("step", () => {
    World.getAllEntities().forEach(e => {
        if(!guistuff.Skyblock.toggles[3]) return;
        if(Client.isInGui()) return;
        if(Client.isInChat()) return;
        if(Client.isInTab()) return;

        if(entitiesAttacked.includes(e.getUUID())) return;
        if(e.getName().toLowerCase().includes("zealot")) return;
        if(Player.asPlayerMP().distanceTo(e) > 6) return;
        if(!Player.asPlayerMP().canSeeEntity(e)) return;
        if(e.isDead()) return;
        if(!e.getName()) return;
        if(e.getName() == Player.getName()) return;
        if(e.getClassName() == "EntityPlayerSP") return;
        if(e.getClassName() == "EntityOtherPlayerMP") return;
        if(e.getClassName() == "EntityEnderman") {
            const py = Player.getYaw()
            const pp = Player.getPitch()
            const angles = getAdjustment(e.getX(), e.getY() - 0.5, e.getZ())
            if(attacking) return;
            attacking = true;
            ServerRotations.set(angles[0], angles[1])
            setTimeout(() => {
                if(!guistuff.rightclickmode) leftClick();
                else if(guistuff.rightclickmode) rightClick();
                entitiesAttacked.push(e.getUUID())
                setTimeout(() => {
                    ServerRotations.resetRotations()
                    setTimeout(() => {
                        attacking = false;
                    }, 65);
                }, 65);
            }, 65)
        }
    })
}).setFps(120)

setInterval(() => {
    entitiesAttacked = []
}, 10000)