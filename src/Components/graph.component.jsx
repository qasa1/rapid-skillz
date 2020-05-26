import React, { Component } from 'react'
import {basicFrontEndSkills, basicFrontEndEdges} from '../Data/skills-store';
import PriorityQueue from './priorityQ.component';
import Table from './table.component';

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.adjacencyList = {};
        this.individualTimes = {};
        this.state = {
            fastestPath: [],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.skill !== this.props.skill) {
            this.resetComponent();
            this.displayResults(this.props.skill)
        }
    }

    resetComponent = () => {
        this.setState({
            fastestPath: []
        })
        this.adjacencyList = {};
        this.individualTimes = {};
    }

    displayResults = (skill) => {
        
        this.buildGraph(skill);

        if (Object.keys(this.adjacencyList).length > 0) {
            this.addEdges();
            this.djikstra(1,25);
        }
    }

    buildGraph = (skill) => {
        let skillNodes = this.getSkillData(skill);

        for (let node of skillNodes) {
            this.addVertex(node.name);
            this.individualTimes[node.name] = node.time;
        }
    }

    getSkillData = (skill) => {
        console.log(skill);
        switch(skill) {
            case "basic-frontend": return basicFrontEndSkills;
            case "intermediate-frontend": return [];
            case "basic-backend": return [];
            default: return [];
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
            let referenceToLastNode = previous[currentNode.val];

            while (item) {
            // Update state
            result.unshift(item);

            item = previous[item[0]]
            }

            this.individualTimes[finish.name] = referenceToLastNode[1];
            result.push([finish.name, finish.time]);

            console.log(result);
            this.setState({
                fastestPath: result
            })

            break;
        }

        if (currentNode.val || distances[currentNode] !== Infinity) {
            // Loop through neighbors of current node
            for (let neighbor of this.adjacencyList[currentNode.val]) {
            let candidate = currentNode.distance + neighbor.weight;
            if (candidate < distances[neighbor.node]) {
                distances[neighbor.node] = candidate
                previous[neighbor.node] = [currentNode.val, currentNode.distance]
                nodes.enqueue(neighbor.node, candidate)
            }
            }

        }
        }
       
    }

    render() {
        let graphExists = this.state.fastestPath.length > 0;
        let output;
        if (graphExists) {
            output = <Table data={this.state.fastestPath} times={this.individualTimes}/>;
        }else {
            output = "Sorry, we are current working on adding this skill to our platform"
        }
        return (
            <div>
                {/* {this.state.fastestPath.map((item, index) => <p key={index}>{item[0]} {this.individualTimes[item[0]]}</p>)} */}
                {output}
            </div>
        )
    }
}
