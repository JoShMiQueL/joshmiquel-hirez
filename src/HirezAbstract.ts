import axios from 'axios'
import 'dotenv/config'
import fs from 'fs'
import https from 'https'
import _ from 'lodash'
import md5 from 'md5'
import moment from 'moment'
import path from 'path'
import { endpoints } from './constants'
import { CacheFile } from './typings/cacheFile'
import { Credentials } from './typings/credentials'
import { Game } from './typings/game'
import { LanguageCode } from './typings/languageCode'
import { Queue } from './typings/queue'
import { ResponseFormat } from './typings/responseFormat'
import {
  GetDataUsedResponse,
  GetDemoDetails,
  GetFriends,
  GetGodRanks,
  GetGodSkinsResponse,
  GetGodsResponse,
  GetHiRezServerStatusResponse,
  GetItems,
  GetMatchDetails,
  GetMatchHistory,
  GetMatchIdsByQueue,
  GetPatchInfoResponse,
  GetPlayer,
  GetPlayerIdByName,
  GetPlayerIdByPortalUserId,
  GetPlayerIdsByGamerTag,
  GetPlayerStatus,
  GetQueueStats,
  GetTopMatches,
  PingResponse,
  SearchPlayers,
  TestSessionResponse
} from './typings/responses'

export abstract class Hirez {
  // #region Variables and Constructor
  protected game: Game
  protected devId: number | string
  protected authKey: string
  protected responseFormat: ResponseFormat
  protected cache: CacheFile = { path: path.resolve(__dirname, '..', 'cache.json') }

  constructor(credentials: Credentials, responseFormat: ResponseFormat = 'json') {
    this.devId = credentials.devId
    this.authKey = credentials.authKey
    this.responseFormat = responseFormat
    try {
      this.cache.data = require(this.cache.path)
    } catch (error) {
      this.cache.data = {}
    }
  }
  // #endregion

  // #region Utility Methods
  protected timeTranscurred(time1InMillis: number, time2InMillis: number) {
    const millisTranscurred: number = Math.abs(time1InMillis - time2InMillis)
    const secondsTranscurred: number = Number((millisTranscurred / 1000).toFixed())
    const minutesTranscurred: number =
      secondsTranscurred % 60 === 0 ? Math.ceil(secondsTranscurred / 60 + 1) : Math.ceil(secondsTranscurred / 60)
    const minutesAndSecondsTranscurred: string = `${minutesTranscurred}m ${secondsTranscurred % 60}s`
    return minutesTranscurred
  }

