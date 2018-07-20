var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var GLayer = (function (_super) {
    __extends(GLayer, _super);
    function GLayer(root, id, width, height) {
        if (root === void 0) { root = document.body; }
        if (width === void 0) { width = 300; }
        if (height === void 0) { height = 200; }
        var _this = _super.call(this) || this;
        _this._viewX = 0;
        _this._viewY = 0;
        _this._viewWidth = 1;
        _this._viewHeight = 1;
        _this.CLEAR_CANVAS_EACH_CYCLE = false;
        _this._root = root;
        _this._id = id;
        _this.viewWidth = width;
        _this.viewHeight = height;
        _this.width = width;
        _this.height = height;
        console.log(_this.viewWidth, _this.viewHeight);
        _this._canvas = _this.generateCanvas(id, width, height);
        _this.root.appendChild(_this.canvas);
        _this._ctx = _this.canvas.getContext("2d");
        return _this;
    }
    GLayer.prototype.add = function (instance) {
        return _super.prototype.add.call(this, instance);
    };
    GLayer.prototype.generateCanvas = function (id, width, height) {
        var canvas = (document.createElement("canvas"));
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        return canvas;
    };
    GLayer.prototype.draw = function () {
        if (this.CLEAR_CANVAS_EACH_CYCLE) {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
        this.ctx.translate(-this.viewX, -this.viewY);
        this.ctx.save();
        this.ctx.scale(this.width / this.viewWidth, this.height / this.viewHeight);
        this.insideDraw();
        this.ctx.restore();
    };
    GLayer.prototype.insideDraw = function () {
        var _this = this;
        this.each(function (child, childId) {
            var currentInstance = child;
            currentInstance.draw(_this.ctx);
        });
    };
    GLayer.prototype.update = function (dTime) {
        this.each(function (child, childId) {
            var currentInstance = child;
            currentInstance.update(dTime);
        });
    };
    Object.defineProperty(GLayer.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (newWidth) {
            if (newWidth > 0) {
                this._width = newWidth;
            }
            else {
                console.error("GLayer.width - must be larger than 0(try set to " + newWidth + ")");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (newHeight) {
            if (newHeight > 0) {
                this._height = newHeight;
            }
            else {
                console.error("GLayer.height - must be larger than 0(try set to " + newHeight + ")");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "viewX", {
        get: function () {
            return this._viewX;
        },
        set: function (xpos) {
            this._viewX = xpos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "viewY", {
        get: function () {
            return this._viewY;
        },
        set: function (ypos) {
            this._viewY = ypos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "viewWidth", {
        get: function () {
            return this._viewWidth;
        },
        set: function (wView) {
            var newWidth = Math.abs(wView);
            if (newWidth > 0) {
                this._viewWidth = wView;
            }
            else {
                console.error("Glayer.viewWidth - must be larger 0(try set to " + newWidth + ")");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLayer.prototype, "viewHeight", {
        get: function () {
            return this._viewHeight;
        },
        set: function (hView) {
            var newHeight = Math.abs(hView);
            if (newHeight > 0) {
                this._viewHeight = hView;
            }
            else {
                console.error("Glayer.viewHeight - must be larger 0(try set to " + newHeight + ")");
            }
        },
        enumerable: true,
        configurable: true
    });
    return GLayer;
}(GCollection));
var coll = new GLayer(document.body, "gameLayer", 300, 300);
var _loop_1 = function (i) {
    coll.add({
        update: function (dTime) {
        },
        draw: function (ctx) {
            ctx.strokeRect(i * 10, i * 10, 10, 10);
            ctx.fillText(String(i), i * 10, i * 10 + 10);
        }
    });
};
for (var i = 0; i < 10; i++) {
    _loop_1(i);
}
coll.viewWidth = 100;
coll.viewHeight = 150;
//# sourceMappingURL=galera.js.map