pulse
=====

It helps you figure out what you&#39;re going to do tonight

The Model
---------

* Plan {id, places, descriptions (optional), rating, comment, date}
* Place {id, geodata, name, description, website, cost, romance, pictures}
	* Food {genre, mildness/strong}
		* Restaurant {formalScore (1 for formal and 0 for casual}
		* Desert {formalScore (1 for formal and 0 for casual}
		* Cafes
			
  	* Entertainment {physical intensity}
		* Outdoor
			* Parks
			* Beaches
		
		* Sports
			* ie Bowling, Skating...
		* Shopping
		* Events (API?)
			* Concerts
			* Musicals
			* Sporting events
		* Cultural
			* Museums
			* Cultural walks		
		* Bars & Clubs {formalScore (1 for formal and 0 for casual}
			* Bars
			* Clubs
		* Movies (API)			
* User {id, name, email, history, dates, followers, following}

