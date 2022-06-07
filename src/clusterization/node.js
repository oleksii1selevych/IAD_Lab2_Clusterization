export default class Node {
    constructor (x, y, id){
        this.id = id;
        this.x = x;
        this.y = y;
        this.right = null;
        this.left = null;
        this.convergence = null;
    }
}