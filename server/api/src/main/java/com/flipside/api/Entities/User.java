 package com.flipside.api.Entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User implements Serializable{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String email;
	private String name;
	private String mobile;
	private String city;
	private String state;
	private byte[] profile;
	
	public byte[] getProfile() {
		return profile;
	}

	public void setProfile(byte[] profile) {
		this.profile = profile;
	}

	@OneToMany
	private List<Comments> comments;
	
	public List<Comments> getComments() {
		return comments;
	}

	public void setComments(List<Comments> comments) {
		this.comments = comments;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public User(String email, String name, String mobile, String city, String state, String password,
			List<ServiceProvider> orders) {
		super();
		this.email = email;
		this.name = name;
		this.mobile = mobile;
		this.city = city;
		this.state = state;
		this.password = password;
		this.orders = orders;
	}

	public User(String email, String name, String mobile, String city, String state, String password) {
		super();
		this.email = email;
		this.name = name;
		this.mobile = mobile;
		this.city = city;
		this.state = state;
		this.password = password;
	}

	public User(String email, String name, String mobile, String password, List<ServiceProvider> orders) {
		super();
		this.email = email;
		this.name = name;
		this.mobile = mobile;
		this.password = password;
		this.orders = orders;
	}

	public User(String email, String name, String mobile, String password) {
		super();
		this.email = email;
		this.name = name;
		this.mobile = mobile;
		this.password = password;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	private String password;
	@JsonIgnore
	@ManyToMany(cascade= {CascadeType.REMOVE})
	private List<ServiceProvider> orders;
	
	@ManyToMany
	private List<ServiceProvider> completedOrders;
	@ManyToMany
	private List<ServiceProvider> deletedOrders;
	

	public User(String email, String name, String mobile, String city, String state, String password,
			List<ServiceProvider> orders, List<ServiceProvider> completedOrders, List<ServiceProvider> deletedOrders) {
		super();
		this.email = email;
		this.name = name;
		this.mobile = mobile;
		this.city = city;
		this.state = state;
		this.password = password;
		this.orders = orders;
		this.completedOrders = completedOrders;
		this.deletedOrders = deletedOrders;
	}

	public List<ServiceProvider> getCompletedOrders() {
		return completedOrders;
	}

	public void setCompletedOrders(List<ServiceProvider> completedOrders) {
		this.completedOrders = completedOrders;
	}

	public List<ServiceProvider> getDeletedOrders() {
		return deletedOrders;
	}

	public void setDeletedOrders(List<ServiceProvider> deletedOrders) {
		this.deletedOrders = deletedOrders;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int id, String email, String name, String password, List<ServiceProvider> orders) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.password = password;
		this.orders = orders;
	}

	public User(String email, String name, String password) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
	}

	public User(String email, String name, String password, List<ServiceProvider> orders) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
		this.orders = orders;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<ServiceProvider> getOrders() {
		return orders;
	}

	public void setOrders(List<ServiceProvider> orders) {
		this.orders = orders;
	}

}
