package com.flipside.api.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flipside.api.Entities.Work;

public interface WorkDao extends JpaRepository<Work, Integer>{
    @Transactional
    @Modifying
	@Query(value="insert into service_provider_work values(:s,:w)",nativeQuery=true)
	Integer setUpConnection(@Param("s")int id,@Param("w") int id2);
    
    @Transactional
    @Modifying
    @Query(value="delete from service_provider_work where service_provider_id =:s and work_id=:w",nativeQuery=true)
	Integer removeConnection(@Param("s")int serviceId,@Param("w") int workId);
    
    @Query(value="select * from work where id=:i",nativeQuery=true)
	Work getWork(@Param("i") int id);
    
	@Query(value="select work_id from service_provider_work where service_provider_id=:i",nativeQuery=true)
	List<Integer> getWorkIds(@Param("i") int id);
     
}
