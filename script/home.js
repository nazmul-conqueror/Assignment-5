
const allBtn = document.getElementById("allBtn")
const openBtn = document.getElementById("openBtn")
const closedBtn = document.getElementById("closedBtn")

const totalIssue = document.getElementById("totalIssue")





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

let allIssue = [];



async function loadAllIssue(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    allIssue = data.data
    displayAllIssue(allIssue)
}

const displayAllIssue = (allIssue) =>{

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
       issueCard.innerHTML = `
         <div class="card bg-base-100 w-[320px] shadow-md p-5">
                <div class="card-body">
                    <div class="flex items-center justify-between">
                        <span><img src="./assets/Open-Status.png" alt=""></span>
                        <span class="bg-red-100 w-[80px] p-1 rounded-xl text-center text-red-500 text-[13px] font-semibold">${issue.priority}</span>
                    </div>
                  <h2 class="font-semibold text-base">${issue.title}</h2>
                  <p class="text-xs">${issue.description}</p>
                </div>
                <div class="flex gap-1 ">
                  <span class="bg-red-100  p-2 rounded-3xl text-center text-red-500 text-[15px] font-semibold">Bug</span>
                    <span class="bg-red-100 p-2 rounded-3xl text-center text-red-500 text-[15px] font-semibold">Help Wanted</span>
                </div>
                <hr class="mt-5 mb-5 bg-slate-100 ">
                <p>#1by john_doe</p>
                <p>1/15/2024</p>
            </div>
       `;
       issueCardContainer.appendChild(issueCard)

        
    });

}

function showAll(){
    displayAllIssue(allIssue)
}

function showOpen(){
    const openIssues = allIssue.filter(issue => issue.status === "open")
    displayAllIssue(openIssues)
}


function showClosed(){
    const closedIssues = allIssue.filter(issue => issue.status === "closed")
    displayAllIssue(closedIssues)
}




loadAllIssue();





