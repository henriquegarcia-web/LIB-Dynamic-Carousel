### LIB - Dynamic Carousel

#### Escopo

**Inserção:** Para usar o *DynamicCarousel*, crie um elemento baseado em 3 classes: O elemento pai, que representa a área de visualização do carrossel *(dc-carousel)*, o elemento que irá conter todos os slides *(dc-carousel-slides)* e os slides *(dc-carousel-slide)*. A função irá automaticamente criar um container das setas e dos contadores de sliders, ambos configuráveis.

<img src="files/images/screenshot_classes.png">

###

**Manipulação:** É possível modificar o funcionamento do carrossel, passando para função variáveis manipuladoras.

<img src="files/images/screenshot_configs.png">

###

#### Variáveis de manipulação

**Formatação geral**

`loop: (true/false)` Se ativado, quando clicado para a próxima exibição e não houver mais, retorna para a primeira

**Tempo e Contadores**

`transition_time: (X segundos)` Configura o tempo que leva para transitar entre exibições
`autoplay: (true/false)` Se ativado, define um tempo automático de transição
`autoplay_time: (X segundos)` Quando autoplay está ativado, define o tempo entre as transições automáticas
`counter: (true/false)` Configura para aparecer os contadores de exibições na parte inferior

#### Reports

> [ Resolvido ] - A primeira transição não apresenta tempo de transição, posteriormente se normaliza