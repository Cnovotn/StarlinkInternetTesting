Chart.defaults.global.animation = true;
Chart.defaults.global.scaleOverride= true;
Chart.defaults.global.scaleSteps= 40;
Chart.defaults.global.scaleStepWidth= 0.05;
Chart.defaults.global.scaleStartValue= 0;


var ctx = document.getElementById('lineChart').getContext('2d');

var data = {
  labels: [
    "1 ",
    "2 ",
    "3 ",
    "4 ",
    "5 ",
    "6 ",
    "7 ",
    "8 ",
    "9 ",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30"
  ],
  datasets: [{
    label: "Project",
    strokeColor: "rgba(151,187,205,1)",
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)",
    data: [
      0.33771896,
      0.903282737,
      0.663260514,
      0.841077343,
      0.172840693,
      0.527583862,
      0.586053006,
      0.339909911,
      0.084783444,
      0.667623401,
      0.28230806,
      0.576872196,
      0.283560254,
      0.392021994,
      0.027079437,
      0.78877345,
      0.60766088,
      0.693946245,
      0.747793098,
      0.549464309,
      0.663950289,
      0.146906011,
      0.226665886,
      0.595716315,
      0.731450945,
      0.266750669,
      0.549809019,
      0.471936426,
      0.337574292,
      0.6042206
    ],
    error: [0.5, ]
  }, {
    label: "Average",
    strokeColor: "rgba(245, 15, 15, 0.5)",
    pointColor: "rgba(245, 15, 15, 0.5)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: [0.70934844,
      0.562981612,
      0.496916323,
      0.410302488,
      0.55354621,
      0.638516117,
      0.11923634,
      0.592052554,
      0.362319808,
      0.609749808,
      0.408806059,
      0.976615019,
      0.429490795,
      0.77335358,
      0.376380114,
      0.300234279,
      0.631140608,
      0.204527967,
      0.936175086,
      0.157800694,
      0.440542452,
      0.842018331,
      0.949835953,
      0.525569088,
      0.139740364,
      0.041009505,
      0.140629032,
      0.636014038,
      0.174089577,
      0.411988675
    ]
  }, ]
};

var options = {
  bezierCurve: false,
  datasetFill: false,
  tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
  legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].pointColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
}

var myChart = new Chart(ctx).Line(data, options);
document.getElementById('legend').innerHTML = myChart.generateLegend();

var pie = document.getElementById('pieChart').getContext('2d');
var pieData = [{
  label: 'Very High',
  color: "#c80e0e",
  highlight: "#FF5A5E",
  value: 5
}, {
  label: 'High',
  color: "#E26928",
  highlight: "#FF9C5B",
  value: 30,
}, {
  label: 'Medium',
  color: "#46BFBD",
  highlight: "#5AD3D1",
  value: 25,
}, {
  label: 'Low',
  color: "#FDB45C",
  highlight: "#FFC870",
  value: 40,
}
];

var pieOptions = {
  segmentShowStroke: true,
};

var myPie = new Chart(pie).Pie(pieData, pieOptions);
var legendNode = document.getElementById('pie-legend');
legendNode.innerHTML = myPie.generateLegend();

var helpers = Chart.helpers;
// Include a html legend template after the module doughnut itself
helpers.each(legendNode.firstChild.childNodes, function (legendNode, index) {
    helpers.addEvent(legendNode, 'mouseover', function () {
        var activeSegment = myPie.segments[index];
        activeSegment.save();
        myPie.showTooltip([activeSegment]);
        activeSegment.restore();
    });
});
helpers.addEvent(legendNode.firstChild, 'mouseout', function () {
    myPie.draw();
});
myPie.chart.canvas.parentNode.parentNode.appendChild(legendNode.firstChild);