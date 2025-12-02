import moment from "moment-timezone"

let handler = async (m, { conn, args, command }) => {

  if (!args[0]) {
    return m.reply(
      `❗ *Faltan parámetros*\n\n` +
      `Usa el comando así:\n` +
      `➤ .${command} <hora> <país>\n\n` +
      `Ejemplos:\n` +
      `• .${command} 21:00 MX\n` +
      `• .${command} 22:00 CO\n` +
      `• .${command} 23:00 CL\n` +
      `• .${command} 00:00 AR`
    )
  }

  // -------- PROCESAR HORA ---------
  let horaInput = args[0]
  let pais = (args[1] || "MX").toUpperCase()

  const zonas = {
    "MX": "America/Mexico_City",
    "CO": "America/Bogota",
    "CL": "America/Santiago",
    "AR": "America/Argentina/Buenos_Aires"
  }

  if (!zonas[pais]) return m.reply("❌ País no válido. Usa MX, CO, CL o AR")

  let baseTime = moment.tz(horaInput, "HH:mm", zonas[pais])
  if (!baseTime.isValid()) return m.reply("❌ Hora inválida. Usa HH:MM")

  let horaMX = baseTime.clone().tz(zonas.MX).format("HH:mm")
  let horaCO = baseTime.clone().tz(zonas.CO).format("HH:mm")
  let horaCL = baseTime.clone().tz(zonas.CL).format("HH:mm")
  let horaAR = baseTime.clone().tz(zonas.AR).format("HH:mm")

  let horaActualMX = moment().tz("America/Mexico_City").format("HH:mm")

  // ------ TIPO SEGÚN COMANDO ------
  let tipo =
    command.toLowerCase() === "vsqueen"
      ? "FEM 👑💖"
      : "MASC ⚔️🔥"

  // ------ EMOJIS SEGÚN GENERO ------
  let femenino = tipo.includes("FEM")

  let lider = femenino ? "👑💖" : "👑"
  let miembro = femenino ? "🧚🏻‍♀️" : "🥷🏻"
  let suplente = femenino ? "🧚🏻‍♀️" : "🥷🏻"

  const texto = `
╭──────⚔──────╮
            4 𝐕𝐄𝐑𝐒𝐔𝐒 4
            *${tipo}*
╰──────⚔──────╯

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${horaMX}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${horaCO}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${horaCL}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${horaAR}

🕒 𝐇𝐎𝐑𝐀 𝐀𝐂𝐓𝐔𝐀𝐋 🇲🇽 : ${horaActualMX}

𝗘𝗦𝗖𝗨𝗔𝗗𝗔  

${lider} ┇
${miembro} ┇
${miembro} ┇
${miembro} ┇

𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
${suplente} ┇
${suplente} ┇
`.trim()

  await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
}

handler.help = ["vsQueen <hora> <MX/CO/CL/AR>", "vsKing <hora> <MX/CO/CL/AR>"]
handler.tags = ["free"]
handler.command = ["vsqueen", "vsKing", "vsQueen", "vsking"]

export default handler
