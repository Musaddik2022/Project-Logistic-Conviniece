package com.flipside.api.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Work {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Lob
	private byte[] work;

	public Work(byte[] work) {
		super();
		this.work = work;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte[] getWork() {
		return work;
	}

	public void setWork(byte[] work) {
		this.work = work;
	}

	public Work() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Work(int id, byte[] work) {
		super();
		this.id = id;
		this.work = work;
	}

}
