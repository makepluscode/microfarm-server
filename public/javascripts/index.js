function updateRelayStatus(data) {
  // code later
}

function requestRelayControl(ch) {
  $.ajax({
      type: 'post',
      url: '/relay',
      data: {
          channel: ch
      },
      dataType: 'json',
      success: updateRelayStatus
  });
}

function updateData(data) {
  drawGraph(data);
}

function requestData(r) {
  $.ajax({
      type: 'post',
      url: '/dht11',
      data: {
        rack: r
      },
      dataType: 'json',
      success: updateData
  });
}

$(document).ready(function() {
  requestData('A1');
});

function drawGraph(d) {
  'use strict'

  feather.replace()

  if(d==null) {
    alert('no data');
    return;
  }

  // Graphs
  var ctx = document.getElementById('myChart')

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.label,
      datasets: [
      {
        data: d.temp,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff',
        label: 'temp',
        yAxisID: 'axis-1'
      },
      {
        data: d.humidity,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#ff0000',
        borderWidth: 4,
        pointBackgroundColor: '#ff0000',
        label: 'humidity',
        yAxisID: 'axis-2'
      }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          id: 'axis-1',
          type: 'linear',
          position: 'left'
        }, {
          id: 'axis-2',
          type: 'linear',
          position: 'right'
        }]
      },
      legend: {
        display: true
      }
    }
  })
}