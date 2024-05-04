package com.flipside.api.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="table_default")
public class Default {
	@Id
	private int id;
	@Lob
	private byte[] defaultPic;

	public Default() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Default(int id, byte[] defaultPic) {
		super();
		this.id = id;
		this.defaultPic = defaultPic;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte[] getDefaultPic() {
		return defaultPic;
	}

	public void setDefaultPic(byte[] defaultPic) {
		this.defaultPic = defaultPic;
	}
}
