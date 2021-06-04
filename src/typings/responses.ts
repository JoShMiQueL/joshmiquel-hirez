interface Wrapper<T> {
  status: number
  data?: T
}
type RetMsg = null | string

export type PingResponse = Wrapper<string>
export type TestSessionResponse = Wrapper<string>
export type GetDataUsedResponse = Wrapper<
  {
    Active_Sessions: number
    Concurrent_Sessions: number
    Request_Limit_Daily: number
    Session_Cap: number
    Session_Time_Limit: number
    Total_Requests_Today: number
    Total_Sessions_Today: number
    ret_msg: RetMsg
  }[]
>
export type GetHiRezServerStatusResponse = Wrapper<
  {
    entry_datetime: string
    environment: string
    limited_access: boolean
    platform: string
    ret_msg: RetMsg
    status: string
    version: string
  }[]
>
export type GetPatchInfoResponse = Wrapper<
  {
    version: string
    version_id: number
    version_code: string
    ret_msg: RetMsg
  }[]
>
export type GetGodsResponse = Wrapper<GetGods.Response[]>
export type GetGodSkinsResponse = Wrapper<GetGodSkins.Response[]>
export type GetItems = Wrapper<GetItems.Response[]>
export type GetPlayer = Wrapper<GetPlayer.Response[]>
export type GetPlayerIdByName = Wrapper<GetPlayerIdByName.Response>
export type GetPlayerIdByPortalUserId = Wrapper<any>
export type GetPlayerIdsByGamerTag = Wrapper<any>
export type GetFriends = Wrapper<GetFriends.Response[]>
export type GetGodRanks = Wrapper<GetGodRanks.Response[]>
export type GetPlayerStatus = Wrapper<GetPlayerStatus.Response[]>
export type GetMatchHistory = Wrapper<GetMatchHistory.Response[]>
export type GetQueueStats = Wrapper<GetQueueStats.Response[]>
export type SearchPlayers = Wrapper<SearchPlayers.Response[]>
export type GetDemoDetails = Wrapper<GetDemoDetails.Response[]>
export type GetMatchDetails = Wrapper<GetMatchDetails.Response[]>
export type GetMatchIdsByQueue = Wrapper<GetMatchIdsByQueue.Response[]>
export type GetMatchPlayerDetails = Wrapper<GetMatchPlayerDetails.Response[]>
export type GetTopMatches = Wrapper<GetTopMatches.Response[]>

module GetGods {
  export interface Response {
    Ability1: string
    Ability2: string
    Ability3: string
    Ability4: string
    Ability5: string
    AbilityId1: number
    AbilityId2: number
    AbilityId3: number
    AbilityId4: number
    AbilityId5: number
    Ability_1: Ability
    Ability_2: Ability
    Ability_3: Ability
    Ability_4: Ability
    Ability_5: Ability
    AttackSpeed: number
    AttackSpeedPerLevel: number
    AutoBanned: string
    Cons: string
    HP5PerLevel: number
    Health: number
    HealthPerFive: number
    HealthPerLevel: number
    Lore: string
    MP5PerLevel: number
    MagicProtection: number
    MagicProtectionPerLevel: number
    MagicalPower: number
    MagicalPowerPerLevel: number
    Mana: number
    ManaPerFive: number
    ManaPerLevel: number
    Name: string
    OnFreeRotation: string
    Pantheon: string
    PhysicalPower: number
    PhysicalPowerPerLevel: number
    PhysicalProtection: number
    PhysicalProtectionPerLevel: number
    Pros: string
    Roles: string
    Speed: number
    Title: string
    Type: string
    abilityDescription1: AbilityDescription
    abilityDescription2: AbilityDescription
    abilityDescription3: AbilityDescription
    abilityDescription4: AbilityDescription
    abilityDescription5: AbilityDescription
    basicAttack: AbilityDescription
    godAbility1_URL: string
    godAbility2_URL: string
    godAbility3_URL: string
    godAbility4_URL: string
    godAbility5_URL: string
    godCard_URL: string
    godIcon_URL: string
    id: number
    latestGod: string
    ret_msg: RetMsg
  }

