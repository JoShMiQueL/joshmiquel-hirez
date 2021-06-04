const { Smite, Paladins } = require('./index')
const { Queue } = require('./src/typings/queue')
;(async () => {
  const credentials = {
    devId: process.env.DEVID,
    authKey: process.env.AUTHKEY
  }
  const apis = [new Smite(credentials), new Paladins(credentials)]
  // const gods = (await apis[0].getGods()).data
  // const player = (await apis[0].getGodLeaderboard(gods[0].id, 440)).data
  // await apis[0].getPlayerAchievements(player[0].player_id)
  await apis[1].getMotd()
})()

// const updatedAt = 1620447642094
// const now = Date.now()
// const millisTranscurred = Math.abs(updatedAt - now)
// const secondsTranscurred = (millisTranscurred / 1000).toFixed()
// const minutesTranscurred =
//   secondsTranscurred % 60 === 0 ? Math.ceil(secondsTranscurred / 60 + 1) : Math.ceil(secondsTranscurred / 60)
// const minutesAndSecondsTranscurred = `${minutesTranscurred}m ${secondsTranscurred % 60}s`
// console.log(minutesAndSecondsTranscurred)
