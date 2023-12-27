$(document).ready(function () {

    load_data();

    function load_data() {
        $.ajax({
            url: "http://localhost:3000/students/dashboard_student/action",
            method: "POST",
            data: { action: 'fetch' },
            dataType: "JSON",
            success: function (data) {
                var html = '';

                if (data.data.length > 0) {
                    for (var count = 0; count < data.data.length; count++) {
                        html += `
                <tr >
                    <td >`+ data.data[count].Nom + `</td>
                    <td>`+ data.data[count].Prenom + `</td>
                    <td >`+ data.data[count].Cen + `</td>
                    <td >`+ data.data[count].Cin + `</td>
                    <td >`+ data.data[count].Tel + `</td>
                    <td >`+ data.data[count].Adresse + `</td>
                    <td >`+ data.data[count].Email + `</td>
                    <td >`+ data.data[count].Password + `</td>
                    <td>
                        ` + (data.data[count].Etat === 1 ? '<span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> Approved </span>' :
                                '<span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700"> Expired </span>') + `
                    </td>
                    <td >`+ data.data[count].Cartier + `</td>
                    <td> <button type="button" class="btn btn-warning btn-sm edit" data-id="${data.data[count].Id_student}">Edit</button> &nbsp;
                        <button type="button" class="btn btn-danger btn-sm delete" data-id="${data.data[count].Id_student}">Delete</button>
                    </td>
                </tr>
              `;
                    }
                }

                $('#student_data tbody').html(html);
                $('#student_data').DataTable();
            }
        });
    }

    $('#add_data').click(function () {

        $('#dynamic_modal_title').text('Add Data');

        $('#student_form')[0].reset();

        $('#action').val('Add');

        $('#action_button').text('Add');

        $('#action_modal').modal('show');

    });

    $('#student_form').on('submit', function (event) {

        event.preventDefault();

        $.ajax({
            url: "http://localhost:3000/students/dashboard_student/action",
            method: "POST",
            data: $('#student_form').serialize(),
            dataType: "JSON",
            beforeSend: function () {
                $('#action_button').attr('disabled', 'disabled');
            },
            success: function (data) {
                $('#action_button').attr('disabled', false);

                $('#message').html('<div class="alert alert-success">' + data.message + '</div>');

                $('#action_modal').modal('hide');

                load_data();

                setTimeout(function () {
                    $('#message').html('');
                }, 5000);
            }
        });

    });

    $(document).on('click', '.edit', function () {

        var id = $(this).data('id');

        $('#dynamic_modal_title').text('Edit Data');

        $('#action').val('Edit');

        $('#action_button').text('Edit');

        $('#action_modal').modal('show');

        $.ajax({
            url: "http://localhost:3000/students/dashboard_student/action",
            method: "POST",
            data: { id: id, action: 'fetch_single' },
            dataType: "JSON",
            success: function (data) {
                $('#txt_nom').val(data.Nom);
                $('#txt_prenom').val(data.Prenom);
                $('#txt_cen').val(data.Cen);
                $('#txt_cin').val(data.Cin);
                $('#txt_tel').val(data.Tel);
                $('#txt_adresse').val(data.Adresse);
                $('#txt_email').val(data.Email);
                $('#txt_password').val(data.Password);
                $('#txt_etat').val(data.Etat);
                $('#select_cartier').val(data.Cartier);
                $('#id').val(data.Id_student);
            }
        });

    });

    $(document).on('click', '.delete', function () {

        var id = $(this).data('id');

        if (confirm("Are you sure you want to delete this data?")) {
            $.ajax({
                url: "http://localhost:3000/students/dashboard_student/action",
                method: "POST",
                data: { action: 'delete', id: id },
                dataType: "JSON",
                success: function (data) {
                    $('#message').html('<div class="alert alert-success">' + data.message + '</div>');
                    load_data();
                    setTimeout(function () {
                        $('#message').html('');
                    }, 5000);
                }
            });
        }

    });
    load_data();
});

