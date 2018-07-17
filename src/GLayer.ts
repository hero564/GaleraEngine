/// <reference path="./GCollection.ts" />

/**
 *Layer dor drawing things on canvas
 *Here and next "Layer" near to "Canvas"
 * @class GLayer
 * @extends {GCollection}
 */
class GLayer extends GCollection {
  /**
   *Layer parrent element
   *
   * @private
   * @type {HTMLElement}
   * @memberof GLayer
   */
  private _root: HTMLElement;
  /**
   *Layer width
   *
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _width: number;
  /**
   *Layer height
   *
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _height: number;
  /**
   *Layer id/canvas id
   *
   * @private
   * @type {string}
   * @memberof GLayer
   */
  private _id: string;
  /**
   *Canvas element
   *
   * @private
   * @type {HTMLCanvasElement}
   * @memberof GLayer
   */
  private _canvas: HTMLCanvasElement;
  /**
   *Canavs context
   *
   * @private
   * @type {CanvasRenderingContext2D}
   * @memberof GLayer
   */
  private _ctx: CanvasRenderingContext2D;

  /**
   *Creates an instance of GLayer.
   * @param {HTMLElement} [root=document.body] - root element for layer. Body by default
   * @param {string} id - id of canvas on page
   * @param {number} [width=300] - width of canvas
   * @param {number} [height=200] - height of canvas
   * @memberof GLayer
   */
  constructor(
    root: HTMLElement = document.body,
    id: string,
    width: number = 300,
    height: number = 200
  ) {
    super();

    this._root = root;
    this._id = id;

    //generate and put canvas to the root
    this._canvas = this.generateCanvas(id, width, height);
    this.root.appendChild(this.canvas);
    //get canvas context
    this._ctx = this.canvas.getContext("2d");
  }

  private generateCanvas(
    id: string,
    width: number,
    height: number
  ): HTMLCanvasElement {
    //create new canvas element
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
      document.createElement("canvas")
    );
    //set atributes
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;

    return canvas;
  }

  draw(): void {}

  update(): void {}
  /**
   *Return root element
   *
   * @readonly
   * @type {HTMLElement}
   * @memberof GLayer
   */
  get root(): HTMLElement {
    return this._root;
  }
  /**
   *Layer width getter
   *
   * @type {number}
   * @memberof GLayer
   */
  get width(): number {
    return this._width;
  }

  /**
   *Layer width setter
   *
   * @memberof GLayer
   */
  set width(newWidth: number) {
    //checking boundaries
    if (newWidth > 0) {
      this._width = newWidth;
    } else {
      console.error(
        `GLayer.width - must be larger than 0(try set to ${newWidth})`
      );
    }
  }

  /**
   *Layer height getter
   *
   * @type {number}
   * @memberof GLayer
   */
  get height(): number {
    return this._height;
  }
  /**
   *Layer height setter
   *
   * @memberof GLayer
   */
  set height(newHeight: number) {
    //checking boundaries
    if (newHeight > 0) {
      this._height = newHeight;
    } else {
      console.error(
        `GLayer.height - must be larger than 0(try set to ${newHeight})`
      );
    }
  }

  /**
   *Layer id(and id of canvas element for drawing) getter
   *
   * @readonly
   * @type {string}
   * @memberof GLayer
   */
  get id(): string {
    return this._id;
  }
  /**
   *Canvas element getter
   *
   * @readonly
   * @type {HTMLCanvasElement}
   * @memberof GLayer
   */
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  /**
   *Canvas element context getter
   *
   * @readonly
   * @type {CanvasRenderingContext2D}
   * @memberof GLayer
   */
  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }
}
