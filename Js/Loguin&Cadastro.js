//Criando as variaveis globais
let userCadastro = document.getElementById('userCad')
let senhaCadastro = document.getElementById('senhaCad')
let loguin = document.getElementById('loguinEmpresa')
let senha = document.getElementById('senhaEmpresa')
let senhaFunc = document.getElementById('senhaFunc')
let loguinFunc = document.getElementById('loguinFunc')
let divLoguinEmpresa = document.getElementById('rigth-login1')
let divLoguinUser = document.getElementById('rigth-login-user1')
let usuarios
let acess = false
let empresas = []
let tipoDeLoguin = localStorage.getItem('tipoDeLoguin')

 



//Função para quando apertar no botao de logar Funcionario na tela inicial setar uma chave no localStorage com valor 0
function LogarFunc() {
    window.location.href = 'Paginas Html/loginProjetoSA.html'
    localStorage.setItem('tipoDeLoguin', 0)
}

function LogarEmpre(){
    window.location.href = 'Paginas Html/loginProjetoSA.html'
    
}

//Se a chave estiver com o valor 0 vai chamar a div de loguin do Funcionario e depois mudar a chave para 1
if(tipoDeLoguin == 0){
    mudarLoguin()
    localStorage.setItem('tipoDeLoguin', 1)
}

//Troca o zIndex da div da empresa pro Funcionario
function mudarLoguin(){
        divLoguinUser.style.zIndex = '1'
        divLoguinEmpresa.style.zIndex = '0'
        divLoguinEmpresa.style.overflow = 'visible'
}

//Troca o zIndex da div do Funcionario pra Empresa
function mudarLoguinEmpre(){
        divLoguinUser.style.zIndex = '0'
        divLoguinEmpresa.style.zIndex = '1'
        divLoguinEmpresa.style.overflow = 'hidden'
}


//Criar cadastro da empresa 
function criarCadastro(){

    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))
    
    if(userCadastro.value == ''  || senhaCadastro.value == '' ){
        alert('Não pode deixar vazio')
        userCadastro.value = ''  
        senhaCadastro.value = ''
    }else{

  if (empresas == null){
        empresas = []
        CadastrarUsuario()
    }else{
    CadastrarUsuario()
    }
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    window.location.href = 'loginProjetoSA.html'
}


}
//Cadastra a Empresa e faz o objeto dela e envia para o localStorage
function CadastrarUsuario(){
    let objUser = {

        nomeEmpresa: '',
        senha: '',
        Funcionarios: []
    }

    objUser.nomeEmpresa = userCadastro.value.trim()
    objUser.senha =  senhaCadastro.value.trim()

    empresas.push(objUser)
    
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    
}

//Funcão para entrar com a Empresa
function Entrar(){
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))
    
    if(empresas == null){
        alert('Nenhuma Empresa Cadastrada')
        LimpaImput()
    }
    
    for(i=0; i < empresas.length; i++) {
        
        if(loguin.value ==  empresas[i].nomeEmpresa && senha.value == empresas[i].senha) {
            acess = true
            let user = empresas[i].nomeEmpresa
            localStorage.setItem('userID', user )

    }

}
            if(acess == true){
            window.location.href = 'inicioEmpre.html'
            }else{
                alert('Loguin ou senha errados')
                              LimpaImput()
                 }
}


//Função para entrar com o Funcionario
function EntrarFunc(){
    //Puxa do localStorage e armazena na variavel 
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))
    
    let j = 0
    let e = 0
    let tamanhoTotal = 0

    //Pego o tamanho Total de Funcionarios cadastrados em todas empresas
    for(i=0; i< empresas.length; i++){
    tamanhoTotal += empresas[i].Funcionarios.length
    }
    //Percorro pelo total de Funcionarios cadastrados procurando o Nome
    //E quando achar o nome procura a senha
    for(i=0; i < tamanhoTotal; i++){
        if(loguinFunc.value != empresas[e].Funcionarios[j].Funcionario){
            j++
        }else{
            if(senhaFunc.value == empresas[e].Funcionarios[j].Senha){
                i = tamanhoTotal + 1
                acess = true
                localStorage.setItem('idUser', empresas[e].Funcionarios[j].id )
                localStorage.setItem('idEmpresa', e )
                }
        
        }
            if(empresas[e].Funcionarios.length <= j){
            e++
            j = 0
        }
    }

    if(acess == true){
        window.location.href = 'inicioUser.html'
    }else{
        alert('usuario ou senha incorretos!')
        LimpaImput()
    }
    }


//Limpa os inputs
function LimpaImput(){
    loguin.value = ''
    senha.value = ''
    loguinFunc.value = ''
    senhaFunc.value = ''
    
}

