$(document).ready(function() {
    // Getting references to the name input and exercise container, as well as the table body
    var nameInput = $("#ca");
    var exerciseList = $("tbody");
    var exerciseContainer = $(".exercise-container");

    // Getting the initial list of exercises
    getExercises();


    // Function for creating a new list row for exercises
    function createExerciseRow(exerciseData) {
        var newTr = $("<tr>");
        newTr.data("exercise", exerciseData);
        newTr.append("<td>" + exerciseData.Exercise + "</td>");
        newTr.append("<td><a class='btn btn-primary' id='delete-exercise'>Delete Exercise</a></td>");
        return newTr;
    }

    // Function for retrieving exercises and getting them ready to be rendered to the page
    function getExercises() {
        $.get("/api/exercise", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createExerciseRow(data[i]));
            }
            renderExerciseList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of exercises to the page
    function renderExerciseList(rows) {
        exerciseList.children().not(":last").remove();
        exerciseContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            exerciseList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    $("#delete-exercise").on("click", function (event) {
        event.preventDefault();

        var listItemData = $(this).parent("td").parent("tr").data("exercise");
        var id = listItemData.id;

        //var id = $(this).data("id");

        // Send the DESTROY request.
        $.ajax("/api/exercise/" + id, {
            type: "DELETE"
        }).then(
            function () {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
                }

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
        $.ajax("/api/exercise", {
            type: "POST",
            data: newExercise
        }).then(
            function () {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
                }

                console.log("added " + newExercise + ".");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
  

