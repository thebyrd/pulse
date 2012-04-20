pulse
=====

It helps you figure out what you&#39;re going to do tonight

The Model
---------

* Plan {id, places, descriptions (optional), rating, comment, date}
* Place {id, geodata, name, description, website, cost, romance, pictures}
	* Food {genre, mildness/strong}
		* Restaurant
			* Fast Food Restaurant
			* Casual Sit Down Restaurant
			* Formal Restaurant (anniversary type etc)
		* Desert
			* CasualDesert
			* FormalDesert
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
		* Bars & Clubs
			* Bars
			* Clubs
		* Movies (API)			
* User {id, name, email, history, dates, followers, following}

