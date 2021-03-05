
var visited = []
var kürzester_weg = []

var x = []
var visited
function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function bfs(y,i){
    visited = [[y,i]]
    kürzester_weg = []
    var queue = [[y,i]]
    var queue2 = [[]]
    while (queue.length > 0){
        //window.alert(kürzester_weg[1])
        var a = queue.shift()
        var s = queue2.shift()
        var e = document.getElementById(`${a[0]}/${a[1]}`)
        if (e.className === "wall"){
            continue
        }
        if (e.className === "visited"){
            continue
        }
        if (e.className === "unvisited"){
            e.className = "visited"
        }
        if (a[0]+1 < 20){
            e = [a[0]+1,a[1]]
            queue2.push(s.concat([e]))
            queue.push(e)
        }
        if (a[0]-1 >= 0){
            e = [a[0]-1,a[1]]
            queue2.push(s.concat([e]))
            queue.push(e)
        }
        if (a[1]+1 < 50){
            e = [a[0],a[1]+1]
            queue2.push(s.concat([e]))
            queue.push(e)
        }
        if (a[1]-1 >= 0){
            e = [a[0],a[1]-1]
            queue2.push(s.concat([e]))
            queue.push(e)
        }
        e = [a[0],a[1]]
        visited.push(e)
        kürzester_weg.push(s.concat([e]))
    }
    for (let y = 0; y < 20; y++){
        for (let i = 0; i < 50; i++) {
            var id = `${y}/${i}`
            var e = document.getElementById(id)
            if (e.className === "visited"){
                e.className = "unvisited"
            }
        }
    }
 }

async function dfs_(y,i){
    var e = document.getElementById(`${y}/${i}`)
    if (e.className === "wall"){
        return
    }
    if (e.className === "visited"){
        return
    }
    if (e.className === "unvisited"){
        //e.className = "wall"
        e.className = "visited"
    }
    visited.push([y,i])
    if (y-1 < 20){
        dfs_(y-1,i)
    }
    if (i+1 < 50){
        dfs_(y,i+1)
    }
    if (y+1 >= 0){
        dfs_(y+1,i)
    }
    if (i-1 >= 0){
        dfs_(y,i-1)
    }
    
}

async function dfs(y,i){
    kürzester_weg = []
    visited = [[y,i]]
    if (y-1 < 20){
        dfs_(y-1,i)
    }
    if (i+1 < 50){
        dfs_(y,i+1)
    }
    if (y+1 >= 0){
        dfs_(y+1,i)
    }
    if (i-1 >= 0){
        dfs_(y,i-1)
    }
    for (let y = 0; y < 20; y++){
        for (let i = 0; i < 50; i++) {
            var id = `${y}/${i}`
            var e = document.getElementById(id)
            if (e.className === "visited"){
                e.className = "unvisited"
            }
        }
    }
    return   
}
async function shortest_path(v){
    for (let i = 0; i < v.length-2; i++){
        await Sleep(40)
        var e = document.getElementById(`${v[i][0]}/${v[i][1]}`)
        e.className = "shortest-path"
    }
    document.getElementById("clear-board").className = "navigation-grid-normal"
    document.getElementById("clear-path").className = "navigation-grid-visualized"
    document.getElementById("dropdown_id").parentNode.className = "navigation-grid-normal"
    document.getElementById("visualize").parentNode.className = "navigation-grid-normal"
    return
}
async function visualize(){
    if (document.getElementById("visualize").parentNode.className === "navigation-grid-visualizing"){
        return
    }
    if (document.getElementById("visualize").className === ""){
        document.getElementById("visualize").innerHTML = `<p>Pick an Algorithm</p>`
        return
    }
    document.getElementById("clear-board").className = "navigation-grid-visualizing"
    document.getElementById("clear-path").className = "navigation-grid-visualizing"
    document.getElementById("generate-maze").parentNode.className = "navigation-grid-visualizing"
    document.getElementById("visualize").parentNode.className = "navigation-grid-visualizing"
    document.getElementById("dropdown_id").parentNode.className = "navigation-grid-visualizing"
    for (let y = 0; y < 20; y++){
        for (let i = 0; i < 50; i++){
            var e = document.getElementById(`${y}/${i}`)
            if (e.className === "start"){
                var row = y
                var column = i
                continue
            }
            if (e.className === "end" || e.className === "wall"){
                continue
            }
            e.className = "unvisited"
        }
    }
    var algorithm = document.getElementById("visualize").className
    if (algorithm === "BFS"){
        bfs(row,column)
    }else if (algorithm === "DFS"){
        dfs(row,column)
    }
    for (let i = 0; i < visited.length; i++){
        await Sleep(20)
        var e = document.getElementById(`${visited[i][0]}/${visited[i][1]}`)
        if (e.className === "start"){
            continue
        }
        if (e.className === "end"){
            shortest_path(kürzester_weg[i-1])
            document.getElementById("clear-board").className = "navigation-grid-normal"
            document.getElementById("clear-path").className = "navigation-grid-visualized"
            document.getElementById("dropdown_id").parentNode.className = "navigation-grid-normal"
            document.getElementById("visualize").parentNode.className = "navigation-grid-normal"
            return
        }
        e.className = "way"
    }
    document.getElementById("clear-board").className = "navigation-grid-normal"
    document.getElementById("clear-path").className = "navigation-grid-visualized"
    document.getElementById("dropdown_id").parentNode.className = "navigation-grid-normal"
    document.getElementById("visualize").parentNode.className = "navigation-grid-normal"
}

document.getElementById("visualize").addEventListener("click", function(){
    visualize()
})