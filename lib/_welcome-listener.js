import { sendWelcomeOrBye } from '../lib/welcome.js'

export async function before(update, { conn }) {
  if (!update || !update.id) return

  const jid = update.id
  const participants = update.participants || []

  for (const user of participants) {
    if (update.action === 'add') {
      await sendWelcomeOrBye(conn, {
        jid,
        participant: user,
        type: 'welcome'
      })
    }

    if (update.action === 'remove') {
      await sendWelcomeOrBye(conn, {
        jid,
        participant: user,
        type: 'bye'
      })
    }
  }
}
