import { GoToPoint } from "../../stuff/pathfinder";

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
    testCheck.register()
    switch(curr) {
        case 1:
            GoToPoint(points[0][0], points[0][1], points[0][2])

    }
})

const testCheck = register("chat", () => {
    if(curr == 17) curr = 1;
    else curr++;
}).setCriteria(`[Debugtone] arrived.`)