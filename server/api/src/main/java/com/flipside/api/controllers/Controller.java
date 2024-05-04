package com.flipside.api.controllers;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.flipside.api.Entities.Comments;
import com.flipside.api.Entities.Default;
import com.flipside.api.Entities.ListDates;
import com.flipside.api.Entities.ReturnComment;
import com.flipside.api.Entities.ServiceProvider;
import com.flipside.api.Entities.TempDate;
import com.flipside.api.Entities.User;
import com.flipside.api.Entities.Work;
import com.flipside.api.services.Service;

@RestController
@CrossOrigin("http://localhost:3000")
public class Controller {
	@Autowired
	private Service service;
	
	@Value("${app.twillio.fromPhoneNo}")
	private String from;

	// default
	@PostMapping("/adddefaultprofile")
	public String AddDefaultProfile(@RequestParam("profile") MultipartFile profile) {
		return service.adddefaultPic(profile);
	}

	@GetMapping("/getdefaultprofile")
	public Default getDefaultProfile() {
		return service.getDefaultProfile();
	}

	// user
	@PostMapping("/adduser")
	public String AddUser(@RequestParam("name") String name, @RequestParam("email") String email,
			@RequestParam("mobile") String mobile, @RequestParam("password") String password,
			@RequestParam("city") String city, @RequestParam("state") String state,
			@RequestParam("profile") MultipartFile profile) {

		User user = new User(email, name, mobile, city, state, password, new ArrayList<ServiceProvider>());
		try {
			user.setProfile(profile.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return service.addUser(user);

	}
	
	@PostMapping("/adduserwithoutprofile")
	public String AddUserWithoutDp(@RequestParam("name") String name, @RequestParam("email") String email,
			@RequestParam("mobile") String mobile, @RequestParam("password") String password,
			@RequestParam("city") String city, @RequestParam("state") String state
			) {

		User user = new User(email, name, mobile, city, state, password, new ArrayList<ServiceProvider>());
		try {
			user.setProfile(getDefaultProfile().getDefaultPic());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return service.addUser(user);

	}


	@PutMapping("/getuser")
	public String getUser(@RequestParam("email") String email, @RequestParam("password") String password) {
		return service.getUser(email, password);
	}

	@GetMapping("/getuser/{id}")
	public User getUser(@PathVariable("id") int id) {
		return service.getUniqueUser(id);
	}

	@PutMapping("/updateuser/withprofile/{id}")
	public String updateUser(@PathVariable("id") int userid, @RequestParam("name") String name,
			@RequestParam("email") String email, @RequestParam("mobile") String mobile,
			@RequestParam("password") String password, @RequestParam("city") String city,
			@RequestParam("state") String state, @RequestParam("profile") MultipartFile profile) {
		User user = new User(email, name, mobile, city, state, password, new ArrayList<ServiceProvider>());
		try {
			user.setProfile(profile.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return service.updateUser(userid, user);
	}

	@PutMapping("/updateuser/withoutprofile/{id}")
	public String updateUser(@PathVariable("id") int userid, @RequestParam("name") String name,
			@RequestParam("email") String email, @RequestParam("mobile") String mobile,
			@RequestParam("password") String password, @RequestParam("city") String city,
			@RequestParam("state") String state) {
		User user = new User(email, name, mobile, city, state, password, new ArrayList<ServiceProvider>());
		return service.updateUserwithoutProfile(userid, user);
	}

	// service

	@PostMapping("/addservice")
	public String AddService(@RequestParam("name") String name, @RequestParam("email") String email,
			@RequestParam("adress") String adress, @RequestParam("city") String city,
			@RequestParam("state") String state, @RequestParam("mobile") String mobile,
			@RequestParam("password") String password, @RequestParam("occupation") String occupation) {

		ServiceProvider sp;

		byte[] profile = getDefaultProfile().getDefaultPic();
		sp = new ServiceProvider(name, email, occupation, adress, city, state, password, mobile, "", 0, 0, profile,
				new ArrayList<User>(), new ArrayList<Work>());

		return service.addservice(sp);
	}

	@PutMapping("/getservice")
	public String getService(@RequestParam("email") String email, @RequestParam("password") String password) {
		return service.getService(email, password);
	}

	@GetMapping("/getservice/{id}")
	public ServiceProvider getServiceProvider(@PathVariable("id") int id) {
		return service.getServiceProvider(id);
	}

	@PutMapping("/updateservice/withprofile/{id}")
	public String updateServiceProvider(@PathVariable("id") int id, @RequestParam("name") String name,
			@RequestParam("description") String description, @RequestParam("email") String email,
			@RequestParam("phone") String mobile, @RequestParam("city") String city,
			@RequestParam("state") String state, @RequestParam("adress") String adress,
			@RequestParam("profile") MultipartFile profile) {

		return service.updateServiceProvider(id, name, description, email, mobile, adress, city, state, profile);
	}

	@PutMapping("/updateservice/withoutprofile/{id}")
	public String updateServiceProvider(@PathVariable("id") int id, @RequestParam("name") String name,
			@RequestParam("description") String description, @RequestParam("email") String email,
			@RequestParam("phone") String mobile, @RequestParam("city") String city,
			@RequestParam("state") String state, @RequestParam("adress") String adress) {

		return service.updateServiceProviderWithoutProfile(id, name, description, email, mobile, adress, city, state);
	}

	// top services for home page

	@GetMapping("/gettopservice/carpenter")
	public List<ServiceProvider> getTopCarpainter() {
		return service.getTopCarpenter();
	}

	@GetMapping("/gettopservice/painter")
	public List<ServiceProvider> getTopPainter() {
		return service.getTopPainter();
	}

	@GetMapping("/gettopservice/plumber")
	public List<ServiceProvider> getTopPlumber() {
		return service.getTopPlumber();
	}

	@GetMapping("/gettopservice/electrician")
	public List<ServiceProvider> getTopElectrician() {
		return service.getTopElectrician();
	}

	@GetMapping("/gettopservice/packers")
	public List<ServiceProvider> getTopPackers() {
		return service.getTopPackers();
	}

	@GetMapping("/gettopservice/tilesmaker")
	public List<ServiceProvider> getTopTilesMaker() {
		return service.getTopTilesMaker();
	}

	// all services
	@GetMapping("/getall/carpenter/{sort}/{city}")
	public List<ServiceProvider> getAllCarpenter(@PathVariable("sort") String sortBy,
			@PathVariable("city") String city) {
		return service.getAll("carpenter", sortBy, city);
	}

	@GetMapping("/getall/painter/{sort}/{city}")
	public List<ServiceProvider> getAllPainter(@PathVariable("sort") String sortBy, @PathVariable("city") String city) {
		return service.getAll("painter", sortBy, city);
	}

	@GetMapping("/getall/electrician/{sort}/{city}")
	public List<ServiceProvider> getAllElectrician(@PathVariable("sort") String sortBy,
			@PathVariable("city") String city) {
		return service.getAll("electrician", sortBy, city);
	}

	@GetMapping("/getall/tilesmaker/{sort}/{city}")
	public List<ServiceProvider> getAllTilessMaker(@PathVariable("sort") String sortBy,
			@PathVariable("city") String city) {
		return service.getAll("tilesmaker", sortBy, city);
	}

	// sort => nearby,all,rating
	@GetMapping("/getall/packers/{sort}/{city}")
	public List<ServiceProvider> getAllPackers(@PathVariable("sort") String sortBy, @PathVariable("city") String city) {
		return service.getAll("packersandmovers", sortBy, city);
	}

	@GetMapping("/getall/plumber/{sort}/{city}")
	public List<ServiceProvider> getAllPlumber(@PathVariable("sort") String sortBy, @PathVariable("city") String city) {
		return service.getAll("plumber", sortBy, city);
	}

	// appointment
	@PutMapping("/setappointment/{userid}/{serviceid}")
	public String setAppointement(@PathVariable("userid") int userid, @PathVariable("serviceid") int serviceid) {
		return service.setAppointement(userid, serviceid);
	}

	@GetMapping("/getorders/user/{id}")
	public List<ServiceProvider> getOrdersUser(@PathVariable("id") int id) {
		return service.getUserOrders(id);
	}

	@GetMapping("/getorders/service/{id}")
	public List<User> getOrdersService(@PathVariable("id") int id) {
		return service.getServiceOrders(id);
	}

	@DeleteMapping("/deleteorder/{serviceid}/{userid}")
	public String deleteContract(@PathVariable("serviceid") int serviceid, @PathVariable("userid") int userid) {
		return service.deleteContract(serviceid, userid);
	}

	@DeleteMapping("/completeorder/{serviceid}/{userid}")
	public String completeContract(@PathVariable("serviceid") int serviceid, @PathVariable("userid") int userid) {
		return service.completeContract(serviceid, userid);
	}

	@GetMapping("/getdeletedorders/{id}")
	public List<ServiceProvider> getDeletedOrders(@PathVariable("id") int id) {
		return service.getDeletedOrders(id);
	}

	@GetMapping("/getcompletedorders/{id}")
	public List<ServiceProvider> getCompletedOrders(@PathVariable("id") int id) {
		return service.getCompletedOrders(id);
	}

	@DeleteMapping("/finaldelete/deleted/{serviceid}/{userid}")
	public String deleteFinalD(@PathVariable("userid") int userid, @PathVariable("serviceid") int serviceid) {
		return service.finalDeleteD(userid, serviceid);
	}

	@DeleteMapping("/finaldelete/completed/{serviceid}/{userid}")
	public String deleteFinalC(@PathVariable("userid") int userid, @PathVariable("serviceid") int serviceid) {
		return service.finalDeleteC(userid, serviceid);
	}

	// work
	@GetMapping("/getwork/service/{id}")
	public List<Work> getWork(@PathVariable("id") int id) {
		return service.getWork(id);
	}

	@PutMapping("/updatework/service/{id}")
	public String updateWork(@PathVariable("id") int id, @RequestParam("newwork") MultipartFile newWork) {
		return service.updateWork(id, newWork);
	}

	@DeleteMapping("/deletework/service/{serviceid}/{workid}")
	public String deleteWork(@PathVariable("serviceid") int serviceId, @PathVariable("workid") int workId) {
		return service.deleteWork(serviceId, workId);
	}

	// ratings
	@PutMapping("/setrating/{id}/{rating}")
	public String setServiceRating(@PathVariable("id") int id, @PathVariable("rating") int rating,
			@RequestParam("comment") String comment, @RequestParam("userid") int userid) {
		return service.setRating(id, rating, comment, userid);
	}

	@GetMapping("/getrating/{id}")
	public List<ReturnComment> getAllRatings(@PathVariable("id") int id) {
		return service.getAllRating(id);
	}

	// notification-service
	@PutMapping("/deleterequest/{userid}/{serviceid}")
	public String DeleteRequest(@PathVariable("userid") int userid, @PathVariable("serviceid") int serviceid) {
		return service.addDeleteRequest(userid, serviceid);
	}

	@GetMapping("/deleterequest/{serviceid}")
	public List<User> getDeleteRequest(@PathVariable("serviceid") int serviceid) {
		return service.getDeleteRequest(serviceid);
	}

	@GetMapping("/deleterequest/{userid}/{serviceid}")
	public String checkConnection(@PathVariable("userid") int userid, @PathVariable("serviceid") int serviceid) {
		return service.checkConnection(userid, serviceid);
	}

	@PutMapping("/acceptdeleterequest/{userid}/{serviceid}")
	public String acceptDeleteRequest(@PathVariable("userid") int userid, @PathVariable("serviceid") int serviceid) {
		return service.acceptDeleteRequest(userid, serviceid);
	}

	@DeleteMapping("/deleteuser/{id}")
	public String deleteUser(@PathVariable("id") int id) {
		return service.deleteUser(id);
	}

	@DeleteMapping("/deleteservice/{id}")
	public String deleteService(@PathVariable("id") int id) {
		return service.deleteService(id);
	}

	// wORKING WITH DATES
	@PostMapping("/addDates/service/{id}")
	public String Adddates(@RequestBody ListDates dates,@PathVariable("id") int id) {
		return service.addDate(dates.list,id);
	}
	
	@DeleteMapping("/resetDates/service/{id}")
	public String resetDates(@PathVariable("id") int id) {
		return service.resetDates(id);
	}
	
	@PutMapping("/deleteDates/service/{id}")
	public String deleteDates(@PathVariable("id") int id,@RequestBody ListDates dates) {
		return service.deleteDates(id,dates.list);
	}
	
	@GetMapping("/getDates/service/{id}")
	public ArrayList<TempDate> getDates(@PathVariable("id") int id){
		return service.getDates(id);
	}
	
	//OTP
	@PostMapping("/sendOTP/{number}")
	public String sendOTP(@PathVariable("number") String number) {
		return service.sendOTP("+91"+number,from);
	}
	
	@PostMapping("/checkemailandphone/user")
	public String checkUseEmailAndPhone(@RequestParam("email") String email,@RequestParam("phone") String phone) {
		return service.checkUserEmailAndPhone(email,phone);
	}
	
	@PostMapping("/checkemailandphone/service")
	public String checkServiceEmailAnPassword(@RequestParam("email") String email,@RequestParam("phone") String phone) {
		return service.checkServiceEmailAndPhone(email, phone);
	}
	
	@PostMapping("/changePass/{code}")
	public String changePassByNumber(@RequestParam("phone") String phone,@RequestParam("password") String pass,@PathVariable("code") int code) {
		return service.changePassByNumber(phone,pass,code);
	}
}
