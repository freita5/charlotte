# Imagens

## Fotos dos produtos

Todas as fotos dos produtos vêm do CDN do iFood
(`static.ifood-static.com.br/image/upload/t_high/pratos/…`) e são montadas em
`src/data/products.ts` a partir do arquivo que o cardápio devolve. Nada é
duplicado aqui: trocar a foto no iFood já reflete no site.

Dois catálogos aparecem na URL, e essa diferença importa: a maior parte das
fotos mora no catálogo da loja (`b86f5ccc-…`), mas as bebidas de marca vêm de
outro (`820af392-…`). Por isso o catálogo vem por item e não por categoria —
a água mineral, por exemplo, está no catálogo da loja e voltava 403 quando era
montada como se fosse bebida.

Cinco itens não têm foto no iFood (Cappuccino Cremoso, Expresso Duplo,
Quiche Abacaxi com Gorgonzola, Sacola Premium Média e Guaraná Zero). Nesses
casos o card vira um bloco tipográfico vermelho com o nome do produto — de
propósito, não é imagem quebrada. O `ProductImage` trata qualquer foto que
falhe.

## Itens que só existem no balcão

Nem tudo o que a loja vende está no iFood. Quem **não** tem `d` (id do prato)
na tabela de `src/data/products.ts` é item de balcão: baby cakes, doce no
tabuleiro, as tortas e fatias que o iFood não lista, os quiches. O card deles
traz a etiqueta "consultar no balcão" e o botão abre o WhatsApp perguntando
pelo item, em vez de mandar para o iFood. São 19 dos 68 itens.

## Foto do hero — `public/images/editorial/hero-panel.jpg`

Recorte de uma foto da própria Charlotte, do cardápio de Páscoa em PDF
(<https://drive.google.com/file/d/1GDIqnYJ_Q59OkjaiMlsiMA9OFh-Sus-K/view>).
Quando quiser trocar por uma foto atual, é só substituir o arquivo.

## Material bruto

As fotos de trabalho (2,4 GB) foram movidas para `fotos/`, na raiz do
repositório. Elas não entram no build: o Vite copia `public/` inteiro para
`dist/`, então deixar esse material ali inflava cada build em 2,4 GB.

## Marca

`logo.png` e `logo-red.png` foram derivados do logo original da casa
(`logo.png` é a versão clara, usada sobre fundo vermelho; `logo-red.png` a
versão de marca, usada sobre papel). O `favicon.svg` tem o C embutido.

Tipografia: [Fraunces](https://fonts.google.com/specimen/Fraunces) (cartaz
da capa, fonte variável com eixos `opsz`, `SOFT` e `WONK`),
[Archivo](https://fonts.google.com/specimen/Archivo) (UI, rótulos, seções) e
[Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (nome
do produto) — Google Fonts, SIL Open Font License.