  export interface Ability {
    Description: AbilityDescription
    Id: number
    Summary: string
    URL: string
  }

  export interface AbilityDescription {
    itemDescription: ItemDescription
  }

  export interface ItemDescription {
    cooldown: string
    cost: string
    description: string
    menuitems: Item[]
    rankitems: Item[]
  }

  export interface Item {
    description: string
    value: string
  }
}

module GetGodSkins {
  export interface Response {
    godIcon_URL: string
    godSkin_URL: string
    god_id: number
    god_name: string
    obtainability: Obtainability
    price_favor: number
    price_gems: number
    ret_msg: null
    skin_id1: number
    skin_id2: number
    skin_name: string
  }

  export enum Obtainability {
    Exclusive = 'Exclusive',
    Limited = 'Limited',
    Normal = 'Normal'
  }
}

module GetItems {
  export interface Response {
    ActiveFlag: ActiveFlag
    ChildItemId: number
    DeviceName: string
    IconId: number
    ItemDescription: ItemDescription
    ItemId: number
    ItemTier: number
    Price: number
    RestrictedRoles: string
    RootItemId: number
    ShortDesc: string
    StartingItem: boolean
    Type: Type
    itemIcon_URL: string
    ret_msg: null
  }

  export enum ActiveFlag {
    N = 'n',
    Y = 'y'
  }

  export interface ItemDescription {
    Description: null | string
    Menuitems: Menuitem[]
    SecondaryDescription: null | string
  }

  export interface Menuitem {
    Description: string
    Value: string
  }

  export enum Type {
    Active = 'Active',
    Consumable = 'Consumable',
    Item = 'Item'
  }
}

module GetPlayer {
  export interface Response {
    ActivePlayerId: number
    Avatar_URL: string
    Created_Datetime: string
    HoursPlayed: number
    Id: number
    Last_Login_Datetime: string
    Leaves: number
    Level: number
    Losses: number
    MasteryLevel: number
    MergedPlayers: null
    MinutesPlayed: number
    Name: string
    Personal_Status_Message: string
    Platform: string
    Rank_Stat_Conquest: number
    Rank_Stat_Conquest_Controller: number
    Rank_Stat_Duel: number
    Rank_Stat_Duel_Controller: number
    Rank_Stat_Joust: number
    Rank_Stat_Joust_Controller: number
    RankedConquest: Ranked
    RankedConquestController: Ranked
    RankedDuel: Ranked
    RankedDuelController: Ranked
    RankedJoust: Ranked
    RankedJoustController: Ranked
    Region: string
    TeamId: number
    Team_Name: string
    Tier_Conquest: number
    Tier_Duel: number
    Tier_Joust: number
    Total_Achievements: number
    Total_Worshippers: number
    Wins: number
    hz_gamer_tag: string | null
    hz_player_name: string
    ret_msg: RetMsg
  }

  export interface Ranked {
    Leaves: number
    Losses: number
    Name: string
    Points: number
    PrevRank: number
    Rank: number
    Rank_Stat: number
    Rank_Variance: number
    Season: number
    Tier: number
    Trend: number
    Wins: number
    player_id: null
    ret_msg: RetMsg
  }
}

module GetPlayerIdByName {
  export interface Response {
    player_id: number
    portal: string
    portal_id: string
    privacy_flag: string
    ret_msg: RetMsg
  }
}

module GetFriends {
  export interface Response {
    account_id: string
    avatar_url: string
    friend_flags: string
    name: string
    player_id: string
    portal_id: string
    ret_msg: RetMsg
    status: Status
  }

  export enum Status {
    Blocked = 'Blocked',
    Friend = 'Friend'
  }
}

module GetGodRanks {
  export interface Response {
    Assists: number
    Deaths: number
    Kills: number
    Losses: number
    MinionKills: number
    Rank: number
    Wins: number
    Worshippers: number
    god: string
    god_id: string
    player_id: string
    ret_msg: RetMsg
  }
}

module GetPlayerStatus {
  export interface Response {
    Match: number
    match_queue_id: number
    personal_status_message: string | null
    ret_msg: RetMsg
    status: number
    status_string: string
  }
}

