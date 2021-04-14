
/*
Global Chart Styling

*/


Chart.defaults.global.title.fontSize = 20;
Chart.defaults.global.title.fontFamily = 'Cantarell';
Chart.defaults.global.title.fontColor = "rgb(0,0,0)";
Chart.defaults.global.defaultFontColor = "rgb(0,0,0)";
Chart.defaults.global.defaultFontFamily = 'Helvetica';





/* 

Chart


*/

var ctx = document.getElementById('myChart');
var monthlySales = [200, 150, 300, 75, 196, 111, 66, 150]
var frameworks = ['Plain Vanilla', 'Honeycomb', 'Rum and Raisin', 'Mint', 'Cherry', 'Chocolate', 'Salted Caramel', 'Strawberry'];
var myChart = new Chart (ctx, {
    type: 'pie',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Sales of flavours',
            data: monthlySales,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(154, 162, 235, 0.6)",
                "rgba(155, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 102, 90, 0.6)",
                "rgba(235, 255, 60, 0.6)",
                "rgba(88, 167, 121, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(154, 162, 235, 1)",
                    "rgba(155, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 102, 90, 1)",
                    "rgba(235, 255, 60, 1)",
                    "rgba(88, 167, 121, 1)",
                    ],
                    borderWidth: 1
        }]
    },
    options: {
            title: {
            display: true,
            text: 'Flavours Sold This Month'}
    }
} )

/* 

Chart


*/
var ctx2 = document.getElementById('myChartTwo');
var orders = [600, 300]

var frameworks = ['Collection', 'Delivery'];
var myChart = new Chart (ctx2, {
    type: 'doughnut',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Github monthlySales',
            data: orders,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
        
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
      
                    ],
                    borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: false,
        title: {
            display: true,
            text: 'Monthly Orders for Collection or Delivery',

        }
    }
})

/* 

Chart


*/

var ctx3 = document.getElementById('myChartThree');
var orders = [100, 200, 400, 300, 200]

var frameworks = ['Small', 'Medium', 'Large', 'Extra Large', 'Extra Extra Large'];
var myChart = new Chart (ctx3, {
    type: 'bar',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Monthly Sales by Size',
            data: orders,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(235, 255, 60, 0.6)",
                "rgba(155, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
        
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(235, 255, 60, 0.6)",
                    "rgba(155, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
      
                    ],
                    borderWidth: 1
        }]
    },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Monthly Sales by Size',
    
        }}}
    
)

/* 

Chart


*/

var ctx4 = document.getElementById('myChartFour');
var monthlySales = [50, 65, 75, 50, 150, 400, 300]
var frameworks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var myChart = new Chart (ctx4, {
    type: 'line',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Sales Per Day',
            data: monthlySales,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(154, 162, 235, 0.6)",
                "rgba(155, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 102, 90, 0.6)",
                "rgba(235, 255, 60, 0.6)",
                "rgba(88, 167, 121, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(154, 162, 235, 1)",
                    "rgba(155, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 102, 90, 1)",
                    "rgba(235, 255, 60, 1)",
                    "rgba(88, 167, 121, 1)",
                    ],
                    borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Monthly Sales by Day',

    }}} )

    /* 

Chart


*/

var ctx = document.getElementById('myChartWeekly');
var monthlySales = [200, 150, 300, 75, 196, 111, 66, 150]
var frameworks = ['Plain Vanilla', 'Honeycomb', 'Rum and Raisin', 'Mint', 'Cherry', 'Chocolate', 'Salted Caramel', 'Strawberry'];
var myChart = new Chart (ctx, {
    type: 'pie',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Sales of flavours',
            data: monthlySales,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(154, 162, 235, 0.6)",
                "rgba(155, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 102, 90, 0.6)",
                "rgba(235, 255, 60, 0.6)",
                "rgba(88, 167, 121, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(154, 162, 235, 1)",
                    "rgba(155, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 102, 90, 1)",
                    "rgba(235, 255, 60, 1)",
                    "rgba(88, 167, 121, 1)",
                    ],
                    borderWidth: 1
        }]
    },
    options: {
            title: {
            display: true,
            text: 'Flavours Sold This Week'}
    }
} )

/* 

Chart


*/
var ctx2 = document.getElementById('myChartTwoWeekly');
var orders = [600, 300]

var frameworks = ['Collection', 'Delivery'];
var myChart = new Chart (ctx2, {
    type: 'doughnut',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Github monthlySales',
            data: orders,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
        
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
      
                    ],
                    borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: false,
        title: {
            display: true,
            text: 'Weekly Orders for Collection or Delivery',

        }
    }
})

/* 

Chart


*/
var ctx3 = document.getElementById('myChartThreeWeekly');
var orders = [100, 200, 400, 300, 200]

var frameworks = ['Small', 'Medium', 'Large', 'Extra Large', 'Extra Extra Large'];
var myChart = new Chart (ctx3, {
    type: 'bar',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Weekly Sales by Size',
            data: orders,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(235, 255, 60, 0.6)",
                "rgba(155, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
        
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(235, 255, 60, 0.6)",
                    "rgba(155, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
      
                    ],
                    borderWidth: 1
        }]
    },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Weekly Sales by Size',
    
        }}}
    
)
/* 

Chart


*/

var ctx4 = document.getElementById('myChartFourWeekly');
var weeklySales = [50, 65, 75, 50, 150, 400, 300]
var frameworks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var myChart = new Chart (ctx4, {
    type: 'line',
    data: {
        labels: frameworks, 
        datasets: [{
            label: 'Sales Per Day',
            data: weeklySales,
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(154, 162, 235, 0.6)",
                "rgba(155, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 102, 90, 0.6)",
                "rgba(235, 255, 60, 0.6)",
                "rgba(88, 167, 121, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(154, 162, 235, 1)",
                    "rgba(155, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 102, 90, 1)",
                    "rgba(235, 255, 60, 1)",
                    "rgba(88, 167, 121, 1)",
                    ],
                    borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Weekly Sales by Day',

    }}} )




