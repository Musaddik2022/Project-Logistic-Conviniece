import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./calender.css"
import "./calendershow.css"
import Calenderbox from './calenderbox';
import { checkLeap } from './checkLeap';
import { useParams } from 'react-router-dom';

export default function CalenderShow(props) {
    const id = useParams().serviceid;
    const [got,setGot] = useState(false);

    const date = new Date();
    const [currentDate, setCurrentDate] = useState(date.getDate())
    const [currentDay, setCurrentDay] = useState(date.getDay())
    const [currentMonth, setCurrentMonth] = useState(date.getMonth())
    const [currentYear, setCurrentYear] = useState(date.getFullYear());

    const [navYear, setNavYear] = useState(currentYear);
    const [navMonth, setNavMonth] = useState(currentMonth);

    const [selectedDates, setSelectedDates] = useState([]);
    
    const [arr, setArr] = useState([]);

    const mapOfMonths = new Map();
    const weekDays = ["sunday", "monday", "tuesday", "wedensday", "thursday", "friday", "saturday"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    if(got == false){
        
        console.log(id);
        axios.get("http://localhost:8080/getDates/service/" + id).then(response => {
            setSelectedDates(response.data);
        })
        setGot(true);
    }

    

    useEffect(() => {
        mapOfMonths[0] = 31
        if (checkLeap(navYear)) {
            mapOfMonths[1] = 29
        } else {
            mapOfMonths[1] = 28
        }
        mapOfMonths[2] = 31
        mapOfMonths[3] = 30
        mapOfMonths[4] = 31
        mapOfMonths[5] = 30
        mapOfMonths[6] = 31
        mapOfMonths[7] = 31
        mapOfMonths[8] = 30
        mapOfMonths[9] = 31
        mapOfMonths[10] = 30
        mapOfMonths[11] = 31
    })

    useEffect(() => {
        var temp = [];
        for (var i = 1; i <= mapOfMonths[navMonth]; i++) {
            if (i == currentDate && navMonth == currentMonth && navYear == currentYear) {
                let isPresent = false;
                for (var j = 0; j < selectedDates.length; j++) {
                    if (selectedDates[j].date == i && selectedDates[j].month == months[navMonth] && selectedDates[j].year == navYear) {
                        isPresent = true;
                        console.log("match");
                        break;
                    }
                }
                if (isPresent) {
                    temp.push(<div className='single-date current-date marked' id={i + " " + navMonth + " " + navYear} key={i + " " + navMonth + " " + navYear} onClick={clickHandler}>{i}</div>)
                } else {
                    temp.push(<div className='single-date current-date' id={i + " " + navMonth + " " + navYear} key={i + " " + navMonth + " " + navYear} onClick={clickHandler}>{i}</div>)
                }
            } else {
                let isPresent = false;
                for (var j = 0; j < selectedDates.length; j++) {
                    if (selectedDates[j].date == i && selectedDates[j].month == months[navMonth] && selectedDates[j].year == navYear) {
                        isPresent = true;
                        console.log("match");
                        break;
                    }
                }
                if (isPresent) {
                    temp.push(<div className='single-date marked' id={i + " " + navMonth + " " + navYear} key={i + " " + navMonth + " " + navYear} onClick={clickHandler}>{i}</div>)
                } else {
                    temp.push(<div className='single-date' id={i + " " + navMonth + " " + navYear} key={i + " " + navMonth + " " + navYear} onClick={clickHandler}>{i}</div>)
                }
            }
        }
        setArr(temp)
        console.log("rerender")
    }, [navMonth,selectedDates])

    const clickHandler = (e) => {
        if (e.target.id == "next") {
            if (navMonth == 11) {
                setNavMonth(0)
                setNavYear(navYear + 1);
            } else {
                setNavMonth(navMonth + 1);
            }
        } else if (e.target.id == "prev") {
            if (navMonth == 0) {
                setNavMonth(11)
                setNavYear(navYear - 1);
            } else {
                setNavMonth(navMonth - 1);
            }
        }
    }

  return (
    <div className='calender-boxshow'>
        <div className='navigation toshow'>
            <div className='buttons'>
                <i className="fa-solid fa-backward" id="prev" onClick={clickHandler}></i>
                <h4>{months[navMonth] + " " + navYear}</h4>
                <i className="fa-solid fa-forward" id="next" onClick={clickHandler}></i>
            </div>
        </div>
        <div className='calender'>
            <Calenderbox arr={arr} />
        </div>
</div>
  )
}
