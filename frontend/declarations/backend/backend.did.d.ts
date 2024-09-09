import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CoinInfo {
  'currentPrice' : number,
  'totalSupply' : bigint,
  'holders' : bigint,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'getCoinInfo' : ActorMethod<[], CoinInfo>,
  'updateHolders' : ActorMethod<[bigint], Result>,
  'updatePrice' : ActorMethod<[number], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
