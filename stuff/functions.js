import { prefix, prefix_color } from "./consts";

const mc = Client.getMinecraft();

function getClosestEntity(range) {
    let dist = range;
    let target = null;
    World.getAllEntities().forEach(entity => {
        if(entity.getEntity().field_70128_L) return;
        if(!entity.getEntity().func_70089_S()) return;
        if(!entity.getName().includes(`[Lv30 Crypt Ghoul]`) || !entity.getName().includes(`[Lv60] Golden Ghoul`)) return;
        currentDist = mc.field_71439_g.func_70032_d(entity.getEntity());
        if(entity.getName() !== Player.getName()) {
            if (currentDist <= dist) {
                dist = currentDist;
                target = entity;
            }
        }
    });
    return target;
}

function getAdjustment(x, y, z) {
    const x_dist = x - Player.getX();
    const y_dist = y - Player.getY();
    const z_dist = z - Player.getZ();

    const dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(z_dist, 2))
    const yaw = (Math.atan2(z_dist, x_dist) * 180 / Math.PI) - 90
    const pitch = -Math.atan2(y_dist, dist) * 180 / Math.PI

    return [yaw, pitch];
}

function leftClick() {
    const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af", null)
    leftClickMethod.setAccessible(true);
    leftClickMethod.invoke(Client.getMinecraft(), null)
}

function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);
}

function proFeature(name) {
    const link = "https://discord.gg/hSY54j97SK"
    const message = `${prefix} ${name} is a premium feature!\n${prefix_color}Buying Matcha+ helps support our development team and keep us running!\n${prefix_color}If you're interested, purchase Matcha+ for $5 at ${link}`

    ChatLib.chat(message)
}

export { getClosestEntity, getAdjustment, leftClick, rightClick, proFeature };