//Criando as variaveis globais
let idImput = document.getElementById('procuraID')
let erro =   document.getElementById('erro')
let dimensaoLoguin =document.getElementById('janelaFeedbackLoguin')
let dimensaoJanela = document.getElementById('janelaFeedback') 
let nomeFunc = document.getElementById('nome-func')
let primeiroValor = document.getElementsByName('primeira')
let segundoValor = document.getElementsByName('segunda')
let terceiroValor = document.getElementsByName('3')
let textoUm = document.getElementById('texto-1')
let textoDois = document.getElementById('texto-2')
let textoTres = document.getElementById('texto-3')
let textoCategoria = document.getElementById('categoria')
let data = document.getElementById('txtData')
let desempenhoComu = []
let desemprenhoProat = []
let desempenhoTeamWork = []
let desempenhoLider = []
let desempenhoCompro = []
let media = 0
let mudaCat = null
let funcionarioIdFeed
let idFunc
let mediaDesempenho = 0
let userLogado = localStorage.getItem('userID')
let posicaoUser
let nomeEmpresa = document.getElementById('Name-User')
nomeEmpresa.innerText = userLogado




function procuraID(){
    logado()
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))
    
        for(i=0; i < empresas[posicaoUser].Funcionarios.length; i++) {
    
            if(empresas[posicaoUser].Funcionarios[i].id  == idImput.value){
                funcionarioIdFeed = empresas[posicaoUser].Funcionarios[i].Funcionario
                dimensaoLoguin.style.zIndex = '0'
                dimensaoJanela.style.zIndex = '1'
                dimensaoLoguin.style.overflow = 'hidden'
                carregarDados()
                localStorage.setItem('idFeedback', empresas[posicaoUser].Funcionarios[i].id )
                puxarData()
            }else{
                erro.innerText = "Funcionario não encontrado"
            }
            
        }

        if(empresas[posicaoUser].Funcionarios.length == 0){
            erro.innerText = "Nenhum Funcionario Cadastrado"

        }
        document.getElementById('procuraID').value = "";
       
    }

    function puxarData(){
        logado()
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))

    id = localStorage.getItem('idFeedback')
    for(i=0;i<empresas[posicaoUser].Funcionarios.length;i++){

        if(empresas[posicaoUser].Funcionarios[i].id == id){
            empresas[posicaoUser].Funcionarios[i].Feedback.Data.push(data.value)
        }
        localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    }

    }

    function Salvar(){

        let e = 0
        let j = 0
        let o = 0
        let tamanhoBox = primeiroValor.length
        for(i=0;i<primeiroValor.length;i++){
    
            if(primeiroValor[i].checked==false){
                 e++
            }
            if(segundoValor[i].checked==false){
                 j++
                 
            }if(terceiroValor[i].checked==false){
                o++
            }
         }

         if(e == tamanhoBox || j == tamanhoBox || o == tamanhoBox){
            alert('Opção em branco')
         }else{
            SalvarDesempenho()
         }
    }


function SalvarDesempenho() {

    procuraUser()

    

    if(mudaCat == null){
        Comunica()
        mudaCat = 1
    }else if(mudaCat == 1){
        Proatividade()
        mudaCat = 2
    }else if(mudaCat == 2){
        teamWork()
        mudaCat = 3
    }else if(mudaCat == 3){
        Lider()
        mudaCat = 4
    }else if(mudaCat == 4){
        Comprometimento()
        alert('Feedback Cadastrado')
        dimensaoLoguin.style.zIndex = '1'
        dimensaoJanela.style.zIndex = '0'
        dimensaoLoguin.style.overflow = 'visible'
        mudaTextoComu()
        esvaziaArray()
        Desempenho()
        mudaCat =null
    }
}

function Desempenho(){
    logado()
    procuraUser()
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))

    media = 0
    for(i=0;i< empresas[posicaoUser].Funcionarios[idFunc].Feedback.Media.length;i++) {
            media += empresas[posicaoUser].Funcionarios[idFunc].Feedback.Media[i]
    }
    console.log(media)
        media = media /empresas[posicaoUser].Funcionarios[idFunc].Feedback.Media.length
        empresas[posicaoUser].Funcionarios[idFunc].Feedback.DesempenhoMedia = media.toFixed(1)
        localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))

 }


function Comunica(){
    
    mediaDesempenho = 0
    media = 0
    for(i=0;i<primeiroValor.length;i++){
    
        if(primeiroValor[i].checked==true){
            let e = primeiroValor[i]
            desempenhoComu.push(Number(e.value));
        }
        if(segundoValor[i].checked==true){
             e = primeiroValor[i]
             desempenhoComu.push(Number(e.value));
        }if(terceiroValor[i].checked==true){
            e = primeiroValor[i]
            desempenhoComu.push(Number(e.value));
        }
     }

    for(i=0;i<desempenhoComu.length;i++){
        media += desempenhoComu[i]
    }

    media =Math.round(media / desempenhoComu.length)
    mediaDesempenho += media
    empresas[posicaoUser].Funcionarios[idFunc].Feedback.Comunicação.push(media)
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    LimpaRadio()
    mudaTextoProat()
    
    
}

function Proatividade(){
    media = 0

    for(i=0;i<primeiroValor.length;i++){
    
        if(primeiroValor[i].checked==true){
            let e = primeiroValor[i]
            desemprenhoProat.push(Number(e.value));
        }
        if(segundoValor[i].checked==true){
             e = primeiroValor[i]
             desemprenhoProat.push(Number(e.value));
        }if(terceiroValor[i].checked==true){
            e = primeiroValor[i]
            desemprenhoProat.push(Number(e.value));
        }
     }

    for(i=0;i<desemprenhoProat.length;i++){
        media += desemprenhoProat[i]
    }

    media =Math.round(media / desemprenhoProat.length)
    mediaDesempenho += media
    empresas[posicaoUser].Funcionarios[idFunc].Feedback.Proatividade.push(media)
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))

    LimpaRadio()
    mudaTextoTrabalhoEquipe()

}

