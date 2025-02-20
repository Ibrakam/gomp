// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

var spinner = "<span style=\"font-size: 3em;\"><i class=\"fas fa-cog fa-spin\"></i></span>";

//#region Metodi generici

function popolateDropDown(controllerPath, id, firstString) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: controllerPath,
        success: function (data) {
            $("#" + id).append($("<option />").val("").text(firstString));
            $.each(data,
                function () {
                    $("#" + id).append($("<option />").val(this.id).text(this.denominazione));
                });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function dynamicSelect(params) {
    $('#' + params.drop).select2({
        allowClear: true,
        placeholder: params.stringSearch,
        minimumInputLength: 3,
        language: {
            inputTooShort: function () { return 'Inserire almeno 3 caratteri'; },
            searching: function () { return "Ricerca in corso..."; },
            noResults: function () { return "Nessun risultato trovato"; }
        },
        ajax: {
            url: params.dropControllerPath,
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term
                };
            },
            processResults: function (data) {
                return { results: data.results };
            }
        }
    });
}

//#endregion

//#region Funzioni di supporto

function prefilling() {
    $('input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea').each(function (element, i) {
        if ((i.value !== undefined && i.value !== "")) {
            $(this).siblings('label').addClass('active');
        }
        else {
            $(this).siblings('label').removeClass('active');
        }
    });
}

//#endregion

function popolateAuthTypesDropDown(selectId, firstString, id) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/UserAccount/GetAuthTypes',
        success: function (data) {
            $("#" + selectId).append($("<option />").val("").text(firstString));
            $.each(data,
                function () {
                    $("#" + selectId).append($("<option />").val(this.authMode).text(this.denominazione));
                });

            if (id !== null && id !== undefined) {
                $("#" + selectId).val(id);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//#region Funzioni per dataTable

function dataTable(params) {
    dynamicSelect(params);    

    $('#' + params.tableName).DataTable({
        "language": {
            "emptyTable": "Nessun dato presente nella tabella",
            "lengthMenu": "Visualizza _MENU_ righe per pagina",
            "zeroRecords": "Nessun risultato",
            "info": "Pagina _PAGE_ di _PAGES_",
            "infoEmpty": "Nessun dato presente",
            "search": "Filtro:",
            "paginate": {
                "first": "Inizio",
                "last": "Fine",
                "next": "Avanti",
                "previous": "Indietro"
            }
        },
        "autoWidth": false
    });
    $('.dataTables_length').addClass('bs-select');

    setAddButton(params);
}

function setAddButton(params) {
    $('#' + params.buttonAdd).click(function () {
        $.ajax({
            type: 'POST',
            dataType: 'html',
            url: params.addControllerPath,
            data: { id: $("#" + params.drop).val(), pipeId: $("#pipeId").val() },
            success: function (res) {
                $("#" + params.drop + "Div").html(res);
                dataTable(params);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    });
}

function setDeleteButton(id, params) {
    $.ajax({
        type: 'POST',
        dataType: 'html',
        url: params.deletePath,
        data: { id: id, pipeId: $("#pipeId").val() },
        success: function (res) {
            $("#" + params.drop + "Div").html(res);
            dataTable(params);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//#endregion

//#region Codice commentato

//function popolateTable(divId, controllerPathGet, controllerPathAdd) {
//    $("#" + divId).html(spinner);

//    var table = document.createElement('table');
//    table.id = "rightsTable";
//    table.className = "table table-hover table-striped table-bordered table-sm";
//    table.cellSpacing = 0;
//    table.width = "100%";
//    var tableHead = document.createElement('thead');
//    var tr = document.createElement('tr');

//    //#region Head
//    var th = document.createElement('th');
//    th.className = "th-sm";
//    th.innerText = "Denominazione";
//    tr.append(th);

//    th = document.createElement('th');
//    th.className = "th-sm";
//    th.innerText = "R";
//    tr.append(th);

//    th = document.createElement('th');
//    th.className = "th-sm";
//    th.innerText = "W";
//    tr.append(th);

//    th = document.createElement('th');
//    th.className = "th-sm";
//    th.innerText = "L";
//    tr.append(th);

//    th = document.createElement('th');
//    th.className = "th-sm";
//    th.innerText = "D";
//    tr.append(th);

//    th = document.createElement('th');
//    th.className = "th-sm";
//    th.innerText = "O";
//    tr.append(th);

//    th = document.createElement('th');
//    th.className = "th-sm";
//    th.innerText = "";
//    tr.append(th);

//    tableHead.append(tr);
//    table.append(tableHead);
//    //#endregion    

//    var td = document.createElement('td');

//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        url: controllerPathGet,
//        success: function (data) {
//            var tableBody = document.createElement('tbody');

//            //#region Body
//            $.each(data, function (item, value) {
//                tr = document.createElement('tr');

//                td = document.createElement('td');
//                td.className = "align-middle";
//                td.innerText = value.denominazione;
//                tr.append(td);

//                td = document.createElement('td');
//                td.className = "align-middle";
//                td.innerText = "";
//                tr.append(td);

//                td = document.createElement('td');
//                td.className = "align-middle";
//                td.innerText = "";
//                tr.append(td);

//                td = document.createElement('td');
//                td.className = "align-middle";
//                td.innerText = "";
//                tr.append(td);

//                td = document.createElement('td');
//                td.className = "align-middle";
//                td.innerText = "";
//                tr.append(td);

//                td = document.createElement('td');
//                td.className = "align-middle";
//                td.innerText = "";
//                tr.append(td);

//                td = document.createElement('td');
//                td.style.textAlign = "center";
//                var deleteButton = document.createElement('button');
//                deleteButton.id = "addRight_" + value.id;
//                deleteButton.className = "btn btn-outline-danger waves-effect";
//                deleteButton.type = "button";
//                deleteButton.innerHTML = "<i class=\"fas fa-times\" style=\"font-size: 1.5em;\"></i>";
//                deleteButton.click(function () {

//                });
//                td.append(deleteButton);
//                tr.append(td);

//                tableBody.append(tr);
//                table.append(tableBody);
//            });

//            //#endregion

//            //#region Footer

//            var tableFooter = document.createElement('tfoot');
//            tr = document.createElement('tr');
//            td = document.createElement('td');
//            td.colSpan = 6;
//            td.className = "align-middle";
//            var drop = document.createElement('select');
//            drop.id = "rights";
//            drop.style.width = "100%";
//            td.append(drop);
//            tr.append(td);
//            td = document.createElement('td');
//            td.style.textAlign = "center";
//            var addButton = document.createElement('button');
//            addButton.id = "addRight";
//            addButton.className = "btn btn-outline-success waves-effect";
//            addButton.type = "button";
//            addButton.innerHTML = "<i class=\"fas fa-plus-circle\" style=\"font-size: 1.5em;\"></i>";
//            addButton.click(function () {
//                //$.ajax({
//                //    type: 'POST',
//                //    dataType: 'json',
//                //    url: controllerPathAdd,
//                //    success: function (data) {
//                //        popolateTable(divId, controllerPathGet, controllerPathAdd);
//                //    },
//                //    error: function (XMLHttpRequest, textStatus, errorThrown) {
//                //        alert(errorThrown);
//                //    }
//                //});
//            });
//            td.append(addButton);
//            tr.append(td);
//            tableFooter.append(tr);
//            table.append(tableFooter);

//            //#endregion

//            $("#rightsTable").DataTable();
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            alert(errorThrown);
//        }
//    });

//    $("#" + divId).html(table);
//}

//#endregion