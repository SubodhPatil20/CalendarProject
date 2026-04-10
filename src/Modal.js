import React from 'react';
// import './Modal.css';

const Modal = ({ isOpen, closeModal,showMoreData ,addData}) => {
    // console.log(showMoreData,"=======");

    function formatDate(dateString) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
        // Parse the input date string
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
    
        // Extract day of the week, month, and day of the month
        const dayOfWeek = days[date.getDay()];
        const month = months[date.getMonth()];
        const dayOfMonth = date.getDate();
    
        // Format the output string
        const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth.toString().padStart(2, '0')}`;
    
        return formattedDate;
    }
    

  if (!isOpen) return null;
  return (
    <>
      <div className="backdrop" onClick={closeModal}></div>
      <div className="modall">
        <div className="modall-header">
          <span>{formatDate(showMoreData?.[0]?.NextDate || showMoreData?.[0]?.EndOfPartsWarrantyRPW) }</span>
          <svg  onClick={closeModal} xmlns="http://www.w3.org/2000/svg" className='svgcss' width="14" height="14" viewBox="0 0 17 17" fill="#FFFFFF">
<path d="M14.2968 1.29235C14.6863 0.902551 15.3184 0.902551 15.7079 1.29235C16.0974 1.68184 16.0974 2.31354 15.7079 2.70333L9.91133 8.49996L15.7079 14.2966C16.0974 14.6861 16.0974 15.3178 15.7079 15.7076C15.3184 16.0971 14.6863 16.0971 14.2968 15.7076L8.5 9.91095L2.70317 15.7079C2.31366 16.0974 1.68164 16.0974 1.29213 15.7079C0.902623 15.3181 0.902623 14.6864 1.29213 14.2969L7.08926 8.50026L1.29213 2.70333C0.902623 2.31354 0.902623 1.68184 1.29213 1.29235C1.68164 0.902551 2.31366 0.902551 2.70317 1.29235L8.5003 7.08898L14.2968 1.29235Z" stroke="#FFFFFF" strokeWidth="2"/>
</svg>
        </div>
        <div className="modall-content">
          <ul>
            {showMoreData.map((name, index) => (
              <li onClick={()=>addData(name)} key={index}>{name?.ActionName || name?.AssetsName || "NA"}</li>
            ))}
          </ul>
        </div>
       
      </div>
    </>
  );
};

export default Modal;
