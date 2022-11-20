var elements = elementsGlobal.features;

// var allowed = elements[11];

var signalSetupInnerHTML = `<div id="bSetupDiv">
                            <h5>Частота</h5>
                            <div class="form-check" id="bSetup">
                                <input class="form-check-input bSetup" type="radio" name="frequency" id="frequency1" checked value="100">
                                <label class="form-check-label" for="frequency1">
                                100ГЦ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input bSetup" type="radio" name="frequency" id="frequency2" value="1000">
                                <label class="form-check-label" for="frequency2">
                                1000Гц
                                </label>
                            </div>
                            <h5>Форма сигнала</h5>
                            <div class="form-check">
                                <input class="form-check-input bSetup" type="radio" name="shape" id="shape1" checked value="sin">
                                <label class="form-check-label" for="shape1">
                                Синус
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input bSetup" type="radio" name="shape" id="shape2" value="meander">
                                <label class="form-check-label" for="shape2">
                                Меандр
                                </label>
                            </div>
                            <h5>Амплитуда</h5>
                            <div class="form-check">
                                <input class="form-check-input bSetup" type="radio" name="voltage" id="voltage1" checked value="1">
                                <label class="form-check-label" for="voltage1">
                                1В
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input bSetup" type="radio" name="voltage" id="voltage2" value="5">
                                <label class="form-check-label" for="voltage2">
                                5В
                                </label>
                            </div>
                            </div>`

document.addEventListener("DOMContentLoaded",function () {  
    canvas = new draw2d.Canvas("gfx_holder");
    var connections = [];

    let createConnection = function(){
        let con = new draw2d.Connection();
        con.setRouter(new draw2d.layout.connection.CircuitConnectionRouter());
        return con;
    };

    canvas.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
        createConnection: createConnection
    }));

    // canvas.getFiguresinstallEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());

    let reader = new draw2d.io.json.Reader();

    // Add elements on click
    var opAmp = document.getElementById('opAmp');
    var resistor1k = document.getElementById('resistor1k');
    var resistor10k_1 = document.getElementById('resistor10k_1');
    var resistor10k_2 = document.getElementById('resistor10k_2');
    var resistor10k_3 = document.getElementById('resistor10k_3');
    var resistor100k = document.getElementById('resistor100k');
    var capacitor01micro = document.getElementById('capacitor01micro');
    var capacitor001micro = document.getElementById('capacitor001micro');
    var batt = document.getElementById('batt');
    var ground = document.getElementById('ground');
    var voltmeter = document.getElementById('voltmeter');
    var loadBtn = document.getElementById('loadBtn');
    var updateBtn = document.getElementById('updateBtn');
    var start = document.getElementById('start');

    // opAmp
    opAmp.onclick = function() {
        reader.unmarshal(canvas, elements[0]);
        opAmp.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    // resistors
    
    resistor1k.onclick = function() {
        reader.unmarshal(canvas, elements[1]);
        resistor1k.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    resistor10k_1.onclick = function() {
        reader.unmarshal(canvas, elements[2]);
        resistor10k_1.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    resistor10k_2.onclick = function() {
        reader.unmarshal(canvas, elements[3]);
        resistor10k_2.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    resistor10k_3.onclick = function() {
        reader.unmarshal(canvas, elements[4]);
        resistor10k_3.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    resistor100k.onclick = function() {
        reader.unmarshal(canvas, elements[5]);
        resistor100k.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    // capacitors

    capacitor01micro.onclick = function() {
        reader.unmarshal(canvas, elements[6]);
        capacitor01micro.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };
    
    capacitor001micro.onclick = function() {
        reader.unmarshal(canvas, elements[7]);
        capacitor001micro.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    // battery
    batt.onclick = function() {
        reader.unmarshal(canvas, elements[8]);
        batt.disabled = true;
        $(signalSetupInnerHTML).insertAfter(batt);
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };



    // ground
    ground.onclick = function() {
        reader.unmarshal(canvas, elements[9]);
        ground.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    // voltmeter
    voltmeter.onclick = function() {
        reader.unmarshal(canvas, elements[10]);
        voltmeter.disabled = true;
        canvas.figures.data.forEach(element => element.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy()));
    };

    // config data
    loadBtn.onclick = function() {
        connections = [];
        var data = canvas.lines.data;
        if (canvas.lines.data.length == 0) {}
        for (let i = 0; i < data.length; i++) {
            let tmp = [data[i].sourcePort.name, data[i].targetPort.name];
            connections.push(tmp);
        }
        console.log(connections);
        if (connections.length == 0) {
            alert('Вы не соединили ни одного элемента')
            // Проверка на вольтметр
        } else {
            // var connectionsFlat = [];
            // var allowedFlat = [];
            // let tmp;
            // for (let i = 0; i < connections.length; i++) {
            //     tmp = connections[i][0] + connections[i][1];
            //     connectionsFlat.push(tmp);
            // }
            // for (let i = 0; i < allowed.length; i++) {
            //     tmp = allowed[i][0] + allowed[i][1];
            //     allowedFlat.push(tmp);
            // }
            let flag = true;
            // for (let i = 0; i < arr1flat.length; i++) {
            //     if (!arr2flat.includes(arr1flat[i])) {
            //         flag = false;
            //     }
            // }
            // for (let i = 0; i < connectionsFlat.length; i++) {
            //     if (!allowedFlat.includes(connectionsFlat[i])) {
            //         console.log('incorrect connection ' + connectionsFlat[i]);
            //         flag = false;
            //     }
            // }
            if (flag) {
                var connectionsData = {
                    data: connections
                };
                if (document.getElementById('bSetup')) {
                    if (document.getElementById('frequency1').checked) connectionsData.frequency = document.getElementById('frequency1').value;
                    if (document.getElementById('frequency2').checked) connectionsData.frequency = document.getElementById('frequency2').value; 
                    if (document.getElementById('shape1').checked) connectionsData.shape = document.getElementById('shape1').value;
                    if (document.getElementById('shape2').checked) connectionsData.shape = document.getElementById('shape2').value;
                    if (document.getElementById('voltage1').checked) connectionsData.voltage = document.getElementById('voltage1').value;
                    if (document.getElementById('voltage2').checked) connectionsData.voltage = document.getElementById('voltage2').value;
                }
                connectionsData = JSON.stringify(connectionsData);
                document.getElementById('dataForSending').value = connectionsData;
                loadBtn.disabled = true;
                start.disabled = false;
            } else {
                alert('Присутствуют недопустимые соединения')
            }
        }
    };

    updateBtn.onclick = function(){
        var figuresOnField = canvas.figures.data;
        console.log(figuresOnField);
        var buttonList = document.querySelectorAll(".elButton");
        for (let i = 0; i < buttonList.length; i++) {
            if (buttonList[i].disabled === true) {
                console.log('button: ' + buttonList[i].id);
                var flag = true;
                for (let j = 0; j < figuresOnField.length; j++) {
                    console.log('cssClass: ' + figuresOnField[j].cssClass)
                    if (figuresOnField[j].cssClass == buttonList[i].id) {
                        flag = false;
                    }
                }
                if (flag === true) {
                    buttonList[i].disabled = false;
                    if (buttonList[i].id === 'batt') {
                        var elem = document.getElementById("bSetupDiv");
                        elem.parentNode.removeChild(elem);
                    };
                }
            }
        }
    }
});

