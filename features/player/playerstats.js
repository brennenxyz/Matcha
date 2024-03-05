import { guistuff, gui } from "../../gui/gui";

const display = new Display()
display.setBackground(DisplayHandler.Background.PER_LINE);
// display.setBackgroundColor(Renderer.color(0.5,0.5,0.5, 0.8)); this doesnt wanna work sooo :(
display.setRenderX(5)
display.setRenderY(5)

// keep name as displayFunc for no syntax errors :)
function displayFunc() {
    if(!guistuff.Player.toggles[1]) {
        display.clearLines()
    }
    else {
        display.setLine(0, `Name: ${Player.getName()}`)
        display.setLine(2, `X: ${Math.round(Player.getX())}`)
        display.setLine(3, `Y: ${Math.round(Player.getY())}`)
        display.setLine(4, `Z: ${Math.round(Player.getZ())}`)
        display.setLine(5, `Yaw: ${Math.round(Player.getYaw())}`)
        display.setLine(6, `Pitch: ${Math.round(Player.getPitch())}`)
    }
}

register("tick", displayFunc);