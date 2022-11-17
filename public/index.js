/* eslint-disable @typescript-eslint/no-use-before-define */
const hub = $.connection.hub;
const mainHub = $.connection.mainHub;
let messageData, allScenario, index, interval, timeouts;

mainHub.logging = true;
initHub(mainHub.client);
connectHub(hub);
hub.start().done(() => {
    console.log("hub connected");
    fetch("fakeData/mock-game47-v2.json")
        .then(res => res.json())
        .then(data => {
            allScenario = data;
            //debugger;
            for (const scenario in allScenario) {
                $("#select1").append(`<option value="${scenario}">${scenario}</option>`);
            }
            $("#btn1").click(() => {
                mainHub.server["OnSelection"]($("#select1").val());
            });
        });
});

function setData(memberCode) {
    const scenario = allScenario[memberCode];
    if (scenario) {
        messageData = scenario.filter(item => item.type != "API");
    }
}

function clearData() {
    if (timeouts && timeouts.length) timeouts.forEach(timeout => clearTimeout(timeout));
    index = 0;
    interval = 0;
    timeouts = [];
}

const invokeMessage = () => {
    const item = messageData[index++];
    if (item) {
        const data = JSON.stringify(item.data);
        interval = Number(item.interval) * 1000;
        timeouts.push(
            setTimeout(() => {
                console.log(`get ${item.type}`, data);
                mainHub.server[item.type](data);
                invokeMessage();
            }, interval)
        );
    }
};

function initHub(hubProxy) {
    const events = [
        "OnSelection",
        "OnCurrentStatus",
        "OnRefreshGameRound",
        "OnBidding",
        "OnBetting",
        "OnBidding",
        "OnResulting",
        "OnTableMemberChanged",
        "OnBalanceUpdate",
        "OnGameError",
        "OnHotTrends",
        "OnTrend",
        "OnTableStatus",
        "OnResetTrend",
        "OnUnmatch"
    ];
    events.forEach(e => {
        if (e == "OnSelection") {
            hubProxy[e] = data => {
                console.log(e + " event fired", data);
                clearData();
                setData(data);
                invokeMessage();
            };
        } else if (e == "OnUnmatch") {
            hubProxy[e] = data => {
                console.log(e + " event fired", data);
                clearData();
            };
        } else {
            hubProxy[e] = data => {
                console.log(e + " event fired", data);
            };
        }
    });
}

function connectHub(hub) {
    hub.starting(() => {
        console.log("starting");
    });

    hub.connectionSlow(() => {
        console.log("connectionSlow");
    });

    hub.reconnecting(() => {
        console.log("reconnecting");
    });

    hub.reconnected(() => {
        console.log("reconnected");
    });

    hub.disconnected(() => {
        console.log("disconnected");
        window.location.reload();
    });

    hub.error(error => {
        console.log("error:", error);
    });
}
