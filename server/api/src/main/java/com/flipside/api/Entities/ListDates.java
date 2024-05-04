package com.flipside.api.Entities;

import java.util.ArrayList;

public class ListDates {
       public ArrayList<TempDate> list;

	public ArrayList<TempDate> getList() {
		return list;
	}

	public void setList(ArrayList<TempDate> list) {
		this.list = list;
	}

	public ListDates(ArrayList<TempDate> list) {
		super();
		this.list = list;
	}

	public ListDates() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ListDates [list=" + list + "]";
	}
     
	
       
}
