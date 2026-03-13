const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

// ============================================================
// ⚙️ CONFIGURAÇÕES - EDITE AQUI
// ============================================================
const CONFIG = {
  DELAY_RESPOSTA_MIN: 2000,
  DELAY_RESPOSTA_MAX: 4000,
  DELAY_DISPARO_MIN: 60000,
  DELAY_DISPARO_MAX: 120000,
  DISPARO_ATIVO: false, // true = dispara ao ligar o bot
  AUDIO_ATIVO: false, // true = envia audio.ogg no menu
  IMAGEM_ATIVA: false, // true = envia foto.jpg no curso
  PIX_CHAVE: "seuemail@exemplo.com", // ← TROQUE AQUI
  LINK_CARTAO: "https://seulink.com/checkout", // ← TROQUE AQUI
  NUMERO_ATENDENTE: "5511999999999", // ← TROQUE PELO SEU NÚMERO
};
// ============================================================

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

client.on("qr", (qr) => {
  console.clear();
  qrcode.generate(qr, { small: true });
  console.log("📱 Escaneie o QR Code com seu WhatsApp!");
});

client.on("ready", async () => {
  console.log("✅ Bot conectado!");
  if (CONFIG.DISPARO_ATIVO) iniciarDisparo();
});

// ============================================================
// 📩 FUNIL DE ATENDIMENTO
// ============================================================
client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const texto = msg.body.toLowerCase().trim();

  if (chat.isGroup) return;

  // ============================================================
  // 🔐 COMANDOS SECRETOS (só funcionam quando VOCÊ envia)
  // Para usar: abra o WhatsApp, vá no chat do cliente e
  // digite o comando abaixo para liberar o produto manualmente
  // ============================================================
  if (msg.fromMe) {
    // Você digita: liberar ebook (no chat do cliente)
    if (texto === "liberar ebook") {
      if (fs.existsSync("./ebook-segredo.pdf")) {
        const ebook = MessageMedia.fromFilePath("./ebook-segredo.pdf");
        await client.sendMessage(msg.to, ebook, {
          caption:
            "📖 *Aqui está o seu Ebook!*\n\nQualquer dúvida é só chamar aqui. 🙂",
        });
        console.log(`📖 Ebook enviado para ${msg.to}`);
      } else {
        console.log("⚠️ Arquivo ebook-segredo.pdf não encontrado!");
      }
    }

    // Você digita: liberar curso (no chat do cliente)
    if (texto === "liberar curso") {
      await client.sendMessage(
        msg.to,
        "📚 *Acesso ao Curso liberado!* 🎉\n\n✅ Acesse aqui: https://seusite.com/curso\n\nQualquer dúvida é só chamar! 🙂", // ← TROQUE O LINK
      );
      console.log(`📚 Curso liberado para ${msg.to}`);
    }
    return; // Para aqui, não processa mais nada dos seus próprios envios
  }

  // Simula digitando...
  await chat.sendStateTyping();
  await delay(
    Math.floor(
      Math.random() * (CONFIG.DELAY_RESPOSTA_MAX - CONFIG.DELAY_RESPOSTA_MIN),
    ) + CONFIG.DELAY_RESPOSTA_MIN,
  );

  // --- COMPROVANTE (quando cliente envia foto) ---
  if (msg.hasMedia && msg.type === "image") {
    await msg.reply(
      "✅ *Recebemos o seu comprovante!*\n\n" +
        "⏳ Estamos analisando e em breve seu acesso será liberado.\n\n" +
        "Se em até *30 minutos* não receber, responda com *suporte*.",
    );
    // Avisa você no terminal
    console.log(
      `🔔 COMPROVANTE RECEBIDO de ${msg.from}! Verifique e libere o produto.`,
    );
    return;
  }

  // --- MENU INICIAL ---
  if (
    [
      "oi",
      "ola",
      "olá",
      "menu",
      "bom dia",
      "boa tarde",
      "boa noite",
      "inicio",
      "início",
    ].includes(texto)
  ) {
    if (CONFIG.AUDIO_ATIVO && fs.existsSync("./audio.ogg")) {
      const audio = MessageMedia.fromFilePath("./audio.ogg");
      await client.sendMessage(msg.from, audio, { sendAudioAsVoice: true });
      await delay(1000);
    }
    await client.sendMessage(
      msg.from,
      // ↓ EDITE O TEXTO DE BOAS-VINDAS AQUI ↓
      "👋 *Olá! Bem-vindo ao Marketing Americano!*\n\n" +
        "Como posso te ajudar hoje?\n\n" +
        "📚 Digite *curso* para ver o curso\n" +
        "📖 Digite *ebook* para ver o ebook\n" +
        "👤 Digite *suporte* para falar com atendente",
    );
  }

  // --- CURSO ---
  else if (texto === "curso") {
    // 1. Envia a FOTO do curso
    if (fs.existsSync("./foto_curso.jpg")) {
      const foto = MessageMedia.fromFilePath("./foto_curso.jpg");
      await client.sendMessage(msg.from, foto);
      await delay(1500);
    }

    // 2. Envia o ÁUDIO de apresentação do curso
    if (fs.existsSync("./audio_curso.ogg")) {
      const audio = MessageMedia.fromFilePath("./audio_curso.ogg");
      await client.sendMessage(msg.from, audio, { sendAudioAsVoice: true });
      await delay(1500);
    }

    // 3. Envia o TEXTO com valor e opções
    await msg.reply(
      "📚 *Curso Completo - Segredo do Marketing*\n\n" +
        "Aprenda passo a passo as estratégias dos americanos.\n\n" +
        "💰 *Investimento: R$ 97,00*\n\n" +
        "💸 Digite *pix* para pagar via PIX\n" +
        "💳 Digite *cartao* para pagar com cartão",
    );
  }

  // --- EBOOK ---
  else if (texto === "ebook") {
    // 1. Envia a FOTO do ebook
    if (fs.existsSync("./foto_ebook.jpg")) {
      const foto = MessageMedia.fromFilePath("./foto_ebook.jpg");
      await client.sendMessage(msg.from, foto);
      await delay(1500);
    }

    // 2. Envia o ÁUDIO de apresentação do ebook
    if (fs.existsSync("./audio_ebook.ogg")) {
      const audio = MessageMedia.fromFilePath("./audio_ebook.ogg");
      await client.sendMessage(msg.from, audio, { sendAudioAsVoice: true });
      await delay(1500);
    }

    // 3. Envia o TEXTO com valor e opções
    await msg.reply(
      "📖 *Ebook - O Segredo do Marketing dos Americanos*\n\n" +
        "Modelos prontos de mensagens, anúncios e ofertas.\n\n" +
        "💰 *Investimento: R$ 47,00*\n\n" +
        "💸 Digite *pix* para pagar via PIX\n" +
        "💳 Digite *cartao* para pagar com cartão",
    );
  }

  // --- PIX ---
  else if (texto === "pix") {
    await msg.reply(
      `💳 *Pagamento via PIX*\n\n` +
        `📱 Chave PIX: *${CONFIG.PIX_CHAVE}*\n\n` +
        `📸 Após pagar, *envie a foto do comprovante* aqui! ⚡`,
    );
  }

  // --- CARTÃO ---
  else if (texto === "cartao" || texto === "cartão") {
    await msg.reply(
      `💳 *Pagamento via Cartão*\n\n` +
        `🔗 Acesse: ${CONFIG.LINK_CARTAO}\n\n` +
        `📸 Após pagar, *envie a foto do comprovante* aqui!`,
    );
  }

  // --- SUPORTE ---
  else if (["suporte", "atendente", "humano", "ajuda"].includes(texto)) {
    await msg.reply(
      "👤 *Transferindo para atendente...*\n\nAguarde um instante! 🙋‍♂️",
    );
    console.log(`🔔 SUPORTE SOLICITADO por ${msg.from}!`);
  }

  // --- RESPOSTA PADRÃO ---
  else {
    await msg.reply(
      "🤔 Não entendi sua mensagem.\n\nDigite *menu* para ver as opções.",
    );
  }
});

