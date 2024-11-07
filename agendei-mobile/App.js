/**
 * ? Documentação
 * 
 * ? Conteúdos para aprofundar/dominar no react-native/JS: conceito de arrow function, tratamento de erros com try catch, desestruturação com JS, promises/async/await e callback functions
 * ------------------------------------------------
 * ? O projeto AgendeiJS consiste numa aplicação completa de agendamento de consultas, com um aplicativo Mobile para os agendamentos, uma API para armazenar e gerenciar as informações de consultas, pacientes e médicos e uma aplicação Web para gerenciamento e administração por parte da clínica. O aplicativo Mobile foi desenvolvido utilizando React Native com Expo Go, a API foi desenvolvida utilizando Node.js e Express.js e a aplicação Web foi desenvolvida utilizando React.js. Ambos o aplicativo Mobile e a aplicação Web utilizam a API para realizar as operações do CRUD. Foi optado por utilizar o banco de dados SQLite, com comandos SQL Nativos, sem a utilização de uma ORM, com o objetivo de ter o controle de todos os comandos realizados no Banco de Dados.
 * ------------------------------------------------
 * * ARQUIVOS JSX - Junta elementos Java Script e outros elementos que não fazem partes do JS
 * * Os arquivos podem ser tanto JS quanto JSX, os dois funcionam, mas por questões de performance e organização, é recomendado usar JSX quando possuir, além de JS, o React
 * * Toda tag que você abre tem que ter tag de abertura e fechamento, há algumas exceções
 * * Código JS no meio das tags se dá usando o { }
 * 
 * * Não colocamos unidades de medida no react-native, pois se colocasse iria gerar muita diferença entre um dispositivo e outro, por conta da densidade de pixels e polegadas
 * * O próprio react-native identifica a densidade de pixels do dispositivo e se adequa da melhor forma possível com a proporção correta
 * 
 * * PROPRIEDADES - Sempre que for usar um componente em React, é passado props dentro deles, ou seja, propriedades que nós mesmo criamos e damos o nome delas
 * * É passado 'props' dentro da função para indicar que será utilizado as 'props' dentro da função
 * * Ao chamar o componente, passa se o valor daquela propriedade
 * 
 * * FRAGMENT - Usado para agrupar elementos sem criar um elemento pai, como usar o <> vazio
 * 
 * * Tudo no React é visto como um componente, há um componente que possui seus subcomponentes
 * * A tela de Login é um componente que renderiza a tela como um todo, e dentro desse componente os subcomponentes são o campo de login, campo de senha, botão de login, etc
 * 
 * * Tudo que se diz de componente é uma função de Java Script
 * * Com React, ao criar os componentes, eles ficam como se fossem do próprio react, com a tag própria deles, e esses componentes são funções JS
 * 
 * * ESTADO - Cada componente é possível armazenar o seu estado, habilitado ou desabilitado. Cada componente armazena suas próprias informações
 * 
 * * As bottom tabs ou qualquer outro tipo de abas no react-native é feito pelo react-navigation, é necessário baixar dependências e instalar arquivos por comando, ver documentação
 * 
 * * HOOKS - É uma forma simplificada de fazer manipulações dentro de nossas aplicações
 * * Iremos usar um Hook para salvar o estado de um componente
 * 
 * * CONTEXTO - Uma região, uma área da nossa aplicação, que é como se fosse uma área global. Ela pode ser acessada a partir de qualquer tela. É no Global que iremos criar o Context. Haverá um contexto na nossa aplicação que será o contexto de autenticação (auth). O objeto retornado no corpo da requisição ao fazer um Login será armazenado no contexto auth (id_user, name, email, token). No Contexto conseguimos criar algumas variáveis, alguns métodos que serão visíveis por qualquer parte da aplicação.
 * 
 * * CHILDREN - Quando abrimos uma tag em cima e fechamos ela embaixo, tudo o que está dentro (entre) a tag de abertura e a tag de fechamento é chamado de children, ou seja, os filhos dela, os filhos do componentes
 */

