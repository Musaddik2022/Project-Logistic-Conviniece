package com.flipside.api.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Dates {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int dateid;
	private String date;
	private String day;
	private String month;
	private String year;
	public int getDateid() {
		return dateid;
	}
	public void setDateid(int dateid) {
		this.dateid = dateid;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
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
	
	public Dates(String date, String day, String month, String year) {
		super();
		this.date = date;
		this.day = day;
		this.month = month;
		this.year = year;
	}
	public Dates() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
