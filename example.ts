/// <reference path="./src/GCollection.ts" />
/// <reference path="./src/GCollectable.ts" />

const coll: GCollection = new GCollection();

for(let i = 1; i < 10; i++){
    coll.add(<GCollectable>{id:0, parrent: undefined, numb: i})
}

coll.remove(6);

coll.each((child: any, id: number)=>{
    console.log(child.numb, id);
});
