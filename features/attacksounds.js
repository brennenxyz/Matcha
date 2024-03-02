import { gui } from "../gui/variables";

const sound = new Sound({ source: "hit.ogg", volume: 0.05, attenuation: 0 })
  
function playSound(e = Entity) {
    if(!gui.attack_sound) return;
    if (e.entity?.func_110143_aJ() === 0) return;
    if (e.isInvisible()) return;

    sound.pause()
    sound.rewind()
    sound.play()
}

register("attackEntity", playSound);