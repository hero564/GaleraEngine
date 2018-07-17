var GCollection = (function () {
    function GCollection() {
        this._childs = {};
        this._currentId = 0;
    }
    GCollection.prototype.add = function (child) {
        child.id = this._currentId;
        child.parrent = this;
        this._childs[this._currentId] = child;
        this._currentId += 1;
        return child.id;
    };
    GCollection.prototype.get = function (id) {
        if (this._childs[id] !== undefined) {
            return this._childs[id];
        }
        else {
            console.error("GCollection.get(" + id + ") - child with id \"" + id + " does not exists!\"");
        }
    };
    GCollection.prototype.remove = function (id) {
        delete this._childs[id];
    };
    GCollection.prototype.each = function (handler) {
        var keys = Object.keys(this._childs);
        for (var i in Object.keys(this._childs)) {
            handler(this._childs[Number(keys[i])], Number(this._childs[Number(keys[i])].id));
        }
    };
    GCollection.prototype.checkFreeIdOnRange = function (fromId, toId) {
        var id = fromId;
        while (id !== fromId + toId) {
            if (!this._childs.hasOwnPropherty(id)) {
                return id;
            }
        }
        return -1;
    };
    return GCollection;
}());
var coll = new GCollection();
for (var i = 1; i < 10; i++) {
    coll.add({ id: 0, parrent: undefined, numb: i });
}
coll.remove(6);
coll.each(function (child, id) {
    console.log(child.numb, id);
});
//# sourceMappingURL=galera.js.map