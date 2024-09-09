export const idlFactory = ({ IDL }) => {
  const CoinInfo = IDL.Record({
    'currentPrice' : IDL.Float64,
    'totalSupply' : IDL.Nat,
    'holders' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'getCoinInfo' : IDL.Func([], [CoinInfo], ['query']),
    'updateHolders' : IDL.Func([IDL.Nat], [Result], []),
    'updatePrice' : IDL.Func([IDL.Float64], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
