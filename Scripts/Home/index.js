 /*Load Data in Table when document is ready*/
$(document).ready(function () {
    loadData(); // Load data first
});
// Load Data function
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.EmployeeID + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Age + '</td>';
                html += '<td>' + item.State + '</td>';
                html += '<td>' + item.Country + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.EmployeeID + ')">Edit</a> | <a href="#" onclick="Delete(' + item.EmployeeID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
            $('#dataTableData').DataTable(); // Initialize DataTable here
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Function for getting the Data Based upon Employee ID
function getbyID(EmpID) {
    $('#txtName').css('border-color', 'lightgrey');
    $('#txtAge').css('border-color', 'lightgrey');
    $('#txtState').css('border-color', 'lightgrey');
    $('#txtCountry').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtEmployeeID').val(result.EmployeeID);
            $('#txtName').val(result.Name);
            $('#txtAge').val(result.Age);
            $('#txtState').val(result.State);
            $('#txtCountry').val(result.Country);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnSaveEmployee').hide();
            closeForm();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

// Function for updating employee's record
function Update() {
      
    var Empdata = {
        employeeID: $('#txtEmployeeID').val(),
        name: $('#txtName').val(),
        age: $('#txtAge').val(),
        state: $('#txtState').val(),// State value collected here
        country: $('#txtCountry').val()
    } 
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(Empdata),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#txtEmployeeID').val("");
            $('#txtName').val("");
            $('#txtAge').val("");
            $('#txtState').val("");
            $('#txtCountry').val("");
            closeForm();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Function for deleting employee's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
/* Function for clearing the textboxes*/
function clearTextBox() {
    $('#employeeForm').trigger("reset");
}
//function closeForm() {
//    $(document).on('click', '#btnCloseEmployee', function () {
//        $('#myModal').modal('hide');        
//    });
//}

function closeForm() {
    $('#myModal').modal('hide');
}

// Bind the close button click event once
$(document).on('click', '#btnCloseEmployee', function () {
    closeForm();
});

