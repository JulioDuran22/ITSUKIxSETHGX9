/* 
- tagall versión Itsuki Nakano IA  
- Etiqueta a todos con estilo tsundere vibes 🌸  
- Usa metadata canonical para que las menciones sean las mismas que el selector @
- Envía vCards previas (opcional) para mejorar la visualización de nombres
*/

const handler = async (m, { isOwner, isAdmin, conn, participants: participantsParam, args, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍓';
  try { await m.react(customEmoji); } catch {}

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // Frases tsundere aleatorias de Itsuki 🌸
  const frases = [
    '¡Ya están todos etiquetados, más les vale leerlo o me enfado! 😡',
    '¡No ignoren esto, tontos! Lo digo en serio~ 💢',
    '¡Hmph! Espero que por lo menos pongan atención esta vez. 🙄',
    '¡Ya está! Si no lo leen, no es mi problema. 💖',
    '¿De verdad tengo que repetirlo? ¡Qué fastidio! 😤',
    'Lean bien, ¿ok? No pienso volver a hacer esto por gusto. 😒'
  ];
  const fraseFinal = frases[Math.floor(Math.random() * frases.length)];

  const pesan = (args || []).join` `;
  const oi = pesan
    ? `「 🌸 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 dice 🌸 」\n✦ *${pesan}*`
    : `😡 ¡Baka! Presten atención todos de una vez, no me hagan repetirlo. 💢`;

  // ---------- obtener participantes desde groupMetadata (preferible) ----------
  let groupMetadata = {};
  try {
    if (this._groupCache && this._groupCache[m.chat] && this._groupCache[m.chat].data) {
      groupMetadata = this._groupCache[m.chat].data;
    } else if (conn.groupMetadata) {
      groupMetadata = await conn.groupMetadata(m.chat).catch(() => ({})) || {};
    }
  } catch (e) {
    groupMetadata = {};
  }

  const metaParticipants = (m.isGroup ? (groupMetadata.participants || []) : []) || [];
  const participantsFromMeta = metaParticipants.length > 0
    ? metaParticipants.map(p => ({ id: p.id || p.jid || '' }))
    : (participantsParam || []).map(p => ({ id: p.id ? p.id : (p.jid || p) }));

  // jids oficiales (para mentions)
  let jids = participantsFromMeta.map(p => (p.id || p.jid || p).toString()).filter(Boolean);

  // Filtrar: quitar al bot y al que invoca (opcional) — si quieres incluirlos comenta esta línea
  jids = jids.filter(j => j !== conn.user?.jid && j !== m.sender);

  // -------------------------
  // Enviar vCards para mapear nombres (actívalo si quieres)
  // -------------------------
  // Ajusta MAX_VCARDS a 0 para desactivar, o a N para enviar N vCards antes de mencionar.
  const MAX_VCARDS = 8; // <=0 desactiva
  if (MAX_VCARDS > 0) {
    try {
      // intentamos obtener pushname/notify desde metadata para displayName preferido
      const metaParts = (metaParticipants || []).reduce((acc, p) => { const id = p.id || p.jid; if (id) acc[id] = p; return acc }, {});
      const jidsToMap = jids.slice(0, MAX_VCARDS);
      for (const jid of jidsToMap) {
        try {
          // no enviar vCard para bot/issuer por seguridad (ya filtrado arriba)
          const number = jid.split('@')[0];
          // display preferido: metadata pushname/notify, fallback a conn.getName, fallback a número
          let display = (metaParts[jid] && (metaParts[jid].pushname || metaParts[jid].notify || metaParts[jid].name)) || null;
          if (!display && conn.getName) {
            try { display = await conn.getName(jid) } catch { display = null }
          }
          if (!display) display = number;

          const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${display}
TEL;type=CELL;waid=${number}:${number}
END:VCARD`;

          // enviar la vCard (quoted para mantener referencia)
          await conn.sendMessage(m.chat, { contacts: { displayName: display, contacts: [{ vcard }] } }, { quoted: m }).catch(() => null);
          // pequeña espera para evitar rate limits / spam
          await new Promise((r) => setTimeout(r, 220));
        } catch (err) {
          // si falla una vCard, seguimos con las demás
          continue;
        }
      }
      // espera extra breve para que los clientes procesen las vCards
      await new Promise((r) => setTimeout(r, 300));
    } catch (e) {
      console.error('Error al enviar vCards previas:', e);
    }
  }

  // Construimos el caption con TU DISEÑO y sólo las menciones en cada línea (@short)
  let teks = `
╭━━━〔 🌸 *INVOCACIÓN GENERAL* 🌸 〕━━━⬣
┃ 🌟 *Miembros totales:* ${jids.length} 🗣️
┃ 💌 ${oi}
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 📌 *ETIQUETADOS* 📌 〕━━━⬣
`;

  for (const jid of jids) {
    teks += `┃ ${customEmoji} @${jid.split('@')[0]}\n`;
  }

  teks += `╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 🪷 *𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 - AI* 🪷 〕━━━⬣
┃ "${fraseFinal}"
╰━━━━━━━━━━━━━━━━━━━━⬣
`;

  // Imagen de Itsuki 🌸 (mantengo la tuya)
  const imgUrl = 'https://files.catbox.moe/fqflxj.jpg';

  // Enviar: caption con mentions (esto crea las menciones reales)
  try {
    await conn.sendMessage(m.chat, {
      image: { url: imgUrl },
      caption: teks.trim(),
      mentions: jids
    });
  } catch (e) {
    // Fallback: usar extendedTextMessage con contextInfo.mentionedJid
    try {
      const ext = {
        extendedTextMessage: {
          text: teks.trim(),
          contextInfo: { mentionedJid: jids }
        }
      };
      if (conn.cMod) {
        const msg = conn.cMod(m.chat, ext, teks.trim(), conn.user.jid, { mentions: jids });
        if (msg && conn.relayMessage) await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
      } else {
        await conn.relayMessage(m.chat, { extendedTextMessage: ext.extendedTextMessage }, {});
      }
    } catch (err) {
      // último recurso: enviar sólo texto con mentions
      await conn.sendMessage(m.chat, { text: teks.trim(), mentions: jids });
    }
  }
};

handler.help = ['invocar'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
