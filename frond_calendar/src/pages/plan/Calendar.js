import React, { useState, useEffect, useContext } from 'react';
import PopupEvent from './PopupEvent';
import { AuthContext } from '../../context/AuthProvider';


const Calendar = () => {
  const { login } = useContext(AuthContext);
  // 현재 날짜 상태 및 초기 달력 상태
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜를 상태로 관리합니다.
  const [headerMonth, setHeaderMonth] = useState('');
  const [headerYear, setHeaderYear] = useState('');
  const [calendarBody, setCalendarBody] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedDate, setClickedDate] = useState([]);

  // 컴포넌트가 마운트될 때 초기화 함수 실행
  useEffect(() => {
    updateCalendar(); // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 초기화 함수를 실행합니다.
  }, []);


  // 세션에서 사용자 이름을 가져오는 함수
  const getSessionUsername = () => {
    // 세션에서 사용자 이름 가져오는 로직
    const user = sessionStorage.getItem('user');
    return user;
  };
  
  // 세션에서 사용자 이름 가져오기
  const username = getSessionUsername();


  // 현재 날짜와 보기에 기반하여 달력을 업데이트하는 함수
  const updateCalendar = () => {
    const month = currentDate.getMonth(); // 현재 월을 가져옵니다.
    const year = currentDate.getFullYear(); // 현재 연도를 가져옵니다.

    // 월과 연도 표시 업데이트
    setHeaderMonth(getMonthName(month)); // 월을 표시하는 상태를 업데이트합니다.
    setHeaderYear(year); // 연도를 표시하는 상태를 업데이트합니다.

    // 달력 그리드 초기화 및 업데이트
    const rows = generateMonthlyCalendar(month); // 해당 월에 대한 달력 그리드를 생성합니다.
    setCalendarBody(rows); // 생성된 달력 그리드를 상태로 설정합니다.
  };

  // 월 이름 가져오는 함수
  const getMonthName = (monthIndex) => {
    const months = [
      '01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12'
    ];
    return months[monthIndex]; // 월 이름을 반환합니다.
  };

  // 특정 월에 대한 달력 그리드를 생성하는 함수
  const generateMonthlyCalendar = (monthIndex) => {
    const month = monthIndex; // 선택된 월을 가져옵니다.
    const year = currentDate.getFullYear(); // 현재 연도를 가져옵니다.

    // 해당 월의 시작 요일과 총 일수를 가져옵니다.
    const startingDay = new Date(year, month, 1).getDay(); // 해당 월의 첫째 날의 요일을 가져옵니다.
    const totalDays = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수를 가져옵니다.

    let date = 1; // 달력에 표시될 날짜를 초기화합니다.
    const calendarRows = []; // 달력 행을 담을 배열을 선언합니다.

    for (let row = 0; row < 6; row++) { // 달력은 최대 6주까지 표시됩니다.
      const calendarCells = []; // 각 달력 셀을 담을 배열을 선언합니다.

      for (let col = 0; col < 7; col++) { // 요일은 7일입니다.
        if (row === 0 && col < startingDay) {
          // 월의 첫째 날 이전의 빈 셀
          calendarCells.push(<td key={`${row}-${col}`} className="empty"></td>); // 빈 셀을 추가합니다.
        } else if (date > totalDays) {
          // 월의 마지막 날 이후의 빈 셀
          calendarCells.push(<td key={`${row}-${col}`} className="empty"></td>); // 빈 셀을 추가합니다.
        } else {
          // 해당 월의 각 날짜에 대한 셀
          const isToday = date === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear(); // 오늘 날짜 여부를 확인합니다.
          let clickYear = year;
          let clickMonth = month + 1;
          let clickDate = date;
          calendarCells.push(
            <td key={`${row}-${col}`} onClick={() => handleClick(clickYear, clickMonth, clickDate)} className={isToday ? "today" : ""}>
              {date}
            </td>
          );
          date++; // 다음 날짜로 이동합니다.
        }
      }

      calendarRows.push(<tr key={row}>{calendarCells}</tr>); // 달력 행을 추가합니다.
    }

    return calendarRows;
  };

  // 클릭 시 이전 달로 이동
  const handlePrevMonthClick = (month, year) => {
    if (updateCalendar()) {
        // 현재 날짜
      const currentDay = currentDate.getDate();
      let daysToSubtract = 7;
      const startingDay = currentDay - 6;
      const realMonthStartingDay = new Date(year, month, 1).getDay(); // 월의 첫째 날
      if (startingDay < realMonthStartingDay) {
        daysToSubtract = realMonthStartingDay - startingDay;
      }
      currentDate.setDate(currentDay - daysToSubtract);
      updateCalendar();
    } else {
      currentDate.setMonth(month - 1);
    }
    updateCalendar();
  };


  // 클릭 시 다음 달로 이동
  const handleNextMonthClick = (month, year) => {
    if(updateCalendar()){
      const currentDay = currentDate.getDate();
      let daysToAdd = 7;
      const endingDate = currentDay + 6;
      const realMonthEndingDay = new Date(year, month + 1, 0).getDate(); // 월의 마지막 날
      if(endingDate > realMonthEndingDay){
        daysToAdd = endingDate - realMonthEndingDay;
      }
      currentDate.setDate(currentDate + daysToAdd);
      updateCalendar();
    }else{
      currentDate.setMonth(month + 1);
    }
    updateCalendar();
  };


  // 사용자가 원하는 날짜를 클릭 시 팝업창이 나오고 해당 날짜를 물고 가게 한다.
  const handleClick = (year, month, date) => {
    console.log("클릭된 날짜 정보:", { year, month, date });
    // 클릭된 날짜 정보를 상태에 설정하고 팝업 창 열기
    setClickedDate({ year, month, date });
    setShowPopup(true);
  };

  // 팝업창 닫기
  const handleClosePopup = () => {
    setShowPopup(false);
    setClickedDate(null);
  };

  return (
    <>
      <div className="calendar">
        <div className="header" id="header">
          <button id="prevMonthBtn" onClick={() => handlePrevMonthClick(currentDate.getMonth(), currentDate.getFullYear())}>&lt;</button>
          <h2 id="headerYear">{headerYear}. </h2> <h2 id="headerMonth">{headerMonth}</h2>
          <button id="nextMonthBtn" onClick={() => handleNextMonthClick(currentDate.getMonth(), currentDate.getFullYear())}>&gt;</button>
        </div>
        <table id="calendarTable">
          <thead id="calendarDays">
            <tr id="calendarDaysRow">
              <th className="days">일</th>
              <th className="days">월</th>
              <th className="days">화</th>
              <th className="days">수</th>
              <th className="days">목</th>
              <th className="days">금</th>
              <th className="days">토</th>
            </tr>
          </thead>
          <tbody id="calendarBody">{calendarBody}</tbody>
        </table>
        {showPopup && (
          <PopupEvent
            clickedDate={clickedDate}
            onClose={handleClosePopup}
          />
        )}
      </div>
      <div>
      {login.username && <div>로그인된 사용자: {login.username}</div>}
      </div>
    </>
  );
};

export default Calendar;
