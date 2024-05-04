package com.flipside.api.Entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ServiceProvider implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String email;
	private String occupation;
	private String adress;
	private String city;
	private String state;
	private String password;
	private String mobile;
	private String description;
	private int totalRatings;
	@OneToMany
	private List<Dates> busyDates;
	
	

	public ServiceProvider(int id, String name, String email, String occupation, String adress, String city,
			String state, String password, String mobile, String description, int totalRatings, List<Dates> busyDates,
			int rating, byte[] profile, List<User> orders, List<Work> work, List<Comments> comments,
			List<User> deleteRequest) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.occupation = occupation;
		this.adress = adress;
		this.city = city;
		this.state = state;
		this.password = password;
		this.mobile = mobile;
		this.description = description;
		this.totalRatings = totalRatings;
		this.busyDates = busyDates;
		this.rating = rating;
		this.profile = profile;
		this.orders = orders;
		this.work = work;
		this.comments = comments;
		this.deleteRequest = deleteRequest;
	}

	public List<Dates> getBusyDates() {
		return busyDates;
	}

	public void setBusyDates(List<Dates> busyDates) {
		this.busyDates = busyDates;
	}

	public List<User> getDeleteRequest() {
		return deleteRequest;
	}

	public void setDeleteRequest(List<User> deleteRequest) {
		this.deleteRequest = deleteRequest;
	}

	public int getTotalRatings() {
		return totalRatings;
	}

	public void setTotalRatings(int totalRatings) {
		this.totalRatings = totalRatings;
	}

	private int rating;

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public ServiceProvider(int id, String name, String email, String occupation, String adress, String city,
			String state, String password, String mobile, String description, int rating, byte[] profile,
			List<User> orders) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.occupation = occupation;
		this.adress = adress;
		this.city = city;
		this.state = state;
		this.password = password;
		this.mobile = mobile;
		this.description = description;
		this.rating = rating;
		this.profile = profile;
		this.orders = orders;
	}

	@Lob
	private byte[] profile;
	@JsonIgnore
	@ManyToMany(cascade = {CascadeType.REMOVE})
	private List<User> orders;
	
	@ManyToMany(cascade= {CascadeType.REMOVE})
	private List<Work> work;
	
	@OneToMany
	private List<Comments> comments;
	
	@OneToMany
	private List<User> deleteRequest; 

	public List<Comments> getComments() {
		return comments;
	}

	public void setComments(List<Comments> comments) {
		this.comments = comments;
	}

	public void setWork(List<Work> work) {
		this.work = work;
	}

	public ServiceProvider(String name, String email, String occupation, String adress, String city, String state,
			String password, String mobile, String description, int totalRatings, int rating, byte[] profile,
			List<User> orders, ArrayList<Work> work) {
		super();
		this.name = name;
		this.email = email;
		this.occupation = occupation;
		this.adress = adress;
		this.city = city;
		this.state = state;
		this.password = password;
		this.mobile = mobile;
		this.description = description;
		this.totalRatings = totalRatings;
		this.rating = rating;
		this.profile = profile;
		this.orders = orders;
		this.work = work;
	}

	public List<Work> getWork() {
		return work;
	}

	public void setWork(ArrayList<Work> work) {
		this.work = work;
	}

	public ServiceProvider(String name, String email, String occupation, String adress, String city, String state,
			String password, String mobile, String description) {
		super();
		this.name = name;
		this.email = email;
		this.occupation = occupation;
		this.adress = adress;
		this.city = city;
		this.state = state;
		this.password = password;
		this.mobile = mobile;
		this.description = description;
	}

	public ServiceProvider(int id, String name, String email, String occupation, String adress, String city,
			String state, String password, String mobile, String description, byte[] profile, List<User> orders) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.occupation = occupation;
		this.adress = adress;
		this.city = city;
		this.state = state;
		this.password = password;
		this.mobile = mobile;
		this.description = description;
		this.profile = profile;
		this.orders = orders;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getProfile() {
		return profile;
	}

	public void setProfile(byte[] profile) {
		this.profile = profile;
	}

	public List<User> getOrders() {
		return orders;
	}

	public void setOrders(List<User> orders) {
		this.orders = orders;
	}

	public ServiceProvider() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ServiceProvider(String name, String email, String occupation, String adress, String city, String state,
			String password, String mobile) {
		super();
		this.name = name;
		this.email = email;
		this.occupation = occupation;
		this.adress = adress;
		this.city = city;
		this.state = state;
		this.password = password;
		this.mobile = mobile;
	}

	public ServiceProvider(String name, String email, String occupation, String adress, String city, String state,
			String password, String mobile, String description, byte[] profile, List<User> orders) {
		super();
		this.name = name;
		this.email = email;
		this.occupation = occupation;
		this.adress = adress;
		this.city = city;
		this.state = state;
		this.password = password;
		this.mobile = mobile;
		this.description = description;
		this.profile = profile;
		this.orders = orders;
	}

}
