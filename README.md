# Django Rest Framework + React = ❤ (Frontend)

## IMPORTANT

This repository is designed to be used with [GhostPost Backend](https://github.com/forty9unbeaten/ghostPostReactFrontend)

## React with Django REST

As the internet becomes bigger and applications become more complex, the "simple" front end we all know and love is slowly dying. It still works well for certain types of websites, but the user (and the developers) are getting more and more accustomed to a more complex, but more extendable, way of building things.

The purpose of this project is to build a React front end that interfaces with a Django Rest Framework back end running on the same machine.

The GhostPost Machine™ is a website where people can anonymously post Boasts or Roasts of whatever they want. Like Twitter, there is a character limit: 280 characters. We are deliberately not dealing with logins, as that is outside the scope of the project (and beyond our time constraints).

## Your Task

Build a front end Single Page Application (SPA) using [React](https://reactjs.org/)

### Front End:

-   Homepage that displays boasts and roasts
-   Buttons to filter the content by either boasts or roasts
-   Upvote and downvote buttons for each boast and roast
-   Ability to sort content based on number of votes
-   Page to submit a boast or a roast

##### Note: Try to make your React app as simple as possible. We don't need `react-redux` or `react-router` to accomplish our task. Once you get the basic functionality, feel free to extend it if you so desire. The focus of this assessment is not the frontend. We just need one to display the data.

## Resources

### Basic DRF + React tutorials

[Making React & Django Play Well Together](https://fractalideas.com/blog/making-react-and-django-play-well-together-single-page-app-model/)

[REST Framework & React Tutorial](https://wsvincent.com/django-rest-framework-react-tutorial/)

##### Note: You will not need to worry about the CSRF tokens we use with standard Django.

### React Tools

[Create-React-App](https://github.com/facebook/create-react-app)

[React Debugging](https://raygun.com/blog/react-debugging-guide/)

## Extra credit (3 points):

Add a DELETE method that works for both boasts and roasts. "Wait, how will we delete if it's anonymous?", I hear you ask. When a boast or a roast is created, it should have a random 6 character string associated with it (so that it's hard to guess).

If that string is sent in a URL with the DELETE method to the boast or roast endpoints, then it should delete the object. For example, if boast 2 has the "magic string" of "abcdef", then you would use a GET call on localhost:8000/api/posts/2 and a DELETE call against localhost:8000/api/posts/abcdef.

When the object is created, the magic string should be passed back to the front end and given to the user; something like "If you want to delete your post, click this link!". One option to look into is using [window.alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
