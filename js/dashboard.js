$(function() {
    var basementHumidityGauge = new athega.dashboard.Humidity('basementCanvas');
    basementHumidityGauge.draw();
    var basementTemperatureGauge = new athega.dashboard.Temperature('basementCanvas');
    basementTemperatureGauge.draw();

    var indoorHumidityGauge = new athega.dashboard.Humidity('indoorCanvas');
    indoorHumidityGauge.draw();
    var indoorTemperatureGauge = new athega.dashboard.Temperature('indoorCanvas');
    indoorTemperatureGauge.draw();

    var atticHumidityGauge = new athega.dashboard.Humidity('atticCanvas');
    atticHumidityGauge.draw();
    var atticTemperatureGauge = new athega.dashboard.Temperature('atticCanvas');
    atticTemperatureGauge.draw();

    var outdoorHumidityGauge = new athega.dashboard.Humidity('outdoorCanvas');
    outdoorHumidityGauge.draw();
    var outdoorTemperatureGauge = new athega.dashboard.Temperature('outdoorCanvas');
    outdoorTemperatureGauge.draw();

    var garageTemperatureGauge = new athega.dashboard.Temperature('garageCanvas');
    garageTemperatureGauge.draw();

    if (window.location.search.indexOf('simulate') != -1) {
	// Simulation
	
	window.setInterval(function() {
	    basementHumidityGauge.setValue(Math.random()*100);
	    basementTemperatureGauge.setValue(Math.random()*60-30);
	}, 1800);
	window.setInterval(function() {
	    indoorHumidityGauge.setValue(Math.random()*100);
	    indoorTemperatureGauge.setValue(Math.random()*60-30);
	}, 1900);
	window.setInterval(function() {
	    atticHumidityGauge.setValue(Math.random()*100);
	    atticTemperatureGauge.setValue(Math.random()*60-30);
	}, 2000);
	window.setInterval(function() {
	    outdoorHumidityGauge.setValue(Math.random()*100);
	    outdoorTemperatureGauge.setValue(Math.random()*60-30);
	}, 2100);
	window.setInterval(function() {
	    garageTemperatureGauge.setValue(Math.random()*60-30);
	}, 2200);
    } else {
	var fetchAndUpdate = function() {
	    var humidityData = new athega.dashboard.GraphiteData('http://hem.lizell.se/render?from=-2days&until=-&target=legendValue%28alias%28house.outdoors.humidity%2C%22Utomhus%22%29%2C%22last%22%29&target=legendValue%28alias%28house.basement.humidity%2C%22Kallare%22%29%2C%22last%22%29&target=legendValue%28alias%28house.attic.humidity%2C%22Vind%22%29%2C%22last%22%29&target=legendValue%28alias%28house.indoors.humidity%2C%22Inomhus%22%29%2C%22last%22%29&format=json');
	    var temperatureData = new athega.dashboard.GraphiteData('http://hem.lizell.se/render?from=-2days&until=-&target=legendValue%28alias%28house.outdoors.temperature.device%2C%22Utomhus%22%29%2C%22last%22%29&target=legendValue%28alias%28house.basement.temperature.device%2C%22Kallare%22%29%2C%22last%22%29&target=legendValue%28alias%28house.attic.temperature.device%2C%22Vind%22%29%2C%22last%22%29&target=legendValue%28alias%28house.indoors.temperature.device%2C%22Inomhus%22%29%2C%22last%22%29&target=legendValue%28alias%28house.outdoors.temperature.probe%2C%22Garage%22%29%2C%22last%22%29&format=json');

	    window.setTimeout(function() {
		basementHumidityGauge.setValue(humidityData.getLatest('Kallare'));
		basementTemperatureGauge.setValue(temperatureData.getLatest('Kallare'));
		indoorHumidityGauge.setValue(humidityData.getLatest('Inomhus'));
		indoorTemperatureGauge.setValue(temperatureData.getLatest('Inomhus'));
		atticHumidityGauge.setValue(humidityData.getLatest('Vind'));
		atticTemperatureGauge.setValue(temperatureData.getLatest('Vind'));
		outdoorHumidityGauge.setValue(humidityData.getLatest('Utomhus'));
		outdoorTemperatureGauge.setValue(temperatureData.getLatest('Utomhus'));
		garageTemperatureGauge.setValue(temperatureData.getLatest('Garage'));
	    }, 3000);
	};
	fetchAndUpdate();
	window.setInterval(fetchAndUpdate, 60000);
    }
});

