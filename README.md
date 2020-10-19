# [WIP] Widget de simulador externo para WordPress
Este é um trabalho em progresso para a criação de um Widget de simulador de moedas externo da plataforma Simple, para CMS WordPress.

## Change log
[Clique aqui para acessar o histórico de correções.](https://github.com/Frente-Corretora/simulator-widget/blob/master/change-log.md)

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
Este projeto ainda necessita de um pouco de mão na massa para a sua utilização, pois é necessário definir ID de correspondente e identificador no arquivo de configuração. 

Cada parceiro Simple possui um ID único do tipo *integer* e um identificador do tipo *string* requisitados na API. Esses dados podem ser solicitados com a nossa equipe técnica, caso você não saiba o seu.

**correspondent_identifier** *(String)* é um nome, um identificador único para cada correspondente associado ao SIMPLE.
> Exemplo: 'frente'

**correspondentId** *(Integer)* é o ID associado ao correspondente.
> Exemplo: 1

3. Abra o arquivo **js/config.js** e altere os valores das variaveis **correspondent_id** e **correspondent_identifier** nas linhas 1 e 3, respectivamente, para seus valores correspondentes:
```javascript
const correspondent_id = 1;

const correspondent_identifier = 'frente';
```

Com isso você já terá seu simulador externo funcionando corretamente e integrado com o seu próprio Simple! Basta inserir o widget no seu site onde preferir.

<p align="center">
<img width="379" height="372" src="https://cdn.cambioonline.com.br/2020/04/06145428/screenshot_61.png">
</p>

### Personalização
O simulador vem com cores e um layout pronto pra você só instalar seu widget e usar, mas é claro que com algumas alterações no CSS você pode adaptar as cores para o padrão do seu site. Basta realizar as alterações desejadas, salvar e subir a pasta para o diretório de plugins **wp-content/plugins**. 

As principais classes estão detalhadas com comentários e você pode trocar pelas cores que quiser, ou até mesmo alterar o formato e ordem dos elementos HTML.  
Exemplos:
<p align="center">
<img src="https://cdn.cambioonline.com.br/2020/04/06152720/colagem_simuladores.jpg">
</p>

O arquivo principal de CSS se encontra no diretório **css/main.css**, e também há uma folha de estilos em **materialize/css/materialize.css**

Dúvidas e sugestões? Manda uma mensagem para o nosso setor de relacionamento com o Correspondente: [helton.souza@frentecorretora.com.br](mailto:helton.souza@frentecorretora.com.br)
