let nome="";

myName()

function myName(){
    nome = prompt("Seu nome?"); 
    const objNome = {
        name: nome
    }
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',objNome);
    requisicao.catch(tratarErro);
}

function tratarErro(erro){
    const statusCode = erro.response.status;
    if (statusCode === 400){
        console.log("erro!");
        myName();
    }
}
