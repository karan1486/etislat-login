package com.javaguides.websocketdemo.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.core.MessagePostProcessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.HtmlUtils;

import com.javaguides.websocketdemo.model.Greeting;

@CrossOrigin(origins="http://localhost:4200")
@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

	@Autowired
	private SimpMessagingTemplate template;
	
	private static final Logger logger = LoggerFactory.getLogger(RestController.class);
	 

	@GetMapping("/changestate")
	public void greeting() throws Exception {
		//this.template.convertAndSend("/topic/greetings", new Greeting("Hello, " + HtmlUtils.htmlEscape("Ramesh Fadatare - State Changed") + "!"));
		this.template.convertAndSend("/topic/greetings", new Greeting("Hello, " + HtmlUtils.htmlEscape("Ramesh Fadatare - State Changed") + "!"), new MessagePostProcessor() {
			
			@Override
			public Message<?> postProcessMessage(Message<?> message) {
				byte[] byteStr = message.getPayload().toString().getBytes();
				String msg = new String(byteStr);
				return message;
			}
		});
	}
}
