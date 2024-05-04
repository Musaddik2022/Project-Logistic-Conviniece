package com.flipside.api.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flipside.api.Entities.ServiceProvider;
import com.flipside.api.Entities.User;


public interface UserDao extends JpaRepository<User, Integer>{
    
	@Query(value="select * from user where email=:e and password=:p",nativeQuery=true)
	User verifyUser(@Param("e") String email,@Param("p") String password);
    
	@Query(value="select count(*) from user where email=:e",nativeQuery=true)
	int verifyEmail(@Param("e") String email);
    
	@Query(value="select * from user where id=:i",nativeQuery=true)
	User findUserById(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="insert into user_orders values(:u,:s)",nativeQuery=true)
	Integer setUserorder(@Param("u") int userid,@Param("s") int serviceid);
    
	@Query(value="select orders_id from user_orders where user_id = :i",nativeQuery=true)
	List<Integer> getOrdersId(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from user_orders where user_id=:u and orders_id=:o",nativeQuery=true)
	Integer deleteContract(@Param("u")int userid,@Param("o") int serviceid);
    
	@Query(value="select count(*) from user_orders where user_id=:u and orders_id=:o",nativeQuery=true)
	Integer verifyOrder(@Param("u") int userid,@Param("o") int serviceid);
    
	@Transactional
	@Modifying
	@Query(value="insert into user_deleted_orders values(:u,:s)",nativeQuery=true)
	Integer addToDeletedList(@Param("s")int serviceid,@Param("u") int userid);
	
	@Transactional
	@Modifying
	@Query(value="insert into user_completed_orders values(:u,:s)",nativeQuery=true)
	Integer addToCompletedList(@Param("s")int serviceid,@Param("u") int userid);
    
	@Query(value="select deleted_orders_id from user_deleted_orders where user_id=:u",nativeQuery=true)
	List<Integer> getDeletedOrders(@Param("u") int id);
    
	@Query(value="select completed_orders_id from user_completed_orders where user_id=:u",nativeQuery=true)
	List<Integer> getCompletedOrders(@Param("u") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from user_deleted_orders where user_id=:u and deleted_orders_id=:s",nativeQuery=true)
	Integer deleteFinalD(@Param("u")int userid,@Param("s") int serviceid);
    
	@Transactional
	@Modifying
	@Query(value="delete from user_completed_orders where user_id=:u and completed_orders_id=:s",nativeQuery=true)
	Integer deleteFinalC(@Param("u")int userid,@Param("s") int serviceid);
    
	@Transactional
	@Modifying
	@Query(value="update user set name=:n,email=:e,city=:c,state=:s,mobile=:m,password=:w,profile=:p where id=:i",nativeQuery=true)
	Integer updateUser(@Param("i")int userid,@Param("n") String name,@Param("e") String email,@Param("p") byte[] profile,@Param("w") String password,@Param("c") String city,@Param("s") String state,
			@Param("m") String mobile);
    
	@Transactional
	@Modifying
	@Query(value="update user set name=:n,email=:e,city=:c,state=:s,mobile=:m,password=:w where id=:i",nativeQuery=true)
	Integer updatewithoutProfile(@Param("i")int userid,@Param("n") String name,@Param("e") String email,@Param("w") String password,@Param("c") String city,@Param("s") String state,
			@Param("m") String mobile);
    
	@Transactional
	@Modifying
	@Query(value="delete from user where id=:i",nativeQuery=true)
	Integer deleteFromUser(@Param("i") int id);
     
	@Transactional
	@Modifying
	@Query(value="delete from user_orders where user_id =:i",nativeQuery=true)
	Integer deleteOrders(@Param("i") int id);
	
	@Transactional
	@Modifying
	@Query(value="delete from user_deleted_orders where user_id=:i",nativeQuery=true)
	Integer deleteDeletedOrders(@Param("i")int id);
	
	@Transactional
	@Modifying
	@Query(value="delete from user_completed_orders where user_id=:i",nativeQuery=true)
	Integer deleteCompletedOrders(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from user_comments where comments_id=:i",nativeQuery=true)
	Integer deleteComment(@Param("i")int a);
    
	@Transactional
	@Modifying
	@Query(value="delete from service_provider_orders where service_provider_id=:i",nativeQuery=true)
	Integer deleteOrdersByServiceId(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from user_deleted_orders where deleted_orders_id=:i",nativeQuery=true)
	Integer deleteDeletedOrdersByServiceId(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from user_completed_orders where completed_orders_id=:i",nativeQuery=true)
	Integer deleteCompletedOrdersByServiceId(@Param("i") int id);
    
	@Query(value="select count(*) from user where email=:e and mobile=:m",nativeQuery=true)
	int checkEmailAndPhone(@Param("e") String email,@Param("m") String phone);
    
	@Query(value="select password from user where email=:e and mobile=:p",nativeQuery=true)
    String getPasswordByPhoneandEmail(@Param("e")String email,@Param("p") String phone);
    
	@Transactional
	@Modifying
	@Query(value="update user set password=:p where mobile=:m",nativeQuery=true)
	Integer changePass(@Param("m")String phone,@Param("p") String pass);
    
}
