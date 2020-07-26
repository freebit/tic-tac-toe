export interface State {
  playerUid: string | null
  gameStarted: boolean
  symbolType: SymbolType.Cross | SymbolType.Zero | null
  move: Move | null
}

export interface Move {
  position: number
  symbol: SymbolType
}

export const enum SymbolType {
  Cross = 'cross',
  Zero = 'zero'
}
