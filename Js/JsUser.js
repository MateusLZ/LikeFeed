let progressLid = document.querySelector('.barra div')
let progressCompro= document.querySelector('.barraDois div')
let progressComu = document.querySelector('.barraTres div')
let progressProa = document.querySelector('.barraQuatro div')
let progressTeam= document.querySelector('.barraCinco div')
let empresas = JSON.parse(localStorage.getItem('empresaCadastrada'))
let fotoPerfil = document.getElementById('imgPhoto')
let arquivoFoto = document.getElementById('filImg')
let nomeFunc = document.getElementById('nome-Func')
let dadosCPF = document.getElementById('dadosCPF')
let dadosEmail = document.getElementById('dadosEmail')
let dadosPhone = document.getElementById('dadosTelefone')
let senhaNova = document.getElementById('newSenha')
let modal =document.getElementById('vis-cad')
let mediaLider = 0
let mediaComprometimento = 0
let mediaComunica = 0
let mediaProativ = 0
let mediaTeamWork = 0
let idEmpresa = localStorage.getItem('idEmpresa')
let idUser = localStorage.getItem('idUser')
let posicaoUser 


fotoPerfil.addEventListener('click', () =>{
    arquivoFoto.click()
})

arquivoFoto.addEventListener('change', () =>{
    if(arquivoFoto.files.length <=0){
        return
    }
    let lerArquivo  = new FileReader()

    lerArquivo.onload = () =>{
        fotoPerfil.src = lerArquivo.result
    }

    lerArquivo.readAsDataURL(arquivoFoto.files[0])
})

function Desempenho(){
    ProcuraUser()
    ListarDados()
    for(i=0;i<empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação.length;i++) {
        
        mediaLider += empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Liderança[i]
        mediaComprometimento += empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comprometimento[i]
        mediaComunica += empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação[i]
        mediaProativ += empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Proatividade[i]
        mediaTeamWork += empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.TrabalhoEquipe[i]
    }

    
    mediaLider = (mediaLider / empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação.length) * 10
    mediaComprometimento = (mediaComprometimento / empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação.length) * 10
    mediaComunica = (mediaComunica / empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação.length) * 10
    mediaProativ = (mediaProativ / empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação.length) * 10
    mediaTeamWork = (mediaTeamWork / empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação.length) * 10

    
    if(empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.Comunicação.length == 0){
        mediaLider = 0
        mediaComprometimento = 0
        mediaComunica = 0
        mediaProativ = 0
        mediaTeamWork = 0
    }
   
        progressLid.setAttribute('style', 'width:' + mediaLider + '%')
        progressCompro.setAttribute('style', 'width:' + mediaComprometimento + '%')
        progressComu.setAttribute('style', 'width:' + mediaComunica + '%')
        progressProa.setAttribute('style', 'width:' + mediaProativ + '%')
        progressTeam.setAttribute('style', 'width:' + mediaTeamWork + '%')
}


function ProcuraUser(){
    for(i=0; i<empresas[idEmpresa].Funcionarios.length; i++){
        if (empresas[idEmpresa].Funcionarios[i].id == idUser){
            posicaoUser = i
        } 
    }
}


function ListarDados(){
    let numeroDesempenho = document.getElementById('classNumber')
    let imgFeed = Number(empresas[idEmpresa].Funcionarios[posicaoUser].Feedback.DesempenhoMedia)
    let imgEmoji = document.getElementById('imgEmoji')
    nomeFunc.innerText += empresas[idEmpresa].Funcionarios[posicaoUser].Funcionario
    dadosCPF.innerText += ` ` + empresas[idEmpresa].Funcionarios[posicaoUser].CPF
    dadosEmail.innerText += ` ` + empresas[idEmpresa].Funcionarios[posicaoUser].Email
    dadosPhone.innerText += ` ` + empresas[idEmpresa].Funcionarios[posicaoUser].Telefone
    numeroDesempenho.innerText = (imgFeed * 10) + '%'
    
    switch(true){
        case imgFeed >= 0 && imgFeed <2:
            imgEmoji.src = '../img/Emoji1.png'
            break
        case imgFeed >= 2 && imgFeed <= 4:
            imgEmoji.src = '../img/Emoji2.png'
            break
        case imgFeed > 4 && imgFeed <= 6:
            imgEmoji.src = '../img/Emoji3.png'
            break
        case imgFeed > 6 && imgFeed <= 8:
            imgEmoji.src = '../img/Emoji4.png' 
            break
        case imgFeed > 8 && imgFeed <= 10:
            imgEmoji.src = '../img/Emoji5.png'
            break 
                }

}

function AbreModal() {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
    
function fecharCadastro() {
        modal.style.display = 'none'
        document.body.style.overflow = 'auto'
        senhaNova.value = ''
}


function TrocaSenha(){
    empresas[idEmpresa].Funcionarios[posicaoUser].Senha = senhaNova.value
    localStorage.setItem('empresaCadastrada', JSON.stringify(empresas))
    fecharCadastro()
    alert(`Nova senha cadastrada!`)
}


