import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
  try {
    // Construir lista de usuarios con sus nombres visibles
    const users = participants.map(u => {
      const jid = conn.decodeJid(u.id);
      const pushName = u.name || m.pushName || jid.split('@')[0];
      return { jid, name: pushName };
    });

    // Texto base y firma
    const userMentionsText = users.map(u => `@${u.name}`).join(' ');
    const baseText = text && text.trim() ? text : (m.quoted?.text || '');
    const signature = '\n\n> _© 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 _';
    const finalText = `${userMentionsText}\n${baseText}${signature}`;

    const quotedObj = m.quoted ? await m.getQuotedObj() : null;
    const msgType = m.quoted ? quotedObj.mtype : 'extendedTextMessage';
    const msgContent = m.quoted ? quotedObj.message[msgType] : { text: '' };

    // Generar mensaje con menciones
    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        { [msgType]: msgContent },
        { quoted: m, userJid: conn.user.id }
      ),
      finalText,
      conn.user.jid,
      { mentions: users.map(u => u.jid) }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch (e) {
    // Fallback para medios y stickers
    const users = participants.map(u => conn.decodeJid(u.id));
    const quoted = m.quoted || m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);

    const userMentionsText = participants.map(u => `@${u.name || u.id.split('@')[0]}`).join(' ');
    const userText = text && text.trim() ? text : '*🌟 Debes enviar un texto para hacer un tag.*';
    const htextos = `${userMentionsText}\n${userText}\n\n> _© 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 _`;

    let mediax;
    if ((isMedia && quoted.mtype === 'imageMessage')) {
      mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'videoMessage')) {
      mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'audioMessage')) {
      mediax = await quoted.download?.();
      await conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: 'Hidetag.mp3' }, { quoted: m });
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
