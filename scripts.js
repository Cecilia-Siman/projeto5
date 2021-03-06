let nome="";
let objNome = {};

function myName(){
    toggleElements();
    nome = document.getElementById("meuNome").value;
    objNome = {
        name: nome
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',objNome);
    requisicao.then(tratarSucesso);
    requisicao.catch(tratarErro);
}

function toggleElements(){
    let hide1 = document.querySelector(".digiteNome");
    hide1.classList.toggle("hide");
    let hide2 = document.querySelector(".botaoNome");
    hide2.classList.toggle("hide");

    let show1 = document.querySelector(".entrando");
    show1.classList.toggle("hide");
    let show2 = document.querySelector(".loader");
    show2.classList.toggle("hide");
}

function tratarSucesso(resposta){
    let elemento = document.querySelector(".paginaInicial");
    elemento.classList.add("hide");
    setInterval(manterConexão, 5000);
    entrada();
    setInterval(entrada, 3000);
}

function tratarErro(erro){
    const statusCode = erro.response.status;
    if (statusCode === 400){
        alert("Este nome já está em uso!");
        toggleElements();
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
        
    }
    let elemento = document.querySelectorAll(".textBox");
    let ultimo = elemento.length-1;
    elemento = elemento[ultimo];
    elemento.scrollIntoView();
}

function enviarMensagem (){
    let myMessage = document.getElementById("myText").value;
    let objMessage = {
        from: nome,
        to: 'Todos',
        text: myMessage,
        type: 'message' // ou "private_message" para o bônus
    }
    let reqMessage = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',objMessage);
    reqMessage.then(sucessoEnvio);
    reqMessage.catch(erroEnvio);

}

function sucessoEnvio(){
    entrada();
}

function erroEnvio(){
    myName();
}

let input = document.getElementById("myText");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});