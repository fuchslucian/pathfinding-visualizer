var algorithm = ""

function change_algorithm (algo){
    algorithm = algo
    document.getElementById("visualize").innerHTML = `<p>Visualize ${algorithm}!</p>`
    document.getElementById("visualize").className = `${algorithm}`
    if (algorithm === "BFS"){
        document.getElementById("info").innerHTML = "<h2>Breadth-first search guarantees the shortest path</h2>"
    }else if (algorithm === "DFS"){
        document.getElementById("info").innerHTML = "<h2>Depth-first search does not guarantees the shortest path</h2>"
    }

}

var bfs = document.getElementById("bfs")
var dfs = document.getElementById("dfs")
bfs.addEventListener("click", function (){
    change_algorithm("BFS")
})
dfs.addEventListener("click", function (){
    change_algorithm("DFS")
})

function show_algorithms(){
    if (document.getElementById("dropdown_id").parentNode.className === "navigation-grid-visualizing"){
        return
    }
    var e = document.getElementById("dropdown_id")
    if (e.className === ""){
        e.className = "dropdown"
    }else{
        e.className = ""
    }
}
document.getElementById("dropdown_id").addEventListener("click", show_algorithms)