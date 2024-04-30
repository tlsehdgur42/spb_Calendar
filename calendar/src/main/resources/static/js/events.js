document.addEventListener("DOMContentLoaded", function() {

    var addEventBtn = document.getElementById("addEventBtn");
    var popupEvent = document.getElementById("popupEvent");
    var popupEvent1 = document.getElementById("popupEvent1");
    var closeBtn = document.getElementById("closeBtn");
    var closeBtn1 = document.getElementById("closeBtn1");
    var submitForm = document.getElementById("submitForm");
    var updateForm = document.getElementById("updateForm");
    var submitBtn = document.getElementById("submitBtn");
    var updateBtn = document.getElementById("updateBtn");

    popupEvent1.classList.add("hidden");
    popupEvent.classList.add("hidden");
    submitForm.classList.add("hidden");
    updateForm.classList.add("hidden");

    addEventBtn.addEventListener("click", function(e) {
        //e.preventDefault();
        popupEvent.classList.remove("hidden");
        popupEvent1.classList.add("hidden");
        submitForm.classList.add("hidden");
    });

    closeBtn.addEventListener("click", function() {
        popupEvent1.classList.add("hidden");
        popupEvent.classList.add("hidden");
    });
    closeBtn1.addEventListener("click", function() {
        popupEvent1.classList.add("hidden");
        popupEvent.classList.add("hidden");
    });

    var viewEventsBtn = document.getElementById("viewEventsBtn");
    var eventsPopup = document.getElementById("eventsPopup");
    var closeEventsBtn = document.getElementById("closeBtn2");
    var page = 0;
    var pageSize = 10;

    viewEventsBtn.addEventListener("click", function() {
        var eventList = document.getElementById("eventList");
        eventList.innerHTML = "";

        fetch("/events?page=" + page + "&pageSize=" + pageSize)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error retrieving events data");
                }
            })
            .then(function(events) {
                if (events.length > 0) {
                    events.forEach(function(event) {
                        var eventItem = document.createElement("li");
                        eventItem.className = "event-item";

                        var editEventBtn = document.createElement("button");
                        editEventBtn.textContent = "Edit";
                        eventItem.appendChild(editEventBtn);
                        editEventBtn.className = "editEventBtn";

                        editEventBtn.addEventListener("click", function() {
                            submitForm.classList.add("hidden");
                            popupEvent.classList.add("hidden");
                            updateForm.classList.remove("hidden");
                            popupEvent1.classList.remove("hidden");

                            var eventTitle1 = document.getElementById("eventTitle1");
                            eventTitle1.type = "text";
                            eventTitle1.value = event.title;

                            var eventDate1 = document.getElementById("eventDate1");
                            eventDate1.type = "date";
                            eventDate1.value = event.date;

                            var eventStartingHour1 = document.getElementById("eventStartingHour1");
                            eventStartingHour1.type = "time";
                            eventStartingHour1.value = event.startingHour;

                            var eventEndingHour1 = document.getElementById("eventEndingHour1");
                            eventEndingHour1.type = "time";
                            eventEndingHour1.value = event.endingHour;

                            var eventLocation1 = document.getElementById("eventLocation1");
                            eventLocation1.type = "text";
                            eventLocation1.value = event.location;

                            var participants1 = document.getElementById("participants1");
                            participants1.type = "text";
                            participants1.value = event.people;

                            var eventSummary1 = document.getElementById("eventSummary1");
                            eventSummary1.type = "text";
                            eventSummary1.value = event.summary;

                            updateBtn.addEventListener("click", function() {
                                var updatedTitle = eventTitle1.value;
                                var updatedDate = eventDate1.value;
                                var updateStartingHour = eventStartingHour1.value;
                                var updateEndingHour = eventEndingHour1.value;
                                var updatedLocation = eventLocation1.value;
                                var updatedPeople = participants1.value;
                                var updatedSummary = eventSummary1.value;
                                var eventId = event.id;

                                fetch("/updateEvent?id=" + eventId, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        title: updatedTitle,
                                        date: updatedDate,
                                        startingHour: updateStartingHour,
                                        endingHour: updateEndingHour,
                                        location: updatedLocation,
                                        people: updatedPeople,
                                        summary: updatedSummary
                                    })
                                })
                                    .then(function(response) {
                                        if (response.ok) {
                                            //viewEventsBtn.click();
                                            window.location.href = "/calendar";
                                        } else {
                                            throw new Error("Error updating event");
                                        }
                                    })
                                    .catch(function(error) {
                                        console.error("Error updating event:", error);
                                        popupEvent1.classList.add("hidden");
                                        var successfulPopUp4 = document.getElementById("successfulPopUp4");
                                        var closeSuccessfulPopUp4 = document.getElementById("closeSuccessfulPopUp4");
                                        successfulPopUp4.style.display = "block";
                                        closeSuccessfulPopUp4.addEventListener("click", function() {
                                            successfulPopUp4.style.display = "none"; // makes the popup form invisible
                                        });
                                        throw new Error("Error updating event");
                                    });
                            });
                        });

                        var deleteEventBtn = document.createElement("button");
                        deleteEventBtn.textContent = "Delete";
                        eventItem.appendChild(deleteEventBtn);
                        deleteEventBtn.className = "deleteEventBtn";

                        // Delete event button
                        deleteEventBtn.addEventListener("click", function() {
                            var eventId = event.id;
                            // Make an AJAX request to delete the event
                            fetch("/deleteEvent?id=" + eventId , {
                                method: "DELETE"
                            })
                                .then(function(response) {
                                    if (response.ok) {
                                        // Remove the event item from the list
                                        eventItem.remove();
                                        var successfulPopUp = document.getElementById("successfulPopUp");
                                        var closeSuccessfulPopUp = document.getElementById("closeSuccessfulPopUp");
                                        successfulPopUp.style.display = "block";
                                        closeSuccessfulPopUp.addEventListener("click", function() {
                                            successfulPopUp.style.display = "none"; // makes the popup form invisible
                                        });

                                    } else {
                                        throw new Error("Error deleting event");
                                    }
                                })
                                .catch(function(error) {
                                    console.error("Error deleting event:", error);
                                    console.log(eventId);
                                    // Display error message if deletion fails
                                    var errorMessage = document.createElement("p");
                                    errorMessage.textContent = "Error deleting event. Please try again later.";
                                    eventItem.appendChild(errorMessage);
                                });
                        });

                        var titleElement = document.createElement("h4");
                        titleElement.textContent = event.title;
                        eventItem.appendChild(titleElement);

                        var dateElement = document.createElement("p");
                        dateElement.textContent = "Date: " + event.date;
                        eventItem.appendChild(dateElement);

                        var eventStartingHour = document.createElement("p");
                        eventStartingHour.textContent = "Starting Hour: " + event.startingHour;
                        eventItem.appendChild(eventStartingHour);

                        var eventEndingHour = document.createElement("p");
                        eventEndingHour.textContent = "Ending Hour: " + event.endingHour;
                        eventItem.appendChild(eventEndingHour);

                        var locationElement = document.createElement("p");
                        locationElement.textContent = "Location: " + event.location;
                        eventItem.appendChild(locationElement);

                        var peopleElement = document.createElement("p");
                        peopleElement.textContent = "People: " + event.people;
                        eventItem.appendChild(peopleElement);

                        /*var participantsElement = document.createElement("p");
                        participantsElement.textContent = "Participants: ";

                        if (event.participants.length > 0) {
                            participantsElement.textContent += event.participants.map(function(participant) {
                                return participant.name;
                            }).join(", ");
                        } else {
                            participantsElement.textContent += "None";
                        }

                        eventItem.appendChild(participantsElement);*/

                        var summaryElement = document.createElement("p");
                        summaryElement.textContent = "Summary: " + event.summary;
                        eventItem.appendChild(summaryElement);

                        eventList.appendChild(eventItem);
                    });
                } else {
                    var noEventsMessage = document.createElement("li");
                    noEventsMessage.textContent = "No events found.";
                    eventList.appendChild(noEventsMessage);
                }

                // Make the events list visible
                eventsPopup.style.display = "block";
            })
            .catch(function(error) {
                console.error("Error retrieving events data:", error);
                var errorItem = document.createElement("li");
                errorItem.className = "error-message";
                errorItem.textContent = "Error retrieving events data. Please try again later.";
                eventList.appendChild(errorItem);
            });
    });

    closeEventsBtn.addEventListener("click", function() {
        eventsPopup.style.display = "none"; // Hide the events popup
    });

})