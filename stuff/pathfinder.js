import { prefix } from "./consts";

const mc = Client.getMinecraft();

const forwardBind = new KeyBind(mc.field_71474_y.field_74351_w);
const backwardBind = new KeyBind(mc.field_71474_y.field_74368_y);
const leftBind = new KeyBind(mc.field_71474_y.field_74370_x);
const rightBind = new KeyBind(mc.field_71474_y.field_74366_z);
const jumpBind = new KeyBind(mc.field_71474_y.field_74314_A);
const sneakBind = new KeyBind(mc.field_71474_y.field_74311_E);
const sprintBind = new KeyBind(mc.field_71474_y.field_151444_V);
const attackBind = new KeyBind(mc.field_71474_y.field_74312_F);
const useBind = new KeyBind(mc.field_71474_y.field_74313_G);

const WalkBind = new KeyBind("Walk", Keyboard.KEY_7, "Pathfinder");

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

let currentUserPath = [];

let avoidsWater = true;
let autoWalk = false;
let toggleLabel = false;
let rotmode = false;
let renderColor = [1, 0, 0];

const stopAllMovement = () => {
    jumpBind.setState(false);
    forwardBind.setState(false);
    rightBind.setState(false);
    backwardBind.setState(false);
    leftBind.setState(false);
}

const getBlockAtPoint = (point) => {
    return World.getBlockAt(point.x, point.y, point.z);
}

const getPathEntity = (x, y, z) => {
    nodeProcessor = new net.minecraft.world.pathfinder.WalkNodeProcessor();
    nodeProcessor.func_176175_a(true); // setEnterDoors
    nodeProcessor.func_176176_c(avoidsWater); // setAvoidsWater
    pathFinder = new net.minecraft.pathfinding.PathFinder(nodeProcessor);
    return pathFinder.func_180782_a(
    	World.getWorld(),
    	Player.getPlayer(),
    	new net.minecraft.util.BlockPos(x, y, z),
    	2000
    ); // createEntityPathTo
};

const pathTo = (x, y, z) => {
    let localToConnect = [];

    let endPoint = new Point(x, y, z);

    let path = getPathEntity(endPoint.x, endPoint.y, endPoint.z);

    if(!path) return;

    for(i = 0; i < path.func_75874_d() - 1; i++) { // getCurrentPathLength
        let currentP = path.func_75877_a(i); // getPathPointFromIndex
        let point = new Point(currentP.field_75839_a + 0.5, currentP.field_75837_b + 0.5, currentP.field_75838_c + 0.5); // xCoord yCoord zCoord
        localToConnect.push(point);
    }

    return localToConnect;
}

const possibleRotations = [
    -180, -179, -178, -177, -176, -175, -174, -173, -172, -171, -170, -169, -168, -167, -166, -165, -164, -163, -162, -161,
    -160, -159, -158, -157, -156, -155, -154, -153, -152, -151, -150, -149, -148, -147, -146, -145, -144, -143, -142, -141,
    -140, -139, -138, -137, -136, -135, -134, -133, -132, -131, -130, -129, -128, -127, -126, -125, -124, -123, -122, -121,
    -120, -119, -118, -117, -116, -115, -114, -113, -112, -111, -110, -109, -108, -107, -106, -105, -104, -103, -102, -101,
    -100, -99, -98, -97, -96, -95, -94, -93, -92, -91, -90, -89, -88, -87, -86, -85, -84, -83, -82, -81, -80, -79, -78, -77,
    -76, -75, -74, -73, -72, -71, -70, -69, -68, -67, -66, -65, -64, -63, -62, -61, -60, -59, -58, -57, -56, -55, -54, -53,
    -52, -51, -50, -49, -48, -47, -46, -45, -44, -43, -42, -41, -40, -39, -38, -37, -36, -35, -34, -33, -32, -31, -30, -29,
    -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3,
    -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116,
    117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140,
    141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164,
    165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180
];

const getClosest = (counts, goal) => {
    return counts.reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
}

const pressKeys = (arr) => {
    arr.forEach(key => {
        switch(key) {
            case "W":
                forwardBind.setState(true);
                break;
            case "S":
                backwardBind.setState(true);
                break;
            case "A":
                leftBind.setState(true);
                break;
            case "D":
                rightBind.setState(true);
                break;
            case "SPACE":
                jumpBind.setState(true);
                break;
            case "SNEAK":
                sneakBind.setState(true);
                break;
            case "SPRINT":
                sprintBind.setState(true);
                break;
            case "LEFTC":
                attackBind.setState(true);
                break;
            case "RIGHTC":
                useBind.setState(true);
                break;
        }
    });
}

