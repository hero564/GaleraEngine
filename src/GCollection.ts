/// <reference path="./GCollectable.ts" />


class GCollection{
    
    private _childs: any = {};
    private _currentId: number = 0;

    constructor(){

        this._childs = new Object;

    }

    add(child: GCollectable): number{
        
        child.id = this._currentId;
        child.parrent = this;
        this._childs[this._currentId] = child;
        this._currentId += 1;

        return this._currentId - 1;

    }

    get(id: number): GCollectable{

        if(this._childs[id] !== undefined){
            return this._childs[id];
        }else{
            console.error(`GCollection.get(${id}) - child with id "${id} does not exists!"`);
        }

    }

    remove(id: number): void{

        delete this._childs[id];

    }

    each(handler: (child: GCollectable, id: number)=>void): void{
        console.log(this._childs);
        for(let id in this._childs.keys()){
            handler(this._childs[id], Number(id));
        }

    }

    /**
     * TODO: realise reusing free id's, when childs removes, and test speed of both variants
     */
    private checkFreeIdOnRange(fromId: number, toId: number): number{
        let id: number = fromId;
        while(id !== fromId + toId){
            if(!this._childs.hasOwnPropherty(id)){
                return id;
            }
        }
        
        return -1;
    }

}