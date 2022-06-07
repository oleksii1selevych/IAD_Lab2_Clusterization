import Node from './node.js';

export default class DataManager {

    #minValue = 0.00001;
    #maxValue = 3.0;

    constructor(){

    }
    getRandomNumberInRange(min, max){
        return Math.random() * (max - min) + min; 
    }

    generateNodes(nodesCount){
        let nodes = [];

        for(let i = 0; i < nodesCount; i++){
            let x = this.getRandomNumberInRange(this.#minValue, this.#maxValue);
            let y = this.getRandomNumberInRange(this.#minValue, this.#maxValue);
            nodes.push(new Node(x, y, i));
        }
        return nodes;
    }

    convertNodesToPoints(nodes){
        return nodes.map((element) => {
            return [element.x, element.y ];
        });
    }
}


