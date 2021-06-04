const { Smite, Paladins } = require('./lib')
const axios = require('axios').default
const fs = require('fs')
;(async () => {
  const credentials = {
    devId: process.env.DEVID,
    authKey: process.env.AUTHKEY
  }
  const apis = new Smite(credentials)
  // console.log((await apis.getGods()).data[113].Name)
  // console.log((await apis.getGods()).data[113].Name)
  const request = await apis.getPlayer('TheDavidm12')
  const id = request.data[0].Id
  // const matchId = (await apis.getMatchIdsByQueue(474, 20210514, '15,50')).data[0].Match
  // const data = await apis.getTopMatches()
  const data = await apis.getItems()
  fs.writeFile('request.json', JSON.stringify(data, undefined, 2), (err) => {
    if (err) throw err
  })
})()

// const updatedAt = 1620447642094
// const now = Date.now()
// const millisTranscurred = Math.abs(updatedAt - now)
// const secondsTranscurred = (millisTranscurred / 1000).toFixed()
// const minutesTranscurred =
//   secondsTranscurred % 60 === 0 ? Math.ceil(secondsTranscurred / 60 + 1) : Math.ceil(secondsTranscurred / 60)
// const minutesAndSecondsTranscurred = `${minutesTranscurred}m ${secondsTranscurred % 60}s`
// console.log(minutesAndSecondsTranscurred)
