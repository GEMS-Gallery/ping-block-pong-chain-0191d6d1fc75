import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface LeaderboardEntry { 'score' : bigint, 'playerName' : string }
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'getLeaderboard' : ActorMethod<[], Array<LeaderboardEntry>>,
  'submitScore' : ActorMethod<[string, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
