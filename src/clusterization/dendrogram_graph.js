export default class DendrogramGraph {
    #canvas;
    #canvasYWorkSpace;
    #canvasXWorkSpace;
  
    #maxConvergence;
    #splitLevel = 2;
    #context;
  
    #GRAPH_LEFT;
    #GRAPH_RIGHT;
    #GRAPH_TOP;
    #GRAPH_BOTTOM;
  
    constructor(canvas) {
      this.#canvas = canvas;
      this.#context = canvas.getContext("2d");
      this.#canvasYWorkSpace = this.#canvas.height - 75;
      this.#canvasXWorkSpace = this.#canvas.width - 75;
  
      this.#GRAPH_LEFT = 50;
      this.#GRAPH_TOP = 25;
      this.#GRAPH_RIGHT = this.#canvas.width - 25;
      this.#GRAPH_BOTTOM = this.#canvas.height - 50;
    }
  
    #drawXandYAxis() {
      this.#context.beginPath();
      this.#context.moveTo(this.#GRAPH_LEFT, this.#GRAPH_TOP);
      this.#context.lineTo(this.#GRAPH_LEFT, this.#GRAPH_BOTTOM);
      this.#context.lineTo(this.#GRAPH_RIGHT, this.#GRAPH_BOTTOM);
      this.#context.stroke();
    }
  
    #drawNode(xleftFrom, xRightFrom, xTo, yFrom, yTo) {
      this.#drawLine(xleftFrom, yFrom, xTo, yFrom);
      this.#drawLine(xRightFrom, yTo, xTo, yTo);
      this.#drawLine(xTo, yFrom, xTo, yTo);
    }
  
    #drawLine (fromX, fromY, toX, toY) {
      this.#context.beginPath();
      this.#context.strokeStyle = 'blue';
      this.#context.moveTo(fromX, fromY);
      this.#context.lineTo(toX, toY);
      this.#context.stroke();
      }
  
    #drawDendrogram(node, yMidPoint, level){
      if(node.left === null || node.right === null)
          return;
      
      let leftY = yMidPoint - yMidPoint / level;
      let rightY = yMidPoint + yMidPoint / level;
  
      let currentX = (node.convergence / this.#maxConvergence) * this.#canvasXWorkSpace + 50;
      if(node.left.left === null || node.right.right === null) {
          this.#drawNode(this.#GRAPH_LEFT, this.#GRAPH_LEFT, currentX , leftY, rightY);
      }
      else 
      {
          let leftX = this.#drawDendrogram(node.left, leftY, level * 2);
          let rightX = this.#drawDendrogram(node.right, rightY, level * 4);
          this.#drawNode(leftX, rightX, currentX, leftY, rightY);
      }
      return currentX;
    }
  
    #drawLabels(){
      let scaleInterval = this.#maxConvergence / 10;
      let pxInternal = (this.#canvas.width - 25) / 10;
  
      for(let i = 0; i < 10; i++ ){
          this.#context.fillText((this.#maxConvergence - i * scaleInterval).toFixed(1), this.#canvas.width - 25 -  i * pxInternal, this.#GRAPH_BOTTOM + 15);
      }
    }
  
    drawClusterDendrogram(finalCluser){
      this.#maxConvergence = finalCluser.convergence;
      this.#drawXandYAxis();
      this.#drawLabels();
      this.#drawDendrogram(finalCluser, this.#canvasYWorkSpace / 2 + 25, this.#splitLevel);
    }
  
    eraseCanvas(){
      this.#context.clearRect(0, 0 , this.#canvas.width, this.#canvas.height);
    }
  }
  