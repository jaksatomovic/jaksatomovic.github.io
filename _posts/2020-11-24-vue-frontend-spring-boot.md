---
layout: post
title:  "Vue.js Frontend with a Spring Boot Backend"
author: jaksa
categories: [ Spring, tutorial ]
image: assets/images/11.jpg
---

# Vue.js Frontend with a Spring Boot Backend | Baeldung

[Source](https://www.baeldung.com/spring-boot-vue-js "Permalink to Vue.js Frontend with a Spring Boot Backend | Baeldung")

## 1\. Overview

In this tutorial, we'll go over an example application that renders a single page with a Vue.js frontend, while using Spring Boot as a backend.

We'll also utilize Thymeleaf to pass information to the template.

## 2\. Spring Boot Setup

The application *pom.xml* uses the [*spring-boot-starter-thymeleaf*](https://www.baeldung.com/spring-boot-starter-thymeleaf) dependency for template rendering along with the usual *[spring-boot-starter-web](https://search.maven.org/classic/#search%7Cga%7C1%7Ca%253A%22spring-boot-starter-web%22)*:

    	<dependency> 

    	    <groupId>org.springframework.boot</groupId>

    	    <artifactId>spring-boot-starter-web</artifactId> 

    	    <version>2.2.2.RELEASE</version>

    	</dependency> 

    	<dependency> 

    	    <groupId>org.springframework.boot</groupId>

    	    <artifactId>spring-boot-starter-thymeleaf</artifactId> 

    	    <version>2.2.2.RELEASE</version>

    	</dependency>

Thymeleaf by default looks for view templates at *templates/*, we'll add an empty *index.html* to *src/main/resources/templates/index.html*. We'll update its contents in the next section.

Finally, our Spring Boot controller will be in *src/main/java*:

    	@Controller

    	public class MainController {

    	    @GetMapping("/")

    	    public String index(Model model) {

    	        model.addAttribute("eventName", "FIFA 2018");

    	        return "index";

    	    }

    	}

This controller renders a single template with data passed to the view via the Spring Web Model object using *model.addAttribute*.

Let's run the application using:

    	mvn spring-boot:run

Browse to *http://localhost:8080* to see the index page. It'll be empty at this point, of course.

Our goal is to make the page print out something like this:

    	Name of Event: FIFA 2018

    	Lionel Messi

    	Argentina's superstar

    	Christiano Ronaldo

    	Portugal top-ranked player

## 3\. Rendering Data Using a Vue.Js Component

### 3.1. Basic Setup of Template

In the template, let's load Vue.js and Bootstrap (optional) to render the User Interface:

    	// in head tag

    	<!-- Include Bootstrap -->

    	//  other markup

    	// at end of body tag

    	<script 

    	  src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js">

    	</script>

    	<script 

    	  src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js">

    	</script>

Here we load Vue.js from a CDN, but you can host it too if that's preferable.

We load Babel in-browser so that we can write some ES6-compliant code in the page without having to run transpilation steps.

In a real-world application, you'll likely use a build process using a tool such as Webpack and Babel transpiler, instead of using in-browser Babel.

Now let's save the page and restart using the *mvn spring-boot*:*run* command. We refresh the browser to see our updates; nothing interesting yet.

Next, let's set up an empty div element to which we'll attach our User Interface:

    	<div id="contents"></div>

Next, we set up a Vue application on the page:

    	<script type="text/babel">

    	    var app = new Vue({

    	        el: '#contents'

    	    });

    	</script>

What just happened? This code creates a Vue application on the page. We attach it to the element with CSS selector *\#contents*.

That refers to the empty *div* element on the page. The application is now set up to use Vue.js!

### 3.2. Displaying Data in the Template

Next, let's create a header which shows the ‘*eventName*‘ attribute we passed from Spring controller, and render it using Thymeleaf's features:

    	<div class="lead">

    	    <strong>Name of Event:</strong>

    	    <span th:text="${eventName}"></span>

    	</div>

Now let's attach a ‘*data'* attribute to the Vue application to hold our array of player data, which is a simple JSON array.

Our Vue app now looks like this:

```java
    	<script type="text/babel">

    	    var app = new Vue({

    	        el: '#contents',

    	        data: {

    	            players: [

    	                { id: "1", 

    	                  name: "Lionel Messi", 

    	                  description: "Argentina's superstar" },

    	                { id: "2", 

    	                  name: "Christiano Ronaldo", 

    	                  description: "World #1-ranked player from Portugal" }

    	            ]

    	        }

    	    });

        </script>
```

Now Vue.js knows about a data attribute called *players*.

### 3.3. Rendering Data with a Vue.js Component

Next, let's create a Vue.js component named *player-card* which renders just one *player*. **Remember to register this component before creating the Vue app.**

Otherwise, Vue won't find it:

    	Vue.component('player-card', {

    	    props: ['player'],

    	    template: `<div class="card">

    	        <div class="card-body">

    	            <h6 class="card-title">

    	                {{ player.name }}

    	            </h6>

    	            <p class="card-text">

    	                <div>

    	                    {{ player.description }}

    	                </div>

    	            </p>

    	        </div>

    	        </div>`

    	});

Finally, let's loop over the set of players in the app object and render a *player-card* component for each player:

    	<ul>

    	    <li style="list-style-type:none" v-for="player in players">

    	        <player-card

    	          v-bind:player="player" 

    	          v-bind:key="player.id">

    	        </player-card>

    	    </li>

    	</ul>

The logic here is the Vue directive called *v-for,* which will loop over each player in the *players* data attribute and render a *player-card* for each *player* entry inside a *\<li\>* element.

*v-bind:player* means that the *player-card* component will be given a property called *player* whose value will be the *player* loop variable currently being worked with. *v-bind:key* is required to make each *\<li\>* element unique.

Generally, *player.id* is a good choice since it is already unique.

Now if you reload this page, observe the generated HTML markup in *devtools*, and it will look similar to this:

    	<ul>

    	    <li style="list-style-type: none;">

    	        <div class="card">

    	            // contents

    	        </div>

    	    </li>

    	    <li style="list-style-type: none;">

    	        <div class="card">

    	            // contents

    	        </div>

    	    </li>

    	</ul>

A workflow improvement note: it'll quickly become cumbersome to have to restart the application and refresh the browser each time you make a change to the code.

Therefore, to make life easier, please refer to [this article](https://www.baeldung.com/spring-boot-devtools) on how to use Spring Boot *devtools* and automatic restart.

## 4\. Conclusion

In this quick article, we went over how to set up a web application using Spring Boot for backend and *Vue.js* for the frontend. This recipe can form the basis for more powerful and scalable applications, and this is just a starting point for most such applications.

As usual, code samples can be found [over on GitHub](https://github.com/eugenp/tutorials/tree/master/spring-boot-modules/spring-boot-vue).

### **I just announced the new *Learn Spring* course, focused on the fundamentals of Spring 5 and Spring Boot 2: **

**[\>\> CHECK OUT THE COURSE](https://www.baeldung.com/ls-course-end)**