module GetMatchHistory {
  export interface Response {
    ActiveId1: number
    ActiveId2: number
    Active_1: string
    Active_2: string
    Active_3: null
    Assists: number
    Ban1: string
    Ban10: string
    Ban10Id: number
    Ban1Id: number
    Ban2: string
    Ban2Id: number
    Ban3: string
    Ban3Id: number
    Ban4: string
    Ban4Id: number
    Ban5: string
    Ban5Id: number
    Ban6: string
    Ban6Id: number
    Ban7: string
    Ban7Id: number
    Ban8: string
    Ban8Id: number
    Ban9: string
    Ban9Id: number
    Creeps: number
    Damage: number
    Damage_Bot: number
    Damage_Done_In_Hand: number
    Damage_Mitigated: number
    Damage_Structure: number
    Damage_Taken: number
    Damage_Taken_Magical: number
    Damage_Taken_Physical: number
    Deaths: number
    Distance_Traveled: number
    First_Ban_Side: string
    God: string
    GodId: number
    Gold: number
    Healing: number
    Healing_Bot: number
    Healing_Player_Self: number
    ItemId1: number
    ItemId2: number
    ItemId3: number
    ItemId4: number
    ItemId5: number
    ItemId6: number
    Item_1: string
    Item_2: string
    Item_3: string
    Item_4: string
    Item_5: string
    Item_6: string
    Killing_Spree: number
    Kills: number
    Level: number
    Map_Game: string
    Match: number
    Match_Queue_Id: number
    Match_Time: string
    Minutes: number
    Multi_kill_Max: number
    Objective_Assists: number
    Queue: string
    Region: string
    Skin: string
    SkinId: number
    Surrendered: number
    TaskForce: number
    Team1Score: number
    Team2Score: number
    Time_In_Match_Seconds: number
    Wards_Placed: number
    Win_Status: WinStatus
    Winning_TaskForce: number
    playerId: number
    playerName: string
    ret_msg: RetMsg
  }

  export enum WinStatus {
    Loss = 'Loss',
    Win = 'Win'
  }
}

module GetQueueStats {
  export interface Response {
    Assists: number
    Deaths: number
    God: string
    GodId: number
    Gold: number
    Kills: number
    LastPlayed: string
    Losses: number
    Matches: number
    Minutes: number
    Queue: string
    Wins: number
    player_id: string
    ret_msg: RetMsg
  }
}

module SearchPlayers {
  export interface Response {
    Name: string
    hz_player_name: string
    player_id: string
    portal_id: string
    privacy_flag: string
    ret_msg: RetMsg
  }
}

module GetDemoDetails {
  export interface Response {
    BanId1: number
    BanId2: number
    BanId3: number
    BanId4: number
    Entry_Datetime: string
    Match: number
    Match_Time: number
    Offline_Spectators: number
    Queue: string
    Realtime_Spectators: number
    Recording_Ended: string
    Recording_Started: string
    Team1_AvgLevel: number
    Team1_Gold: number
    Team1_Kills: number
    Team1_Score: number
    Team2_AvgLevel: number
    Team2_Gold: number
    Team2_Kills: number
    Team2_Score: number
    Winning_Team: number
    ret_msg: RetMsg
  }
}

