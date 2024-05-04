package com.flipside.api.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flipside.api.Entities.Default;

public interface DefalutDao extends JpaRepository<Default, Integer>{
    
	@Query(value="select * from table_default where id =:i",nativeQuery=true)
	Default getByObjectId(@Param("i") int i);

}
