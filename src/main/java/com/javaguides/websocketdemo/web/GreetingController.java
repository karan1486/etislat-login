package com.javaguides.websocketdemo.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.core.MessagePostProcessor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.util.HtmlUtils;

import com.javaguides.websocketdemo.model.Greeting;
import com.javaguides.websocketdemo.model.HelloMessage;

@CrossOrigin(origins="http://localhost:4200")
@Controller
public class GreetingController {

	@Autowired
	private SimpMessagingTemplate template;
	
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public void greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        
        	this.template.convertAndSend("/topic/greetings", new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!"), new MessagePostProcessor() {
			
			@Override
			public Message<?> postProcessMessage(Message<?> message) {
				byte[] object = ((byte[]) message.getPayload());
				String msg = new String(object);
				System.out.println(msg);
				return message;
			}
		});
       // return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }
}