const getBind = (dir, pn, yaw) => {
    yaw = getClosest(possibleRotations, yaw);
    switch(yaw) {
        case 180:
        case -180:
            pn === "P" ? dir === "X" ? pressKeys(["D"]) : pressKeys(["S"]) : dir === "X" ? pressKeys(["A"]) : pressKeys(["W"]);
            break;
        case -90:
            pn === "P" ? dir === "X" ? pressKeys(["W"]) : pressKeys(["D"]) : dir === "X" ? pressKeys(["S"]) : pressKeys(["A"]);
            break;
        case 0:
            pn === "P" ? dir === "X" ? pressKeys(["A"]) : pressKeys(["W"]) : dir === "X" ? pressKeys(["D"]) : pressKeys(["S"]);
            break;
        case 90:
            pn === "P" ? dir === "X" ? pressKeys(["S"]) : pressKeys(["A"]) : dir === "X" ? pressKeys(["W"]) : pressKeys(["D"]);
            break;
        case -135:
            pn === "P" ? dir === "X" ? pressKeys(["W", "D"]) : pressKeys(["S", "D"]) : dir === "X" ? pressKeys(["S", "A"]) : pressKeys(["W", "A"]);
            break;
        case 135:
            pn === "P" ? dir === "X" ? pressKeys(["S", "D"]) : pressKeys(["S", "A"]) : dir === "X" ? pressKeys(["W", "A"]) : pressKeys(["W", "D"]);
            break;
        case -45:
            pn === "P" ? dir === "X" ? pressKeys(["W", "A"]) : pressKeys(["W", "D"]) : dir === "X" ? pressKeys(["S", "D"]) : pressKeys(["S", "A"]);
            break;
        case 45:
            pn === "P" ? dir === "X" ? pressKeys(["S", "A"]) : pressKeys(["W", "A"]) : dir === "X" ? pressKeys(["W", "D"]) : pressKeys(["S", "D"]);
            break;
    }
}

const getEyePos = () => {
    return {
        x:Player.getX(),
        y:Player.getY() + Player.getPlayer().func_70047_e(),
        z:Player.getZ()
    };
}

/* Not my code that's why its ugly sorry */
let lookAtBlock = (blockPos, playerPos) => {
    if (!playerPos) playerPos = getEyePos();
    let d = {
        x:blockPos.x - playerPos.x,
        y:blockPos.y - playerPos.y,
        z:blockPos.z - playerPos.z
    };
    let yaw = 0;

    if (d.x != 0) {
        d.x < 0 ? yaw = 1.5 * Math.PI : yaw = 0.5 * Math.PI;
        yaw = yaw - Math.atan(d.z / d.x);
    } else if (d.z < 0) yaw = Math.PI;

    d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2));

    yaw = -yaw * 180 / Math.PI;

    setYaw(yaw);
}

const setYaw = (yaw) => {
    Player.getPlayer().field_70177_z = yaw;
}

const distFormula = (x1, y1, z1, x2, y2, z2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}

const getSpeed = () => {
    const lastX = new Entity(Player.getPlayer()).getLastX();
    const lastY = new Entity(Player.getPlayer()).getLastY();
    const lastZ = new Entity(Player.getPlayer()).getLastZ();

    const currentX = Player.getX();
    const currentY = Player.getY();
    const currentZ = Player.getZ();

    return Math.round(20 * distFormula(lastX, lastY, lastZ, currentX, currentY, currentZ) * 10) / 10;
}

const walkOn = (pointsOfPath) => {
    const currX = Math.round(Player.getX() * 10) / 10;
    const currY = Math.round(Player.getY() * 10) / 10;
    const currZ = Math.round(Player.getZ() * 10) / 10;

    let previous = 10;
    let closest = null;

    let nextPoint = null;
    let nextNextPoint = null;

    pointsOfPath.forEach(point => {
        let currentDist = calculateDistance(currX, currY, currZ, point.x, point.y, point.z);
        if (currentDist <= previous) {
            previous = currentDist;
            closest = point;
            if(pointsOfPath.indexOf(point) !== pointsOfPath.length - 1) {
                nextPoint = pointsOfPath[pointsOfPath.indexOf(point) + 1];
            }

            if(pointsOfPath.indexOf(point) !== pointsOfPath.length - 2) {
                nextNextPoint = pointsOfPath[pointsOfPath.indexOf(point) + 2];
            }
        }
    });

    if(closest !== null && nextPoint !== null) {
        stopAllMovement();
        if(closest === pointsOfPath[pointsOfPath.length - 1]) return true;
        const currYaw = Math.floor(Player.getYaw());
        
        if(!rotmode) {
            if(currX !== nextPoint.x && currX < nextPoint.x) getBind("X", "P", currYaw);
            if(currX !== nextPoint.x && currX > nextPoint.x) getBind("X", "N", currYaw);
            if(currZ !== nextPoint.z && currZ < nextPoint.z) getBind("Z", "P", currYaw);
            if(currZ !== nextPoint.z && currZ > nextPoint.z) getBind("Z", "N", currYaw);
        } else {
            forwardBind.setState(true);
            try {
                lookAtBlock({
                    x: nextNextPoint.x,
                    y: nextNextPoint.y,
                    z: nextNextPoint.z
                });
            } catch(err) {
                ChatLib.chat(`${prefix} FATAL ERROR: RUN "/ct load" COMMAND`)
            }
        }

        if(closest.y + 1 === nextPoint.y || Math.round(Player.getY()) + 1.5 === nextPoint.y) jumpBind.setState(true);
        return false;
    }
}

