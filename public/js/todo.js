$(".completed").on("click", function (event) {
    var id = $(this).data("id");
    var comp = $(this).data("complete");
    if (comp == true) {
        var newComp = {
            completed: false
        }
    } else {
        var newComp = {
            completed: true
        }
    }
    // Send the PUT request.
    $.ajax("/api/todo/" + id, {
        type: "PUT",
        data: newComp
    }).then(
        function () {
            location.reload();
        }
    );
});
$(".remove").on("click", function (event) {
    var id = $(this).data("id");
    $.ajax({
        method: "DELETE",
        url: "/api/todo/" + id
    }).then(
        function () {
            location.reload();
        }
    );
});
function add_todo() {
    event.preventDefault();
    var name = $('#name').val().trim();
    var details = $('#details').val().trim();
    var location = $('#location').val().trim();
    var date = new Date;
    var category = $('#category').val().trim();
    var difficulty = $('#difficulty').val().trim();
    var duration = $('#duration').val().trim();
    var url = "/api/todo";
    var data = {
        name: name,
        details: details,
        location: location,
        deadline: date,
        category: category,
        difficulty: difficulty,
        duration: duration,
        completed: false
    };
    $.ajax({
        type: "POST",
        url: url,
        data: data,
    }).then(function () {
        window.location.href = "/dashboard";
    });
};
$(".sms").on("click", function (event) {
    var id = $(this).data("id");
    var number = "+16479743202";
    var data = {
        number: number,
    }
    $.ajax("/api/detail/" + id, {
        type: "POST",
    }).then(function (res) {
    })
});
$(".hide").hide();

function login() {
    var username = $('#user_name').val().trim();
    var password = $('#password').val().trim();

    var url = '/api/login'

    var data = {
        username: username,
        password: password
    }

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (response) {
            localStorage.setItem('token', response.token);
            $.ajax('/auth', {
                type: 'GET',
                beforeSend: function (xhr) {
                    /* Authorization header */
                    xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('token'));
                },
                success: function (r) {
                    window.location.href = "/dashboard";
                },
            });
        }
    })
}

function createAccount() {
    event.preventDefault();
    var username = $('#user_name').val().trim();
    var password = $('#password').val().trim();
    var phone = $('#phone').val().trim();
    var url = '/api/register'

    var data = {
        username: username,
        password: password,
        phone: phone
    }

    $.ajax({
        type: "POST",
        url: url,
        data: data,
    }).then(function () {
        window.location.href = "/";
    });
}
