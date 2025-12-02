/* 
- tagall versión Itsuki Nakano IA  
- Etiqueta a todos con estilo tsundere vibes 🌸  
- Con frases aleatorias decoradas ✨
*/

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍓';
  m.react(customEmoji);

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

  // Construir texto con menciones reales
  let teks = `
╭━━━〔 🌸 *INVOCACIÓN GENERAL* 🌸 〕━━━⬣
┃ 🌟 *Miembros totales:* ${participants.length} 🗣️
┃ 💌 ${oi}
╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 📌 *ETIQUETADOS* 📌 〕━━━⬣
`;

  const mentions = [];
  for (const mem of participants) {
    const alias = global.db.data.users[mem.id]?.name || mem.name || mem.id.split('@')[0];
    teks += `┃ ${customEmoji} @${alias}\n`;
    mentions.push(mem.id); // Agregar JID real para la mención
  }

  teks += `╰━━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 🪷 *𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 - AI* 🪷 〕━━━⬣
┃ "${fraseFinal}"
╰━━━━━━━━━━━━━━━━━━━━⬣
`;

  const imgUrl = 'https://files.catbox.moe/fqflxj.jpg';

  await conn.sendMessage(m.chat, { 
    image: { url: imgUrl }, 
    caption: teks, 
    mentions // WhatsApp resaltará estos nombres en azul
  });
};


handler.help = ['invocar'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;