import { existsSync } from 'fs'
import { join } from 'path'
import { prepareWAMessageMedia, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  try {
    await conn.sendMessage(m.chat, { react: { text: '👑', key: m.key } })

    const menuText = `👑 *CREADOR - Julio - Sethgx9 ⚡*\n\n𝗦𝗲𝗹𝗲𝗰𝗶𝗼𝗻𝗮 𝗨𝗻 𝗠𝗲𝘁𝗼𝗱𝗼:`

    const localImagePath = join(process.cwd(), 'src', 'image-owner.jpg')

    const nativeButtons = [
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({ 
          display_text: '📸 ɪɴsᴛᴀɢʀᴀᴍ', 
          url: 'https://www.instagram.com/julio_duran_22' 
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({ 
          display_text: '👑 ᴄʀᴇᴀᴅᴏʀ', 
          url: 'https://wa.me/qr/YCBF2PIXWWN2F1' 
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({ 
          display_text: '🌸 ᴅᴏɴᴀᴄɪᴏɴᴄɪᴛᴀ', 
          url: 'https://paypal.me/sethgx' 
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({ 
          display_text: '💎 ᴏʙᴛᴇɴ AGG-ᴘʀᴇᴍ', 
          url: 'https://chat.whatsapp.com/CT8JP1E0JshDtdVz2yaEKy?mode=hqrt2' 
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({ 
          display_text: '🍉 ᴄᴀɴᴀʟ ᴏғɪᴄɪᴀʟ', 
          url: 'https://whatsapp.com/channel/0029VbBc97b2ZjCtQ6FSCe1h' 
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({ 
          display_text: '💎 ᴛɪᴋᴛᴏᴋ', 
          url: 'https://www.tiktok.com/@sethgx9' 
        })
      }
    ]

    // === Imagen opcional ===
    let header
    if (existsSync(localImagePath)) {
      const media = await prepareWAMessageMedia({ image: { url: localImagePath } }, { upload: conn.waUploadToServer })
      header = proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      })
    } else {
      header = proto.Message.InteractiveMessage.Header.fromObject({ hasMediaAttachment: false })
    }

    // === Crear mensaje interactivo ===
    const interactiveMessage = proto.Message.InteractiveMessage.fromObject({
      body: proto.Message.InteractiveMessage.Body.fromObject({ text: menuText }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '> AGG x ꜱᴇᴛʜɢx9 𝐯2 🌸' }),
      header,
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: nativeButtons
      })
    })

    const msg = generateWAMessageFromContent(m.chat, { interactiveMessage }, { userJid: conn.user.jid, quoted: m })
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    console.error('❌ Error en el comando owner:', e)
    await conn.sendMessage(m.chat, {
      text: `❌ *Error al cargar la información del creador*\n\n🔗 Contacta directamente: https://wa.me/qr/YCBF2PIXWWN2F1\n\n⚠️ *Error:* ${e.message}`
    }, { quoted: m })
  }
}

handler.help = ['owner', 'creador']
handler.tags = ['info']
handler.command = ['owner', 'creador', 'contacto']

export default handler