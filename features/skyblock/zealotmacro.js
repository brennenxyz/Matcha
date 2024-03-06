import { prefix } from "../../stuff/consts";
import { GoToPoint, stopMove } from "../../stuff/pathfinder";

let going = false;
let curr = 1;

const points = [
    [-630, 15, -275],
    [-630, 6, -256],
    [-636, 6, -233],
    [-654, 4, -225],
    [-665, 4, -233],
    [-668, 4, -250],
    [-687, 4, -264],
    [-715, 4, -292],
    [-708, 4, -312],
    [-694, 4, -326],
    [-679, 4, -334],
    [-658, 4, -325],
    [-632, 4, -331],
    [-623, 5, -316],
    [-620, 7, -304],
    [-622, 7, -292],
    [-622, 14, -276]
];

register("tick", () => {
    if(Client.isInChat()) stopMove();
    if(Client.isInGui()) stopMove();
    if(!Client.isTabbedIn()) stopMove();
    if(Client.isInTab()) stopMove();
})

register("tick", () => {
    if(going) return;
    testCheck.register()
    if (curr == 1) {
        stopMove()
        GoToPoint(points[0][0], points[0][1], points[0][2]);
        ChatLib.chat(`${prefix} Debug: Path 1 Started.`)
        going = true;
    } else if (curr == 2) {
        stopMove()
        GoToPoint(points[1][0], points[1][1], points[1][2]);
        ChatLib.chat(`${prefix} Debug: Path 2 Started.`)
        going = true;
    } else if (curr == 3) {
        stopMove()
        GoToPoint(points[2][0], points[2][1], points[2][2]);
        ChatLib.chat(`${prefix} Debug: Path 3 Started.`)
        going = true;
    }
    else if (curr == 4) {
        stopMove()
        GoToPoint(points[3][0], points[3][1], points[3][2]);
        ChatLib.chat(`${prefix} Debug: Path 4 Started.`)
        going = true;
    } else if (curr == 5) {
        stopMove()
        GoToPoint(points[4][0], points[4][1], points[4][2]);
        ChatLib.chat(`${prefix} Debug: Path 5 Started.`)
        going = true;
    } else if (curr == 6) {
        stopMove()
        GoToPoint(points[5][0], points[5][1], points[5][2]);
        ChatLib.chat(`${prefix} Debug: Path 6 Started.`)
        going = true;
    } else if (curr == 7) {
        stopMove()
        GoToPoint(points[6][0], points[6][1], points[6][2]);
        ChatLib.chat(`${prefix} Debug: Path 7 Started.`)
        going = true;
    } else if (curr == 8) {
        stopMove()
        GoToPoint(points[7][0], points[7][1], points[7][2]);
        ChatLib.chat(`${prefix} Debug: Path 8 Started.`)
        going = true;
    } else if (curr == 9) {
        stopMove()
        GoToPoint(points[8][0], points[8][1], points[8][2]);
        ChatLib.chat(`${prefix} Debug: Path 9 Started.`)
        going = true;
    } else if (curr == 10) {
        stopMove()
        GoToPoint(points[9][0], points[9][1], points[9][2]);
        ChatLib.chat(`${prefix} Debug: Path 10 Started.`)
        going = true;
    } else if (curr == 11) {
        stopMove()
        GoToPoint(points[10][0], points[10][1], points[10][2]);
        ChatLib.chat(`${prefix} Debug: Path 11 Started.`)
        going = true;
    } else if (curr == 12) {
        stopMove()
        GoToPoint(points[11][0], points[11][1], points[11][2]);
        ChatLib.chat(`${prefix} Debug: Path 12 Started.`)
        going = true;
    } else if (curr == 13) {
        stopMove()
        GoToPoint(points[12][0], points[12][1], points[12][2]);
        ChatLib.chat(`${prefix} Debug: Path 13 Started.`)
        going = true;
    } else if (curr == 14) {
        stopMove()
        GoToPoint(points[13][0], points[13][1], points[13][2]);
        ChatLib.chat(`${prefix} Debug: Path 14 Started.`)
        going = true;
    } else if (curr == 15) {
        stopMove()
        GoToPoint(points[14][0], points[14][1], points[14][2]);
        ChatLib.chat(`${prefix} Debug: Path 15 Started.`)
        going = true;
    } else if (curr == 16) {
        stopMove()
        GoToPoint(points[15][0], points[15][1], points[15][2]);
        ChatLib.chat(`${prefix} Debug: Path 16 Started.`)
        going = true;
    } else if (curr == 17) {
        stopMove()
        GoToPoint(points[16][0], points[16][1], points[16][2]);
        ChatLib.chat(`${prefix} Debug: Path 17 Started. (final path)`)
        going = true;
    }
})

const testCheck = register("chat", () => {
    if(curr == 17) curr = 1;
    else curr++;
    going = false;
    stopMove()
}).setCriteria(`[Debugtone] arrived.`)