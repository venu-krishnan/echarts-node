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
        data: ['movement', 'movement1']
    },
    xAxis: {
        type: 'category',
    },
    grid: {
        left: '30%'},
    yAxis: {
        type: 'value'
    },
    series: [{
        animation: false,
        name: 'movement',
        type: 'line',
        stack: 'Total',
        data: [['2019-10-29',0.0],['2019-10-30',0.1],['2019-10-31',0.2]]
    },
    {
        animation: false,
        name: 'movement1',
        type: 'line',
        stack: 'Total',
        data: [['2019-10-29',0.1],['2019-10-30',0.2],['2019-10-32',0.3]]
    }]
});

fs.writeFileSync('output.svg', root.querySelector('svg').outerHTML, 'utf-8');

chart.dispose();
