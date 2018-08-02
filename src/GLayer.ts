/// <reference path="./GCollection.ts" />
/// <reference path="./GLayerInstance.ts" />
/// <reference path="./GCollectable.ts" />


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
   * Camera X position on canvas
   * Zero by default
   * 
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _viewX: number = 0;

  /**
   * Camera Y position on canvas
   * Zero by default
   * 
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _viewY: number = 0;

  /**
   *Camera width
   *
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _viewWidth: number = 1;


  /**
   *Camera height
   *
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _viewHeight: number = 1;

  /**
   *Camera angle
   *
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _angle: number = 0;

  /**
   *Layer transparrency
   *
   * @private
   * @type {number}
   * @memberof GLayer
   */
  private _alpha: number = 1;

  /**
   * If this flag is true, on each begining of draw cycle canvas will be cleared.
   * FALSE by default.
   *
   * @type {boolean}
   * @memberof GLayer
   */
  public CLEAR_CANVAS_EACH_CYCLE: boolean = false;

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
    this.viewWidth = width;
    this.viewHeight = height;
    this.width = width;
    this.height = height;

    console.log(this.viewWidth, this.viewHeight);


    //generate and put canvas to the root
    this._canvas = this.generateCanvas(id, width, height);
    this.root.appendChild(this.canvas);
    //get canvas context
    this._ctx = this.canvas.getContext("2d");
  }


  /**
   * Ovverrided GCollection.add() function.
   * Now need GLayerInstance as child
   *
   * @param {GLayerInstance} instance - layer instance for processing
   * @returns {number}
   * @memberof GLayer
   */
  add(instance: GLayerInstance): number{
    //just call super method)
    return super.add(instance);

  }

  /**
   * Generate new canvas for layer.
   * Call one time.
   *
   * @private
   * @param {string} id - id of canvas
   * @param {number} width - width of canvas
   * @param {number} height - height of canvas
   * @returns {HTMLCanvasElement} - new canvas
   * @memberof GLayer
   */
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

  /**
   * Draw function. 
   * Call every child draw() function.
   * For drawing thisngs.
   * Be true for calling this function after GLayer.update() or async
   * TODO: Correct camera view scaling(compabiling with camera mooving)
   *
   * @memberof GLayer
   */
  draw(): void {
    //clear canvas if flag is true
    if(this.CLEAR_CANVAS_EACH_CYCLE){
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    //Save context state before drawing
    this.ctx.save();

    /**
     * Scaling camera
     * Scale function must be before any transformation,
     * or its transforms not will be scaled.
     */
    this.ctx.scale(this.width / this.viewWidth, this.height / this.viewHeight);

    //transform degs to rads and rotate camera
    this.ctx.rotate(this.angle * Math.PI/180);

    //positioning camera
    this.ctx.translate(-this.viewX, -this.viewY);

    //layer opacity
    this.ctx.globalAlpha = this._alpha;

    //User drawings
    this.insideDraw();

    //Restore context state after drawing
    this.ctx.restore();
    
  }

  insideDraw(): void{
    //draw each child instance of layer
    this.each((child, childId)=>{
      
      let currentInstance: GLayerInstance = <GLayerInstance>child;

      currentInstance.draw(this.ctx);
    });
  }

  /**
   * Update function.
   * It for logic code.
   * Be true for calling this function before GLayer.draw() or async
   *
   * @param {number} dTime - time after last calling
   * @memberof GLayer
   */
  update(dTime: number): void {

    //update each child instance of layer
    this.each((child, childId)=>{

      let currentInstance: GLayerInstance = <GLayerInstance>child;

      currentInstance.update(dTime);

    });
  }


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

  /**
   *Setter for camera view X position on canvas
   *
   * @memberof GLayer
   */
  set viewX(xpos: number){
    this._viewX = xpos;
  }

  /**
   *Getter for camera view X position on canvas
   *
   * @type {number}
   * @memberof GLayer
   */
  get viewX():number{
    return this._viewX;
  }
  
  /**
   * Setter for camera view Y positon on canvas
   *
   * @memberof GLayer
   */
  set viewY(ypos: number){
    this._viewY = ypos;
  }

  /**
   * Getter for camera view Y position on canvas
   *
   * @type {number}
   * @memberof GLayer
   */
  get viewY(): number{
    return this._viewY;
  }

  /**
   * Camera width setter.
   * Must be larger than 0.
   * If smaller than 0, will be used Math.abs(newValue)
   *
   * @memberof GLayer
   */
  set viewWidth(wView: number){
    //cant be smaller 0
    let newWidth: number = Math.abs(wView);
    //check on eq 0
    if(newWidth > 0){
      this._viewWidth = wView;
    }else{
      console.error(`Glayer.viewWidth - must be larger 0(try set to ${newWidth})`);
    }
  }

  /**
   * Camera width getter
   *
   * @memberof GLayer
   */
  get viewWidth(): number{
    return this._viewWidth;
  }

  /**
   * Camera height setter
   * Must be larger than 0.
   * If smaller than 0, will be used Math.abs(newValue)
   *
   * @memberof GLayer
   */
  set viewHeight(hView: number){
    //cant be eq 0
    let newHeight: number = Math.abs(hView);
    //check on eq 0
    if(newHeight > 0){
      this._viewHeight = hView;
    }else{
      console.error(`Glayer.viewHeight - must be larger 0(try set to ${newHeight})`);
    }
  }

  /**
   * Camera height getter
   *
   * @type {number}
   * @memberof GLayer
   */
  get viewHeight(): number{
    return this._viewHeight;
  }

  /**
   *Set camera view angle in degreese
   *
   * @memberof GLayer
   */
  set angle(degreese: number){
    this._angle = degreese;
  }

  /**
   *Get camera view in degree
   *
   * @type {number}
   * @memberof GLayer
   */
  get angle(): number{
    return this._angle;
  }

  /**
   *Layer opacity. Range from 0 to 1
   *
   * @memberof GLayer
   */
  set alpha(opacity: number){
    //max value is 1
    if(opacity > 1){
      this._alpha = 1;
    }else if(opacity <=0){
      //min value is 0
      this._alpha = 0;
    }else{
      this._alpha = opacity;
    }
  }

  get alpha(): number{
    return this._alpha;
  }
}
