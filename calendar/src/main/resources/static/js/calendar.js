document.addEventListener("DOMContentLoaded", function() {

// DOM 요소들을 가져옵니다.
    var goToMonthBtn = document.getElementById("goToMonthBtn"); // '월로 이동' 버튼
    var inputMonthYear = document.getElementById("inputMonthYear"); // '월/년 입력' 필드

    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn'); // '사이드바 전환' 버튼
    const sidebar = document.getElementById('sidebar'); // 사이드바 요소

    // 사이드바 전환 버튼에 이벤트 리스너를 추가합니다.
    toggleSidebarBtn.addEventListener('click', () => {
        if (sidebar.style.display == 'none') {
            sidebar.style.display = 'block';
        }
        else {
            sidebar.style.display = 'none';
        }
    });

// '월로 이동' 버튼에 이벤트 리스너를 추가합니다.
    goToMonthBtn.addEventListener("click", function() {
        var inputDate = new Date(inputMonthYear.value); // 사용자가 입력한 날짜를 가져옵니다.

        if (!isNaN(inputDate.getTime())) { // 입력이 유효한 날짜인지 확인합니다.
            currentDate = inputDate; // 현재 날짜를 사용자가 입력한 날짜로 설정합니다.
            updateCalendar(); // 새로운 달로 달력을 업데이트합니다.
        } else {
            alert("유효하지 않은 입력입니다! 예) 2022/12 이런 형식으로 유효한 월을 입력해주세요.");
        }
    });


    // 필요한 DOM 요소들을 가져옵니다.
    // 달력 테이블
    var calendarTable = document.getElementById("calendarTable");
    // 달력 바디
    var calendarBody = document.getElementById("calendarBody");
    // 헤더
    var header = document.getElementById("header");
    // '이전 달' 버튼
    var prevMonthBtn = document.getElementById("prevMonthBtn");
    // 달력 요일
    var calendarDays = document.getElementById("calendarDays");
    // '다음 달' 버튼
    var nextMonthBtn = document.getElementById("nextMonthBtn");
    // 헤더 연도
    var headerYear = document.getElementById("headerYear");
    // 헤더 월
    var headerMonth = document.getElementById("headerMonth");
    // 이벤트 추가 버튼
    var addEventBtn = document.getElementById("addEventBtn");
    // 주간 보기 버튼
    var weeklyViewBtn = document.getElementById("weeklyViewBtn");
    // 월간 보기 버튼
    var monthlyViewBtn = document.getElementById("monthlyViewBtn");
    // 연간 보기 버튼
    var yearlyViewBtn = document.getElementById("yearlyViewBtn");


    // 현재 날짜 초기화
    var currentDate = new Date();

    // 탐색 버튼에 이벤트 리스너를 추가합니다.
    prevMonthBtn.addEventListener("click", function() {
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        if (calendarTable.classList.contains("weekly-view")) {
            var currentDay = currentDate.getDate();
            var daysToSubtract = 7; // 이전 주로 7일 이동합니다.
            var startingDay = currentDay - 6;
            var realMonthStartingDay = new Date(year, month, 1).getDay(); // 월의 첫째 날
            if (startingDay < realMonthStartingDay){
                daysToSubtract = realMonthStartingDay - startingDay;
            }
            currentDate.setDate(currentDay - daysToSubtract); // 계산된 일수를 뺍니다.

            updateCalendar(); // 새로운 날짜로 달력을 업데이트합니다.
        } else if (calendarTable.classList.contains("monthly-view")){
            currentDate.setMonth(currentDate.getMonth() - 1); // 다른 보기에서 월을 감소시킵니다.
            updateCalendar(); // 새로운 달로 달력을 업데이트합니다.
        }
        else{

        }
    });


    nextMonthBtn.addEventListener("click", function() {
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            if (calendarTable.classList.contains("weekly-view")) {
                var currentDay = currentDate.getDate();
                var daysToAdd = 7; // 다음 주로 7일 이동합니다.
                var endingDate = currentDay + 6;
                var realMonthEndingDay = new Date(year, month + 1, 0).getDate(); // 월의 마지막 날
                if (endingDate > realMonthEndingDay){
                    daysToAdd = endingDate - realMonthEndingDay;
                }
                currentDate.setDate(currentDay + daysToAdd); // 계산된 일수를 더합니다.

                updateCalendar(); // 새로운 날짜로 달력을 업데이트합니다.
            } else {
                currentDate.setMonth(currentDate.getMonth() + 1); // 다른 보기에서 월을 증가시킵니다.
                updateCalendar(); // 새로운 달로 달력을 업데이트합니다.
            }
        });

        // 보기 버튼에 이벤트 리스너를 추가합니다.
        weeklyViewBtn.addEventListener("click", function() {
            calendarTable.classList.add("weekly-view");
            calendarTable.classList.remove("monthly-view", "yearly-view");
            prevMonthBtn.style.display = "table-row";
            nextMonthBtn.style.display = "table-row";
            headerMonth.style.display = "table-row";

            updateCalendar();
        });

        monthlyViewBtn.addEventListener("click", function() {
            calendarTable.classList.add("monthly-view");
            calendarTable.classList.remove("weekly-view", "yearly-view");
            prevMonthBtn.style.display = "table-row";
            nextMonthBtn.style.display = "table-row";
            headerMonth.style.display = "table-row";
            updateCalendar();
        });

    // 연간 보기를 위한 달력을 생성하는 함수
    function generateYearlyCalendar() {
        // 달력 그리드를 지웁니다.
        calendarBody.innerHTML = "";
        document.getElementById("calendarDaysRow").style.display = "none";

        // 연간 보기를 위한 달력 그리드 생성
        for (var row = 0; row < 4; row++) {
            var newRow = calendarBody.insertRow();

            for (var col = 0; col < 3; col++) {
                var newCell = newRow.insertCell();
                var monthIndex = row * 3 + col; // 행과 열을 기반으로 월 인덱스 계산

                // 월별 달력을 위한 테이블 요소 생성
                var monthlyTable = document.createElement("table");
                monthlyTable.classList.add("monthly-calendar");

                // 해당 월의 달력 그리드 생성
                generateMonthlyCalendar(monthlyTable, monthIndex);

                // 셀에 월별 테이블 추가
                newCell.appendChild(monthlyTable);
            }
        }
    }

    // 연간 보기 버튼에 이벤트 리스너 추가
    yearlyViewBtn.addEventListener("click", function() {
        calendarTable.classList.remove("weekly-view");
        prevMonthBtn.style.display = "none";
        nextMonthBtn.style.display = "none";
        headerMonth.style.display = "none";
        generateYearlyCalendar(); // 연간 달력 생성
    });

    // 특정 월에 대한 달력 그리드를 생성하는 함수
    function generateMonthlyCalendar(table, monthIndex) {
        var month = monthIndex;
        var year = currentDate.getFullYear();
        var th = document.createElement('th');
        var text = document.createTextNode(getMonthName(month)); // 셀에 텍스트 추가
        th.appendChild(text);
        table.appendChild(th);
        // 해당 월의 시작 요일과 총 일수를 가져옵니다.
        var startingDay = new Date(year, month, 1).getDay();
        var totalDays = new Date(year, month + 1, 0).getDate();

        var date = 1;
        for (var row = 0; row < 6; row++) {
            var newRow = table.insertRow();

            for (var col = 0; col < 7; col++) {
                // 만약 첫번째 행에 해당 날짜에 1보다 작을 경우 빈셀을 만든다.
                if (row === 0 && col < startingDay) {
                    // 월의 첫째 날 이전의 빈 셀
                    var newCell = newRow.insertCell();
                    newCell.classList.add("empty");
                } else if (date > totalDays) {
                    // 월의 마지막 날 이후의 빈 셀
                    var newCell = newRow.insertCell();
                    newCell.classList.add("empty");
                } else {
                    // 해당 월의 각 날짜에 대한 셀
                    var newCell = newRow.insertCell();
                    newCell.textContent = date;
                    newCell.addEventListener("click", selectDate);

                    // 오늘 날짜 강조 표시
                    if (
                        date === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                    ) {
                        newCell.classList.add("today");
                    }
                    date++;
                }
            }
        }
    }


    // 초기 달력 생성
    updateCalendar();

    // 현재 날짜와 보기에 기반하여 달력을 업데이트하는 함수
    function updateCalendar() {
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();

        // 월과 연도 표시 업데이트
        headerMonth.textContent = getMonthName(month);
        headerYear.textContent = year;

        // 달력 그리드 초기화
        calendarBody.innerHTML = "";

        if (calendarTable.classList.contains("weekly-view")) {
            // 주간 보기를 위한 달력 그리드 생성
            document.getElementById("calendarDaysRow").style.display = "table-row";

            var startingDay = currentDate.getDate() - currentDate.getDay();
            var intStartingDay = currentDate.getDay();
            var endingDay = startingDay + 6;
            var intEndingDay = 6;
            var realMonthStartingDay = new Date(year, month, 1).getDay(); // 해당 월의 첫째 날
            var realMonthEndingDay = new Date(year, month + 1, 0).getDate();
            for (var row = 0; row < 1; row++) {
                var cellIndex = 0;
                var newRow = calendarBody.insertRow();
                if (startingDay <= 0) {
                    intStartingDay = currentDate.getDay() - currentDate.getDate() + 1;
                    startingDay = new Date(year, month - 1, 0).getDate() - intStartingDay + 1;
                }
                if (startingDay >= 25) {
                    endingDay = realMonthEndingDay;
                }
                if (endingDay > realMonthEndingDay) {
                    endingDay = realMonthEndingDay;
                }

                var listOfCells = [];
                var i = 0;
                for (let col = startingDay; col <= endingDay; col++) {
                    var newCell = newRow.insertCell();
                    listOfCells.push(newCell);
                    newCell.textContent = col;
                    newCell.addEventListener("click", selectDate);
                    // 오늘 날짜 강조 표시
                    if (
                        col === new Date().getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                    ) {
                        newCell.classList.add("today");
                    }
                    i++
                }
                if(i<7){
                    var j = 1;
                    for(i;i<7;i++){
                        var newCell = newRow.insertCell();
                        listOfCells.push(newCell);
                        newCell.textContent = j;
                        newCell.addEventListener("click", selectDate);
                        // 오늘 날짜 강조 표시
                        if (
                            col === new Date().getDate() &&
                            month === new Date().getMonth() &&
                            year === new Date().getFullYear()
                        ) {
                            newCell.classList.add("today");
                        }
                        j++
                    }
                }

            }
        }

        else if (calendarTable.classList.contains("yearly-view")) {

        }

        else {
            // 월간 보기를 위한 달력 그리드 생성
            document.getElementById("calendarDaysRow").style.display = "table-row";

            var startingDay = new Date(year, month, 1).getDay();
            var totalDays = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날 (0은 원하는 월의 마지막 날)

            var date = 1;
            for (var row = 0; row < 6; row++) {
                var newRow = calendarBody.insertRow();

                for (var col = 0; col < 7; col++) {
                    if (row === 0 && col < startingDay) {
                        // 월의 첫째 날 이전의 빈 셀
                        var newCell = newRow.insertCell();
                        newCell.classList.add("empty");
                    } else if (date > totalDays) {
                        // 월의 마지막 날 이후의 빈 셀
                        var newCell = newRow.insertCell();
                        newCell.classList.add("empty");
                    } else {
                        // 해당 월의 각 날짜에 대한 셀
                        var newCell = newRow.insertCell();
                        newCell.textContent = date;
                        newCell.addEventListener("click", selectDate);

                        // 오늘 날짜 강조 표시
                        if (
                            date === new Date().getDate() &&
                            month === new Date().getMonth() &&
                            year === new Date().getFullYear()
                        ) {
                            newCell.classList.add("today");
                        }
                        date++;
                    }
                }
            }
        }
    }
});


