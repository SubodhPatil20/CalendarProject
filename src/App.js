import React, { Children, useEffect, useState } from "react";
import { Calendar, momentLocalizer,Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PopUp from "./Popup";
import axios from "axios";
import CustomDatepicker from "./CustomDatePicker";
import Modal from "./Modal";
const App = (props) => {
  const localizer = momentLocalizer(moment);
  const [showPopUp, setShowpopUp] = useState(false);
  const [popUpData, setPopUpData] = useState();
  const [loading,setLoading]=useState(true);
  const [apiData, setApiData] = useState([]);
  const [showMoreData,setShowMoreData]=useState([])
  const [token,setToken]=useState("")
  const [allOptions,setAllOptions]=useState([""]);
  const [selectedOption,setSelectedOption]=useState("")
  const [beforefilteredData,setBeforeFilteredData]=useState([])
  const handleSelectSlot = (e) => {
    setPopUpData(e);
    setShowpopUp(true);
  };
  function resetTimeToMidnight(dateTimeStr) {
    const datePart = dateTimeStr.split('T')[0];

    return `${datePart}T00:00:00`;
  }

  const callData = async (attempt=0) => {
    let tokenn =localStorage.getItem('calendarToken');
    const colorCode= props?.clientId === "1"? '#654a8a':props?.clientId === "2"? '#003F2D':"#000000";

    if(tokenn)
      {
    setToken(tokenn);
   document.documentElement.style.setProperty('--popup-main-color', colorCode);
   document.documentElement.style.setProperty('--popup-light-color', colorCode);
   document.documentElement.style.setProperty('--popup-dark-color', colorCode);
    const ApiCall =props?.clientId === "1"? process.env.REACT_APP_URL_ID_RSCS:props?.clientId === "2"? process.env.REACT_APP_URL_ID_CBRE:"";
   if(apiData)
    {
    await axios
      .get(ApiCall, { headers: { Authorization: `Bearer ${tokenn}` } })
      .then((res) => {
        if (res.data.success) {
          let updatedArray1 = res.data.data?.TotalAssetsWarrentyDetailsList.map(
            (ele) => {
              return {
                ...ele,
                end: moment(resetTimeToMidnight(ele.EndOfPartsWarrantyRPW)).toDate(),
                // end: moment(ele.EndOfPartsWarrantyRPW).toDate(),
                categoryName: "Warranty Details",
                title: ele.AssetsName,
                start: moment(resetTimeToMidnight(ele.EndOfPartsWarrantyRPW)).toDate(),
                // start: moment(ele.EndOfPartsWarrantyRPW).toDate(),
                data: {
                  type: "WarDet",
                },
              };
            }
          );
          let updatedArray2 = res.data.data?.TotalDIYsActionableItems.map(
            (ele) => {
              return {
                ...ele,
                end: moment(resetTimeToMidnight(ele.NextDate)).toDate(),
                // end: moment(ele.NextDate).toDate(),
                categoryName: "Actionable Items",
                title: ele.ActionName,
                start: moment(resetTimeToMidnight(ele.NextDate)).toDate(),
                // start: moment(ele.NextDate).toDate(),
                data: {
                  type: "ActItm",
                },
              };
            }
          );
          setAllOptions(res.data.data.LocationsList)
          setApiData([...updatedArray1, ...updatedArray2]);
          setBeforeFilteredData([...updatedArray1, ...updatedArray2])

        }
        setLoading(false)
      }).catch((err) =>{ 
        setLoading(false)
      });
    }
    else{
      console.log("Enter valid Client Id")
    }
  }

  else{
    if(attempt<4)
      {
        console.log("else if working")
        setTimeout(()=>{
          callData(attempt+1)
        },1000)
      }
      else{
        setLoading(false)
      }
  }


  };
  const CustomEventContainerWrapper = (event) => {
    console.log("event",event)
    return (null
      // <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }} {...props}>
      //   {children}
      // </div>
    );
  };

  const filterData=(newData)=>{
    setSelectedOption(newData)
    if(newData && newData !=="all")
      {
        const updatedData=beforefilteredData.filter((ele,ind)=>ele.OutletId === Number(newData));
        setApiData(updatedData);
      }
      else{
        setApiData(beforefilteredData)
      }
  }

  const CustomToolbar = ({ label, onView, onNavigate, views }) => (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate("PREV")}>
          Back
        </button>
        <button type="button" onClick={() => onNavigate("TODAY")}>
          Today
        </button>
        <button type="button" onClick={() => onNavigate("NEXT")}>
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
      <select className="srg-select" onChange={(e)=>filterData(e.target.value)}  value={selectedOption}>
      {/* <option value="" disabled >Select Location</option> */}
      <option value="all" >All Location</option>

{allOptions.map((ele,ind)=>{
  return(<option key={ind} value={ele.Item2}>{ele.Item1}</option>)
})}
      </select>
      {/* <button type="button" onClick={() => onView("month")}>
          Month
        </button> */}
        <button type="button" onClick={() => onView("week")}>
          Week
        </button>
        <button type="button" onClick={() => onView("day")}>
          Day
        </button>
        <button type="button" className="agendaBtn" onClick={() => onView("agenda")}>
          Agenda
        </button>
      </span>
    </div>
  );
  const components = {
    // eventWrapper: CustomEventContainerWrapper,
    event: (props) => {
      const eventType = props?.event?.data?.type;
      switch (eventType) {
        case "WarDet":
          return (
            <div className="srg-maroon" >
              {props.title}
            </div>
          );
        case "ActItm":
          return (
            <div className="srg-byId">
              {props.title}
            </div>
          );
        default:
          return null;
      }
    },
   toolbar:CustomToolbar
  };
  
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    callData(0);
  }, []);

  const addData=(data)=>{
if(data)
  {
    setPopUpData(data);
    setShowpopUp(true)
  }
  }


  // console.log(typeof props.clientId,)

  if (loading === false && (!token || !props?.clientId || (props.clientId !== "1" && props.clientId !== "2")))
  {
    return <div className="unauthorized-text">Access Denied</div>;
  }
  return (
    <div className="srg-calendar">
       <div className="App">
      <Modal isOpen={isModalOpen} closeModal={closeModal}showMoreData={showMoreData} addData={addData} />
    </div>
      {loading?<div className="loader-container">
        <div className="loader"></div>
      </div>:
      <div>
      <Calendar
      className="calendar-height"
      dayLayoutAlgorithm='no-overlap'
        localizer={localizer}
        events={apiData}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        popup={true}
        defaultView={Views.AGENDA}
        components={components}
        onShowMore={(e)=>{setShowMoreData(e);setModalOpen(true)}}
        views={['week', 'day', 'agenda']}
        onSelectEvent={handleSelectSlot}
        allDayMaxRows={1}
        // timeslots={1}
      />
      <PopUp show={showPopUp} handlePopUp={setShowpopUp} data={popUpData} />
      <div className="copyrightfooter"><div>
        
<div className="copyrightimg"><img src="data:image/png;base64,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"/></div>
<div className="copyrighttext">© {new Date().getFullYear()} AZMBL. All rights reserved.</div>
      </div>
      </div>
      </div>
      }

    </div>
  );
};

export default App;
