function solve() {
    let allReports = document.getElementById('content');
    let addedReports = [];
    let id = 0;

    return {
        report(author, description, reproducible, severity) {
            let object = {
                ID: id++,
                author: author,
                description: description,
                reproducible: reproducible,
                severity: severity,
                status: 'Open'
            }

            let firstDiv = document.createElement('div');
            firstDiv.classList.add('report');
            firstDiv.setAttribute("id", `$report_${object.ID}`);

            let secondDiv = document.createElement('div');
            secondDiv.classList.add('body');
            secondDiv.innerHTML = `<p>${object.description}</p>`

            let thirdDiv = document.createElement('div');
            thirdDiv.classList.add('title');
            thirdDiv.innerHTML += `<span class="author">Submitted by: ${object.author}</span>`
            thirdDiv.innerHTML += `<span class="status">${object.status} | ${object.severity}</span>`

            secondDiv.appendChild(thirdDiv);
            firstDiv.appendChild(secondDiv);
            allReports.appendChild(firstDiv);

            addedReports.push(object);
        },

        setStatus(id,newStatus){
            let searchedReport = addedReports.find(x=> x.ID === id);
            if(searchedReport){
                let element = document.getElementById(`$report_${id}`);
                let statusElement = element.children[0].children[1].children[1];
                let text = statusElement.textContent.split(' | ');
                let status = newStatus;
                text[0] = status;

                let result = text[0] + ' | ' + text[1];
                statusElement.textContent = result;
            }
        },

        remove(id){
            let searchedReport = addedReports.find(x=> x.ID === id);
            if(searchedReport){
                let element = document.getElementById(`$report_${id}`);
                allReports.removeChild(element);

                let index = addedReports.findIndex(x=>x.ID === id);
                addedReports.splice(index,1);
            }
        },

        sort(method){
            let possible = ['author', 'severity', 'ID'];
            if(possible.includes(method)){
                
            }
        }
    }
};

let myFunc = solve();
myFunc.report('Atanas','read the description',true,5);
myFunc.report('Stoqn','description',true,121);
myFunc.report('Kolio','description',true,2222);
myFunc.setStatus(1,'Closed');
myFunc.remove(1);