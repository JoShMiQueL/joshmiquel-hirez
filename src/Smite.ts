import { Hirez } from './HirezAbstract'
import { Game } from './typings/game'
import { LanguageCode } from './typings/languageCode'

export class Smite extends Hirez {
  protected game: Game = 'smite'

  async getGodLeaderboard(godId: number, queue: number): Promise<any> {
    const method = 'getgodleaderboard'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      godId,
      queue
    )
  }

  async getGodRecommendedItems(godId: number, languageCode: LanguageCode = LanguageCode.English): Promise<any> {
    const method = 'getgodrecommendeditems'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      godId,
      languageCode
    )
  }

  async getPlayerAchievements(playerId: number): Promise<any> {
    const method = 'getplayerachievements'
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

  async searchTeams(searchTeam: string): Promise<any> {
    const method = 'searchteams'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp(),
      searchTeam
    )
  }

  async getMotd(): Promise<any> {
    const method = 'getmotd'
    await this.createSession()
    return await this.requestData(
      method,
      this.devId,
      this.generateSignature(method),
      this.cache.data['session'],
      this.getTimestamp()
    )
  }
}
