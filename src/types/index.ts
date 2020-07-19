export interface State {
  symbolType: SymbolType.Cross | SymbolType.Zero | null
}
export const enum SymbolType {
  Cross = 'cross',
  Zero = 'zero'
}
