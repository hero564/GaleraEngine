/// <reference path="./GCollectable.ts" />

/**
 * Extender GCollectable interface for using in GLayer
 *
 * @interface GLayerInstance
 * @extends {GCollectable}
 */
interface GLayerInstance extends GCollectable {
  /**
   *  Function for drawing things.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas context for drawing
   * @memberof GLayerInstance
   */
  draw(ctx: CanvasRenderingContext2D): void;

  /**
   *
   *
   * @param {number} dTime - time after last calling
   * @memberof GLayerInstance
   */
  update(dTime: number): void;
}
