$(function() {
    var basementHumidityGauge = new athega.dashboard.Humidity('basementCanvas');
    basementHumidityGauge.draw();
    var basementTemperatureGauge = new athega.dashboard.Temperature('basementCanvas');
    basementTemperatureGauge.draw();
    var basementHumidityTrend = new athega.dashboard.HumidityTrend('basementCanvas');
    basementHumidityTrend.draw();
    var basementTemperatureTrend = new athega.dashboard.TemperatureTrend('basementCanvas');
    basementTemperatureTrend.draw();

    var indoorHumidityGauge = new athega.dashboard.Humidity('indoorCanvas');
    indoorHumidityGauge.draw();
    var indoorTemperatureGauge = new athega.dashboard.Temperature('indoorCanvas');
    indoorTemperatureGauge.draw();
    var indoorHumidityTrend = new athega.dashboard.HumidityTrend('indoorCanvas');
    indoorHumidityTrend.draw();
    var indoorTemperatureTrend = new athega.dashboard.TemperatureTrend('indoorCanvas');
    indoorTemperatureTrend.draw();

    var atticHumidityGauge = new athega.dashboard.Humidity('atticCanvas');
    atticHumidityGauge.draw();
    var atticTemperatureGauge = new athega.dashboard.Temperature('atticCanvas');
    atticTemperatureGauge.draw();
    var atticHumidityTrend = new athega.dashboard.HumidityTrend('atticCanvas');
    atticHumidityTrend.draw();
    var atticTemperatureTrend = new athega.dashboard.TemperatureTrend('atticCanvas');
    atticTemperatureTrend.draw();

    var outdoorHumidityGauge = new athega.dashboard.Humidity('outdoorCanvas');
    outdoorHumidityGauge.draw();
    var outdoorTemperatureGauge = new athega.dashboard.Temperature('outdoorCanvas');
    outdoorTemperatureGauge.draw();
    var outdoorHumidityTrend = new athega.dashboard.HumidityTrend('outdoorCanvas');
    outdoorHumidityTrend.draw();
    var outdoorTemperatureTrend = new athega.dashboard.TemperatureTrend('outdoorCanvas');
    outdoorTemperatureTrend.draw();

    var garageTemperatureGauge = new athega.dashboard.Temperature('garageCanvas');
    garageTemperatureGauge.draw();
    var garageTemperatureTrend = new athega.dashboard.TemperatureTrend('garageCanvas');
    garageTemperatureTrend.draw();

    if (window.location.search.indexOf('simulate') != -1) {
	// Simulation
	
	window.setInterval(function() {
	    basementHumidityGauge.setValue(Math.random()*100);
	    basementTemperatureGauge.setValue(Math.random()*60-30);
	}, 2800);
	window.setInterval(function() {
	    indoorHumidityGauge.setValue(Math.random()*100);
	    indoorTemperatureGauge.setValue(Math.random()*60-30);
	}, 2900);
	window.setInterval(function() {
	    atticHumidityGauge.setValue(Math.random()*100);
	    atticTemperatureGauge.setValue(Math.random()*60-30);
	}, 3000);
	window.setInterval(function() {
	    outdoorHumidityGauge.setValue(Math.random()*100);
	    outdoorTemperatureGauge.setValue(Math.random()*60-30);
	}, 3100);
	window.setInterval(function() {
	    garageTemperatureGauge.setValue(Math.random()*60-30);
	    $('#updated').text(new Date());
	}, 3200);
    } else {
	var fetchAndUpdate = function() {
	    var humidityData = new athega.dashboard.GraphiteData('http://hem.lizell.se/render?from=-2days&until=-&target=legendValue%28alias%28house.outdoors.humidity%2C%22Utomhus%22%29%2C%22last%22%29&target=legendValue%28alias%28house.basement.humidity%2C%22Kallare%22%29%2C%22last%22%29&target=legendValue%28alias%28house.attic.humidity%2C%22Vind%22%29%2C%22last%22%29&target=legendValue%28alias%28house.indoors.humidity%2C%22Inomhus%22%29%2C%22last%22%29&format=json');
	    var temperatureData = new athega.dashboard.GraphiteData('http://hem.lizell.se/render?from=-2days&until=-&target=legendValue%28alias%28house.outdoors.temperature.device%2C%22Utomhus%22%29%2C%22last%22%29&target=legendValue%28alias%28house.basement.temperature.device%2C%22Kallare%22%29%2C%22last%22%29&target=legendValue%28alias%28house.attic.temperature.device%2C%22Vind%22%29%2C%22last%22%29&target=legendValue%28alias%28house.indoors.temperature.device%2C%22Inomhus%22%29%2C%22last%22%29&target=legendValue%28alias%28house.outdoors.temperature.probe%2C%22Garage%22%29%2C%22last%22%29&format=json');

	    window.setTimeout(function() {
		basementHumidityGauge.setValue(humidityData.getLatest('Kallare'));
		basementTemperatureGauge.setValue(temperatureData.getLatest('Kallare'));
		basementHumidityTrend.setData(humidityData.getTrend('Kallare'));
		basementTemperatureTrend.setData(temperatureData.getTrend('Kallare'));
		indoorHumidityGauge.setValue(humidityData.getLatest('Inomhus'));
		indoorTemperatureGauge.setValue(temperatureData.getLatest('Inomhus'));
		indoorHumidityTrend.setData(humidityData.getTrend('Inomhus'));
		indoorTemperatureTrend.setData(temperatureData.getTrend('Inomhus'));
		atticHumidityGauge.setValue(humidityData.getLatest('Vind'));
		atticTemperatureGauge.setValue(temperatureData.getLatest('Vind'));
		atticHumidityTrend.setData(humidityData.getTrend('Vind'));
		atticTemperatureTrend.setData(temperatureData.getTrend('Vind'));
		outdoorHumidityGauge.setValue(humidityData.getLatest('Utomhus'));
		outdoorTemperatureGauge.setValue(temperatureData.getLatest('Utomhus'));
		outdoorHumidityTrend.setData(humidityData.getTrend('Utomhus'));
		outdoorTemperatureTrend.setData(temperatureData.getTrend('Utomhus'));
		garageTemperatureGauge.setValue(temperatureData.getLatest('Garage'));
		garageTemperatureTrend.setData(temperatureData.getTrend('Garage'));
		$('#updated').text(new Date());
	    }, 3000);
	};
	fetchAndUpdate();
	window.setInterval(fetchAndUpdate, 60000);
    }
});

