var GCollection = (function () {
    function GCollection() {
        this._childs = {};
        this._currentId = 0;
        this._childs = new Object;
    }
    GCollection.prototype.add = function (child) {
        child.id = this._currentId;
        child.parrent = this;
        this._childs[this._currentId] = child;
        this._currentId += 1;
        return this._currentId - 1;
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
        console.log(this._childs);
        for (var id in this._childs.keys()) {
            handler(this._childs[id], Number(id));
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
coll.each(function (child, id) {
    console.log(child.numb, id);
});
//# sourceMappingURL=galera.js.map