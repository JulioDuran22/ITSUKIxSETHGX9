import moment from "moment-timezone"

let handler = async (m, { conn, args }) => {

  if (!args[0]) {
    return m.reply(`⚠️ *Debes ingresar una hora.*  
Ejemplo:  
\`.interna4 21:00 MX\``)
  }

  let horaInput = args[0]
  let pais = (args[1] || "MX").toUpperCase()

  const zonas = {
    "MX": "America/Mexico_City",
    "CO": "America/Bogota",
    "CL": "America/Santiago",
    "AR": "America/Argentina/Buenos_Aires"
  }

  if (!zonas[pais]) return m.reply("❌ País no válido. Usa: MX, CO, CL o AR")

  // Interpretar la hora según país de origen
  let baseTime = moment.tz(horaInput, "HH:mm", zonas[pais])
  if (!baseTime.isValid()) return m.reply("❌ Hora inválida. Usa formato HH:MM")

  // Convertir a cada país
  let horaMX = baseTime.clone().tz(zonas.MX).format("HH:mm")
  let horaCO = baseTime.clone().tz(zonas.CO).format("HH:mm")
  let horaCL = baseTime.clone().tz(zonas.CL).format("HH:mm")
  let horaAR = baseTime.clone().tz(zonas.AR).format("HH:mm")

  // Hora actual México
  let horaActualMX = moment().tz("America/Mexico_City").format("HH:mm")

  const texto = `
╭──────⚔──────╮
           4 𝐕𝐄𝐑𝐒𝐔𝐒 4 
              *INTERNA*
╰──────⚔──────╯

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${horaMX}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${horaCO}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${horaCL}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${horaAR}

𝐇𝐎𝐑𝐀 𝐀𝐂𝐓𝐔𝐀𝐋 𝐄𝐍 𝐌𝐄𝐗𝐈𝐂𝐎🇲🇽 : ${horaActualMX}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 

ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ 
🥷🏻 ┇ 
  `.trim()

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ["interna4 <hora> <MX/CO/CL/AR>"]
handler.tags = ["free"]
handler.command = ["interna4"]

export default handler