if (typeof(athega) === "undefined") {athega = {};}
if (typeof(athega.dashboard) === "undefined") {athega.dashboard = {};}

athega.dashboard.log = function(msg) {
    if (window.location.search.indexOf('debug') != -1) {
	console.log(msg);
    }
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
	this.gauge.Set('chart.green.end', 75);
	this.gauge.Set('chart.centerpin.color' ,'black');
	this.gauge.Set('chart.centerpin.radius', 6);
	this.gauge.Set('chart.border.width', 5);
    };
    this.init();

    this.draw = function() {
	athega.dashboard.log("Draw gauge: " + this.gauge.id);
	this.gauge.Set('chart.title.bottom', Math.round(this.gauge.value) + '%');
	if (this.gauge.value >= 90) {
	    this.gauge.Set('chart.background.color', RGraph.RadialGradient(this.gauge, 110, 110, 0, 110, 110, 100, 'white', '#f63'));
	} else if (this.gauge.value >= 75) {
	    this.gauge.Set('chart.background.color', RGraph.RadialGradient(this.gauge, 110, 110, 0, 110, 110, 100, 'white', '#fd3'));
	} else {
	    this.gauge.Set('chart.background.color', RGraph.RadialGradient(this.gauge, 110, 110, 0, 110, 110, 100, 'white', '#dff'));
	}
	
        RGraph.Effects.Gauge.Grow(this.gauge);
    };

    this.setValue = function(value) {
	if (value !== null) {
	    athega.dashboard.log("Updating " + this.gauge.id + " value: " + value);
	    this.gauge.value = value;
	    this.draw();
	}
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
    };
    this.init();

    this.draw = function() {
	athega.dashboard.log("Draw temperature: " + this.thermometer.id);
	this.thermometer.Set('chart.title', 'Temperatur: ' + Math.round(this.thermometer.value*10)/10 + '°');
	if (this.thermometer.value > 0) {
	    this.thermometer.Set('chart.colors', ['#1d1']);
	} else {
	    this.thermometer.Set('chart.colors', ['f33']);
	}
        RGraph.Effects.Thermometer.Grow(this.thermometer);
    };

    this.setValue = function(value) {
	if (value !== null) {
	    athega.dashboard.log("Updating " + this.thermometer.id + " value: " + value);
	    this.thermometer.value = value;
	    this.draw();
	}
    };
};

athega.dashboard.HumidityTrend = function(canvasId) {
    this.trend = new RGraph.Line(canvasId, [23,24,14,74,46,57,86,36,52,45,25,36]);

    this.init = function() {
	this.trend.Set('chart.gutter.bottom', 10);
	this.trend.Set('chart.gutter.top', 240);
	this.trend.Set('chart.gutter.right', 175);
	this.trend.Set('chart.scale.decimals', 0);
	this.trend.Set('chart.noaxes', true);
	this.trend.Set('chart.spline', true);
    };
    this.init();

    this.draw = function() {
	athega.dashboard.log("Draw line: " + this.trend.id);
    };

    this.setData = function(data) {
	athega.dashboard.log("Updating " + this.trend.id + " with " + data.length + " datapoints");
	this.trend.Set('chart.ymin', this.getMin(data));
	this.trend.Set('chart.ymax', this.getMax(data));
	this.trend.original_data[0] = data;
	this.draw();
    };

    this.getMin = function(data) {
	var min = 100;
	for (var i=0; i < data.length; i++) {
	    if (data[i] < min) {
		min = data[i];
	    }
	}
	athega.dashboard.log("Min value is " + min);
	if (min < 0) {
	    this.trend.Set('chart.xaxispos', 'center');
	}
	return min;
    };

    this.getMax = function(data) {
	var max = 0;
	for (var i=0; i < data.length; i++) {
	    if (data[i] > max) {
		max = data[i];
	    }
	}
	athega.dashboard.log("Max value is " + max);
	return max;
    };
};

athega.dashboard.TemperatureTrend = function(canvasId) {
    this.trend = new athega.dashboard.HumidityTrend(canvasId);

    this.init = function() {
	this.trend.trend.Set('chart.gutter.right', 0);
	this.trend.trend.Set('chart.gutter.left', 175);
    };
    this.init();

    this.draw = function() {
	this.trend.draw();
    };

    this.setData = function(data) {
	this.trend.setData(data);
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

    this.getTrend = function(target) {
	var trend = [];
	for (var i=0; i < this.data.length; i++) {
	    if (this.data[i].target.indexOf(target) != -1) {
		for (var j=0; (j < this.data[i].datapoints.length && trend.length < 50); j += 10) {
		    trend.push(this.data[i].datapoints[j][0]);
		}
	    }
	}
	athega.dashboard.log("Trend data: " + trend);
	return trend;
    };
};
