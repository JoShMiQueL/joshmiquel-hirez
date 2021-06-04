import { Hirez } from './HirezAbstract'
import { Game } from './typings/game'
import { LanguageCode } from './typings/languageCode'

export class Paladins extends Hirez {
  protected game: Game = 'paladins'

  async getChampions(languageCode: LanguageCode = LanguageCode.English): Promise<any> {
    const method = 'getchampions'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      languageCode
    )
  }

  async getChampionCards(championId: number, languageCode: LanguageCode = LanguageCode.English): Promise<any> {
    const method = 'getchampioncards'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      championId,
      languageCode
    )
  }

  async getChampionLeaderboard(championId: number, queue: number = 428): Promise<any> {
    const method = 'getchampionleaderboard'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      championId,
      queue
    )
  }

  async getChampionSkins(championId: number, languageCode: LanguageCode = LanguageCode.English): Promise<any> {
    const method = 'getchampionskins'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      championId,
      languageCode
    )
  }

  // Obsolete - no data returned
  async getChampionRecommendedItems(
    championId: number,
    languageCode: LanguageCode = LanguageCode.English
  ): Promise<any> {
    const method = 'getchampionrecommendeditems'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      championId,
      languageCode
    )
  }

  async getBountyItems(): Promise<any> {
    const method = 'getbountyitems'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp()
    )
  }

  async getPlayerBatch(...playerId: string[] | number[]): Promise<any> {
    const playerIdFormatted: string[] = playerId.map((player: string | number) => String(player))
    const method = 'getplayerbatch'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      playerIdFormatted.reduce((prev: string, current: string) => `${prev},${current}`)
    )
  }

  async getPlayerIdInfoForXboxAndSwitch(playerName: string): Promise<any> {
    const method = 'getplayeridinfoforxboxandswitch'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      playerName
    )
  }

  async getChampionRanks(playerId: number): Promise<any> {
    const method = 'getchampionranks'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      playerId
    )
  }

  async getPlayerLoadouts(playerId: number, languageCode: LanguageCode = LanguageCode.English): Promise<any> {
    const method = 'getplayerloadouts'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      playerId,
      languageCode
    )
  }
}
