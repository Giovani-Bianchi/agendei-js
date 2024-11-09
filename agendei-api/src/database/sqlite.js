/**
 * * Arquivo de Configuração do SQLite
 * ------------------------------------------------
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