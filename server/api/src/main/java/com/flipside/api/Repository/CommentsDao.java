package com.flipside.api.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flipside.api.Entities.Comments;

public interface CommentsDao extends JpaRepository<Comments, Integer>{
    
	@Transactional
	@Modifying
	@Query(value="insert into user_comments values(:u,:c)",nativeQuery=true)
	Integer connectCommentUser(@Param("c")int id,@Param("u") int userid);
    
	@Transactional
	@Modifying
	@Query(value="insert into service_provider_comments values(:s,:c)",nativeQuery=true)
	Integer connectCommentService(@Param("c") int id,@Param("s") int id2);
    
	@Query(value="select * from comments where id=:i",nativeQuery=true)
	Comments getComment(@Param("i") int a);
    
	@Query(value="select comments_id from user_comments where user_id=:i",nativeQuery=true)
	List<Integer> FindAllCommentsById(@Param("i") int id);
    
	@Transactional
	@Modifying
	@Query(value="delete from user_comments where user_id=:i",nativeQuery=true)
	Integer deleteConnection(@Param("i")int id);
    
	@Query(value="select comments_id from service_provider_comments where service_provider_id=:i",nativeQuery=true)
	List<Integer> FindAllComments(@Param("i") int id);
	
	

}
