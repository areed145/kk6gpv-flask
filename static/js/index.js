$('#first_cat').on('change', function () {
    $.ajax({
        url: "/bar",
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        data: {
            'selected': document.getElementById('first_cat').value

        },
        dataType: "json",
        success: function (data) {
            Plotly.newPlot('bargraph', data);
            Plotly.newPlot('bargraph2', data);
        }
    });
})

setInterval(function () {
    $.ajax({
        url: "/bar",
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        data: {
            'selected': document.getElementById('first_cat').value
        },
        dataType: "json",
    })
        .done(function (data) {
            Plotly.newPlot('bargraph', data);
            Plotly.newPlot('bargraph2', data);
        })
}, 1000 * 5);