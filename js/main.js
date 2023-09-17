// Main Get Button
let getButton = document.getElementById("getbutton");
// Username Input Text
let userInput = document.getElementById("username");
// Clear ( Delete All ) Button
let clearButton = document.getElementById("clear");
// Main Container
let mainContainer = document.getElementById("content")
// Repositories Container
let reposContainer = document.getElementById("repos");
// Error Container
let err = document.getElementById("error")
// Declaring Needed Vars
let username, url, repo, oldPlaceholder;
let nodata = document.getElementById("nodata")

// Placeholder Remover & Input
userInput.onfocus = () => {
    oldPlaceholder = userInput.getAttribute("placeholder")
    userInput.removeAttribute("placeholder")
    // Remove Errors 
    err.style.right = "-380px"

}
userInput.onblur = () => {
    userInput.setAttribute("placeholder", `${oldPlaceholder}`)
}
userInput.maxLength = "25";

// Button Get Event
getButton.addEventListener("click", () => {
    if (userInput.value === ""){
        // Error One ( Empty input )
        err.innerHTML = "من فضلك قم بإدخل اسم مستخدم أولاً"
        err.style.right = "20px"
    } else {
    username = userInput.value;
    url = `https://api.github.com/users/${username}/repos`;
    console.log(url)
    // Fetch
    fetch(url).then((res) =>{
        let gitData = res.json() 
        return gitData
    }).then((data)=> {
        if(data.message === 'Not Found' || Object.keys(data).length === 0){
            // Error Two ( User Not Found )
            err.innerHTML = "اسم المستخدم هذا غير موجود"
            err.style.right = "20px"
        } else{

            // Append Counter
            let count = document.createElement("span");
            count.classList.add("counter")
            let number = document.createTextNode(Object.keys(data).length)
            count.appendChild(number)
            count.setAttribute("id", "counter")
            mainContainer.appendChild(count)

            // Loop On Data & Creat All Elements
            for(let i = 0; i < Object.keys(data).length; i++){
                let header = document.createElement("h3");
                let reponame = document.createTextNode(data[i].name)
                header.appendChild(reponame);
                
                // Container Div
                let container = document.createElement("div");
                container.classList.add("contain")
                container.appendChild(header)
                // Views Number
                let watch = document.createElement("li");
                watch.classList.add("views");
                let watchNumber = document.createTextNode(data[i].watchers)
                watch.appendChild(watchNumber);
                container.appendChild(watch)
                // Descripiton 
                let desc = document.createElement("li");
                desc.classList.add("description");
                let desribe = data[i].description;
                if (desribe === null){
                    desribe = "لا يوجد وصف";
                }else{
                    desribe = data[i].description;
                }
                let descText = document.createTextNode(desribe)
                desc.appendChild(descText);
                container.appendChild(desc)
                // Visit Link
                let link = document.createElement("a");
                link.classList.add("visit");
                let atxt = document.createTextNode("زيارة المشروع")
                link.setAttribute("href", data[i].html_url);
                link.setAttribute("target", "_blank")
                link.appendChild(atxt);
                container.appendChild(link)
                reposContainer.appendChild(container)
            }

            // Stop Looping Data on every click
            getButton.classList.add("disabled");
            clearButton.classList.remove("disabled")
            clearButton.setAttribute("id", "clear")
            nodata.style.display = "none";
        }
    })
}    
})

clearButton.addEventListener("click", ()=>{
    while(reposContainer.firstChild){
        reposContainer.removeChild(reposContainer.firstChild)
    }
    clearButton.setAttribute("id", "disable")
    getButton.classList.remove("disabled")
    nodata.style.display = "block";
})


// Side Buttons

let reloadPage = document.getElementById("reload")
let upPage = document.getElementById("arrup")
let downPage = document.getElementById("arrdown")

document.documentElement.style.scrollBehavior = "smooth";
reloadPage.onclick = () => {
    location.reload()
}
upPage.onclick = () => {
    document.documentElement.scrollTop = 0;

}
downPage.onclick = () => {
    document.documentElement.scrollTop = 10000;
}