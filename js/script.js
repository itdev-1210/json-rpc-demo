"use strict";

let data = {
    "jsonrpc": "2.0",
    "id": "TEST",
    "result": [
        {
            "id": 1,
            "cat": "Spine",
            "reg": [
                {
                    "id": 1,
                    "name": "Cervical",
                    "lat": null
                },
                {
                    "id": 2,
                    "name": "Lumbar",
                    "lat": null
                }
            ]
        },
        {
            "id": 2,
            "cat": "OA",
            "reg": [
                {
                    "id": 1,
                    "name": "Hip",
                    "lat": [
                        {
                            "id": "L",
                            "name": "Left"
                        },
                        {
                            "id": "R",
                            "name": "Right"
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Knee",
                    "lat": [
                        {
                            "id": "L",
                            "name": "Left"
                        },
                        {
                            "id": "R",
                            "name": "Right"
                        }
                    ]
                }
            ]
        }
    ]
}



$(document).ready(function () {
    var selectedCat = {};
    var selectedReg = {};

    let catHtml = '';
    data.result.map((cat) => {
        catHtml += '<option val="' + cat.cat + '">' + cat.cat + '</option>';
    });

    $('#cat').append(catHtml);

    $('#cat').change(function () {
        $('#lat').empty().append('<option></option>');
        $('#reg').empty().append('<option></option>');
        $('#lat').prop('disabled', true);
        $('#reg').prop('disabled', true);
        if ($(this).val() !== '') {
            selectedCat = data.result.find((cat) => { return cat.cat === $(this).val() });
            let regHtml = '';
            selectedCat.reg.map((reg) => {
                regHtml += '<option val="' + reg.name + '">' + reg.name + '</option>';
            });
            $('#reg').prop('disabled', false);
            $('#reg').append(regHtml);
        }
    });

    $('#reg').change(function () {
        $('#lat').empty().append('<option></option>');
        $('#lat').prop('disabled', true);

        if ($(this).val() !== '') {
            selectedReg = selectedCat.reg.find((reg) => { return reg.name === $(this).val() });
            let latHtml = '';
            if (selectedReg.lat) {
                selectedReg.lat.map((lat) => {
                    latHtml += '<option val="' + lat.name + '">' + lat.name + '</option>';
                });
                $('#lat').prop('disabled', false);
                $('#lat').append(latHtml);
            }
        }
    });
});