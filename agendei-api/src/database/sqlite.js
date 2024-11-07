/**
 * ? Arquivo de Configuração do SQLite
 * ------------------------------------------------
 * * Passo a passo da configuração:
 * 1 - Instalar o SQLite3
 * 2 - Criar o arquivo de configuração
 * 3 - Importar o sqlite3
 * 4 - Instanciar o sqlite3
 * 5 - OPCIONAL: Criar a função query
 * 6 - Criar a constante de conexão com o BD
 * 7 - Exportar a constante de conexão (e se criado, a query também)
 * 
 * * Promise - Executa algo com a 'promessa' que aquilo irá te devolver alguma coisa no futuro, espera o comando executar por completo antes de devolver os dados para gente
 * * Criamos um Promise, mandar ele executar alguma coisa e esperar a 'promessa' que ele irá terminar o comando em algum momento
 * * Quando o Promise termina o comando, ele pode terminar com sucesso ou com algum eventual erro (resolve e reject)
 */

// * Importando o SQLite3
import sqlite3 from 'sqlite3';

// * Instanciando o SQLite3
const SQLite = sqlite3.verbose();

// * Function query - Facilita a criação dos comandos do Banco de Dados
// Com esse conceito, executa os comandos no Banco de Dados já com a Promise, esperando que os comandos sejam executados antes de devolver dados para gente
function query(command, params, method = 'all') {

    return new Promise(function (resolve, reject) {
        db[method](command, params, function (error, result) {

            if (error) {
                reject(error);
            }

            else {
                resolve(result);
            }

        });
    });

};

// * Conexão com o Banco de Dados
// Primeiro é passado o caminho do Banco de Dados, em seguida o modo de conexão (ler e escrever dados nesse caso) e por último uma função para casos de erro na conexão
const db = new SQLite.Database("./src/database/banco.db", sqlite3.OPEN_READWRITE, (err) => {

    // Se houver erros, aparecer uma mensagem indicando o erro
    if (err)
        return console.log("Erro ao conectar com banco: " + err.message);

});

// * Exportando o db e a query
export { db, query };