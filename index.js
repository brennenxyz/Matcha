const meta = JSON.parse(FileLib.read("Matcha", "metadata.json")) 

import { prefix } from "./stuff/consts"
// player: import "./features/player/"
import "./features/player/attacksounds"
import "./features/player/playerstats"

// skyblock: import "./features/skyblock/"
import "./features/skyblock/LowballBlocker"
import "./features/skyblock/ZealotCounter"
import "./features/zealotnuker/emannuker"

// gui
import "./gui/gui"
import "./rpc/rpc"

function changeGameTitle(str) {
    // taken from https://github.com/debuggingss/Neptune
    if(org.lwjgl.opengl.Display.getTitle() == str) return;
    org.lwjgl.opengl.Display.setTitle(str)
}

register("tick", () => {
    changeGameTitle(`Matcha | V${meta.version}${meta.releaseType}`);
})

function checkVersion() {
    const api = FileLib.getUrlContent("https://raw.githubusercontent.com/MatchaDevelopment/data/main/api/version")
    const json = JSON.parse(api)
    if(meta.releaseType == "B") {
        if(json.betaVers !== meta.version) {
            ChatLib.chat(`${prefix} Version Outdated! Update At https://github.com/MatchaDevelopment/Matcha`)
            return;
        }
    } else if(meta.releaseType == "S") {
        if(json.stableVers !== meta.version) {
            ChatLib.chat(`${prefix} Version Outdated! Update At https://github.com/MatchaDevelopment/Matcha`)
            return;
        }
    }
}

register("worldLoad", checkVersion)