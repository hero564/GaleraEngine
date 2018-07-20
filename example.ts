/// <reference path="./src/GCollection.ts" />
/// <reference path="./src/GCollectable.ts" />
/// <reference path="./src/GLayer.ts" />
/// <reference path="./src/GLayerInstance.ts" />



const coll: GLayer = new GLayer(document.body, "gameLayer", 300, 300);

for(let i = 1; i < 10; i++){
    coll.add(<GLayerInstance>{
            update: function(dTime: number){
                console.log("viewX ",this.parrent.viewX);
            },
            draw: (ctx: CanvasRenderingContext2D)=>{
                ctx.fillText(String(i), i*32, 32);
            }
        })
}

coll.viewX = 100;
console.log(coll.viewX);
coll.update(5);
coll.draw();