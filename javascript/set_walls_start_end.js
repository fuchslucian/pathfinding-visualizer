function a(){
    for (let y = 0; y < 20; y++){
        for (let i = 0; i < 50; i++) {
            var e = document.getElementById(`${y}/${i}`)
            if (e.className === "way" || e.className === "visited" || e.className === "shortest-path"){
                e.className = "unvisited"
            }
        }
    }
    for (let i = 0; i < visited.length; i++){
        //await Sleep(20)
        var e = document.getElementById(`${visited[i][0]}/${visited[i][1]}`)
        if (e.className === "start"){
            continue
        }
        if (e.className === "end"){
            for (let x = 0; x < kürzester_weg[i-1].length-2; x++){
                var e = document.getElementById(`${kürzester_weg[i-1][x][0]}/${kürzester_weg[i-1][x][1]}`)
                e.className = "shortest-path"
            }
            //shortest_path(kürzester_weg[i-1])
            break
        }
        e.className = "way"
    }
}

// "wall"
var set_wall = false
var start = false
var current_start = "9/15"
var end = false
var current_end = "9/40"
var was_wall = false
// build wall
function build(id){
    if (document.getElementById("clear-path").className === "navigation-grid-visualizing"){
        return
    }
    e = document.getElementById(id)
    // Wenn Ende gebaut werden soll
    if (end){
        if (document.getElementById("clear-path").className === "navigation-grid-visualized"){
            if (e.className === "wall"){
                return
            }
        }
        // checken ob Element nicht start ist
        if (e.className !== "start"){
            // wenn letztes Element eine Mauer war wir diese wieder gebaut
            if (was_wall){
                document.getElementById(current_end).className = "wall"
            }else{
                document.getElementById(current_end).className = "unvisited"
            }
            if (e.className === "wall"){
                was_wall = true
            }
            else{
                was_wall = false
            }
            // Ende wird neu gesetzt
            e.className = "end"
            current_end = id
            if (document.getElementById("clear-path").className === "navigation-grid-visualized"){
                a()
            }
        }
    // Start gebaut werden soll
    }else if (start){
        if (document.getElementById("clear-path").className === "navigation-grid-visualized"){
            return
        }
        // checken ob Element nicht das Ende ist
        if (e.className !== "end"){
            // wenn letztes Element eine Mauer war wir diese wieder gebaut
            if (was_wall){
                document.getElementById(current_start).className = "wall"
            }else{
                document.getElementById(current_start).className = "unvisited"
            }
            if (e.className === "wall"){
                was_wall = true
            }
            else{
                was_wall = false
            }
            // start wird neu gesetzt
            e.className = "start"
            current_start = id
        }
    // wenn Mauer gebaut werden soll
    }else if (set_wall){
        if (document.getElementById("clear-path").className === "navigation-grid-visualized"){
            return
        }
        // ist das Element eine Mauer wird es zu unvisited sonst wird es zu einer Mauer
        if (e.className==="wall"){
            e.className = "unvisited"
        }else if(e.className!=="start" && e.className !== "end"){
            e.className = "wall"
        }
    }
}
// wenn gecklickt wird wird eine Mauer gebaut
function click (id){
    if (document.getElementById("clear-path").className !== "navigation-grid-normal"){
        return
    }
    e = document.getElementById(id)
    if (e.className==="wall"){
        e.className = "unvisited"
    }else if(e.className!=="start" && e.className !== "end"){
        e.className = "wall"
    }
}
// setzt start end und set_wall auf true wenn die Maus nach unten gedrückt wird
function mousedown (id){
    if (document.getElementById("clear-path").className === "navigation-grid-visualizing"){
        return
    }
    e = document.getElementById(id)
    if (e.className === "start"){
        start = true
    }else if (e.className === "end"){
        end = true
    }else{
        set_wall = true
    }
}
// wenn die Maus losgelassen wird wird alles auf false gesetzt
function mouseup (id){
    if (document.getElementById("clear-path").className === "navigation-grid-visualizing"){
        return
    }
    set_wall = false
    start = false
    end = false
}
// für jedes Kästchen wird eine Evetn Listener hinzugefügt
for (let y = 0; y < 20; y++){
    for (let i = 0; i < 50; i++){
        var e = document.getElementById(`${y}/${i}`)
        e.addEventListener("mouseover", function(){
            build(`${y}/${i}`)
        })
        e.addEventListener("mousedown", function(){
            mousedown(`${y}/${i}`)
        })
        e.addEventListener("mouseup", function(){
            mouseup(`${y}/${i}`)
        })
        e.addEventListener("click", function(){
            click(`${y}/${i}`)
        })
    }
}