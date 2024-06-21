const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-tab");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const unorderedEl = document.getElementById("ul-el");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
    
function render(leads){
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += 
        `<li>
            <a href = '${leads[i]}' target='_blank'> 
                ${leads[i]} 
            </a>
        </li>`;
    }
    unorderedEl.innerHTML = listItems;
}
    
inputBtn.addEventListener("click" , ()=>{
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads" , JSON.stringify(myLeads));
    render(myLeads);
    console.log(localStorage.getItem("myLeads"));
})
    
deleteBtn.addEventListener("click" , ()=>{
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

tabBtn.addEventListener("click" , ()=>{
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
        const currentTabUrl = tabs[0].url;
        if (!myLeads.includes(currentTabUrl)) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads" , JSON.stringify(myLeads));
            render(myLeads);
        }
    })
})