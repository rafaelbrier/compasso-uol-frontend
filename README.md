# Desafio Compasso UOL Frontend

#### O sistema foi feito responsivo.

#### Realizei dois testes somente por falta de tempo, mas estes englobam duas funcionalidades completas: renderização e busca na API.

-   O primeiro teste simula a chamada da página passando um parametro na URL para pesquisar (http://localhost:3000/rafaelbrier).

    -   Na chamada da página passando um variável no caminho, o sistema busca o usuário na API do git e renderiza um componente (CardUsuario) para exibir o usuário buscado.
    -   O teste por sua vez, mocka a resposta da API (User mockado) e verifica se o componente CardUsuario foi redenrizado corretamente, e também verifica se um dos seus campos está com a informação correta.
        -   Ex.: ele vê se o conteudo da div que deveria renderiza a Biografia do usuário está batendo com a Biografia do Mock do Usuário.

-   O segundo teste realiza os mesmos testes que o primeiro, porém este renderiza com a URL padrão (http://localhost:3000/rafaelbrier), assim a chamada da API é feita simulando o usuário digitar um nome no campo de pesquisa e disparando o evento de click no botão pesquisar.

    -   Este processo é o mesmo realizado ao navegar através da URL com parâmetro, portanto as asserções feitas são as mesmas.

-   Vê-se que os testes cobrem chamada da API e verificação de renderização dos componentes impactados pela chamada da API.

-   Alguns outros testes que pensei que seriam bacanas de implementar:
    -   Verificar se o componente de Erro renderiza com a mensagem correta simulando um Reject da API.
    -   Verificar se o componente de Mais Buscados exibe corretamente e filtra de acordo com o input do usuário.
    -   Mockar chamada da API de lista de repositórios e verificar se renderiza corretamente os elementos da lista.