/**
 * ? Comandos Utilizados
 * ------------------------------------------------
 * * npx create-expo-app --template - Comando que cria um novo projeto com o template do expo, com o react-native. Foi escolhido o blank template, pois não queremos que o expo crie um projeto com um template pronto, apenas com o básico.
 * * npx expo start - Comando que inicia o projeto, com o expo, para que possamos visualizar o projeto
 * * npm audit fix --force - Comando que atualiza as dependências do projeto, para que elas estejam atualizadas
 * * npm audit - Comando que verifica se há alguma dependência vulnerável no projeto
 * * npm install @react-navigation/native - Comando que instala as dependências necessárias para o react-navigation
 * * npx expo install react-native-screens react-native-safe-area-context - Comando que instalará versões dessas bibliotecas que são compatíveis com o expo, são bibliotecas para a navegação de telas também
 * * npm install @react-navigation/bottom-tabs - Comando que instala as dependências necessárias para as bottom tabs do react-navigation
 * * npm install react-native-calendars - Comando que instala as dependências necessárias para o calendário do react-native
 * * npm install @react-native-picker/picker --save - Comando que instala as dependências necessárias para o picker do react-native
 */

/**
 * ? API
 * ------------------------------------------------
 * * Uma API é uma forma de você abrir uma porta para que uma ou mais aplicações acesse os dados de um determinado Banco de Dados sem que essas aplicações precisem conhecer essa infraestrutura do seu servidor, Banco de Dados etc. A ideia de construir uma API é fazer com que ela consiga servir dados para outras aplicações.
 * * A API é uma camada intermediária entre o servidor e a aplicação, ela recebe as requisições da aplicação e envia as respostas para a aplicação, fazendo o intermédio entre o servidor e a aplicação.
 * * Em uma analogia, a API seria o garçom de um restaurante, enquanto os clientes são o front-end (quem faz a requisição para a API) e a cozinha é o servidor/banco de dados (que irá devolver os dados a API para ela levar até o front-end).
 * 
 * * É importante passar duas informações para a API na requisição (request): A rota (ex: /doctors) e o método (ex: Get). Com essas informações a API irá saber o que fazer com a requisição. Com Get, Post, Put e Delete é possível resolver a maioria das requisições (métodos HTTP).
 * * Já na respota é importante o Status Code, que pode ser um código de sucesso (200) ou um código de erro (404, 500, etc), e obviamente os dados de resposta (response), normalmente no padrão JSON.
 * 
 * * Estamos usando o Axios para facilitar na hora de criar nossas requisições para a API
 */

/**
 * ? Tags
 * ------------------------------------------------
 * * TouchableOpacity - Captura o clique, deixa o componente clicável
 * * FlatList - Lista de dados vindo de uma API, sendo que é necessário indicar a fonte dos dados (data) e o keyExtractor (chave-primária, campo que não se repete, que diferencia)
 * * NavigationContainer - Container de navegação pai necessário em todo tipo de navegação com react-navigation
 * * Tab.Navigator - Tab de navegação para conter os Tab.Screens
 * * Tab.Screen - Representa cada aba, component signifca quem é o componente que será renderizado
 * * Calendar - Representa o componente de calendário vindo do react-native-calendars
 * * Stack.Navigator - Stack de navegação para conter os Stack.Screens
 * * Stack.Screen - Representa cada stack da navegação por stacks, component signifca quem é o componente que será renderizado
 */

// Importação do Arquivo de Rotas
import Routes from  './src/routes/routes.js';

// Importação do react-navigation
import  { NavigationContainer } from '@react-navigation/native';

// Importação do AuthProvider, para que toda a aplicação consiga acessar ele
import { AuthProvider } from './src/contexts/auth.js';

// * Definindo e exportando a função JS. É vista como um componente chamado App que tem a responsibilidade de renderizar funções na tela, levanta a aplicação, função principal
// * Só é retornado um item, que nesse caso está retornando apenas a View contendo outras tags dentro
export default function App() {

    return (
        <>
            
            {/* NavigationContainer - Necessário para que o react-navigation funcione */}
            <NavigationContainer>

                {/* Envolvendo toda a aplicação com o AuthProvider */}
                <AuthProvider>

                    {/* Renderizando o componente de Routes */}
                    <Routes />

                </AuthProvider>

            </NavigationContainer>

        </>
    );

}