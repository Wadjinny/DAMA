window.onload = () => {
    let tour = true
    let isFin = false
    track = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    let i = v => Math.floor(v / 3)
    let j = v => v % 3

    function myF(e) {
        if (isFin) return
        let el = e.path[0]
        if (el.tagName != "TD") return
        let ind = parseInt(el.getAttribute("data_ind"))
        let img = (tour) ? "fond1.png" : "fond2.png"
        el.innerHTML = '<img src="' + img + '" alt="img">'
        track[i(ind)][j(ind)] = tour ? 1 : -1
        tour = !tour
        setTimeout(check, 500)
    }
    let td = document.getElementsByTagName("td")
    Array.from(td).forEach((v, ind, a) => {
        v.setAttribute("data_ind", ind)
        v.onclick = myF
    })
    window.applyT = function () {
        Array.from(td).forEach((v, ind, a) => {
            if(v.childNodes[0]) v.childNodes[0].classList.add("fadeout")
            setTimeout(()=>{
                let wichI = (track[i(ind)][j(ind)] == 1) ? "fond1.png" : "fond2.png"
                let isEmpty = track[i(ind)][j(ind)] == 0 ? "" : '<img src="' + wichI + '" alt="img">'
                v.innerHTML = isEmpty
            },600)
        })
    }
    window.reset = () => {
        track = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        isFin = false
    }

    function check() {
        row = [track[0][0] + track[1][1] + track[2][2]]
        for (let e = 0; e < 3; e++) row.push(track[e][0] + track[e][1] + track[e][2])
        col = [track[0][2] + track[1][1] + track[2][0]]
        for (let e = 0; e < 3; e++) col.push(track[0][e] + track[1][e] + track[2][e])
        if (row.indexOf(-3) >= 0 | col.indexOf(-3) >= 0) {
            alert("vert a gagné");
            isFin = true
        }
        if (col.indexOf(3) >= 0 | row.indexOf(3) >= 0) {
            alert("rouge a gagné")
            isFin = true
        }
    }

}