if (typeof(athega) === "undefined") {athega = {};}
if (typeof(athega.dashboard) === "undefined") {athega.dashboard = {};}

athega.dashboard.log = function(msg) {
    console.log(msg);
};

athega.dashboard.Humidity = function(canvasId) {
    this.gauge = new RGraph.Gauge(canvasId, 0, 100, 0);
    this.canvas = $('#' + canvasId);

    this.init = function() {
	this.gauge.Set('chart.title', 'Luftfuktighet');
	this.gauge.Set('chart.title.bottom', this.value + '%');
	this.gauge.Set('chart.title.bottom.color', 'grey');
	this.gauge.Set('chart.title.bottom.size', 12);
	this.gauge.Set('chart.radius', 100);
	this.gauge.Set('chart.centerx', 110);
	this.gauge.Set('chart.centery', 110);
	this.gauge.Set('chart.background.color', 'Gradient(white:#dff)');
	this.gauge.Set('chart.centerpin.color' ,'black');
	this.gauge.Set('chart.centerpin.radius', 6);
	this.gauge.Set('chart.border.width', 5);

	// Debug style
	this.gauge.canvas.onmousedown = function (e) {
            var obj   = e.target.__object__;
            var value = obj.getValue(e);
            obj.value = value;
	    obj.Set('chart.title.bottom', Math.round(value) + '%');
            RGraph.Effects.Gauge.Grow(obj);
	};
    };
    this.init();

    this.draw = function() {
	athega.dashboard.log("Draw gauge: " + this.gauge.id);
	this.gauge.Set('chart.title.bottom', Math.round(this.gauge.value) + '%');
        RGraph.Effects.Gauge.Grow(this.gauge);
    };

    this.setValue = function(value) {
	athega.dashboard.log("Updating " + this.gauge.id + " value: " + value);
	this.gauge.value = value;
	this.draw();
    };
};

athega.dashboard.Temperature = function(canvasId) {
    this.thermometer = new RGraph.Thermometer(canvasId, -30, 30, 0);
    this.canvas = $('#' + canvasId);

    this.init = function() {
	this.thermometer.Set('chart.title', 'Temperatur: 0°');
	this.thermometer.Set('chart.title.hpos', 0.6); // No effect?
	this.thermometer.Set('chart.title.bold', false); // No effect?
	this.thermometer.Set('chart.gutter.left', 240);
	this.thermometer.Set('chart.gutter.right', 40);
	this.thermometer.Set('chart.gutter.bottom', 110);
	this.thermometer.Set('chart.colors', ['Gradient(#f00:#f33:#f66:#f33:#f00)']);
        this.thermometer.Set('chart.scale.visible', true);
        this.thermometer.Set('chart.scale.decimals', 1);
        this.thermometer.Set('chart.units.post', '°');

	// Debug style
	this.thermometer.canvas.onmousedown = function (e) {
            var obj   = e.target.__object__;
            var value = obj.getValue(e);
            obj.value = value;
	    obj.Set('chart.title', 'Temperatur: ' + Math.round(obj.value*10)/10 + '°');
            RGraph.Effects.Thermometer.Grow(obj);
	};
    };
    this.init();

    this.draw = function() {
	athega.dashboard.log("Draw temperature: " + this.thermometer.id);
	this.thermometer.Set('chart.title', 'Temperatur: ' + Math.round(this.thermometer.value*10)/10 + '°');
        RGraph.Effects.Thermometer.Grow(this.thermometer);
    };

    this.setValue = function(value) {
	athega.dashboard.log("Updating " + this.thermometer.id + " value: " + value);
	this.thermometer.value = value;
	this.draw();
    };
};

athega.dashboard.GraphiteData = function(url) {
    this.url = url;
    this.data = [];

    this.init = function() {
	athega.dashboard.log("Fetching data from graphite...");

	var that = this;
	$.getJSON(this.url, function(data) {
	    athega.dashboard.log("Success!");
	    that.data = data;
	});
    };
    this.init();

    this.getLatest = function(target) {
	for (var i=0; i < this.data.length; i++) {
	    if (this.data[i].target.indexOf(target) != -1) {
		return this.data[i].datapoints[this.data[i].datapoints.length-1][0];
	    }
	}

	return 0;
    };
};
