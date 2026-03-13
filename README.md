# botdeatendimento
Bot de vendas automático para WhatsApp com funil de atendimento, disparo em massa e liberação manual de produtos.
# 🤖 Bot de Atendimento WhatsApp - Marketing Americano

Bot de vendas automático para WhatsApp com funil de atendimento, disparo em massa e liberação manual de produtos.

---

## 📋 Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- [VS Code](https://code.visualstudio.com/)
- WhatsApp instalado no celular

---

## 🚀 Como Instalar

1. Clone o repositório:
   git clone https://github.com/seu-usuario/botdeatendimento.git

2. Abra a pasta no VS Code

3. Abra o terminal (Ctrl + `) e instale as dependências:
   npm install

4. Configure o arquivo bot.js (veja seção abaixo)

5. Inicie o bot:
   node bot.js

6. Escaneie o QR Code que aparecer no terminal com seu WhatsApp
   (WhatsApp > Aparelhos conectados > Conectar aparelho)

---

## ⚙️ Configurações (bot.js)

Edite o bloco CONFIG no topo do arquivo bot.js:

| Configuração         | O que faz                                      |
|----------------------|------------------------------------------------|
| DISPARO_ATIVO: false | true = dispara para lista ao ligar o bot       |
| AUDIO_ATIVO: false   | true = envia audio.ogg no menu                 |
| IMAGEM_ATIVA: false  | true = envia foto.jpg no curso                 |
| PIX_CHAVE            | Sua chave PIX                                  |
| LINK_CARTAO          | Link do checkout no cartão                     |
| NUMERO_ATENDENTE     | Seu número com 55 (ex: 5511999999999)          |
| DELAY_DISPARO_MIN    | Tempo mínimo entre disparos (ms) ex: 60000     |
| DELAY_DISPARO_MAX    | Tempo máximo entre disparos (ms) ex: 120000    |

---

## ✅ Como Ativar o Bot
   node bot.js
Escaneie o QR Code e aguarde: ✅ Bot conectado!

## ❌ Como Desativar o Bot
No terminal pressione: Ctrl + C

---

## 🚀 Como Ativar o Disparo
1. No arquivo bot.js, mude: DISPARO_ATIVO: true
2. Crie o arquivo contatos.json na pasta com os números:
   ["5511999999999", "5521888888888"]
3. Rode: node bot.js

---

## 📦 Arquivos Opcionais (coloque na pasta do projeto)

| Arquivo           | Para que serve                        |
|-------------------|---------------------------------------|
| audio.ogg         | Áudio enviado no menu inicial         |
| audio_curso.ogg   | Áudio de apresentação do curso        |
| audio_ebook.ogg   | Áudio de apresentação do ebook        |
| foto_curso.jpg    | Imagem do curso                       |
| foto_ebook.jpg    | Imagem do ebook                       |
| ebook-segredo.pdf | PDF do ebook (liberado manualmente)   |
| contatos.json     | Lista de números para disparo         |

---

## 🔐 Comandos Secretos (envie no chat do cliente)

| Comando        | O que faz                              |
|----------------|----------------------------------------|
| liberar ebook  | Envia o PDF do ebook para o cliente    |
| liberar curso  | Envia o link do curso para o cliente   |

---

## 📁 Estrutura do Projeto

botdeatendimento/
├── bot.js
├── package.json
├── contatos.json
├── foto_curso.jpg (opcional)
├── foto_ebook.jpg (opcional)
├── audio.ogg (opcional)
└── .gitignore

---

## ⚠️ Avisos
- Nunca suba as pastas node_modules, .wwebjs_auth e .wwebjs_cache para o GitHub
- Essas pastas contêm sua sessão do WhatsApp
- O arquivo .gitignore já está configurado para ignorá-las
