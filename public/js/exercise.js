$("#delete").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");

    // Send the PUT request.
    $.ajax("/api/exercises/" + id, {
        type: "DELETE"
    }).then(
        function () {
            console.log("deleted" + id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

$("#add").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newExercise = {
        Exercise: $("#ca[name=exercise]").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/exercises", {
        type: "POST",
        data: newExercise
    }).then(
        function () {
            console.log("added " + newExercise + ".");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});