  protected async requestData(method: string, ...params: any[]) {
    let url = `${endpoints[this.game]}/${method}${this.responseFormat}`
    try {
      params && params.forEach((param) => (url += `/${param}`))
      const response = await axios.get(url, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) })
      return { status: response.status, data: response.data }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { status: error.response.status }
      }
    } finally {
      // console.log(chalk`{red Requested url: ${url}}`) // DEBUG
    }
  }

  protected getTimestamp() {
    return moment.utc().format('YYYYMMDDHHmmss')
  }

  protected generateSignature(method: string) {
    return md5(`${this.devId}${method}${this.authKey}${this.getTimestamp()}`)
  }

  protected async createSession(): Promise<any> {
    const method = 'createsession'
    if (_.isEmpty(this.cache.data) || this.timeTranscurred(this.cache.data.updatedAt, Date.now()) >= 15) {
      this.cache.data.session = await (
        await this.requestData(method, this.devId, this.generateSignature(method), this.getTimestamp())
      ).data.session_id
      this.cache.data.updatedAt = Date.now()
      console.log('New session_id generated: ' + this.cache.data.session) // DEBUG
      return fs.writeFile(this.cache.path, JSON.stringify(this.cache.data, undefined, 2), (err) => {
        if (err) throw err
        // console.log('Cache file updated') // DEBUG
      })
    }
    // console.log('session_id getted from cache') // DEBUG
    return this.cache.data
  }
  // #endregion

  // #region API Methods
  async ping(): Promise<PingResponse> {
    return await this.requestData('ping')
  }

  async testSession(): Promise<TestSessionResponse> {
    const method = 'testsession'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp()
    )
  }

  async getDataUsed(): Promise<GetDataUsedResponse> {
    const method = 'getdataused'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp()
    )
  }

  async getHiRezServerStatus(): Promise<GetHiRezServerStatusResponse> {
    const method = 'gethirezserverstatus'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp()
    )
  }

  async getPatchInfo(): Promise<GetPatchInfoResponse> {
    const method = 'getpatchinfo'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp()
    )
  }
  // #endregion

  // #region Game Methods
  async getGods(languageCode: LanguageCode = LanguageCode.English): Promise<GetGodsResponse> {
    const method = 'getgods'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      languageCode
    )
  }

  async getGodSkins(godId: number, languageCode: LanguageCode = LanguageCode.English): Promise<GetGodSkinsResponse> {
    const method = 'getgodskins'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      godId,
      languageCode
    )
  }

  async getItems(languageCode: LanguageCode = LanguageCode.English): Promise<GetItems> {
    const method = 'getitems'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      languageCode
    )
  }

  async getPlayer(player: string, portalId: number = 1): Promise<GetPlayer> {
    const method = 'getplayer'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      player,
      portalId
    )
  }

  async getPlayerIdByName(playerName: string): Promise<GetPlayerIdByName> {
    const method = 'getplayeridbyname'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      playerName
    )
  }

  async getPlayerIdByPortalUserId(portalId: number, portalUserId: number | string): Promise<GetPlayerIdByPortalUserId> {
    const method = 'getplayeridbyportaluserid'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      portalId,
      portalUserId
    )
  }

  async getPlayerIdsByGamerTag(portalId: number, playerTag: string): Promise<GetPlayerIdsByGamerTag> {
    const method = 'getplayeridsbygamertag'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      portalId,
      playerTag
    )
  }

  async getFriends(playerId: string): Promise<GetFriends> {
    const method = 'getfriends'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      playerId
    )
  }

  async getGodRanks(playerId: string): Promise<GetGodRanks> {
    const method = 'getgodranks'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      playerId
    )
  }

  async getPlayerStatus(playerId: number): Promise<GetPlayerStatus> {
    const method = 'getplayerstatus'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      playerId
    )
  }

  async getMatchHistory(playerId: number): Promise<GetMatchHistory> {
    const method = 'getmatchhistory'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      playerId
    )
  }

  async getQueueStats(portalId: number, queue: number): Promise<GetQueueStats> {
    const method = 'getqueuestats'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      portalId,
      queue
    )
  }

  async searchPlayers(searchPlayer: string): Promise<SearchPlayers> {
    const method = 'searchplayers'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      searchPlayer
    )
  }

  async getDemoDetails(matchId: string): Promise<GetDemoDetails> {
    const method = 'getdemodetails'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      matchId
    )
  }

  async getMatchDetails(matchId: string): Promise<GetMatchDetails> {
    const method = 'getmatchdetails'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      matchId
    )
  }

  async getMatchDetailsBatch(...matchId: string[] | number[]): Promise<GetMatchDetails> {
    const matchIdFormatted: string[] = matchId.map((match: string | number) => String(match))
    const method = 'getmatchdetails'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      matchIdFormatted.reduce((prev: string, current: string) => `${prev},${current}`)
    )
  }

  async getMatchIdsByQueue(queue: Queue, date: number, hour: number | string): Promise<GetMatchIdsByQueue> {
    const method = 'getmatchidsbyqueue'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      queue,
      date,
      hour
    )
  }

  async getMatchPlayerDetails(matchId: number): Promise<any> {
    const method = 'getmatchplayerdetails'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      matchId
    )
  }

  async getTopMatches(): Promise<GetTopMatches> {
    const method = 'gettopmatches'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp()
    )
  }

  async getLeagueLeaderboard(queue: number, tier: any, round: any): Promise<any> {
    const method = 'getleagueleaderboard'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      queue,
      tier,
      round
    )
  }

  async getLeagueSeasons(queue: number): Promise<any> {
    const method = 'getleagueseasons'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      queue
    )
  }

  async getTeamDetails(clanid: number): Promise<any> {
    const method = 'getteamdetails'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      clanid
    )
  }

  // Deprecated
  async getTeamMatchHistory(clanid: number): Promise<any> {
    const method = 'getteammatchhistory'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      clanid
    )
  }

  async getTeamPlayers(clanid: number): Promise<any> {
    const method = 'getteamplayers'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      clanid
    )
  }

  async searchTeams(searchTeam: string): Promise<any> {
    const method = 'searchteams'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp(),
      searchTeam
    )
  }

  async getEsportsProLeagueDetails(): Promise<any> {
    const method = 'getesportsproleaguedetails'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data.session,
      this.getTimestamp()
    )
  }
  // #endregion
}
