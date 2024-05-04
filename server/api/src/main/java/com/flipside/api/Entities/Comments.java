package com.flipside.api.Entities;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Comments {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String comment;
	private int rating;
	private int user;

	public int getUser() {
		return user;
	}

	public void setUser(int user) {
		this.user = user;
	}

	public Comments(String comment, int rating, int user) {
		super();
		this.comment = comment;
		this.rating = rating;
		this.user = user;
	}

	public Comments(String comment, int rating) {
		super();
		this.comment = comment;
		this.rating = rating;
	}

	public Comments() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Comments(int id, String comment, int rating) {
		super();
		this.id = id;
		this.comment = comment;
		this.rating = rating;
	}

}