// 날짜 선택을 처리하는 함수
function selectDate(event) {
    var selectedCell = event.target;

    // 이전에 선택된 셀에서 선택 클래스 제거
    var selectedCells = calendarTable.getElementsByClassName("selected");
    for (var i = 0; i < selectedCells.length; i++) {
        selectedCells[i].classList.remove("selected");
    }

    // 클릭한 셀에 선택 클래스 추가
    selectedCell.classList.add("selected");
}


// 월 이름을 가져오는 함수
function getMonthName(month) {
    var months = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
    ];
    return months[month];
}


// 필요한 DOM 요소 가져오기
var goToCurrentMonthBtn = document.getElementById("goToCurrentMonthBtn");

// 버튼에 이벤트 리스너 추가
goToCurrentMonthBtn.addEventListener("click", function() {
    var today = new Date(); // 현재 날짜
    var currentMonth = today.getMonth() + 1; // 월은 0부터 시작
    var currentYear = today.getFullYear();

    // 현재 월로 리디렉션
    var url = "calendar.html?month=" + currentMonth + "&year=" + currentYear;
    window.location.href = url;
});

// 필요한 DOM 요소 가져오기
var calendarTable = document.getElementById("calendarTable");

// 달력 테이블에 이벤트 리스너 추가
calendarTable.addEventListener("click", function(event) {
    var target = event.target;

    // 날짜 셀이 클릭되었는지 확인
    if (target.tagName === "TD") {
        // 클릭된 셀에서 날짜 값을 가져옴
        var date = target.dataset.date;

        // 선택된 날짜로 새 이벤트 페이지로 리디렉션
        var url = "new-event.html?date=" + date;
        window.location.href = url;
    }
});