const echarts = require("echarts");
const { createCanvas } = require('canvas')

const {JSDOM} = require('jsdom');
const fs = require('fs');
echarts.setCanvasCreator(() => {
  return createCanvas(200, 200);
});

const {window} = new JSDOM();
global.window = window;
global.navigator = window.navigator;
global.document = window.document;

const root = document.createElement('div');
root.style.cssText = 'width: 500px; height: 500px;';
Object.defineProperty(root, "clientWidth", {value: 500});
Object.defineProperty(root, "clientHeight", {value: 500});

const chart = echarts.init(root, null, {
    renderer: 'svg'
});
chart.setOption({
    title: {
        text: 'ECharts Test'
    },
    tooltip: {},
    legend: {
        data: ['legend']
    },
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    yAxis: {},
    series: [{
        animation: false,
        name: 'legend',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});

fs.writeFileSync('basic.svg', root.querySelector('svg').outerHTML, 'utf-8');

chart.dispose();
