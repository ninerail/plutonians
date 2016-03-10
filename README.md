# GIF.SY
================================
## A Plutonians Production

[Heroku Deployment] (https://plutonians.herokuapp.com/ "Heroku Deployment")

1. GIF.SY is an application that allows users to search and select their favorite GIFs, save them to a collection and share them via Facebook

2. Features
	* Sign up/log in functionality: encrypted passwords and authentication flow
	* User restrictions

2. Technologies used:
	* Angular single page with full CRUD functionality
	* Giphy API
	* Passport authentication
	* Angular transitions
	* Facebook SDK for sharing gif to Facebook
	* Fontello custom characters
	* HTML
	* CSS
	* Javascript
	* jQuery
	* Node.js
	* Express
	* MongoDB


3. Two models are defined
	* Gifs stores the gif url and the number of likes
	* Users stores user login information and an array of gifs that have saved

4. Controllers
	* Show all users json (not public)
	* Is logged in (tests for authentication)
	* Signup
	* Edit user profile
	* Delete gif (splices chosen gif out of user gifs array)
	* Logout
	* Get single user (upon login)
	* Put route (add image to user's gifs array)

6. Future Implementations:
	* Ability to see other users' gifs
	* Ability to share gifs with other users
	* Ability to comment on users' gifs
	* API integration with Twitter, Pinterest
	* Ability to create and upload own gifs

5.	Plutonians are:
	* Andy Greene
	* Amber VandeKerkhoff
	* Matt Jamison


