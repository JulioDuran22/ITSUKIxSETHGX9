/* 
- tagall versión Itsuki Nakano IA  
- Etiqueta a todos con estilo tsundere vibes 🌸  
*/

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍓';
  // reaccionar al comando
  try { await conn.sendPresenceUpdate('composing', m.chat); } catch {}
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

  const pesan = args.join` `;
  const oi = pesan 
    ? `「 🌸 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 dice 🌸 」\n✦ *${pesan}*`
    : `😡 ¡Baka! Presten atención todos de una vez, no me hagan repetirlo. 💢`;

  // Preparamos lista de jids
  const jids = (participants || []).map(p => p.id ? p.id : (p.jid || p));
  // Resolvemos nombres en paralelo (conn.getName)
  const names = await Promise.all(jids.map(async jid => {
    try {
      const n = await (conn.getName ? conn.getName(jid) : Promise.resolve(null));
      return (n || jid.split('@')[0]).toString();
    } catch {
      return jid.split('@')[0];
    }
  }));

  // Texto decorado con marco kawaii 🌸
  let teks = `
╭━━━〔 🌸 *INVOCACIÓN GENERAL* 🌸 〕━━━⬣
┃ 🌟 *Miembros totales:* ${jids.length} 🗣️
┃ 💌 ${oi}
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 📌 *ETIQUETADOS* 📌 〕━━━⬣
`;

  for (let i = 0; i < jids.length; i++) {
    const jid = jids[i];
    const short = jid.split('@')[0];
    const nice = names[i] || short;
    teks += `┃ ${customEmoji} ${nice} (@${short})\n`;
  }

  teks += `╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 🪷 *𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 - AI* 🪷 〕━━━⬣
┃ "${fraseFinal}"
╰━━━━━━━━━━━━━━━━━━━━⬣
`;

  // Imagen de Itsuki 🌸
  const imgUrl = 'https://files.catbox.moe/fqflxj.jpg';

  await conn.sendMessage(m.chat, { 
    image: { url: imgUrl }, 
    caption: teks.trim(), 
    mentions: jids
  });
};

handler.help = ['invocar'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
