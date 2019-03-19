// $(document).ready(function () {

//     // Getting the initial list of exercises
//     getUserData();


//     // Function for creating a new list row for exercises
//     function createUserRow(userData) {
//         var newTr = $("<tr>");
//         newTr.data("User", userData);
//         newTr.append("<td>" + userData.username + "</td>");
//         newTr.append("<td>" + userData.password + "</td>");
//         newTr.append("<td>" + userData.first_name + "</td>");
//         newTr.append("<td>" + userData.last_name + "</td>");
//         newTr.append("<td>" + userData.email + "</td>");
//         return newTr;
//     }

//     // Function for retrieving exercises and getting them ready to be rendered to the page
//     function getUserData() {
//         $.get("/api/User", function (data) {
//             var rowsToAdd = [];
//             for (var i = 0; i < data.length; i++) {
//                 rowsToAdd.push(createUserRow(data[i]));
//             }
//             renderUserData(rowsToAdd);
//             nameInput.val("");
//         });
//     }

//     // A function for rendering the list of users to the page
//     function renderUserData(rows) {
//         userList.children().not(":last").remove();
//         if (rows.length) {
//             console.log(rows);
//             userList.prepend(rows);
//         } else {
//             renderEmpty();
//         }
//     }


//     var updateUser = {
//         username: $("#changeUser").val().trim(),
//         password: $("#inputPassword4").val().trim(),
//         first_name: $("#inputFirstName").val().trim(),
//         last_name: $("#inputAddress2").val().trim(),
//         email: $("#inputEmail").val().trim(),
//     };
//     // Send the POST request.
//     $.ajax("/api/User", {
//         type: "POST",
//         data: updateUser
//     }).then(
//         function () {
//             // If the code experiences any errors it will log the error to the console.
//             if (error) {
//                 return console.log(error);
//             }

//             console.log("added " + updateUser + ".");
//             // Reload the page to get the updated list
//             location.reload();
//         }
//     );
// });