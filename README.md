# Maison Belle — Beauty Atelier

Projeto conceito desenvolvido diretamente em HTML, CSS e JavaScript para KS Agency.

## Executar localmente

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

Acesse http://localhost:5173.

Os contatos são configurados em `CONFIG`, no início de `app.js`. Sem número, o agendamento abre uma demonstração local e não envia dados. Serviços e imagens também estão centralizados em `app.js`.

Fotografias editoriais demonstrativas do Unsplash, armazenadas em `public/images`. Não representam clientes, equipe ou instalações reais. Licença: https://unsplash.com/license. IDs das imagens: 1524504388940-b1c1722653e1, 1522337360788-8b13dee7a37e, 1519699047748-de8e457a634e, 1604654894610-df63bc536371, 1512496015851-a90fb38ba796, 1527799820374-dcf8d9d4a388, 1600948836101-f9ffda59d250.

Fontes: Gloock e Hanken Grotesk, armazenadas localmente em public/fonts (Google Fonts, SIL Open Font License). Não há dependências de build. O frasco decorativo usa CSS 3D; o parallax respeita redução de movimento. Defina canonical e URLs absolutas de Open Graph apenas ao confirmar um domínio.

Rolagem suave: easing por requestAnimationFrame no mouse/trackpad e nos links internos; touch mantém a inércia nativa. Respeita prefers-reduced-motion e pausa ao abrir modais ou interagir com teclado/barra de rolagem.

## Direção visual / Flow

Tipografia principal Italiana (armazenada localmente), fotografias com recortes orgânicos, botões ampliados, entradas de cena e parallax leve. A barra de rolagem é ocultada visualmente; roda do mouse, teclado e touch continuam disponíveis. O botão flutuante WhatsApp usa a configuração centralizada e abre o modal demonstrativo enquanto não houver telefone confirmado.

Modelo editorial gerada por IA em model-cutout.webp, com transparência real, utilizada no hero e encerramento. O PNG original é preservado no projeto. Não representa cliente ou funcionária real.

Le Rituel: sequência sticky de scroll com secador transparente, passagem de ar, desfoque e gotas de condensação estilizadas; revela a próxima seção, sem navegação forçada. Desativada com prefers-reduced-motion; blur reduzido no mobile. Novos assets hair-campaign e dryer-cutout gerados por IA, PNGs originais preservados e WebP com alpha em alta qualidade para exibição. Easing de rolagem: constante de tempo 225 ms, independente da taxa de quadros.

## Capítulos editoriais

Experiências: seleção de serviço com roteiro de cuidado específico. Atelier: três hotspots acessíveis com notas de atmosfera. Galeria: cinco fotografias, filtros por categoria, navegação horizontal e lightbox. Seu ritual: quatro intenções que recomendam serviços e preenchem o contato. Navegação lateral com indicação do capítulo atual no desktop. Nenhuma recomendação confirma agenda ou disponibilidade.

Refino de scroll: véu inferior com blur progressivo, camada lateral de cabelo com deslocamento sutil (simulação de foto estática), trajetória do secador com easing e escala. Galeria com dimensões estáveis, navegação restrita ao filtro, arraste desktop e limites nos controles. Seção Detalhes reorganizada como editorial de finalização.

## Atualização de imagens e rolagem

A roda do mouse e o touch usam agora rolagem nativa; links internos mantêm comportamento suave. Não há mais animação RAF tentando controlar scrollY. O desbloqueio do body ao fechar menus foi reforçado. Novas cenas conceituais geradas por IA em salon-interior, salon-service, salon-bench, salon-nails e salon-makeup substituem as fotos anteriores. A transição do secador usa a bancada como contexto. As imagens não representam instalações, equipe ou clientes reais.

Rolagem suave restaurada com acumulador de posição fracionária, encerramento explícito da animação e prioridade para teclado, touch, menus e âncoras. Evita manter animação ativa por arredondamento de scrollY no final da página.

Transição atual: cortina de cabelo em duas camadas sincronizadas com pente recortado. O scroll abre as camadas e revela a seção sob elas. Sem blur de página; efeito estático alternativo para movimento reduzido. Assets hair-curtain e comb-cutout gerados por IA.
