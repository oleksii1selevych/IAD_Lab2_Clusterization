import Node from './node.js'

export default class HierarchicalClusterization {

    #nodesArray;

    #minLinkageDistance = Number.MAX_VALUE;
    #firstNodeId = null;
    #secondNodeId = null;
    
    #centroidXCoordinates = [];
    #centroidYCoordinates = [];

    constructor(nodes){
        this.#nodesArray = nodes;        
    }
    
    #calculateDistanceMatrix(){
        this.#nodesArray.forEach(node => {
            this.#nodesArray.forEach(nestedNode => {
                let euclideanDist = this.#calcEuclideanDistance(node, nestedNode);
                if(euclideanDist < this.#minLinkageDistance && euclideanDist !== 0){
                    this.#minLinkageDistance = euclideanDist;
                    this.#firstNodeId = node.id;
                    this.#secondNodeId = nestedNode.id;
                }
            });
        });
    }

    #updateNodesArray(){
        
        let firstNode = this.#nodesArray.find(n => n.id === this.#firstNodeId);
        let secondNode = this.#nodesArray.find(n => n.id === this.#secondNodeId);

        this.#nodesArray = this.#nodesArray.filter(n => n.id !== this.#firstNodeId && n.id !== this.#secondNodeId);

        let newCentroidId =  `${this.#firstNodeId}${this.#secondNodeId}${this.#secondNodeId}${this.#secondNodeId}${this.#firstNodeId}`

        let newCentroid = new Node(0.1 , 0,  newCentroidId);
        newCentroid.left = firstNode;
        newCentroid.right = secondNode;
        newCentroid.convergence = this.#minLinkageDistance;
        this.#traverseTree(newCentroid);
        
        let centroidX = 0;
        let centroidY = 0;

        for(let i = 0; i< this.#centroidXCoordinates.length; i++) {
            centroidX += this.#centroidXCoordinates[i];
            centroidY += this.#centroidYCoordinates[i];
        }
        newCentroid.x = centroidX / this.#centroidXCoordinates.length;
        newCentroid.y = centroidY / this.#centroidXCoordinates.length;  

        this.#nodesArray.push(newCentroid);

        this.#firstNodeId = null;
        this.#secondNodeId = null;
        this.#minLinkageDistance = Number.MAX_VALUE;
        this.#centroidXCoordinates = [];
        this.#centroidYCoordinates = [];
    }

    performHierarchicalClusterization(){

        while(this.#nodesArray.length != 1){
            this.#calculateDistanceMatrix();
            this.#updateNodesArray();
        }
        return this.#nodesArray[0];
    }

    #traverseTree(node){
        if(node.right === null && node.left === null){
            this.#centroidXCoordinates.push(node.x);
            this.#centroidYCoordinates.push(node.y);
            return;
        } else{
            this.#traverseTree(node.left);
            this.#traverseTree(node.right);
        }
    }

    #calcEuclideanDistance(nodeA, nodeB){
        let xCord = Math.pow((nodeB.x - nodeA.x), 2);
        let yCord = Math.pow((nodeB.y - nodeA.y), 2);
        return Math.sqrt(xCord + yCord);
    }
}
3
