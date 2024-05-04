package com.test;

import java.util.Random;

public class Test {
      public static void main(String [] args) {
    	  Random rand = new Random();
    	  String otp = String.format("%04d", rand.nextInt(10000));
    	  System.out.println(otp);
      }
}
