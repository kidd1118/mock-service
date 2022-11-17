/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
const fs = require("fs");
const path = require("path");
const mockGame47Data = require("./public/fakeData/mock-game47.json");
const scenarios = Object.values(mockGame47Data);

const StageMap = {
    MATCHED: 1,
    OPENING: 2,
    NEW_GAME: 3,
    BIDDING: 4,
    BETTING: 5,
    SHUFFLE: 6,
    DEAL: 7,
    SHOWDOWN: 8,
    REST: 9
};

scenarios.forEach(resList => {
    let players;

    resList.forEach(res => {
        const { type, state, data } = res;
        if (type === "API") {
            if (state === "Game") {
                gameAdapter(data);
            }
            if (state === "Transfer") {
                transferAdapter(data);
            }
            if (state === "GamePlay") {
                gamePlayAdapter(data);
            }
            if (state === "Selection") {
                selectionAdapter(data);
            }
            return;
        }
        if (type === "OnRefreshGameRound") {
            switch (state) {
                case "MATCHED":
                    refreshGameRoundAdapter(data, StageMap.MATCHED);
                    break;
                case "OPENING":
                    players = data.Players;
                    gameRoundOpeningAdapter(data, StageMap.OPENING);
                    break;
                case "NEW_GAME":
                    refreshGameRoundAdapter(data, StageMap.NEW_GAME);
                    break;
                case "BIDDING":
                    gameRoundBiddingAdapter(data, StageMap.BIDDING);
                    break;
                case "BETTING":
                    gameRoundBettingAdapter(data, StageMap.BETTING);
                    break;
                case "SHUFFLE":
                    refreshGameRoundAdapter(data, StageMap.SHUFFLE);
                    break;
                case "DEAL":
                    refreshGameRoundAdapter(data, StageMap.DEAL);
                    break;
                case "SHOWDOWN":
                    refreshGameRoundAdapter(data, StageMap.SHOWDOWN);
                    break;
                case "REST":
                    refreshGameRoundAdapter(data, StageMap.REST);
                    break;
            }
            return;
        }
        if (type === "OnBetting" && state === "BETTING") {
            const { BetOn, Bet } = data.BetSlips[0];
            const index = players.findIndex(item => item.MemberCode === data.MemberCode);
            onBettingAdapter(res, index, Bet, BetOn);
        }
        if (type === "OnResulting" && state === "RESULT") {
            resultingAdapter(data);
        }
        if (type === "OnBalanceUpdate" && state === "BALANCE") {
            data.Balance = data.GameCoin;
            delete data.GameCoin;
            delete data.MessageKey;
        }
    });
});

try {
    fs.writeFileSync(
        path.resolve(__dirname, "public", "fakeData", "mock-game47-v2.json"),
        JSON.stringify(mockGame47Data)
    );
} catch (err) {
    console.log(err);
}

function gameAdapter(data) {
    const { Body } = data;

    delete Body.MaxBetCount;

    if (Body.Status) {
        Body.Status.PlatformBalance = Body.Status.MemberBalance;
        Body.Status.MemberBalance = Body.Status.GameCoin;
        ["BetData", "CurrentMode", "GameState", "GameCoin", "Modes", "TotalPayout"].forEach(key => {
            delete Body.Status[key];
        });
    }
    delete Body.Status.MemberBalance;
    delete Body.Selection;
    if (Body.SelectionList.length) {
        Body.SelectionList.forEach(item => {
            const { Data } = item;
            ["Dealer", "MinBetAmount", "MaxBetAmount", "CoinSize", "BetSpeed", "Type"].forEach(key => {
                if (key == "Type") Data.Name = Data.Type;
                delete Data[key];
            });
        });
    }
}
function transferAdapter({ Body }) {
    Body.PlatformBalance = Body.MemberBalance;
    Body.MemberBalance = Body.GameCoin;
    delete Body.GameCoin;
}
function gamePlayAdapter(data) {
    const MemberBalance = data.Body.GameCoin;
    data.Body = { MemberBalance };
}
function selectionAdapter(data) {
    data.Body = { MatchResult: true };
}
function refreshGameRoundAdapter(data, currentStage) {
    ["BettingSecond", "TableLimitSn", "MessageKey"].forEach(key => {
        delete data[key];
    });
    if (!data.RoomSettingSn) data.RoomSettingSn = 743;
    if (!data.RoomId) data.RoomId = "0cbad10e-b2ba-4dab-a0c4-62d4ce2a8687";
    if (data.Times) {
        delete data.Times.Matching;
    }
    data.CurrentStage = currentStage;
}
function gameRoundOpeningAdapter(data, stage) {
    refreshGameRoundAdapter(data, stage);
    const { Players } = data;
    data.Data = { Players };
    delete data.Players;
}
function gameRoundBiddingAdapter(data, stage) {
    refreshGameRoundAdapter(data, stage);
    if (!data.Data) {
        data.Data = { Options: data.BetList };
    }
    delete data.BetList;
}
function gameRoundBettingAdapter(data, stage) {
    refreshGameRoundAdapter(data, stage);
    if (!data.Data) {
        data.Data = {
            Options: data.BetList,
            Banker: data.Banker
        };
    }
    delete data.BetList;
    delete data.Banker;
}
function onBettingAdapter(res, index, bet, BetOn) {
    const { data } = res;
    ["MemberCode", "BetSlips", "TableLimitSn", "MessageStartTime", "MessageKey"].forEach(key => {
        delete data[key];
    });
    if (!data.Member) data.Member = index;
    if (!data.Option) data.Option = bet;
    if (!data.RoomSettingSn) data.RoomSettingSn = 743;
    if (!data.RoomId) data.RoomId = "0cbad10e-b2ba-4dab-a0c4-62d4ce2a8687";
    if (BetOn === 0) {
        res.state = "BIDDING";
        res.type = "OnBidding";
    }
}
function resultingAdapter(data) {
    const { ResultEntities, Entities, Awards, Bet } = data;
    if (!data.RoomSettingSn) data.RoomSettingSn = 743;
    if (!data.RoomId) data.RoomId = "0cbad10e-b2ba-4dab-a0c4-62d4ce2a8687";
    data.StartPoints = data.Dice.Entities;
    delete data.Dice;
    ResultEntities.forEach((item, index) => {
        item.Option = item.Bet;
        delete item.Bet;
        item.WinLost = item.Payout;
        delete item.Payout;
        item.Entities = Entities[index];
        item.Award = Awards[index];
    });
    ["Entities", "Awards", "Trends", "BetResults", "MessageStartTime", "MessageKey", "TableLimitSn"].forEach(key => {
        delete data[key];
    });
}