// ============================================================
// 🚀 FUNÇÃO DE DISPARO
// ============================================================
async function iniciarDisparo() {
  console.log("🚀 Iniciando disparo...");
  let contatos = [];
  try {
    contatos = JSON.parse(fs.readFileSync("./contatos.json", "utf8"));
    console.log(`📋 ${contatos.length} contatos carregados.`);
  } catch (e) {
    console.log("❌ Erro ao ler contatos.json:", e.message);
    return;
  }

  for (const numero of contatos) {
    try {
      const chatId = numero.includes("@c.us") ? numero : `${numero}@c.us`;
      await client.sendMessage(
        chatId,
        // ↓ EDITE A MENSAGEM DE DISPARO AQUI ↓
        "👋 Olá! Aqui é do *Marketing Americano*.\n\n" +
          "Temos uma oferta especial para você hoje! 🎯\n\n" +
          "Digite *menu* para ver nossas opções.",
      );
      console.log(`✅ Enviado para ${numero}`);

      const espera =
        Math.floor(
          Math.random() * (CONFIG.DELAY_DISPARO_MAX - CONFIG.DELAY_DISPARO_MIN),
        ) + CONFIG.DELAY_DISPARO_MIN;
      console.log(`⏳ Aguardando ${espera / 1000}s...`);
      await delay(espera);
    } catch (e) {
      console.log(`❌ Erro no número ${numero}: ${e.message}`);
    }
  }
  console.log("✅ Disparo finalizado!");
}

client.initialize();
