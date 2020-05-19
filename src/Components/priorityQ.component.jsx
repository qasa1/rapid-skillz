export default class PriorityQueue {
    constructor() {
        this.values = []
    }
    
    enqueue(val, distance) {
        this.values.push({ val, distance })
        this.sort()
    }
    
    dequeue() {
        let item = this.values.shift()
        return item
    }
    
    sort() {
        this.values.sort((a, b) => a.distance - b.distance)
    }
}