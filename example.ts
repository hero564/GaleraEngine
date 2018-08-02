/// <reference path="./src/GCollection.ts" />
/// <reference path="./src/GCollectable.ts" />
/// <reference path="./src/GLayer.ts" />
/// <reference path="./src/GLayerInstance.ts" />



const coll: GLayer = new GLayer(document.body, "gameLayer", 300, 300);

for(let i = 0; i < 10; i++){
    coll.add(<GLayerInstance>{
            update: function(dTime: number){
                //console.log("viewX ",this.parrent.viewX);
            },
            draw: (ctx: CanvasRenderingContext2D)=>{
                ctx.strokeRect(i*10, i*10, 10, 10);
                ctx.fillText(String(i), i*10, i*10 + 10);
            }
        })
}

coll.CLEAR_CANVAS_EACH_CYCLE = true;
//coll.viewWidth =150;
//coll.viewHeight =150;

const but1: HTMLButtonElement = <HTMLButtonElement>document.getElementById("actionButt1");
const but2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("actionButt2");
const but3: HTMLButtonElement = <HTMLButtonElement>document.getElementById("actionButt3");
const but4: HTMLButtonElement = <HTMLButtonElement>document.getElementById("actionButt4");
const but5: HTMLButtonElement = <HTMLButtonElement>document.getElementById("actionButt5");
const but6: HTMLButtonElement = <HTMLButtonElement>document.getElementById("actionButt6");
2
but1.onclick = ()=>{
    coll.viewX -= 1;
};

but2.onclick = ()=>{
    coll.viewX   += 1;
};

but3.onclick = ()=>{
    coll.viewY -= 1;
};

but4.onclick = ()=>{
    coll.viewY  += 1;
};

but5.onclick = ()=>{
    //coll.viewWidth   -= 10;
    coll.alpha -= 0.1;
    console.log(coll.alpha);

};

but6.onclick = ()=>{
    //coll.viewWidth   += 10;
    coll.alpha +=0.1;
    console.log(coll.alpha);
};

setInterval(()=>{
    coll.draw();
}, 1000/30);

//console.log(coll.viewX);
//coll.update(5);
//coll.draw();

