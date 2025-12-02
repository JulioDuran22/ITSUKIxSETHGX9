import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath, pathToFileURL } from 'url'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import { dirname } from 'path' 

global.__dirname = (url) => dirname(fileURLToPath(url));

// Configuraciones principales
global.roowner = ['573212042172', true]
global.julioDev = ['573212042172']
global.rowner = ['573212042172']
global.owner = [
   ['573212042172', ' 𝙎𝙚𝙩𝙝𝙜𝙭9  🦇🩸', true],
   ['573224770981', '𝙅𝙪𝙡𝙞𝙤 - 𝙎𝙚𝙩𝙝𝙜𝙭9  🦇🩸', true],
  
];

global.mods = ['573212042172', '573224770981']
global.suittag = ['573212042172', '573224770981']
global.prems = ['573212042172', '573224770981']

// Información del bot 
global.libreria = 'Baileys'
global.baileys = 'V 6.7.9'
global.languaje = 'Español'
global.vs = '4.3.1'
global.vsJB = '5.0'
global.nameqr = 'Itsukiqr'
global.namebot = 'Itsuki-IA'
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.ItsukiJadibts = true
global.Choso = true
global.prefix = ['.', '!', '/' , '#', '%']
global.apikey = 'ItsukiNakanoIA'
global.botNumber = '18482389332'
// Números y settings globales para varios códigos
global.packname = '𝗟𝗮 𝗠𝗲𝗷𝗼𝗿 𝗕𝗼𝘁 𝗗𝗲 𝗪𝗵𝗮𝘁𝘀𝗮𝗽𝗽 🫰🏻🤖'
global.botname = '🧋 ItsukixSETHGX9 🧋'
global.wm = '© ItsukixSETHGX9 '
global.wm3 = '⫹⫺ 𝙈𝙪𝙡𝙩𝙞-𝘿𝙚𝙫𝙞𝙘𝙚 💻'
global.author = '👑 ᗰᗩᗪᗴ ᗷY SETHGX0 🧃'
global.dev = '© 𝙾𝚆𝙽𝙴𝚁-JULIO 𝙳𝙴𝚅 👑'
global.textbot = 'ItsukixSETHGX9|IAV3 JulioDev'
global.etiqueta = '@julio/sethgx9'
global.gt = '© 𝐂𝐫𝐞𝐚𝐝𝐨 𝐏𝐨𝐫 JulioDev AGG-𝐂𝐡𝐚𝐧 𝐓𝐡𝐞 𝐁𝐞𝐬𝐭 𝐁𝐨𝐭𝐬 𝐎𝐟 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🤖👑'
global.me = '🌨️ ITSUKI 𝙼𝙴𝚆 𝚄𝙿𝙳𝙰𝚃𝙴 ☃️'
global.listo = '*Aqui tiene*'
global.moneda = 'Yenes'
global.multiplier = 69
global.maxwarn = 3
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

// Enlaces oficiales del bot
global.gp1 = 'https://chat.whatsapp.com/CT8JP1E0JshDtdVz2yaEKy?mode=hqrt2'
global.comunidad1 = 'https://chat.whatsapp.com/CT8JP1E0JshDtdVz2yaEKy?mode=hqrt2'
global.channel = 'https://whatsapp.com/channel/0029VbBc97b2ZjCtQ6FSCe1h'
global.channel2 = 'https://whatsapp.com/channel/0029VbBc97b2ZjCtQ6FSCe1h'
global.md = 'https://github.com/xzzys26/Itsuki-Nakano'
global.correo = 'amjulio496@gmail.com'

// Apis para las descargas y más
global.APIs = {
  ryzen: 'https://api.ryzendesu.vip',
  xteam: 'https://api.xteam.xyz',
  lol: 'https://api.lolhuman.xyz',
  delirius: 'https://delirius-apiofc.vercel.app',
  siputzx: 'https://api.siputzx.my.id', // usado como fallback para sugerencias IA
  mayapi: 'https://mayapi.ooguy.com'
}

global.APIKeys = {
  'https://api.xteam.xyz': 'YOUR_XTEAM_KEY',
  'https://api.lolhuman.xyz': 'API_KEY',
  'https://api.betabotz.eu.org': 'API_KEY',
  'https://mayapi.ooguy.com': 'may-f53d1d49'
}

// Endpoints de IA
global.SIPUTZX_AI = {
  base: global.APIs?.siputzx || 'https://api.siputzx.my.id',
  bardPath: '/api/ai/bard',
  queryParam: 'query',
  headers: { accept: '*/*' }
}


global.chatDefaults = {
  isBanned: false,
  sAutoresponder: '',
  welcome: true,
  autolevelup: false,
  autoAceptar: false,
  autosticker: false,
  autoRechazar: false,
  autoresponder: false,
  detect: true,
  antiBot: false,
  antiBot2: false,
  modoadmin: false,
  antiLink: true,
  antiImg: false,
  reaction: false,
  nsfw: false,
  antifake: false,
  delete: false,
  expired: 0,
  antiLag: false,
  per: [],
  antitoxic: false
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  try { import(pathToFileURL(file).href + `?update=${Date.now()}`) } catch {}
})

// Configuraciones finales
export default {
  prefix: global.prefix,
  owner: global.owner,
  sessionDirName: global.sessions,
  sessionName: global.sessions,
  botNumber: global.botNumber,
  chatDefaults: global.chatDefaults
}