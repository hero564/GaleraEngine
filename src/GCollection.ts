/// <reference path="./GCollectable.ts" />

/**
 * Collection class for containing and
 * simple using containable items
 *
 * @class GCollection
 */
class GCollection {
  /**
   * Cotainer for childs
   *
   * @private
   * @type {*}
   * @memberof GCollection
   */
  private _childs: any = {};

  /**
   * Id's for new objects inkrements every time
   * when adding new item in collection.
   *
   * @private
   * @type {number}
   * @memberof GCollection
   */
  private _currentId: number = 0;

  constructor() {}

  /**
   * Add new child into collection
   *
   * @param {GCollectable} child - new item to add, with GCollectable interface
   * @returns {number} - id of child in collection
   * @memberof GCollection
   */
  add(child: GCollectable): number {
    //set id for new child
    child.id = this._currentId;

    //set collection as parrent
    child.parrent = this;

    //add child to container
    this._childs[this._currentId] = child;

    //inkreese id counter
    this._currentId += 1;

    //return id of new child
    return child.id;
  }

  /**
   * Get child from collection
   *
   * @param {number} id - id of child for extraction
   * @returns {GCollectable} - child
   * @memberof GCollection
   */
  get(id: number): GCollectable {
    //check if collection contain child with needed id
    if (this._childs[id] !== undefined) {
      return this._childs[id];
    } else {
      //else log error
      console.error(
        `GCollection.get(${id}) - child with id "${id} does not exists!"`
      );
    }
  }

  /**
   * Remove child from collection
   *
   * @param {number} id - id of child for removing
   * @memberof GCollection
   */
  remove(id: number): void {
    delete this._childs[id];
  }

  /**
   * Map funtion for collection;
   *
   *
   * @param {(child: GCollectable, id: number) => void} handler - fuction what will be called for each child
   * @memberof GCollection
   */
  each(handler: (child: GCollectable, id: number) => void): void {
    //get list of id's in collection
    let keys: String[] = Object.keys(this._childs);

    for (let i in Object.keys(this._childs)) {
      //Number(keys[i]) - need for using id of child, not position of key in keys[]
      handler(
        this._childs[Number(keys[i])],
        Number(this._childs[Number(keys[i])].id)
      );
    }
  }

  /**
   * TODO: realise reusing free id's, when childs removes, and test speed of both variants
   */
  private checkFreeIdOnRange(fromId: number, toId: number): number {
    let id: number = fromId;
    while (id !== fromId + toId) {
      if (!this._childs.hasOwnPropherty(id)) {
        return id;
      }
    }

    return -1;
  }
}