module GetMatchDetails {
  export interface Response {
    Account_Level: number
    ActiveId1: number
    ActiveId2: number
    ActiveId3: number
    ActiveId4: number
    ActivePlayerId: string
    Assists: number
    Ban1: string
    Ban10: string
    Ban10Id: number
    Ban1Id: number
    Ban2: string
    Ban2Id: number
    Ban3: string
    Ban3Id: number
    Ban4: string
    Ban4Id: number
    Ban5: string
    Ban5Id: number
    Ban6: string
    Ban6Id: number
    Ban7: string
    Ban7Id: number
    Ban8: string
    Ban8Id: number
    Ban9: string
    Ban9Id: number
    Camps_Cleared: number
    Conquest_Losses: number
    Conquest_Points: number
    Conquest_Tier: number
    Conquest_Wins: number
    Damage_Bot: number
    Damage_Done_In_Hand: number
    Damage_Done_Magical: number
    Damage_Done_Physical: number
    Damage_Mitigated: number
    Damage_Player: number
    Damage_Taken: number
    Damage_Taken_Magical: number
    Damage_Taken_Physical: number
    Deaths: number
    Distance_Traveled: number
    Duel_Losses: number
    Duel_Points: number
    Duel_Tier: number
    Duel_Wins: number
    Entry_Datetime: string
    Final_Match_Level: number
    First_Ban_Side: string
    GodId: number
    Gold_Earned: number
    Gold_Per_Minute: number
    Healing: number
    Healing_Bot: number
    Healing_Player_Self: number
    ItemId1: number
    ItemId2: number
    ItemId3: number
    ItemId4: number
    ItemId5: number
    ItemId6: number
    Item_Active_1: string
    Item_Active_2: string
    Item_Active_3: string
    Item_Active_4: string
    Item_Purch_1: string
    Item_Purch_2: string
    Item_Purch_3: string
    Item_Purch_4: string
    Item_Purch_5: string
    Item_Purch_6: string
    Joust_Losses: number
    Joust_Points: number
    Joust_Tier: number
    Joust_Wins: number
    Killing_Spree: number
    Kills_Bot: number
    Kills_Double: number
    Kills_Fire_Giant: number
    Kills_First_Blood: number
    Kills_Gold_Fury: number
    Kills_Penta: number
    Kills_Phoenix: number
    Kills_Player: number
    Kills_Quadra: number
    Kills_Siege_Juggernaut: number
    Kills_Single: number
    Kills_Triple: number
    Kills_Wild_Juggernaut: number
    Map_Game: string
    Mastery_Level: number
    Match: number
    Match_Duration: number
    MergedPlayers: null
    Minutes: number
    Multi_kill_Max: number
    Objective_Assists: number
    PartyId: number
    Rank_Stat_Conquest: number
    Rank_Stat_Duel: number
    Rank_Stat_Joust: number
    Reference_Name: string
    Region: string
    Role: string
    Skin: string
    SkinId: number
    Structure_Damage: number
    Surrendered: number
    TaskForce: number
    Team1Score: number
    Team2Score: number
    TeamId: number
    Team_Name: string
    Time_Dead_Seconds: number
    Time_In_Match_Seconds: number
    Towers_Destroyed: number
    Wards_Placed: number
    Win_Status: WinStatus
    Winning_TaskForce: number
    hasReplay: string
    hz_gamer_tag: null | string
    hz_player_name: null | string
    match_queue_id: number
    name: string
    playerId: string
    playerName: string
    playerPortalId: null | string
    playerPortalUserId: null | string
    ret_msg: RetMsg
  }

  export enum WinStatus {
    Loser = 'Loser',
    Winner = 'Winner'
  }
}

module GetMatchIdsByQueue {
  export interface Response {
    Active_Flag: string
    Match: string
    ret_msg: RetMsg
  }
}

module GetMatchPlayerDetails {
  export interface Response {
    Account_Gods_Played: number
    Account_Level: number
    GodId: number
    GodLevel: number
    GodName: string
    Mastery_Level: number
    Match: number
    Queue: string
    Rank_Stat: number
    SkinId: number
    Tier: number
    mapGame: string
    playerCreated: string
    playerId: string
    playerName: string
    playerRegion: string
    ret_msg: RetMsg
    taskForce: number
    tierLosses: number
    tierPoints: number
    tierWins: number
  }
}

module GetTopMatches {
  export interface Response {
    Ban1: null | string
    Ban1Id: number
    Ban2: null | string
    Ban2Id: number
    Entry_Datetime: null | string
    LiveSpectators: number
    Match: number
    Match_Time: number
    OfflineSpectators: number
    Queue: null | string
    RecordingFinished: null | string
    RecordingStarted: null | string
    Team1_AvgLevel: number
    Team1_Gold: number
    Team1_Kills: number
    Team1_Score: number
    Team2_AvgLevel: number
    Team2_Gold: number
    Team2_Kills: number
    Team2_Score: number
    WinningTeam: number
    ret_msg: RetMsg
  }
}
