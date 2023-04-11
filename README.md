![title](https://img.shields.io/badge/Capstone%20Project-Food%20tracker-blue) - ![MERN](https://img.shields.io/badge/stack-MERN-ff69b4)
# Food tracker
My final project for Concordia's Web Development Bootcamp

# Description
This website allows you to search for restaurants in any area by inputting the address, city or country. You can save your favorite restaurants in your profile and leave reviews for the places you've visited to remember your experience for future reference.

## Food tracker contains a few sections :

* Homepage when there's no logged in user <br>
<img src="./client/src/images/noUser.png" alt="home page when there's no logged in user" height="210" width="350"/>

* Homepage when the user's logged in <br>
<img src="./client/src/images/Homefeed.png" alt="homefeed with the map and instructions" height="210" width="350"/>

* Profile icon to access the profile page or logout <br>
<img src="./client/src/images/profileIcon.png" alt="profile Icon with Profile and Logout links" height="210" width="350"/>

* Profile page <br>
<img src="./client/src/images/Profile.png" alt="profile page" height="210" width="350"/>

* In the profile page, a review from the user <br>
<img src="./client/src/images/review.png" alt="review from user" height="210" width="350"/>

* In the profile page, a sorting method to sort the favorite restaurants <br>
<img src="./client/src/images/Sort.png" alt="sorting method" height="210" width="350"/>

* Contact us and About Us page <br>
<img src="./client/src/images/contact.png" alt="Contact us page" height="210" width="350"/>
<img src="./client/src/images/about.png" alt="About us page" height="210" width="350"/>

### Used Api's : 
I used the Google Maps Api and Auth0 for this project.

### Used Packages : 
 - @auth0/auth0-react
- @react-google-maps/api
- google-map-react
- moment
- react
- react-dom
- react-global-style
- react-icons
- react-rating-stars-component
- react-router-dom
- react-scripts
- styled-components


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Project Setup
In the client directory, you can run:
* Type `cd client`
* Type `yarn install`
* Type `yarn start` to start the frontend dev environment.
Runs the app in the development mode.<br/>
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.
<br/>
In the server directory, you can run:
* Type `cd server`
* Type `yarn install`
* Type `yarn start` to start the backend dev environment.
Runs the server at [http://localhost:8888](http://localhost:8888)
