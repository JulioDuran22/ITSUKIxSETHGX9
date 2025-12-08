import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import * as fs from 'fs';
const handler = async (m, {conn, text, participants, isOwner, isAdmin}) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const q = m.quoted ? m.quoted : m || m.text || m.sender;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;

    // Construye el texto final con la firma
    const signature = '\n\n> _© 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 _';
    const baseText = (text && text.trim()) ? text : (q && q.text) ? q.text : '';
    const finalText = baseText + signature;

    // Genera el mensaje usando el texto con firma
    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c } },
        { quoted: m, userJid: conn.user.id }
      ),
      finalText,
      conn.user.jid,
      { mentions: users }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } catch {
    /**
    [ By @NeKosmic || https://github.com/NeKosmic/ ]
    **/

    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);

    // Aquí construimos el texto mostrado (htextos) con la firma
    const signature = '\n\n> 💓 𝑰𝑻𝑺𝑼𝑲𝑰𝒙𝑺𝑬𝑻𝑯𝑮𝑿9 💓';
    const userText = (text && text.trim()) ? text : '*🌟 Debes enviar un texto para hacer un tag.*';
    const htextos = `${userText}${signature}`;

    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3` }, { quoted: m });
    } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
    } else {
      await conn.relayMessage(
        m.chat,
        { extendedTextMessage: { text: `${masss}\n${htextos}\n`, ...{ contextInfo: { mentionedJid: users, externalAdReply: { thumbnail: imagen1, sourceUrl: md } } } } },
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
