export interface State {
  gameStarted: boolean
  symbolType: SymbolType.Cross | SymbolType.Zero | null
}
export const enum SymbolType {
  Cross = 'cross',
  Zero = 'zero'
}
