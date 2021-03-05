var board = new Array(20)
for (let i = 0; i < 20; i++){
    board[i] = new Array(50)
}
for (let y = 0; y < 20; y++){
    for (let i = 0; i < 50; i++) {
        var id = `${y}/${i}`
        board[y][i] = id
        if (y===9 && i===15){
            document.getElementById("board").innerHTML += `<div class=start id=${id}></div>`;
        }else if (y===9 && i === 40){
            document.getElementById("board").innerHTML += `<div class=end id=${id}></div>`;
        }else{
            document.getElementById("board").innerHTML += `<div class=unvisited id=${id}></div>`;
        }
    }
}
function clear_board () {
    document.getElementById("generate-maze").parentNode.className = "navigation-grid-normal"
    if (document.getElementById("clear-board").className === "navigation-grid-normal"){
        if (document.getElementById("clear-path").className === "navigation-grid-visualized"){
            document.getElementById("clear-path").className = "navigation-grid-normal"
        }
        for (let y = 0; y < 20; y++){
                for (let i = 0; i < 50; i++) {
                    var e = document.getElementById(`${y}/${i}`)
                    if (e.className !== "start" && e.className !== "end"){
                        e.className = "unvisited"
                    }
                }
            }
    }
}
function clear_path () {
    document.getElementById("generate-maze").parentNode.className = "navigation-grid-normal"
    var e = document.getElementById("clear-path")
    if (e.className !== "navigation-grid-visualizing"){
        if (e.className === "navigation-grid-visualized"){
            e.className = "navigation-grid-normal"
        }
        for (let y = 0; y < 20; y++){
                for (let i = 0; i < 50; i++) {
                    var e = document.getElementById(`${y}/${i}`)
                    if (e.className === "way" || e.className === "visited" || e.className === "shortest-path"){
                        e.className = "unvisited"
                    }
                }
            }
    }
}
function generate_maze(){
    if (document.getElementById("generate-maze").parentNode.className === "navigation-grid-visualizing"){
        return
    }
    for (let y = 0; y < 20; y++){
        for (let i = 0; i < 50; i++){
            var e = document.getElementById(`${y}/${i}`)
            if (e.className === "wall"){
                e.className = "unvisited"
            }
        }
    }
    for (let y = 0; y < 20; y++){
        for (let i = 0; i < 50; i++){
            var e = document.getElementById(`${y}/${i}`)
            if (e.className === "unvisited"){
                var number = Math.floor(Math.random() * 10)
                if (number === 0 || number === 1){
                    e.className = "wall"
                }
            }
        }
    }
}
document.getElementById("clear-board").addEventListener('click', clear_board);
document.getElementById("clear-path").addEventListener('click', clear_path);
document.getElementById("generate-maze").addEventListener('click', generate_maze);