
const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")

const totalIssue = document.getElementById("totalIssue")





function toggleStyle(id) {
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

let allIssue = [];



async function loadAllIssue() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    allIssue = data.data
    displayAllIssue(allIssue)
}

const displayAllIssue = (allIssue) => {

    totalIssue.innerText = allIssue.length;
    const issueCardContainer = document.getElementById("issueCardContainer")
    issueCardContainer.innerHTML = "";


    // "id": 1,
    // "title": "Fix navigation menu on mobile devices",
    // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    // "status": "open",
    // "labels": [
    // "bug",--.......................0
    // "help wanted"
    // ],
    // "priority": "high",
    // "author": "john_doe",
    // "assignee": "jane_smith",
    // "createdAt": "2024-01-15T10:30:00Z",
    // "updatedAt": "2024-01-15T10:30:00Z"



    allIssue.forEach((issue) => {
        const issueCard = document.createElement("div")

        let statusIcon = issue.status === "open"
            ? "./assets/Open-Status.png"
            : "./assets/closed.png";

        let labelHTML = "";
        issue.labels.forEach(label => {
            labelHTML +=
                `
        <span class="bg-red-100  p-2 rounded-3xl text-center text-red-500 text-[15px] font-semibold">
        ${label}
        </span>
        `;
        })

        issueCard.innerHTML = `
         <div class="card bg-base-100 w-[320px] shadow-md p-5">
                <div onclick = "loadModal(${issue.id})" class="card-body cursor-pointer">
                    <div class="flex items-center justify-between">
                        <span><img src="${statusIcon}" alt=""></span>
                        <span class="bg-red-100 w-[80px] p-1 rounded-xl text-center text-red-500 text-[13px] font-semibold">${issue.priority}</span>
                    </div>
                  <h2 class="font-semibold text-base">${issue.title}</h2>
                  <p class="text-xs">${issue.description}</p>
                </div>
                <div class="flex gap-1 ">
                  ${labelHTML}
                </div>
                <hr class="mt-5 mb-5 bg-slate-100 ">
                <p>#1by john_doe</p>
                <p>1/15/2024</p>
            </div>
       `;
        issueCardContainer.appendChild(issueCard)


    });

}

function showAll() {
    displayAllIssue(allIssue)
}

function showOpen() {
    const openIssues = allIssue.filter(issue => issue.status === "open")
    displayAllIssue(openIssues)
}


function showClosed() {
    const closedIssues = allIssue.filter(issue => issue.status === "closed")
    displayAllIssue(closedIssues)
}





const issuesModal = document.getElementById("issuesModal")
const modalTitle = document.getElementById("modalTitle")
const modalStatus = document.getElementById("status")
const modalDes = document.getElementById("modalDes")
const modalPriority = document.getElementById("modalPriority")

const modalLabels = document.getElementById("modalLabels")



// async function openIssueModal(id) {
//     const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
//     console.log(res)
//     const data = await res.json();
//     const modalDetails = data.data;


//     issuesModal.showModal()
//     modalTitle.innerText = modalDetails.title
//     modalStatus.innerText = modalDetails.status
//     modalDes.innerText = modalDetails.description
//     modalPriority.innerText = modalDetails.priority


    
 
// modalDetails.labels.forEach(label => {
   
//     console.log(modalDetails.labels)

//     const span = document.createElement("span")

//     if(label === "bug"){
//         span.className = "bg-red-300 rounded-2xl px-2 py-1 flex items-center gap-1"
//         span.innerHTML = `<i class="fa-solid fa-bug"></i> BUG`
//     }

//     else if(label === "help wanted"){
//         span.className = "bg-yellow-300 rounded-2xl px-2 py-1 flex items-center gap-1"
//         span.innerHTML = `<i class="fa-brands fa-gg-circle"></i> HELP WANTED`
//     }

//     modalLabels.appendChild(span)

// })
        


// }

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }




const loadModal = async(id) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
   
    const res = await fetch(url);
    const details =await res.json();
    displayModal(details.data)
}
const displayModal = (issue) =>{
    
    const modalContainer = document.getElementById("modalContainer")
    modalContainer.innerHTML = `
     <h1 id="modalTitle" class="text-2xl font-bold">${issue.title}</h1>
            <div id="status" class="flex gap-4"><span class="bg-green-600 text-white rounded-2xl p-1">${issue.status}</span>
                <p>Opened by <p>${issue.author}</p> </p>
                <p>22/02/2026</p>
            </div>
            <div class="flex gap-3">
     <span class="bg-red-300 rounded-2xl p-1"><i class="fa-solid fa-bug"></i> BUG
    </span>
    <span class=" rounded-2xl p-1 bg-yellow-300">
    <i class="fa-brands fa-gg-circle"></i>HELP WANTED
  </span>
</div>
           
            <p id="modalDes">${issue.description}</p>
            <div class="card bg-base-100 shadow-sm grid grid-cols-2 p-2">
                <div>
                    <p>Assignee:</p>
                    <p>${issue.assignee}</p>
                </div>
                <div>
                    <p>Priority:</p>
                    <p id="modalPriority">${issue.priority}</p>
                </div>
            </div>
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary flex flex-end">Close</button>
            </form>
    `
    document.getElementById("issuesModal").showModal()

}







loadAllIssue();





