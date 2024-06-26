import React, { useEffect, useRef } from 'react';

const PopUp = ({ show, data,handlePopUp}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
        // console.log(document.querySelector('.rbc-show-more'));
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);




  const handleClose = () => {
    handlePopUp(false)
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const hours = date?.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek?.[date?.getDay()];
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months?.[date?.getMonth()];
    const year = date?.getFullYear();
    return `${formattedTime}, ${dayOfWeek}, ${month}/${day}/${year}`;
  }

  const popupClassName = `popup-content ${show ? 'open' : ''}`;
  if (!show) return null;

  return (
    <div className="popup-overlay" style={{ display: show ? 'flex' : 'none' }}>
    <div ref={popupRef} className={popupClassName}>
    <h6><span className={data?.categoryName =="Actionable Items"?"categoryNabgorg":"categoryNabggrn"}>{data?.categoryName}</span><span  onClick={handleClose}>
    <svg xmlns="http://www.w3.org/2000/svg" className='svgcss' width="17" height="17" viewBox="0 0 17 17" fill="none">
<path d="M14.2968 1.29235C14.6863 0.902551 15.3184 0.902551 15.7079 1.29235C16.0974 1.68184 16.0974 2.31354 15.7079 2.70333L9.91133 8.49996L15.7079 14.2966C16.0974 14.6861 16.0974 15.3178 15.7079 15.7076C15.3184 16.0971 14.6863 16.0971 14.2968 15.7076L8.5 9.91095L2.70317 15.7079C2.31366 16.0974 1.68164 16.0974 1.29213 15.7079C0.902623 15.3181 0.902623 14.6864 1.29213 14.2969L7.08926 8.50026L1.29213 2.70333C0.902623 2.31354 0.902623 1.68184 1.29213 1.29235C1.68164 0.902551 2.31366 0.902551 2.70317 1.29235L8.5003 7.08898L14.2968 1.29235Z" stroke="#969696" strokeWidth="2"/>
</svg>

</span></h6>
<table>
  <tbody>
    <tr>
      <td className='popup-start'>Location</td>
      <td className='popup-mid'>:</td>
      <td>{data?.LocationName}</td>
    </tr>
    <tr>
      <td className='popup-start'>Asset</td>
      <td className='popup-mid'>:</td>
      <td>{data.AssetsName}</td>
    </tr>
    {data.ActionName && (
      <tr>
        <td className='popup-start'>Action</td>
        <td className='popup-mid'>:</td>
        <td>{data.ActionName || "NA"}</td>
      </tr>
    )}
    {data.WarrantyTypeRPW && (
      <tr>
        <td className='popup-start'>Warranty Type</td>
        <td className='popup-mid'>:</td>
        <td>{data.WarrantyTypeRPW || "NA"}</td>
      </tr>
    )}
    <tr>
      <td className='popup-start'>Serial No.</td>
      <td className='popup-mid'>:</td>
      <td>{data.SerialNumber || "NA"}</td>
    </tr>
    <tr>
      <td className='popup-start'>QR Code</td>
      <td className='popup-mid'>:</td>
      <td>{data.QRCode || "NA"}</td>
    </tr>
    <tr>
      <td className='popup-start'>
        {data?.categoryName === "Actionable Items" ? "Due" : "End"} Date
      </td>
      <td className='popup-mid'>:</td>
      <td>{formatDate(data?.end)}</td>
    </tr>
  </tbody>
</table>

    
      {/* <div  className='popup-left'><div className='popup-start'><span>Location </span></div><div><span className='popup-mid'>:</span></div><div>{data?.LocationName}</div></div>
      <div  className='popup-left'><div className='popup-start'><span>Asset  </span></div><div><span className='popup-mid'>:</span></div><div>{data.AssetsName}</div></div>
     {data.ActionName &&  <div  className='popup-left'><div className='popup-start'><span>Action  </span></div><div><span className='popup-mid'>:</span></div><div>{data.ActionName || "NA"}</div></div>}
     {data.WarrantyTypeRPW &&  <div  className='popup-left'><div className='popup-start'><span>Warranty Type </span></div><div><span className='popup-mid'>:</span></div><div>{data.WarrantyTypeRPW || "NA"}</div></div>}
      <div  className='popup-left'><div className='popup-start'><span>{data?.categoryName =="Actionable Items"?"Due":"End"} Date</span></div><div><span className='popup-mid'>:</span></div><div>{formatDate(data?.end)}</div></div> */}
      <div className='closebtn'>
      {/* <button onClick={handleClose}>Close</button> */}
      </div>
    </div>
  </div>
  );
};


export default PopUp;
