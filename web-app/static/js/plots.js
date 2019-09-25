if ($('#wx').length > 0) {

    $('#time_wx').on('change', function () {
        $.ajax({
            url: "/graph_wx",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'time_wx': document.getElementById('time_wx').value,
            },
            dataType: "json",
            success: function (data) {
                Plotly.plot('fig_td', data.fig_td);
                Plotly.plot('fig_pr', data.fig_pr);
                Plotly.plot('fig_pc', data.fig_pc);
                Plotly.plot('fig_wd', data.fig_wd);
                Plotly.plot('fig_su', data.fig_su);
            }
        });
    })

    setInterval(function () {
        $.ajax({
            url: "/graph_wx",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'time_wx': document.getElementById('time_wx').value,
            },
            dataType: "json",
        })
            .done(function (data) {
                Plotly.plot('fig_td', data.fig_td);
                Plotly.plot('fig_pr', data.fig_pr);
                Plotly.plot('fig_pc', data.fig_pc);
                Plotly.plot('fig_wd', data.fig_wd);
                Plotly.plot('fig_su', data.fig_su);
            })
    }, 1000 * 30);

}

if ($('#iot').length > 0) {

    $('#sensor_iot').on('change', function () {
        $.ajax({
            url: "/graph_iot",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'sensor_iot': document.getElementById('sensor_iot').value,
                'time_iot': document.getElementById('time_iot').value,
            },
            dataType: "json",
            success: function (data) {
                // Plotly.react('graph_iot', data);
                Plotly.plot('graph_iot', data);
                Plotly.deleteTraces('graph_iot', 0);
            }
        });
    })

    $('#time_iot').on('change', function () {
        $.ajax({
            url: "/graph_iot",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'sensor_iot': document.getElementById('sensor_iot').value,
                'time_iot': document.getElementById('time_iot').value,
            },
            dataType: "json",
            success: function (data) {
                // Plotly.react('graph_iot', data);
                Plotly.plot('graph_iot', data);
                Plotly.deleteTraces('graph_iot', 0);
            }
        });
    })

    setInterval(function () {
        $.ajax({
            url: "/graph_iot",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'sensor_iot': document.getElementById('sensor_iot').value,
                'time_iot': document.getElementById('time_iot').value,
            },
            dataType: "json",
        })
            .done(function (data) {
                // Plotly.react('graph_iot', data);
                Plotly.plot('graph_iot', data);
                Plotly.deleteTraces('graph_iot', 0);
            })
    }, 1000 * 5);

}

if ($('#aprs').length > 0) {

    function Proc(rows) {
        var content = '';
        for (var i = 0; i < rows.length; i++) {
            content += '<tr>';
            content += '<td>' + rows[i].timestamp_ + '</td>';
            content += '<td>' + rows[i].from + '</td>';
            content += '<td>' + rows[i].to + '</td>';
            content += '<td>' + rows[i].latitude + '</td>';
            content += '<td>' + rows[i].longitude + '</td>';
            // content += '<td>' + rows[i].speed + '</td>';
            // content += '<td>' + rows[i].altitude + '</td>';
            // content += '<td>' + rows[i].course + '</td>';
            // content += '<td>' + rows[i].raw + '</td>';
            content += '</tr>';
        }
        $('#packets tbody').html(content);
    }

    $('#type_aprs').on('change', function () {
        $.ajax({
            url: "/map_aprs",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'type_aprs': document.getElementById('type_aprs').value,
                'prop_aprs': document.getElementById('prop_aprs').value,
                'time_aprs': document.getElementById('time_aprs').value,
            },
            dataType: "json",
            success: function (data) {
                Plotly.react('map_aprs', data.map_aprs);
                Plotly.react('plot_speed', data.plot_speed);
                Plotly.react('plot_alt', data.plot_alt);
                Plotly.react('plot_course', data.plot_course);
                Proc(data.rows);
                // Plotly.plot('map_aprs', data);
                // Plotly.deleteTraces('map_aprs', 0);
            }
        });
    })

    $('#prop_aprs').on('change', function () {
        $.ajax({
            url: "/map_aprs",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'type_aprs': document.getElementById('type_aprs').value,
                'prop_aprs': document.getElementById('prop_aprs').value,
                'time_aprs': document.getElementById('time_aprs').value,
            },
            dataType: "json",
            success: function (data) {
                Plotly.react('map_aprs', data.map_aprs);
                // Plotly.react('plot_speed', data.plot_speed);
                // Plotly.react('plot_alt', data.plot_alt);
                // Plotly.react('plot_course', data.plot_course);
                // Plotly.plot('map_aprs', data);
                // Plotly.deleteTraces('map_aprs', 0);    
            }
        });
    })

    $('#time_aprs').on('change', function () {
        $.ajax({
            url: "/map_aprs",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'type_aprs': document.getElementById('type_aprs').value,
                'prop_aprs': document.getElementById('prop_aprs').value,
                'time_aprs': document.getElementById('time_aprs').value,
                // 'update': true,
            },
            dataType: "json",
            success: function (data) {
                Plotly.react('map_aprs', data.map_aprs);
                Plotly.react('plot_speed', data.plot_speed);
                Plotly.react('plot_alt', data.plot_alt);
                Plotly.react('plot_course', data.plot_course);
                Proc(data.rows);
                // Plotly.plot('map_aprs', data);
                // Plotly.deleteTraces('map_aprs', 0);    
            }
        });
    })

    setInterval(function () {
        $.ajax({
            url: "/map_aprs",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'type_aprs': document.getElementById('type_aprs').value,
                'prop_aprs': document.getElementById('prop_aprs').value,
                'time_aprs': document.getElementById('time_aprs').value,
                // 'update': true,
            },
            dataType: "json",
        })
            .done(function (data) {
                Plotly.react('map_aprs', data.map_aprs);
                Plotly.react('plot_speed', data.plot_speed);
                Plotly.react('plot_alt', data.plot_alt);
                Plotly.react('plot_course', data.plot_course);
                Proc(data.rows);
                // Plotly.plot('map_aprs', data);
                // Plotly.deleteTraces('map_aprs', 0);    
            })
    }, 1000 * 15);

}

if ($('#awc').length > 0) {

    $('#prop_awc').on('change', function () {
        $.ajax({
            url: "/map_awc",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'prop_awc': document.getElementById('prop_awc').value,
                // 'update': true,
            },
            dataType: "json",
            success: function (data) {
                Plotly.react('map_awc', data);
                // Plotly.plot('map_awc', data);
                // Plotly.deleteTraces('map_awc', 0);

            }
        });
    })

    setInterval(function () {
        $.ajax({
            url: "/map_awc",
            type: "GET",
            contentType: 'application/json;charset=UTF-8',
            data: {
                'prop_awc': document.getElementById('prop_awc').value,
                // 'update': true,
            },
            dataType: "json",
        })
            .done(function (data) {
                Plotly.react('map_awc', data);
                // Plotly.plot('map_awc', data);
                // Plotly.deleteTraces('map_awc', 0);
            })
    }, 1000 * 60);

}



