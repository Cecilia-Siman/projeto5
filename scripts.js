let nome="";
let objNome = {};

myName()

function myName(){
    nome = prompt("Seu nome?"); 
    objNome = {
        name: nome
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',objNome);
    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
}

function tratarSucesso(resposta){
    setInterval(manterConexão, 5000);
    entrada();
    setInterval(entrada, 3000);
}

function tratarErro(erro){
    const statusCode = erro.response.status;
    if (statusCode === 400){
        myName();
    }
}

function entrada(){
    req = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    req.then(showMessages);
}

function manterConexão(){
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',objNome);
}

function showMessages(resposta){
    let arrayMessages = resposta.data;
    document.querySelector(".container").innerHTML = "";
    let box;
    for (i=0;i<arrayMessages.length;i++){
        switch(arrayMessages[i].type){
            case('status'): 
            box = document.querySelector(".container");
            box.innerHTML += `<div class="textBox boxStatus">
            <p><span>(${arrayMessages[i].time})</span> <strong>${arrayMessages[i].from}</strong> ${arrayMessages[i].text}</p>
            </div>`;
            break;
            case('message'):
            box = document.querySelector(".container");
            box.innerHTML += `<div class="textBox boxMessage">
            <p><span>(${arrayMessages[i].time})</span> <strong>${arrayMessages[i].from}</strong> para <strong>${arrayMessages[i].to}:</strong> ${arrayMessages[i].text}</p>
            </div>`;
            break;
            case('private_message'):
            if (arrayMessages[i].to === nome){
                box = document.querySelector(".container");
                box.innerHTML += `<div class="textBox boxPrivateMessage">
                <p><span>(${arrayMessages[i].time})</span> <strong>${arrayMessages[i].from}</strong> reservadamente para <strong>${arrayMessages[i].to}:</strong> ${arrayMessages[i].text}</p>
                </div>`;

            }
        }
        /*arrayMessages[i].scrollIntoView();*/
    }
}

function enviarMensagem (){
    let myMessage = document.getElementById("myText").value;
    console.log(myMessage);
    let objMessage = {
        from: nome,
        to: 'Todos',
        text: myMessage,
        type: 'message' // ou "private_message" para o bônus
    }
    let reqMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',objMessage);
}