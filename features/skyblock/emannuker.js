const getAdjustment = (x, y, z) => {
    const x_dist = x - Player.getX();
    const y_dist = y - Player.getY();
    const z_dist = z - Player.getZ();

    const dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(z_dist, 2))
    const yaw = (Math.atan2(z_dist, x_dist) * 180 / Math.PI) - 90
    const pitch = -Math.atan2(y_dist, dist) * 180 / Math.PI

    return [yaw, pitch];
}

function lookAt(targetYaw, targetPitch, duration = 100) {
    let currentYaw = Player.getYaw();
    let currentPitch = Player.getPitch();
    expectedYaw = targetYaw;
    expectedPitch = targetPitch;
    isRotatedByScript = true

    let startTime = new Date().getTime();
    function easeOutQuad(t) {
        t
    }
    function updateAngles() {
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
            setAngles(targetYaw, targetPitch);
            return;
        }
        let progress = elapsedTime / duration;
        // Applying easing (easeOutQuad) to modify the progression curve
        progress = easeOutQuad(progress);

        let newYaw = currentYaw + (targetYaw - currentYaw) * progress;
        let newPitch = currentPitch + (targetPitch - currentPitch) * progress;

        setAngles(newYaw, newPitch);

        setTimeout(updateAngles, 1); // Adjust this delay to control the smoothness
    }

    updateAngles();
}

function setAngles(yaw, pitch) {
    if(!World.isLoaded()) return;
    const player = Client.getMinecraft().field_71439_g
    player.field_70177_z = yaw
    player.field_70125_A = pitch
}

const C02 = Java.type("net.minecraft.network.play.client.C02PacketUseEntity")

let attacking = false;

register("step", () => {
    World.getAllEntities().forEach(e => {
        // if(!e.getName().toLowerCase().includes("[lv42] enderman")) return;
        if(Player.asPlayerMP().distanceTo(e) > 3) return;
        if(!Player.asPlayerMP().canSeeEntity(e)) return;
        if(e.getClassName() !== "EntityVillager") return;
        const angles = getAdjustment(e.getX(), e.getY() - 0.5, e.getZ())
        setAngles(angles[0], angles[1])
        if(attacking) return;
        attacking = true;
        ChatLib.chat(`clicked`)
        Client.sendPacket(new C02(e.getEntity(), C02.Action.ATTACK))
        setTimeout(() => {
            attacking = false;
        }, 75 + (Math.random() * 10));
    })
}).setFps(120)