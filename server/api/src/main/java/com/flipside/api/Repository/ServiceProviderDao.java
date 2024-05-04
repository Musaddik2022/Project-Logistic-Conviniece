package com.flipside.api.Repository;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flipside.api.Entities.ServiceProvider;
import com.flipside.api.Entities.User;

public interface ServiceProviderDao extends JpaRepository<ServiceProvider, Integer>{
    
	@Query(value="select * from service_provider where email=:e and password=:p",nativeQuery=true)
	ServiceProvider verifyService(@Param("e") String email,@Param("p") String password);
    
	//top three ratings
	@Query(value="select Max(rating) from service_provider where occupation=:o",nativeQuery=true)
	Integer firstRating(@Param("o") String occ);
	
	@Query(value="select Max(rating) from service_provider where occupation=:o and rating < :r",nativeQuery=true)
    Integer secondRating(@Param("o") String occ,@Param("r") int first);
	
	@Query(value="select Max(rating) from service_provider where occupation=:o and rating < :r",nativeQuery=true)
	Integer thirdRating(@Param("o") String occ,@Param("r") int second);
	
	//Top 3 employees
	@Query(value="select * from service_provider where rating =:r  and occupation=:o",nativeQuery=true)
	ArrayList<ServiceProvider> getFirst(@Param("o") String occ,@Param("r") int first);
    
	@Query(value="select * from service_provider where rating =:r and occupation=:o",nativeQuery=true)
	ArrayList<ServiceProvider> getSecond(@Param("o") String occ, @Param("r") int second);
    
	@Query(value="select * from service_provider where rating =:r and occupation=:o",nativeQuery=true)
	ArrayList<ServiceProvider> getThird(@Param("o") String occ,@Param("r") int third);
    
	
	@Transactional
	@Modifying
	@Query(value="update service_provider set rating=:r where id=:i",nativeQuery=true)
	int setRating(@Param("i") int id,@Param("r") int rating);
    
	@Query(value="select rating from service_provider where id=:i",nativeQuery=true)
	int getRating(@Param("i") int id);
	
	@Query(value="select total_ratings from service_provider where id=:i",nativeQuery=true)
	int getTotalRating(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="update service_provider set total_ratings=:t where id=:i",nativeQuery=true)
	int increamentRating(@Param("i") int id,@Param("t") int total);
    
	@Query(value="select * from service_provider where occupation=:o",nativeQuery=true)
	List<ServiceProvider> getAll(@Param("o") String occ);
    
	@Query(value="select * from service_provider where occupation =:o and city=:c",nativeQuery=true)
	List<ServiceProvider> getAll(@Param("o") String occ,@Param("c") String city);
    
	@Query(value="select count(*) from service_provider where email=:e",nativeQuery=true)
	int verifyEmail(@Param("e") String email);
    
	@Query(value="select * from service_provider where id=:i",nativeQuery=true)
	ServiceProvider getserviceProvider(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="insert into service_provider_orders values(:s,:u)",nativeQuery=true)
	Integer setServiceorder(@Param("s") int serviceid,@Param("u") int userid);
    
	@Query(value="select orders_id from service_provider_orders where service_provider_id=:i",nativeQuery=true)
	List<Integer> getOrdersId(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="update service_provider set name=:n,email=:e,description=:d,mobile=:m,adress=:a,city=:c,state=:s,profile=:p where id=:i",nativeQuery=true)
	int updateService(@Param("i") int id,
			@Param("n") String name,
			@Param("d") String description, 
			@Param("e") String email,
			@Param("m") String mobile,
			@Param("a") String adress,
			@Param("c") String city,
			@Param("s") String state,
			@Param("p") byte[] bytes);
    
	
	@Transactional
	@Modifying
	@Query(value="delete from service_provider_orders where service_provider_id=:u and orders_id=:o",nativeQuery=true)
	Integer deleteContract(@Param("u")int serviceid,@Param("o") int userid);
    
	@Query(value="select work from service_provider where id=:i",nativeQuery=true)
	List<byte[]> getWork(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="update service_provider set work =:w where id=:i",nativeQuery=true)
	Integer addWork(@Param("w") byte[] work,@Param("i") int id);
    
	@Query(value="select comments_id from service_provider_comments where service_provider_id=:s",nativeQuery=true)
	List<Integer> getCommentsId(@Param("s") int id);
    
	@Transactional
	@Modifying
	@Query(value="insert into service_provider_delete_request values(:s,:u)",nativeQuery=true)
	Integer addDeleteRequest(@Param("s") int serviceid,@Param("u") int userid);
    
	@Query(value="select delete_request_id from service_provider_delete_request where service_provider_id=:s",nativeQuery=true)
	List<Integer> getDeleteRequest(@Param("s") int serviceid);
    
	@Transactional
	@Modifying
	@Query(value="delete from service_provider_delete_request where service_provider_id=:s and delete_request_id=:u",nativeQuery=true)
	Integer removeDeleteRequest(@Param("s")int serviceid,@Param("u") int userid);
    
	@Query(value="select count(*) from service_provider_delete_request where service_provider_id=:s and delete_request_id=:u",nativeQuery=true)
    Integer checkConnection(@Param("s")int serviceid,@Param("u") int userid);
    
	@Transactional
	@Modifying
	@Query(value="update service_provider set name=:n,email=:e,description=:d,mobile=:m,adress=:a,city=:c,state=:s where id=:i",nativeQuery=true)
    Integer updateServiceWithoutProfile(@Param("i") int id,
			@Param("n") String name,
			@Param("d") String description, 
			@Param("e") String email,
			@Param("m") String mobile,
			@Param("a") String adress,
			@Param("c") String city,
			@Param("s") String state);
    
	@Transactional
	@Modifying
	@Query(value="delete from service_provider_orders where orders_id=:i",nativeQuery=true)
	Integer deleteOrders(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from service_provider_delete_request where delete_request_id=:i",nativeQuery=true)
	Integer deleteRequest(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from service_provider_comments where comments_id=:i",nativeQuery=true)
	Integer deleteComment(@Param("i") int a);
    
	@Modifying
	@Transactional
	@Query(value="delete from service_provider_comments where service_provider_id=:i",nativeQuery=true)
	Integer deleteConnection(@Param("i") int id);
    
	@Modifying
	@Transactional
	@Query(value="delete from user_orders where orders_id=:i",nativeQuery=true)
	Integer deleteOrdersByServiceId(@Param("i")int id);
    
	@Modifying
	@Transactional
	@Query(value="delete from service_provider_delete_request where service_provider_id=:i",nativeQuery=true)
	Integer deleteDeleteRequest(@Param("i")int id);
    
	@Query(value="select work_id from service_provider_work where service_provider_id=:i",nativeQuery=true)
	List<Integer> findAllWork(@Param("i")int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from service_provider_work where service_provider_id=:i",nativeQuery=true)
	Integer deleteWorkConnection(@Param("i") int id);

	
	@Query(value="select count(*) from service_provider where email=:e and mobile=:m",nativeQuery=true)
	Integer checkEmailAndPhone(@Param("e") String email,@Param("m") String phone);
    
	@Query(value="select password from service_provider where email=:e and mobile=:p",nativeQuery=true)
    String getPasswordByPhoneandEmail(@Param("e")String email,@Param("p") String phone);

	@Transactional
	@Modifying
	@Query(value="update service_provider set password=:p where mobile=:m",nativeQuery=true)
	Integer changePass(@Param("m")String phone,@Param("p") String pass);
	
}
