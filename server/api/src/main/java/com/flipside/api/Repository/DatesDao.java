package com.flipside.api.Repository;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flipside.api.Entities.Dates;
import com.flipside.api.Entities.TempDate;

public interface DatesDao extends JpaRepository<Dates, Integer>{
    
	@Transactional
	@Modifying
	@Query(value="insert into service_provider_busy_dates values(:s,:d)",nativeQuery=true)
	Integer createConnection(@Param("s")int id,@Param("d") int dateid);
    

    
	@Query(value="select busy_dates_dateid from service_provider_busy_dates where service_provider_id = :i",nativeQuery=true)
	ArrayList<Integer> getIds(@Param("i")int id);


    @Transactional
    @Modifying
    @Query(value="delete from service_provider_busy_dates where service_provider_id = :i",nativeQuery=true)
	Integer deleteConnection(@Param("i")int id);


    @Query(value="select dateid from dates where date = :a and month = :m and year = :y",nativeQuery=true)
	Integer findId(@Param("a") String date,@Param("m") String month,@Param("y") String year);
    


    @Transactional
    @Modifying
    @Query(value="delete from service_provider_busy_dates where service_provider_id =:i and busy_dates_dateid=:t",nativeQuery=true)
	Integer deleteSingleConnection(@Param("i")int id,@Param("t") Integer tempid);
  
}
