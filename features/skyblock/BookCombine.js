import { data } from "../../stuff/consts";

let slots = []
let ticks = 0;

const GuiChest = Java.type(net.minecraft.client.gui.inventory.GuiChest)

register("tick", () => {
    if(!data.book_combine) return;
    ticks++
    if(ticks >= 20) {
        ticks = 0;

        let screen = Client.getMinecraft().field_71462_r // mc.currentScreen

        if(screen instanceof GuiChest) {
            let chest = Player.getInventory()
            let chestName = Player.getInventory().getName()
            let thePlayer = Client.getMinecraft().field_71439_g

            if(chestName.includes("Anvil")) {
                if(chest.getStackInSlot(13) !== null && chest.getStackInSlot(13).getName() !== null && chest.getStackInSlot(13).getItem().getName() !== "Barrier") {
                    slots = []
                    ChatLib.chat("test")
                } else {
                    ChatLib.chat("test")
                    for(i = 0; i < 36; i++) {
                        let item = thePlayer.field_71071_by.field_70462_a[i];

                        let index = i-8+53

                        if(i <= 8) {
                            index += 36;
                        }

                        if(chest.getStackInSlot(29) !== null && chest.getStackInSlot(29).getName() !== null && chest.getStackInSlot(29).getItem().getRegistryName() !== "minecraft:enchanted_book") {
                            item = chest.getStackInSlot(29);
                            index = 99;
                        }

                        if(item !== null && item.getName() !== null) {
                            if(item.getName().contains("Enchanted Book")) {
                                for (let x = 0; x < 36; x++) {
                                    let item2 =  thePlayer.field_71071_by.field_70462_a[x];
                                    if(item2 !== null && item2.getName() !== null) {
                                        if(item2.getName().contains("Enchanted Book")) {
                                            if(item.itemStack.func_77978_p().func_74775_l("display").func_150295_c("Lore", 8) == item2.itemStack.func_77978_p().func_74775_l("display").func_150295_c("Lore", 8)) {
                                                let index2 = x-8 + 53;

                                                if(x <= 8) {
                                                    index2 += 36;
                                                }
                                                
                                                if(index != 99) {
                                                    slots = [index, index2]
                                                }
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                        } 
                    }
                }
            }
        }
    }
})

register("postGuiRender", () => {
    // ChatLib.chat(slots.toString())
    if(slots == []) return;
    for (let slot of slots) {
        let x = slot % 9;
        let y = Math.floor(slot / 9);
        let renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
        let renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - Player.getOpenedInventory().getSize() / 18) * 18);

        Renderer.translate(0, 0, 260);
        Renderer.drawRect(Renderer.color(0, 255, 0, 200), renderX - 8, renderY - 8, 16, 16);
    }
})
