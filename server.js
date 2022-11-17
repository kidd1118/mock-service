/* 
    eslint-disable 
    @typescript-eslint/no-use-before-define,
    @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type,
    no-var 
*/
const express = require("express");
const cors = require("cors");
const path = require("path");
var fs = require("fs");
const SignalRJS = require("./vendors/signalRJS");
const TRANSPORT_TYPES = require("./vendors/signalRJS/lib/transports/transportTypes");
// const client = require('./client')
const mockWagersType1 = require("./mocks/wagers-type-1.mock");
const mockWagersType2 = require("./mocks/wagers-type-2.mock");
const mockWagerDetail = require("./mocks/wager-detail-4-players.mock");

let allScenario, apiData, apiTempData, messageData, memberCode;
fs.readFile("./public/fakeData/mock-game47-v2.json", function(err, data) {
    allScenario = JSON.parse(data);
});
const server = express();
const signalR = SignalRJS([TRANSPORT_TYPES.longPolling]);

server.use(
    cors({
        origin: true,
        methods: "*",
        allowedHeaders: ["Content-Type", "authorization"],
        credentials: true
    })
);

signalR.on("CONNECTED", () => {
    console.log("client connect");
});

const hub = {
    OnSelection(data) {
        // can't invoke meeage by myself, only passing message by client form others.
        // let index = 0,
        //   interval = 0;
        // const invokeMessage = () => {
        //   setTimeout(() => {
        //     const item = messageData[index++];
        //     if (item) {
        //       console.log(`get ${item.type}`);
        //       this.clients.all.invoke(item.type).withArgs([item.data]);
        //       interval = Number(item.interval) * 1000;
        //       invokeMessage();
        //     }
        //   }, interval);
        // };
        // invokeMessage();
        console.log("receive", "OnSelection");
        this.clients.all.invoke("OnSelection").withArgs(data);
    },
    OnCurrentStatus(data) {
        console.log("receive", "OnCurrentStatus");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnCurrentStatus").withArgs(_data);
    },
    OnRefreshGameRound(data) {
        console.log("receive", "OnRefreshGameRound");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnRefreshGameRound").withArgs(JSON.parse(data));
    },
    OnBidding(data) {
        console.log("receive", "OnBidding");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnBidding").withArgs(_data);
    },
    OnBetting(data) {
        console.log("receive", "OnBetting");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnBetting").withArgs(_data);
    },
    OnResulting(data) {
        console.log("receive", "OnResulting");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnResulting").withArgs(_data);
    },
    OnTableMemberChanged(data) {
        console.log("receive", "OnTableMemberChanged");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnTableMemberChanged").withArgs(_data);
    },
    OnBalanceUpdate(data) {
        console.log("receive", "OnBalanceUpdate");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnBalanceUpdate").withArgs(_data);
    },
    OnGameError(data) {
        console.log("receive", "OnGameError");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnGameError").withArgs(_data);
    },
    OnHotTrends(data) {
        console.log("receive", "OnHotTrends");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnHotTrends").withArgs(_data);
    },
    OnTrend(data) {
        console.log("receive", "OnTrend");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnTrend").withArgs(_data);
    },
    OnTableStatus(data) {
        console.log("receive", "OnTableStatus");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnTableStatus").withArgs(_data);
    },
    OnResetTrend(data) {
        console.log("receive", "OnResetTrend");
        let _data = JSON.parse(data);
        _data = _data instanceof Array && _data.length ? _data : [_data];
        this.clients.all.invoke("OnResetTrend").withArgs(_data);
    },
    OnUnmatch() {
        console.log("receive", "OnUnmatch");
        this.clients.all.invoke("OnUnmatch").withArgs("");
    }
};
signalR.hub("mainHub", hub);

const publicPath = path.join(__dirname + "/public");
server.use(express.static(publicPath));

const PORT = 4200; //process.env.PORT

server.use(signalR.createListener());
server.listen(PORT, err => {
    if (err) {
        console.warn("Server error:", err);
    }

    console.log("Server listening on port: ", PORT);
});

//fake api
server.get("/:engine/ClientSetting", function(req, res) {
    console.log("ClientSetting");
    res.send(
        '{"Body":"{\\"lastBetSetting\\":5,\\"MutedBGM\\":true,\\"MutedSound\\":true,\\"LastSysSettledWagerDisplayID\\":\\"\\",\\"trendData\\":\\"\\",\\"skipAnimation\\":true,\\"showInformationViewOnEnterGame\\":false,\\"autoConfirmBets\\":true,\\"loginTimestamp\\":1657180125438,\\"isDisplayNumberRoads\\":{}}","Messages":[],"Status":"Success"}'
    );
});
server.get("/:engine/CurrentPayout", function(req, res) {
    res.send('{"Body":{},"Messages":[],"Status":"Success"}');
});
server.post("/:engine/Game", function(req, res) {
    console.log("Game");
    memberCode = req.body.MemberCode;
    setData(req.body.MemberCode);
    responsePost("Game", res);
});

server.post("/:engine/ClientSetting", function(req, res) {
    responsePost("ClientSetting", res);
});
server.post("/:engine/Selection", function(req, res) {
    //hub.OnCurrentStatus();
    responsePost("Selection", res);
});

server.post("/:engine/GamePlay", function(req, res) {
    responsePost("GamePlay", res);
});

server.post("/:engine/Transfer", function(req, res) {
    responsePost("Transfer", res);
});

server.post("/:engine/Selection/CancelMatch", function(req, res) {
    responsePost("Unmatch", res);
});

server.get("/Wager/:game", (req, res) => {
    switch (req.query.type) {
        case "1":
            res.send(mockWagersType1);
            break;
        case "2":
            res.send(mockWagersType2);
            break;
        default:
            res.send("");
    }
});

server.get("/WagerDetail/:game", (req, res) => {
    res.send(mockWagerDetail);
});

function setData(memberCode) {
    const scenario = allScenario[memberCode] || "LEO001";
    if (scenario) {
        messageData = scenario.filter(item => item.type != "API");
        apiData = scenario.filter(item => item.type == "API");
        apiTempData = [...apiData];
    }
}

function responsePost(state, res) {
    console.log("responsePost", state);
    let responseData = '{"Messages":[],"Status":"Success"}';
    const apiIndex = apiTempData.findIndex(item => item.state == state);
    if (apiIndex >= 0) {
        const apiMock = apiTempData.splice(apiIndex, 1)[0];
        responseData = apiMock && apiMock.data ? apiMock.data : '{"Messages":[],"Status":"Success"}';
    }
    res.send(JSON.stringify(responseData));
}
