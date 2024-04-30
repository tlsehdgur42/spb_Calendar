document.addEventListener("DOMContentLoaded", function() {
    var viewNotificationsBtn = document.getElementById("viewNotificationsBtn");
    var notificationsPopup = document.getElementById("notificationsPopup");
    var closeEventsBtn = document.getElementById("closeBtn3");
    var notificationImg = document.getElementById("notificationImg");
    var page = 0;
    var pageSize = 10;

    fetch("/notifications?page=" + page + "&pageSize=" + pageSize)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error retrieving events data");
            }
        })
        .then(function(notifications) {
            if (notifications.length > 0) {
                notificationImg.classList.remove("hidden");
            } else {
                notificationImg.classList.add("hidden");
            }
        });
    viewNotificationsBtn.addEventListener("click", function (){
        notificationsPopup.style.display = "block";
        var notificationsList = document.getElementById("notificationsList");
        notificationsList.innerHTML = "";

        fetch("/notifications?page=" + page + "&pageSize=" + pageSize)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error retrieving events data");
                }
            })
            .then(function(notifications) {
                if (notifications.length > 0) {
                    notificationImg.classList.remove("hidden");
                    notifications.forEach(function(notification){
                        var notificationItem = document.createElement("li");
                        notificationItem.className = "notification-item";

                        var confirmBtn = document.createElement("button");
                        confirmBtn.textContent = "Confirm";
                        notificationItem.appendChild(confirmBtn);
                        confirmBtn.className = "confirmBtn";

                        confirmBtn.addEventListener("click", function (){
                            var notificationId = notification.id;
                            fetch("/confirmNotification?id=" + notificationId , {
                                method: "PUT"
                            })
                                .then(function(response) {
                                    if (response.ok) {
                                        notificationItem.remove();
                                        notificationImg.classList.add("hidden");
                                        var successfulPopUp = document.getElementById("successfulPopUp3");
                                        var closeSuccessfulPopUp = document.getElementById("closeSuccessfulPopUp3");
                                        successfulPopUp.style.display = "block";
                                        closeSuccessfulPopUp.addEventListener("click", function() {
                                            successfulPopUp.style.display = "none"; // makes the popup form invisible
                                        });
                                        //window.location.href = "/calendar";
                                    } else {
                                        throw new Error("Error confirming event");
                                    }
                                })
                                .catch(function(error) {
                                    console.error("Error confirming event:", error);
                                    throw new Error("Error confirming event");
                                });
                        });

                        var rejectBtn = document.createElement("button");
                        rejectBtn.textContent = "Reject";
                        notificationItem.appendChild(rejectBtn);
                        rejectBtn.className = "rejectBtn";

                        rejectBtn.addEventListener("click", function (){
                            var notificationId = notification.id;
                            fetch("/deleteNotification?id=" + notificationId , {
                                method: "DELETE"
                            })
                                .then(function(response){
                                    if (response.ok) {
                                        notificationImg.classList.add("hidden");
                                        notificationItem.remove();
                                        var successfulPopUp = document.getElementById("successfulPopUp2");
                                        var closeSuccessfulPopUp = document.getElementById("closeSuccessfulPopUp2");
                                        successfulPopUp.style.display = "block";
                                        closeSuccessfulPopUp.addEventListener("click", function() {
                                            successfulPopUp.style.display = "none"; // makes the popup form invisible
                                        });
                                    }
                                    else {
                                        throw new Error("Error rejecting event");
                                    }
                                })
                                .catch(function(error) {
                                    console.error("Error rejecting event:", error);
                                    console.log(notificationId);
                                    // Display error message if deletion fails
                                    var errorMessage = document.createElement("p");
                                    errorMessage.textContent = "Error rejecting event. Please try again later.";
                                    notificationItem.appendChild(errorMessage);
                                });
                        });

                        var titleElement = document.createElement("h4");
                        titleElement.textContent = "You have been added to the event: " + notification.event.title;
                        notificationItem.appendChild(titleElement);

                        /*var creatorElement = document.createElement("p");
                        creatorElement.textContent = "Creator " + notification.event.creator.name;
                        notificationItem.appendChild(creatorElement);*/

                        var dateElement = document.createElement("p");
                        dateElement.textContent = "Date: " + notification.event.date;
                        notificationItem.appendChild(dateElement);

                        var locationElement = document.createElement("p");
                        locationElement.textContent = "Location: " + notification.event.location;
                        notificationItem.appendChild(locationElement);

                        var peopleElement = document.createElement("p");
                        peopleElement.textContent = "People: " + notification.event.people;
                        notificationItem.appendChild(peopleElement);

                        var summaryElement = document.createElement("p");
                        summaryElement.textContent = "Summary: " + notification.event.summary;
                        notificationItem.appendChild(summaryElement);

                        notificationsList.appendChild(notificationItem);
                    });
                }
                else {
                    notificationImg.classList.add("hidden");
                    var noNotificationsMessage = document.createElement("li");
                    noNotificationsMessage.textContent = "No notifications found.";
                    notificationsList.appendChild(noNotificationsMessage);
                }
            })
            .catch(function(error) {
                console.error("Error retrieving notifications data:", error);
                var errorItem = document.createElement("li");
                errorItem.className = "error-message";
                errorItem.textContent = "Error retrieving notifications data. Please try again later.";
                notificationsList.appendChild(errorItem);
            });
    });

    closeEventsBtn.addEventListener("click", function() {
        notificationsPopup.style.display = "none"; // Hide the events popup
    });
});