import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Order "mo:base/Order";

actor {
  type LeaderboardEntry = {
    playerName: Text;
    score: Nat;
  };

  stable var leaderboard: [LeaderboardEntry] = [];

  public func submitScore(playerName: Text, score: Nat): async Result.Result<(), Text> {
    let entry: LeaderboardEntry = {
      playerName = playerName;
      score = score;
    };

    leaderboard := Array.append(leaderboard, [entry]);
    leaderboard := Array.sort(leaderboard, func(a: LeaderboardEntry, b: LeaderboardEntry): Order.Order {
      Nat.compare(b.score, a.score)
    });

    if (Array.size(leaderboard) > 10) {
      leaderboard := Array.subArray(leaderboard, 0, 10);
    };

    #ok(())
  };

  public query func getLeaderboard(): async [LeaderboardEntry] {
    leaderboard
  };
}
