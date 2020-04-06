# [WIP] Widget de simulador externo para WordPress
Este é um trabalho em progresso para a criação de um Widget de simulador de moedas externo da plataforma Simple, para CMS WordPress.

## Sobre o widget
O objetivo desse widget é proporcionar implementação agilizada de um simulador de moedas externo para os parceiros da plataforma Simple que possuem um website em WordPress.  
O simulador conta com a funcionalidade de compra de papel moeda, envio e recebimento de remessas internacionais e redirecionamento para a Simple do próprio parceiro.

Com este repositório e apenas alguns ajustes no código você terá um simulador completo. Mas se preferir, pode criar e integrar seu próprio simulador externo, seguindo a documentação da nossa API, clicando [aqui](https://github.com/Frente-Corretora/public-docs/blob/master/external-price-simulator.md) e [aqui](https://github.com/Frente-Corretora/public-docs/blob/master/external-remittance-simulator.md).

### Tecnologias
O Widget foi desenvolvido utilizando PHP, HTML5, CSS3 e JavaScript, sendo:
- **PHP**: Linguagem base do CMS WordPress, necessária para o funcionamento do widget;
- **HTML5**: Criação da estrutura do simulador;
- **CSS3**: Estilização do layout geral do simulador, com apoio da biblioteca [Materialize](https://github.com/Dogfalo/materialize);
- **JavaScript**: Linguagem utilizada para a integração com a API, utilizando a biblioteca [jQuery](https://github.com/topics/jquery).

### Instalação
1. Clone esse repositório em algum local do seu explorador de arquivos. Se preferir, pode clonar diretamente no seu website, dentro do diretório **wp-content/plugins**.
2. Abra seu editor de códigos preferido, pois vamos codar! \o

### Primeiros passos
Este projeto ainda necessita de um pouco de mão na massa para a sua utilização, pois é necessário definir por exemplo o seu ID de correspondente em alguns arquivos. 

Cada parceiro Simple possui um ID único requisitado na API, sendo um tipo *string* e um tipo *integer*. Esse ID pode ser solicitado com a nossa equipe técnica, caso você não saiba o seu.

**correspondent_identifier** *(String)* é um nome, um identificador único para cada correspondente associado ao SIMPLE.
> Exemplo: matriz

**correspondentId** *(Integer)* é o ID associado ao correspondente.
> Exemplo: 1

Vamos iniciar alterando o nosso nome de parceiro:

3. Abra o arquivo **js/agent.js** e procure na linha 4 da classe **Agent**, no método construtor, pela variável **correspondent_identifier**:
```javascript
class Agent {
  constructor() {
  this.baseUrl = `https://api.frentecorretora.com.br`; // URL de requisição da API
  this.correspondent_identifier = 'matriz'; // Nome do seu correspondent ID
  this._agentData = null;
  }
}
```
Note que passamos para essa variável uma *string*, cuja qual é o seu nome de parceiro que irá aparecer na URL de redirecionamento.

4. Altere somente o nome, inserindo o seu ID Simple, e salve o arquivo.
> Exemplo:  this.correspondent_identifier = 'frente';

Agora vamos alterar o correspondentId *integer*.

5. Abra o arquivo **js/request.js** e procure na linha 4 da classe **Exhange**, no método construtor, pela variável **correspondentId**:
```javascript
class Exchange {
  constructor() {
    this.baseUrl = 'https://api.frentecorretora.com.br'; // URL de requisição da API
    this.correspondentId = 'correspondentId=1'; // Número do seu correspondente ID
    this._exchangeData = null;
    this._remittanceData = null;
  }
}
```

Passamos para essa variável uma *string* que dentro inclui nosso número de **correspondentId**.

6. Altere somente o número, inserindo o seu ID Simple, e salve o arquivo.
> Exemplo: this.correspondentId = 'correspondentId=1'; 

Com isso você já terá seu simulador externo funcionando corretamente e integrado com o seu próprio Simple! Basta inserir o widget no seu site onde preferir.

<p align="center">
<img width="379" height="372" src="https://cdn.cambioonline.com.br/2020/04/06145428/screenshot_61.png">
</p>

### Personalização
O simulador vem com cores e um layout pronto pra você só instalar seu widget e usar, mas é claro que com algumas alterações no CSS você pode adaptar as cores para o padrão do seu site. Basta realizar as alterações desejadas, salvar e subir a pasta para o diretório de plugins **wp-content/plugins**. 

As principais classes estão detalhadas com comentários e você pode trocar pelas cores que quiser, ou até mesmo alterar o formato e ordem dos elementos HTML.  
O formulário HTML com todos os campos está na raiz do projeto, no arquivo **form-simulator.php** 

Exemplos:
<p align="center">
<img src="https://cdn.cambioonline.com.br/2020/04/06152720/colagem_simuladores.jpg">
</p>

O arquivo principal de CSS se encontra no diretório **css/main.css**, e também há uma folha de estilos em **materialize/css/materialize.css**

Dúvidas e sugestões? Me manda uma mensagem: [danielle.fernandes@frentecorretora.com.br](mailto:danielle.fernandes@frentecorretora.com.br)
