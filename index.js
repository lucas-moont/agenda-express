const fs = require('fs').promises
const path = require('path')

async function readdir(rootDir){
    //PEGA O DIR NAME
    rootDir = rootDir || path.resolve(__dirname) 
    //RETORNA UM ARRAY COM OS FILES E DIRETÓRIOS DA PASTA SELECIONADA
    const files = await fs.readdir(rootDir)
    //FUNÇÃO QUE PASSA POR TODOS OS ARQUIVOS E DIRETÓRIOS
    walk(files, rootDir)
}

async function walk(files, rootDir){
    //ARRAY QUE PASSA POR CADA ARQUIVO DENTRO DO ARRAY DE FILES, ENVIADO PELA FUNÇÃO READDIR
    for(let file of files){
        //PEGA O CAMINHO TODO + O NOME DO FILE
        const fileFullpath = path.resolve(rootDir, file)
        //RETORNA SE O ARQUIVO EM QUESTÃO É UMA PASTA OU NÃO
        const stats = await fs.stat(fileFullpath)
        //VERIFICA SE É YN ARQUIVO OU PASTA 
        if(stats.isDirectory()){
            //CASO SEJA, INVOCAMOS A RECURSIVIDADE DA READDIR E ACIONAMOS DE NOVO PARA LERMOS OS ARQUIVOS DENTRO DA PASTA
            readdir(fileFullpath)
            //SEGUIMOS PRA PRÓXIMA VOLTA DO LAÇO 
            continue
        }

        console.log(fileFullpath)
    }
}

readdir('c:\\Users\\thewo\\OneDrive\\Documentos\\Udemy')