const calculateDistance = (x1, y1, z1, x2, y2, z2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}

register('command', (cmd, x, y, z) => {
    switch(cmd) {
        case "pathto":
            if(x && y && z) {
                try {
                    currentUserPath = pathTo(
                        parseFloat(x),
                        parseFloat(y),
                        parseFloat(z)
                    );
                    ChatLib.simulateChat(`§5[§dDebugtone§5] §7ok. pathing to ${x} ${y} ${z}`);
                } catch(e) { } // idc abt number error bs. just dont enter fucking numbers
            }
            break;
        case "clear":
            currentUserPath = [];
            ChatLib.simulateChat(`§5[§dDebugtone§5] §7ok. cleared path`);
            break;
        case "label":
            toggleLabel = !toggleLabel;
            ChatLib.simulateChat(`§5[§dDebugtone§5] §7set rendering point labels to ${toggleLabel.toString().toUpperCase()}`);
            break;
        case "go":
            if(currentUserPath.length === 0) {
                ChatLib.simulateChat(`§5[§dDebugtone§5] §7specify a path first by doing /debugtone pathto x y z`);
                break;
            }
            if(!autoWalk) {
                autoWalk = true;
                ChatLib.simulateChat(`§5[§dDebugtone§5] §7going`);
            } else if(autoWalk) {
                ChatLib.simulateChat(`§5[§dDebugtone§5] §7already going idiot`);
            }
            break;
        case "stop":
            if(autoWalk) {
                autoWalk = false;
                stopAllMovement();
                ChatLib.simulateChat(`§5[§dDebugtone§5] §7stopped`);
            } else {
                ChatLib.simulateChat(`§5[§dDebugtone§5] §7nothing to stop idiot`);
            }
            break;
        case "rotmode":
            rotmode = !rotmode;
            ChatLib.simulateChat(`§5[§dDebugtone§5] §7set rotation mode to §8${rotmode.toString().toUpperCase()}`);
            break;
    }
    
}).setName("debugtone");

export function GoToPoint(x,y,z) {
    avoidsWater = false;
    const path = pathTo(parseFloat(x),parseFloat(y),parseFloat(z))
    setCurrentPath(path)
    setAutoWalkStatus(true)
    rotmode = true;
}
export function stopMove() {
    setCurrentPath([])
    setAutoWalkStatus(false)
    rotmode = false;
}

let infractions = 0;

register('tick', () => {
    if(WalkBind.isKeyDown() || autoWalk) {
        let walkTask = walkOn(currentUserPath);
        if(autoWalk && !walkTask && getSpeed() === 0) {
            infractions++;
            if(infractions >= 100) {
                jumpBind.setState(true);
                if(infractions >= 140) {
                    infractions = 0;
                }
            }
        }
        if(autoWalk && walkTask) {
            autoWalk = false;
            currentUserPath = [];
            ChatLib.simulateChat(`§5[§dDebugtone§5] §7arrived.`);
        }
    }
});

register('renderWorld', () => {
    if(currentUserPath === undefined) return;
    if(currentUserPath.length <= 1) return;
    
    currentUserPath.forEach((point, index) => {
        if(toggleLabel) {
            disableGlShit();
            Tessellator.drawString(`§cPoint ${index + 1}`, point.x, point.y, point.z, Renderer.WHITE, true, 0.02, false);
            enableGlShit();
        }

        if(point !== currentUserPath[currentUserPath.length - 1]) {
            disableGlShit();
            
            Tessellator.begin(1)
            .colorize(renderColor[0], renderColor[1], renderColor[2], 1)
            .pos(
                point.x,
                point.y,
                point.z
            )
            .pos(
                currentUserPath[index + 1].x,
                currentUserPath[index + 1].y,
                currentUserPath[index + 1].z
            )
            .draw();

            enableGlShit();
        }
    });
});

const disableGlShit = () => {
    GL11.glDisable(GL11.GL_CULL_FACE);
    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(3.0);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDepthMask(false);

    GlStateManager.func_179094_E();
};

const enableGlShit = () => {
    GL11.glEnable(GL11.GL_CULL_FACE);
    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_DEPTH_TEST);
	GL11.glEnable(GL11.GL_TEXTURE_2D);
	GL11.glDepthMask(true);
	GL11.glDisable(GL11.GL_BLEND);
};

const getCurrentPath = () => {
    return currentUserPath;
}

const setCurrentPath = (toSet) => {
    currentUserPath = toSet;
}

const getAutoWalkStatus = () => {
    return autoWalk;
}

const setAutoWalkStatus = (boolean) => {
    autoWalk = boolean;
}

/* Exports for API Usage */
export {
    Point,
    pathTo,
    walkOn,
    getCurrentPath,
    setCurrentPath,
    getAutoWalkStatus,
    setAutoWalkStatus,
    getEyePos,
    lookAtBlock,
    setYaw,
    getBlockAtPoint
};