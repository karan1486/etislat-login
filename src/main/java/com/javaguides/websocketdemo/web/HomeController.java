package com.javaguides.websocketdemo.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins="http://localhost:4200")
@Controller
public class HomeController {
	
	@GetMapping("/pluggable.html")
	public String pluggable() {
		return "pluggable";
	}

	@GetMapping("/standalone.html")
	public String standalone() {
		return "standalone";
	}
}