function teamWork(){
    media = 0

    for(i=0;i<primeiroValor.length;i++){
    
        if(primeiroValor[i].checked==true){
            let e = primeiroValor[i]
            desempenhoTeamWork.push(Number(e.value));
        }
        if(segundoValor[i].checked==true){
             e = primeiroValor[i]
             desempenhoTeamWork.push(Number(e.value));
        }if(terceiroValor[i].checked==true){
            e = primeiroValor[i]
            desempenhoTeamWork.push(Number(e.value));
        }
     }

    for(i=0;i<desempenhoTeamWork.length;i++){
        media += desempenhoTeamWork[i]
    }

    media =Math.round(media / desempenhoTeamWork.length)
    mediaDesempenho += media
    empresas[posicaoUser].Funcionarios[idFunc].Feedback.TrabalhoEquipe.push(media)
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    LimpaRadio()
    mudaTextoLider()

}

function Lider(){
    media = 0

    for(i=0;i<primeiroValor.length;i++){
    
        if(primeiroValor[i].checked==true){
            let e = primeiroValor[i]
            desempenhoLider.push(Number(e.value));
        }
        if(segundoValor[i].checked==true){
             e = primeiroValor[i]
             desempenhoLider.push(Number(e.value));
        }if(terceiroValor[i].checked==true){
            e = primeiroValor[i]
            desempenhoLider.push(Number(e.value));
        }
     }

    for(i=0;i<desempenhoLider.length;i++){
        media += desempenhoLider[i]
    }

    media =Math.round(media / desempenhoLider.length)
    mediaDesempenho += media
    empresas[posicaoUser].Funcionarios[idFunc].Feedback.Liderança.push(media)
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    LimpaRadio()
    mudaTextoComprometimento()
}

function Comprometimento(){
    media = 0

    for(i=0;i<primeiroValor.length;i++){
    
        if(primeiroValor[i].checked==true){
            let e = primeiroValor[i]
            desempenhoCompro.push(Number(e.value));
        }
        if(segundoValor[i].checked==true){
             e = primeiroValor[i]
             desempenhoCompro.push(Number(e.value));
        }if(terceiroValor[i].checked==true){
            e = primeiroValor[i]
            desempenhoCompro.push(Number(e.value));
        }
     }

    for(i=0;i<desempenhoCompro.length;i++){
        media += desempenhoCompro[i]
    }

    media =Math.round(media / desempenhoCompro.length)
    mediaDesempenho += media
    mediaDesempenho = mediaDesempenho / 5
    empresas[posicaoUser].Funcionarios[idFunc].Feedback.Comprometimento.push(media)
    empresas[posicaoUser].Funcionarios[idFunc].Feedback.Media.push(mediaDesempenho)
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    LimpaRadio()


}

function mudaTextoComu(){
    textoCategoria.innerText = `Categoria: Comunicação`
    textoUm.innerText = `Sabe comunicar com clareza e empatia assuntos leves e difíceis de lidar?`
    textoDois.innerText = `Sabe dar e receber feedbacks de forma contínua?`
    textoTres.innerText= `respeita opiniões diferentes?`

}



function mudaTextoProat(){
    textoCategoria.innerText = `Categoria: Proatividade`
    textoUm.innerText = `Demonstra interesse em aprender novas habilidades e técnicas?`
    textoDois.innerText = `O funcionário procura se envolver em projetos relevantes para a empresa?`
    textoTres.innerText= `O funcionário traz ideias inovadoras e sugestões de projetos?`

}

function mudaTextoTrabalhoEquipe(){
    textoCategoria.innerText = `Categoria: Trabalho Em Equipe`
    textoUm.innerText = `Reconhece e gerencia desafios, apoiando o time no que for necessário?`
    textoDois.innerText = `Se mostra cooperativo e amigo?`
    textoTres.innerText= `Constrói boas relações de trabalho?`
}

function mudaTextoLider(){
    textoCategoria.innerText = `Categoria: Liderança`
    textoUm.innerText = `Sabe gerenciar conflitos sem agravar as situações?`
    textoDois.innerText = `Incentiva outros colegas de equipe?`
    textoTres.innerText= `Tem a habilidade de solucionar problemas?`
}

function mudaTextoComprometimento(){
    textoCategoria.innerText = `Categoria: Comprometimento e Responsabilidade`
    textoUm.innerText = `Sabe equilibrar a qualidade das entregas com os prazos estabelecidos?`
    textoDois.innerText = `Há uma grande quantidade de faltas sem justificativa?`
    textoTres.innerText= `Se atrasa para o trabalho com frequência?`
}

function procuraUser() {
    logado()
    idFunc = localStorage.getItem('idFeedback')
    empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))

       for(i=0; i< empresas[posicaoUser].Funcionarios.length; i++){

            if(idFunc == empresas[posicaoUser].Funcionarios[i].id){
                idFunc = i
            }
       }

}
function LimpaRadio(){
    for(i=0;i<primeiroValor.length;i++){
        primeiroValor[i].checked = false;
        segundoValor[i].checked = false;
        terceiroValor[i].checked = false;
    }

}

function carregarDados(){
    nomeFunc.innerText = `FeedBack ${funcionarioIdFeed}`
}

function esvaziaArray(){
    desempenhoComu = []
    desemprenhoProat = []
    desempenhoTeamWork = []
    desempenhoLider = []
    desempenhoCompro = []
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
    