package com.flipside.api.Entities;

public class TempDate {
	public String day;
	public String date;
	public String month;
	public String year;

	public TempDate() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TempDate(String day, String date, String month, String year) {
		super();
		this.day = day;
		this.date = date;
		this.month = month;
		this.year = year;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

}
