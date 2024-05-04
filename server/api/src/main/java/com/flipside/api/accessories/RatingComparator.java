package com.flipside.api.accessories;

import java.util.Comparator;

import com.flipside.api.Entities.ServiceProvider;

public class RatingComparator implements Comparator<ServiceProvider>{

	@Override
	public int compare(ServiceProvider o1, ServiceProvider o2) {
		return (o1.getRating()-o2.getRating())*-1;
	}
    
}
