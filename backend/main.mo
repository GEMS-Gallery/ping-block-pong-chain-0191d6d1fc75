import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Float "mo:base/Float";

actor {
  type CoinInfo = {
    totalSupply: Nat;
    currentPrice: Float;
    holders: Nat;
  };

  var coinInfo: CoinInfo = {
    totalSupply = 1_000_000_000;
    currentPrice = 0.01;
    holders = 1000;
  };

  public query func getCoinInfo(): async CoinInfo {
    coinInfo
  };

  public func updatePrice(newPrice: Float): async Result.Result<(), Text> {
    coinInfo := {
      totalSupply = coinInfo.totalSupply;
      currentPrice = newPrice;
      holders = coinInfo.holders;
    };
    #ok(())
  };

  public func updateHolders(newHolders: Nat): async Result.Result<(), Text> {
    coinInfo := {
      totalSupply = coinInfo.totalSupply;
      currentPrice = coinInfo.currentPrice;
      holders = newHolders;
    };
    #ok(())
  };
}
