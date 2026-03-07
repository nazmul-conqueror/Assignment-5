
const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")


function toggleStyle(id){
    allBtn.classList.remove('btn-primary')
    openBtn.classList.remove('btn-primary')
    closedBtn.classList.remove('btn-primary')


    allBtn.classList.add('btn-outline')
    openBtn.classList.add('btn-outline')
    closedBtn.classList.add('btn-outline')

    let selected = document.getElementById(id)

    selected.classList.add('btn-primary')
    selected.classList.remove('btn-outline')


}







