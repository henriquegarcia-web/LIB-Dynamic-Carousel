### LIB - Dynamic Carousel

#### Escopo

**Inserção:** Para usar a função de carrossel, basta executar a função JS passando como parâmetro de renderização o elemento no qual é desejado que o carrossel seja exibido. Esse elemento deve conter uma largura e altura definida em pixels.

**Manipulação:** Para ajustar o funcionamento da função, é possível passar parâmetros modificadores, possibilitando alterações de funcionalidades do carrosel.

#### Variáveis de manipulação

**Formatação**

- `view_type: <valor>` Define o conteúdo a ser exibido, podendo ser uma imagem ou um elemento
- `render: <valor>` Seta o valor a ser exibido, se imagem um link e se um elemento, a estrutura a ser criada
- `image_scale: <valor>` Para imagens, configura a exibição, cover e centralizado ou tamanho original ajustado ao tamanho máximo do carrossel
- `loop: <valor>` Se ativado, quando clicado para a próxima exibição e não houver mais, retorna para a primeira
  

**Setas**

- `arrow_distance: <valor>` Define o distanciamento das setas das extremidades
- `arrow_color: <valor>` Configuração de cor das setas

**Tempo e Contadores**

- `transition_time: <valor>` Configura o tempo que leva para transitar entre exibições
- `autoplay: <valor>` Se ativado, define um tempo automático de transição
- `autoplay_time: <valor>` Quando autoplay está ativado, define o tempo entre as transições automáticas
- `counter: <valor>` Configura para aparecer os contadores de exibições na parte inferior
- `counter_color: <valor>` Configuração de cor padrão dos contadores
- `counter_color_selected: <valor>` Configuração de cor quando o contador está ativo

#### Reports

> A primeira transição não apresenta tempo de transição, posteriormente se normaliza