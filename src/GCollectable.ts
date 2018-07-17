/// <reference path="./GCollection.ts" />

/**
 *Simple interface for child of GCollection
 *
 * @interface GCollectable
 */
interface GCollectable {
  /**
   *id of item in collection
   *
   * @type {number}
   * @memberof GCollectable
   */
  id: number;

  /**
   *Current collection
   *
   * @type {GCollection}
   * @memberof GCollectable
   */
  parrent: GCollection;
}
