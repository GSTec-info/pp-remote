# Controle de slides para ProPresenter 7.9+

<h4 style="text-align: center;font-style: italic;">Desenvolvido por: <a href="https://github.com/GSTec-info" target="_blank">Generson Avelino da Silva</a></h4>
<h4 style="text-align: center;font-style: italic;">Contato: <a href="mailto:generson.avelinosilva@gmail.com" target="_blank">generson.avelinosilva@gmail.com</a></h4>
<br>

### Propósito

> Facilitar a interação do pregador com os slides de apresentação durante o culto. Dando maior controle ao pregador sobre o tempo de resposta e a velocidade da apresentação.

### Requisitos

> - [NodeJS](https://nodejs.org/en/download/prebuilt-installer)

### Compatibilidade

> Qualquer dispositivo que tenha um navegador de internet.

### Uso

    node server.js

> - Ao executar o arquivo "server.js", o NodeJS criará um servidor web local, onde poderá receber requisições e enviar respostas.

> - Acesso em (Sem as aspas):

    http:// + "IP_COMPUTADOR_PROPRESENTER"

> - Dessa forma o dispositivo a ser utilizado, deve estar conectado a mesma rede do computador que está executando o servidor.
> - Para que não fique aparecendo a execução do NodeJS para o usuário, o script VB "start_server.vbs" executa o cmd em segundo plano.

** Obs: Para não precisar fazer nenhuma alteração nos scripts, colocar os arquivos do projeto dentro de uma pasta no "C:" (somente Windows) com nome "pp-remote" **

### API

> - Fornecido dentro do próprio ProPresenter. Para maior consulta, veja a documentação na pasta ["Docs"](/Docs/API_ProPresenter/) desse projeto.
> - Para maiores informações ou suporte, visite o site oficial da empresa desenvolvedora do ProPresenter através do [Link](https://renewedvision.com/propresenter).
