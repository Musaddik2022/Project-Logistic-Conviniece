import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./calender.css"
import Calenderbox from './calenderbox';
import { checkLeap } from './checkLeap';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';          //proprty id =>  props.id
//  name => props.name  

export default function Calender(props) {
    const date = new Date();
    const [currentDate, setCurrentDate] = useState(date.getDate())
    const [currentDay, setCurrentDay] = useState(date.getDay())
    const [currentMonth, setCurrentMonth] = useState(date.getMonth())
    const [currentYear, setCurrentYear] = useState(date.getFullYear());

    const [navYear, setNavYear] = useState(currentYear);
    const [navMonth, setNavMonth] = useState(currentMonth);

    const [arr, setArr] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [olddata, setOldData] = useState([]);


    const [finals, setFinals] = useState([]);


    const mapOfMonths = new Map();
    const weekDays = ["sunday", "monday", "tuesday", "wedensday", "thursday", "friday", "saturday"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    useEffect(() => {
        axios.get("http://localhost:8080/getDates/service/" + props.id).then(response => {
            setSelectedDates(response.data);
            var temp = [...response.data];

            setOldData(temp);
        })

    }, [])

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
    }, [navMonth, selectedDates])

    useEffect(() => {
        var temp = [];
        selectedDates.map(i => {
            temp.push(<div className='selected-single' key={i.date + " " + i.month + " " + i.year}>{i.day + " " + i.date + " " + i.month + " " + i.year}</div>)
        })
        setFinals(temp);
    }, [selectedDates])

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
        } else {
            var isPresent = false;
            var index = 0;
            const temp = e.target.id.split(" ");
            const tempDate = new Date(temp[2], temp[1], temp[0])
            console.log(tempDate.getDay() + " " + tempDate.getDate() + " " + tempDate.getMonth() + " " + tempDate.getFullYear());

            for (var i = 0; i < selectedDates.length; i++) {
                if (selectedDates[i].day == weekDays[tempDate.getDay()] && selectedDates[i].date == tempDate.getDate() && selectedDates[i].month == months[tempDate.getMonth()] && selectedDates[i].year == tempDate.getFullYear()) {
                    isPresent = true;
                    index = i;
                    break;
                }
            }
            if (isPresent) {
                var temparr = [];
                for (var i = 0; i < selectedDates.length; i++) {
                    if (i != index) {
                        temparr.push(selectedDates[i]);
                    }
                }
                setSelectedDates(temparr);
            } else {
                selectedDates.push({
                    "day": weekDays[tempDate.getDay()],
                    "date": tempDate.getDate().toString(),
                    "month": months[tempDate.getMonth()],
                    "year": tempDate.getFullYear().toString()
                })
                var temparr = [...selectedDates];
                setSelectedDates(temparr)
            }
            console.log(selectedDates)
            console.log(olddata)
        }
    }

    const selectedDatesHandler = (e) => {
        if (e.target.id == "save") {
            if (selectedDates.length == 0) {
                toast.warn('Please select dates to save', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                var extraDates = [];
                var removedDates = [];
                //extra dates
                for (var k = 0; k < selectedDates.length; k++) {
                    var isThere = false;
                    for (var l = 0; l < olddata.length; l++) {
                        if (selectedDates[k].date == olddata[l].date && selectedDates[k].day == olddata[l].day && selectedDates[k].month == olddata[l].month && selectedDates[k].year == olddata[l].year) {
                            isThere = true;
                            break;
                        }
                    }
                    if (isThere == false) {
                        extraDates.push(selectedDates[k])
                    }
                }

                //removedData
                for (var k = 0; k < olddata.length; k++) {
                    var isThere = false;
                    for (var l = 0; l < selectedDates.length; l++) {
                        if (selectedDates[l].date == olddata[k].date && selectedDates[l].day == olddata[k].day && selectedDates[l].month == olddata[k].month && selectedDates[l].year == olddata[k].year) {
                            isThere = true;
                            break;
                        }
                    }
                    if (isThere == false) {
                        removedDates.push(olddata[k])
                    }
                }

                var data = {
                    "list": extraDates
                }
                axios.post("http://localhost:8080/addDates/service/" + props.id, data).then(response => {
                    if (response.data == "success") {
                        toast.success('Dates has been updated successfully!!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        toast.error('OOPS something went wrong', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }).catch(err => {
                    console.log(err);
                    toast.error('OOPS something went wrong', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })

                if (removedDates.length != 0) {
                    var data2 = {
                        "list": removedDates
                    }
                    axios.put("http://localhost:8080/deleteDates/service/" + props.id, data2).then((res) => {
                        console.log(res.data);
                    }).catch(err => {
                        console.log(err);
                        toast.error('OOPS something went wrong', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                }
                console.log(extraDates)
                console.log(removedDates)

            }
        } else if (e.target.id == "reset") {
            var tempArr = [];
            axios.delete("http://localhost:8080/resetDates/service/" + props.id).then(res => {
                setSelectedDates(tempArr);
            }).catch(err => {
                toast.error('OOPS something went wrong', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err);
            })
        }
    }

    return (
        <div className='calender-box'>
            <div className='left-box'>
                <div className='navigation'>
                    <div className='buttons'>
                        <i className="fa-solid fa-backward" id="prev" onClick={clickHandler}></i>
                        <h4>{months[navMonth] + " " + navYear}</h4>
                        <i className="fa-solid fa-forward" id="next" onClick={clickHandler}></i>
                    </div>
                </div>
                <div className='calender'>
                    <Calenderbox arr={arr} />
                </div>
                <div className='reset-save'>
                    <button type="submit" onClick={selectedDatesHandler} id="save" className='button'>Save</button>
                    <button onClick={selectedDatesHandler} id="reset" className='button'>Reset</button>
                </div>
            </div>
            <div className='selected'>
                <div className="selected-heading" >Selected Dates:</div>
                {finals}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
