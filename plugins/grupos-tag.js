import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  try {
    // Lista de JIDs para menciones
    const users = participants.map(u => conn.decodeJid(u.id));

    // Construye el texto base
    const q = m.quoted ? m.quoted : m;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;

    const signature = '\n\n> _© 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 _';
    const baseText = (text && text.trim()) ? text : (q && q.text) ? q.text : '';
    const finalText = baseText + signature;

    // Genera el mensaje correctamente con menciones
    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: finalText } },
        { quoted: m, userJid: conn.user.id }
      ),
      finalText,
      conn.user.jid,
      { mentions: users }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch {
    // Fallback para medios
    const users = participants.map(u => conn.decodeJid(u.id));
    const quoted = m.quoted || m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);

    const signature = '\n\n> _© 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 _';
    const userText = (text && text.trim()) ? text : '*🌟 Debes enviar un texto para hacer un tag.*';
    const htextos = `${userText}${signature}`;

    let mediax;
    if ((isMedia && quoted.mtype === 'imageMessage')) {
      mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'videoMessage')) {
      mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'audioMessage')) {
      mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3` }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'stickerMessage')) {
      mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
    } else {
      await conn.relayMessage(
        m.chat,
        {
          extendedTextMessage: {
            text: `${masss}\n${htextos}\n`,
            contextInfo: { mentionedJid: users }
          }
        },
        {}
      );
    }
  }
};

handler.help = ['tag'];
handler.tags = ['grupo'];
handler.command = ['tag', 'n', 'notify'];
handler.group = true;
handler.admin = true;
export default handler;
