package com.flipside.api.Entities;

public class ReturnComment {
	private Comments comment;
	private User user;

	public ReturnComment(Comments comment, User user) {
		super();
		this.comment = comment;
		this.user = user;
	}

	public ReturnComment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Comments getComment() {
		return comment;
	}

	public void setComment(Comments comment) {
		this.comment = comment;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
