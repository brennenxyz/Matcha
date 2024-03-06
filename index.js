// player: import "./features/player/"
import "./features/player/attacksounds"
import "./features/player/playerstats"

// skyblock: import "./features/skyblock/"
import "./features/skyblock/LowballBlocker"
import "./features/skyblock/ZealotCounter"
import "./features/skyblock/emannuker"
import "./features/skyblock/zealotmacro"

// gui
import "./gui/gui"
import { proFeature } from "./stuff/functions"
import "./rpc/rpc"

proFeature("test")

register("tick", () => {
    org.lwjgl.opengl.Display.setTitle("MatchaClient");
})
