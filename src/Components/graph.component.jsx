import React, { Component } from 'react'
import {basicFrontEndSkills, basicFrontEndEdges} from '../Data/skills-store';
import PriorityQueue from './priorityQ.component';

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.adjacencyList = {};
        this.state = {
            fastestPath: []
        }
    }

    componentDidMount() {
        this.buildGraph();
        this.addEdges();
        let tits = this.djikstra(1,25);

        console.log(tits);
    }

    buildGraph = () => {
        for (let node of basicFrontEndSkills) {
            this.addVertex(node.name);
        }
    }

    addVertex = (value) => {
        if (!this.adjacencyList[value]) {
            this.adjacencyList[value] = []
        }
    }

    addEdges = () => {
        for (let edge of basicFrontEndEdges) {
            let v1 = basicFrontEndSkills.filter((obj) =>  obj.id === edge[0])[0];
            let v2 = basicFrontEndSkills.filter((obj) =>  obj.id === edge[1])[0];
            this.adjacencyList[v1.name].push({node: v2.name , weight: v1.time + v2.time});
        }
    }

    djikstra(startID, finishID) {
        const nodes = new PriorityQueue()
        let distances = {}
        let previous = {}
        let result = []

        // Fetch start and finish nodes
        let start = basicFrontEndSkills.filter((obj) => obj.id === startID)[0];
        let finish = basicFrontEndSkills.filter((obj) => obj.id === finishID)[0];

        // Build up initial state
        for (let node in this.adjacencyList) {
        if (node === start.name) {
            distances[node] = 0
            nodes.enqueue(node, distances[node])
        } else {
            distances[node] = Infinity
            nodes.enqueue(node, distances[node])
        }
        previous[node] = null
        }


        // The main loop - while priority queue is populated

        while (nodes.values.length) {
        let currentNode = nodes.dequeue()
        if (currentNode.val === finish.name) {
            // We are done
            let item = previous[currentNode.val]
            while (item) {
            // Update state
            result.unshift(item);

            item = previous[item]
            }

            result.push(finish.name);
            this.setState({
                fastestPath: result
            })

            break;
        }

        if (currentNode.val || distances[currentNode] !== Infinity) {
            // Loop through neighbors of current node
            for (let neighbor of this.adjacencyList[currentNode.val]) {
                console.log("currentNode", currentNode, "neighbnor", neighbor )
            let candidate = currentNode.distance + neighbor.weight;
            if (candidate < distances[neighbor.node]) {
                distances[neighbor.node] = candidate
                previous[neighbor.node] = currentNode.val
                nodes.enqueue(neighbor.node, candidate)
            }
            }

            console.log("previous", previous);
        }
        }
       
    }

    render() {
        return (
            <div>
                {this.state.fastestPath.map((item, index) => <p key={index}>{item}</p>)}
            </div>
        )
    }
}
