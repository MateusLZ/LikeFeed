//Criando as variaveis globais
let novoFunc = document.getElementById('func')
let novoCpf = document.getElementById('cpf')
let novoPhone = document.getElementById('telefone')
let novoEmail = document.getElementById('email')
let tituloRelatorio = document.getElementById('titulo-Relatorio')
let empresas = []
let ediçaoId = null
let idUser
let usuarioDaVez
let userLogado = localStorage.getItem('userID')
let posicaoUser
let nomeEmpresa = document.getElementById('Name-User')




//Função para enviar cadastro de novo Funcionario para dentro do localStorage
function enviarCadastro(){

    if(novoFunc.value == '' || novoCpf.value == '' || novoPhone.value == '' || novoEmail.value == '' ){
        alert('Campos Vazios')
    }else{

    logado()
    //Pegando de dentro do localStorage a chave empresaCadastrada e armazenando na variavel
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))


    //Condição para sabe se o cadastro é um novo Funcionario ou Editando um funcionario que ja esta cadastrado
    if (ediçaoId == null){

    //Condição para saber se existe algo dentro da chave e se não houver vai criar o objeto funcionario dentro da variavel e fazer o cadastro
    if (empresas[posicaoUser] == null){
        
        empresas[posicaoUser] = {
            Funcionarios: [],
        }
        cadastro()
    }else{
        cadastro()
    }
}else {
    atualizarDados(ediçaoId)
    
}

    //Enviando o novo cadastro OU ediçao para o localStorage
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    //Fechando o modal 
    fecharCadastro()
    //Atualizando a tabela  
    Refresh()
}

}


//Função para listar os itens na tabela
function listaTabela(){
    nomeEmpresa.innerText = userLogado

    logado()
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))

    let tbody = document.getElementById('tbody')



    for(i = 0; i<empresas[posicaoUser].Funcionarios.length; i++){
        
        
        //Criação das linhas e colunas
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_funcionario = tr.insertCell();
        let td_cpf = tr.insertCell();
        let td_email = tr.insertCell();
        let td_telefone = tr.insertCell();
        let td_feedback = tr.insertCell();
        let td_acoes = tr.insertCell();

        //Armazenando as informaçoes de cada funcionario
        td_id.innerText = empresas[posicaoUser].Funcionarios[i].id
        td_funcionario.innerText =empresas[posicaoUser].Funcionarios[i].Funcionario
        td_cpf.innerText = empresas[posicaoUser].Funcionarios[i].CPF
        td_email.innerText = empresas[posicaoUser].Funcionarios[i].Email
        td_telefone.innerText = empresas[posicaoUser].Funcionarios[i].Telefone

        //Criando um icone para Editar o Funcionario
        let imgEdit = document.createElement('img')
        imgEdit.src = '../img/icons8-editar-arquivo-25.png'
        imgEdit.setAttribute('onclick', 'edicao('+JSON.stringify(empresas[posicaoUser].Funcionarios[i])+')')

        //Criando um icone para Excluir o Funcionario
        let imgExcluir = document.createElement('img') 
        imgExcluir.src = '../img/icons8-lixo-30.png'
        imgExcluir.setAttribute('onclick', 'deletar('+empresas[posicaoUser].Funcionarios[i].id +')')

        let imgEmoji = document.createElement('img')
        imgEmoji.src = '../img/icons8-gráfico-positivo-40.png'
        imgEmoji.setAttribute('onclick', 'relatorio('+empresas[posicaoUser].Funcionarios[i].id +')')
        
        td_acoes.appendChild(imgExcluir)
        td_acoes.appendChild(imgEdit)
        td_feedback.appendChild(imgEmoji)
        imgExcluir.style.cursor= 'pointer'
        imgEdit.style.cursor= 'pointer'
        imgEmoji.style.cursor= 'pointer'
    }
}



//Função para edição onde o parametro vai pegar o id de cada Funcionario e armazenar na variavel
function edicao(dados){

    //Variavel deixa de ser null entao ele sabe que se trata de uma edição e não um novo cadastro
    ediçaoId = dados.id
    //Abrir janela modal
    abrirCadastro()
    
    //Botando os dados do funcionario respectivo nos inputs para pode haver a edição
    document.getElementById('func').value = dados.Funcionario;
    document.getElementById('cpf').value = dados.CPF;
    document.getElementById('telefone').value = dados.Telefone;;
    document.getElementById('email').value = dados.Email;

    //Mudando o nome do botão e o texto no cabeçalho 
    document.getElementById('btn1').innerText = 'Atualizar'
    document.getElementById('titulo-cadastro').innerText = 'Atualizar Funcionario'

}

//Função para enviar os novos dados atualizados a partir do id do funcionario 
function atualizarDados(id){
    

    logado()
    for(i = 0; i < empresas[posicaoUser].Funcionarios.length; i++){
        if(empresas[posicaoUser].Funcionarios[i].id == id){
            empresas[posicaoUser].Funcionarios[i].Funcionario = novoFunc.value.trim()
            empresas[posicaoUser].Funcionarios[i].CPF =  novoCpf.value.trim()
            empresas[posicaoUser].Funcionarios[i].Email = novoEmail.value.trim()
            empresas[posicaoUser].Funcionarios[i].Telefone = novoPhone.value.trim()
        }
    }

    //Mudando o nome do botão e o texto do cabeçalho para o normal
    document.getElementById('btn1').innerText = 'Salvar'
    document.getElementById('titulo-cadastro').innerText = 'Novo Funcionário'

    //mudando o valor da variavel para saber que a edição acabou
    ediçaoId = null
    limpaImput()



}

