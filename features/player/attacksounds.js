import { guistuff } from "../../gui/gui";

const sound = new Sound({ source: "hit.ogg", volume: 0.05, attenuation: 0 })
  
function playSound(e = Entity) {
    if(!guistuff.Player.toggles[0]) return;
    if (e.entity?.func_110143_aJ() === 0) return;
    if (e.isInvisible()) return;

    sound.pause()
    sound.rewind()
    sound.play()
}

register("attackEntity", playSound);