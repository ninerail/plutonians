# GIF.SY
================================
## A Plutonians Production

[Heroku Deployment] (https://plutonians.herokuapp.com/ "Heroku Deployment")

1. GIF.SY is an application that allows users to search and select their favorite GIFs, save them to a collection and share them via Facebook

2. Technologies used:
	* Angular single page HTML
	* Passport authentication
	* CSS transitions
	* Facebook SDK for sharing gif to Facebook
	* Fontello custom characters

3. Two models are defined
	* Gifs stores the gif url and the number of likes
	* Users stores user login information and an array of gifs that have saved

4. Controllers
	* Show all users json (not public)
	* Is logged in: tests for authentication
	* Signup
	* Edit user profile
	* Delete gif (splices chosen gif out of user gifs array)
	* Logout
	* Get single user (upon login)
	* Put route (add image to user's gifs array)

5.	Plutonians are:
	* Andy Greene
	* Amber VandeKerkhoff
	* Matt Jamison