//Função para deletar o usuario a partir do seu id
function deletar(id){
    logado()
    if(confirm(`Deseja Realmente deletar o Funcionário do ID ${id}`)){
    let tbody = document.getElementById('tbody')
    //Vai comparar o id ate achar para excluir 
    for(i=0; i < empresas[posicaoUser].Funcionarios.length; i++) {
        if(empresas[posicaoUser].Funcionarios[i].id  == id){
            empresas[posicaoUser].Funcionarios.splice(i , 1)
            tbody.deleteRow(i)
        }
        
    }

    //Enviar para o localStorage e atualizando a lista
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    Refresh()
}
}


//Criando cadastro de novo funcionario e criando uma ID dinamica pra ele
function cadastro(){
    logado()

   

    let numID = 0
    let idProd = empresas[posicaoUser].Funcionarios.length + 1

    for(i=0; i<empresas[posicaoUser].Funcionarios.length;i++){

        if(empresas[posicaoUser].Funcionarios[i].id  == idProd){
            numID = 1

        } 
    }

    if(numID == 1){
        idProd+= 1
    }
    //Puxando para dentro da array funcionarios as informaçoes de cadastro
    empresas[posicaoUser].Funcionarios.push(
        {

            Funcionario: novoFunc.value.trim(),
            CPF: novoCpf.value.trim(),
            Telefone: novoPhone.value.trim(),
            Email: novoEmail.value.trim(),
            Senha: 1,
            Feedback: {
                Comunicação: [],
                Proatividade: [],
                TrabalhoEquipe: [],
                Liderança: [],
                Comprometimento: [],
                Media: [],
                DesempenhoMedia: '',
                Data:[]
            },
            id: idProd

        }
    )
    limpaImput()


}

//Limpar os inputs da janela modal
function limpaImput(){
    document.getElementById('func').value = "";
    document.getElementById('cpf').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('email').value = "";

}


//Refazendo a lista sempre que a tabela e a pagina são atualizadas 
function Refresh(){
    document.getElementById("table").innerHTML = ` <table id="table">
    <thead>
<th class="center">ID</th>
<th>Funcionário</th>
<th>CPF</th>
<th>Email</th>
<th>Telefone</th>
<th>FeedBack</th>
<th>Açoes</th>

</thead>
<tbody id="tbody">

</tbody>
</table>`;
      listaTabela()
}


//Funçoes para fechar e abrir a janela modal
function abrirCadastro() {

let modal =document.getElementById('vis-cad')
modal.style.display = 'block'
document.body.style.overflow = 'hidden'
}

function fecharCadastro() {

    let modal =document.getElementById('vis-cad')
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'

    document.getElementById('titulo-cadastro').innerText = 'Novo Funcionario'
    document.getElementById('btn1').innerText = 'Salvar'
    ediçaoId = null
    limpaImput()

 }





 //Abrir janela Modal de relatorio
function abrirRelatorio(){
    
    let modalRela = document.getElementById('vis-relatorio')
    modalRela.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

//Fechar Janela Modal de realatorio
function fecharRelatorio(){
    let modalRela =document.getElementById('vis-relatorio')
    modalRela.style.display = 'none'
    document.body.style.overflow = 'auto'
    RefreshRela()
}

//Vai pegar pelo id o usuario clicado da vez
function relatorio(id){
    localStorage.setItem('IdClick', id)
    listaRelatorio()
    abrirRelatorio()

}
//Função para listar as informaçoes no relatorio
function listaRelatorio(){
    logado()

    idUser = localStorage.getItem('IdClick')
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))
    let tbody = document.getElementById('tbodyRela')

    for(i=0;i< empresas[posicaoUser].Funcionarios.length;i++){

        if(idUser == empresas[posicaoUser].Funcionarios[i].id ){
            usuarioDaVez= i
            
        }
        }

    for(i = 0; i<empresas[posicaoUser].Funcionarios[usuarioDaVez].Feedback.Media.length; i++){
        let tr = tbody.insertRow();
        let td_data = tr.insertCell();
        let td_desempenho = tr.insertCell();
            if(idUser == empresas[posicaoUser].Funcionarios[usuarioDaVez].id ){
            td_data.innerText = empresas[posicaoUser].Funcionarios[usuarioDaVez].Feedback.Data[i]
            td_desempenho.innerText = empresas[posicaoUser].Funcionarios[usuarioDaVez].Feedback.Media[i]
        }
    }
    tituloRelatorio.innerHTML = `Média de desempenho ${empresas[posicaoUser].Funcionarios[usuarioDaVez].Feedback.DesempenhoMedia}`

}

//Função para sempre refazer o relatorio para não se duplicar
function RefreshRela(){
    document.getElementById("table2").innerHTML = ` <table id="table2">
    <thead class="top-table2">
<th>Data</th>
<th>Desempenho</th>
</thead>
<tbody id="tbodyRela">
</tbody>
</table>`
}


function logado(){
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))
        // Rodando o objeto para saber o usuario da vez que esta logado e pegando a posição dele
    for(i=0; i < empresas.length; i++){
        
        if(userLogado == empresas[i].nomeEmpresa){
    
            posicaoUser = i
    
        }
    }
    }
    