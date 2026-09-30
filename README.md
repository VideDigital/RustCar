# Rust Car — Site institucional

Site estático criado para a **Rust Car — Centro de Estética Automotiva**, em Piraporinha, Diadema/SP.

## Objetivo

Criar uma base digital profissional focada em:

- apresentar a empresa com clareza;
- transmitir confiança;
- facilitar o contato;
- direcionar o visitante para uma avaliação/orçamento;
- preparar SEO local e mensuração;
- permitir evolução posterior com fotos, avaliações, serviços confirmados e campanhas.

## Importante antes de publicar

O briefing disponível ainda não confirma todos os serviços, WhatsApp, horários, avaliações e materiais da Rust Car. Por isso, o projeto **não inventa esses dados**.

Revise obrigatoriamente:

1. **WhatsApp oficial** — inserir em `site-config.js` no campo `whatsappNumber`.
2. **Domínio oficial** — trocar `SEU-DOMINIO-AQUI.com.br` em `site-config.js` e no `<head>` de `index.html`.
3. **Logo oficial** — substituir a marca textual/monograma temporário caso a Rust Car já tenha identidade definida.
4. **Serviços confirmados** — adicionar somente depois de validação com a Rust Car.
5. **Fotos reais** — substituir os placeholders da seção Trabalhos.
6. **Avaliações reais** — criar seção somente com avaliações verificáveis.
7. **Horário de atendimento** — adicionar após validação.
8. **Google Business Profile** — revisar link, categoria, descrição, horários, fotos e avaliações.
9. **CTA “enviar fotos pelo WhatsApp”** — ativar apenas se a Rust Car confirmar que esse processo faz sentido comercialmente.

## Como testar

Como o site é estático, você pode abrir `index.html` diretamente no navegador.

Para testar de forma mais próxima da publicação:

```bash
npx serve .
```

ou, com Python:

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Estrutura

```text
rust-car-site/
├─ index.html
├─ styles.css
├─ script.js
├─ site-config.js
├─ README.md
├─ .gitignore
└─ assets/
   ├─ icons/
   │  └─ favicon.svg
   └─ images/
      └─ og-placeholder.svg
```

## Tracking preparado

Os botões possuem eventos via `dataLayer`/`gtag`/`fbq` quando essas ferramentas existirem na página.

Eventos já preparados:

- `whatsapp_click`
- `hero_contact`
- `final_contact`
- `maps_open`
- `instagram_open`

Os IDs de GA4, Google Tag Manager e Meta Pixel estão centralizados em `site-config.js`, mas os scripts das plataformas **não foram adicionados automaticamente**, para evitar configurar rastreamento incorreto sem os IDs oficiais.

## SEO local inicial

A versão inclui:

- título e descrição com Diadema;
- endereço completo;
- estrutura semântica;
- dados estruturados `AutomotiveBusiness`;
- Open Graph;
- conteúdo orientado à presença local.

Não foram criadas páginas individuais de serviços porque o portfólio ainda precisa ser confirmado.

## Publicação no GitHub

1. Crie um repositório, por exemplo `rust-car-site`.
2. Extraia este projeto.
3. Abra a pasta no VS Code.
4. Execute:

```bash
git init
git add .
git commit -m "feat: primeira versão do site Rust Car"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Depois você pode publicar com GitHub Pages, Netlify, Vercel ou a hospedagem escolhida.

## Próxima evolução recomendada

Depois de validar o briefing com o cliente:

- inserir serviços reais;
- adicionar fotos/antes e depois;
- adicionar avaliações Google;
- ajustar identidade visual com logo e cor oficiais;
- confirmar CTA principal;
- criar páginas de serviços prioritários para SEO local;
- instalar GA4/GTM/Meta Pixel;
- medir visita → WhatsApp → lead → orçamento → venda.
