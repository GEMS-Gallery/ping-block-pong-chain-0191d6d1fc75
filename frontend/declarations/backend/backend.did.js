export const idlFactory = ({ IDL }) => {
  const LeaderboardEntry = IDL.Record({
    'score' : IDL.Nat,
    'playerName' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'getLeaderboard' : IDL.Func([], [IDL.Vec(LeaderboardEntry)], ['query']),
    'submitScore' : IDL.Func([IDL.Text, IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
