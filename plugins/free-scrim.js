import moment from "moment-timezone"

let handler = async (m, { conn, args }) => {

  if (!args[0]) {
    return m.reply(`⚠️ *Debes ingresar una hora.*  
Ejemplo:  
\`.scrim 21:00 MX\``)
  }

  let horaInput = args[0]
  let pais = (args[1] || "MX").toUpperCase()

  const zonas = {
    MX: "America/Mexico_City",
    CO: "America/Bogota",
    CL: "America/Santiago",
    AR: "America/Argentina/Buenos_Aires"
  }

  if (!zonas[pais]) return m.reply("❌ País no válido. Usa: MX, CO, CL o AR")

  let baseTime = moment.tz(horaInput, "HH:mm", zonas[pais])
  if (!baseTime.isValid()) return m.reply("❌ Hora inválida. Usa HH:MM")

  let horaMX = baseTime.clone().tz(zonas.MX).format("HH:mm")
  let horaCO = baseTime.clone().tz(zonas.CO).format("HH:mm")
  let horaCL = baseTime.clone().tz(zonas.CL).format("HH:mm")
  let horaAR = baseTime.clone().tz(zonas.AR).format("HH:mm")

  let horaActualMX = moment().tz("America/Mexico_City").format("HH:mm")

  const texto = `
╭──────⚔──────╮
          4 𝐕𝐒 4 
        *𝐒𝐂𝐑𝐈𝐌*
╰──────⚔──────╯

🇲🇽 𝐌𝐞𝐱𝐢𝐜𝐨: ${horaMX}
🇨🇴 𝐂𝐨𝐥𝐨𝐦𝐛𝐢𝐚: ${horaCO}
🇨🇱 𝐂𝐡𝐢𝐥𝐞: ${horaCL}
🇦🇷 𝐀𝐫𝐠𝐞𝐧𝐭𝐢𝐧𝐚: ${horaAR}

🕒 𝐇𝐨𝐫𝐚 𝐚𝐜𝐭𝐮𝐚𝐥 🇲🇽 : ${horaActualMX}

⚔️ *𝐄𝐒𝐂𝐔𝐀𝐃𝐑𝐀 𝐔́𝐍𝐈𝐂𝐀 (4 roles)*

👑 ┇ 𝐈𝐆𝐋 : 
🛡 ┇ 𝐒p : 
🌀 ┇ 𝐅𝐥𝐞𝐱 : 
🌀 ┇ 𝐅𝐥𝐞𝐱 : 

✨ *𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒 (2 cupos)*  
🥷🏻 ┇  
🥷🏻 ┇  
`.trim()

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ["scrim <hora> <MX/CO/CL/AR>"]
handler.tags = ["free"]
handler.command = ["scrim"]

export default handler
