Application Specific Requirements (70%)
Your task is to build out a Craigslist-Lite, complete with users, posts, and messages.
* Routes via React Router (This is a minimum; you could have more than just these routes. These routes may be named as you wish.):
    * /posts
    * /profile (with messages)
    * /login and /register (this could alternatively be displayed in the profile instead of living in its own route)
* Unauthenticated Users should be able to:
    * See a list of all posts
    * Sign up for an account with username and password
    * Sign in with correct username/password combination
* Unauthenticated Users should not be able to:
    * Create a new post
    * Delete any post
    * Send a message to the author of any post
* Authenticated Users should be able to:
    * Create a new post
    * Delete a post for which they are the author
    * Send a message to the author of any post for which they are not the author
    * See all messages for any post for which they are the author
    * See all messages they've received in a special view
* Authenticated Users should not be able to:
    * Delete posts for which they are not the author
    * Send a message to themselves
* All users should be able to:
    * Filter posts with a simple text matcher (no fetch call needed here)
* Opportunity for EXTRA CREDIT of up to 5% added to your overall score. Authenticated Users would be delighted to be able to:
    * Edit a post for which they are the author






Suggested Development Path

While the goal is for you to work through the details of a larger-scale application on your own, and to read and absorb the documentation provided by the API we are using, we have provided some thoughts on the path you might take through the different requirements below.
POSTS VIEW, UNAUTHENTICATED
First, get the posts showing on the page. Don't worry about tokens yet in this first step. We'll get to that later. This is a good first move, as it requires no special options in the fetch call.
As the app loads you should fetch the initial posts by making a GET request to /api/posts, and populating the posts into the JSX.
REGISTER / LOGIN / LOGOUT
Since so much of the app requires users to be able to be logged in, working here next is probably prudent.
First you need to create a form which sends the correct data to the backend. Your register form should have a place to enter a username, a place to enter a password, and a place to enter password confirmation.
Perhaps you want to set a min property on password and username length, and you should definitely make them required on the form inputs.
If the form is filled out sufficiently, you'll need to make a correct AJAX request to the back end (see documentation). On successful user creation, you'll be given a token.
That token will need to be stored on state (and optionally in localStorage if you want to save it for automatically logging in the user upon the next app load), and sent with all future requests. Any fetch request with a valid token is considered authenticated, and the user corresponding to the token is assumed by the API to be the one making the requests.
Once you can register, you should offer a form to be able to login, and a button to be able to log out.
Remember, the presence of the token on state should be how your front end treats the user as logged in/logged out, for all decisions it needs to make regarding rendering.
It might be useful for you to create some helper functions around this:
* logIn - which sets the token on state (and optionally in localStorage)
* logOut - which clears the token from the state (and from localStorage if we stored it there also)
* isLoggedIn - which lets you know if there's a current user logged in
And also, since you'll need them for fetch requests:
* makeHeaders - which creates a headers object with our without the bearer token depending on what is on state
For now, there are some "testing" API routes that let you see if you're currently logged in. You can hit them with fetch with headers (both logged in and logged out), and if you're setting them correctly you'll see the different responses you'll get.
You should also provide feedback on the form if the user provides incorrect credentials, as well as if the user tries to provide bad usernames or passwords.
POST FORM
You should make a form for users to make new listings. The fields for the form should match the fields that the API expects, and the submit button should be intercepted so that you can create the right fetch request.
This form could live in an aside that you show only to logged in users, or on submit you could show a modal that requires a person to sign in/sign up before you create the post. If you choose to show the form for logged in users only, make sure to update the interface whenever the user logs in... not only on page load.
The returned object is the new post. Since your state is keeping track of all available posts, it might be wise to add the returned one to that array and set state accordingly when it comes back.
POSTS VIEW, UPGRADED WITH AUTHENTICATION
Next you should work on providing a pleasant and "upgraded" view for all active posts: Currently, the app shows the posts, but we're not using all the available functionality of this route yet. When you make a GET request to /api/posts, if you don't send a token, the API will only provide you with all posts.
However, if you send a token, the posts made by the active user will also have the messages on them included. There's also an additional field provided by the API, isAuthor, which is only true for posts made by the user represented by the auth token. Make sure to suppress/show certain functionality for posts based on whether or not the current user is in fact the author.
DELETE BUTTON
Your posts should have a way for the active user to delete them, only if isAuthor is true for the post. Go ahead and add that now.
You'll also have to add a click handler to make that DELETE request. For each post, the delete handler will need a way to recover the post._id to help form the correct URL for the request.
On successful delete, make sure to remove that post from the page as well as from the array that is holding all posts in state.
MESSAGES FORM
For any post, you should add a form to send a message to the post author, only if there is a logged in user and the logged in user is not the one who made it.
The message form really only needs a text input, and a button to create the message.
Again, like the delete button, the submit handler will need a way to know how to form the correct URL so that the API responds, so make sure you're recovering it from the post element, if you're attaching it as data to begin with.
LOADING THE USER OBJECT ON PAGE LOAD
On page load, if there is a user logged in (i.e. if there is a token in localStorage that is subsequently loaded into state), you can make a GET request to /api/users/me and be given a user object. It will have all messages they've received, as well as all posts they've made (with messages partitioned by post).
It would be most useful to do this as part of your bootstrapping whenever the page is loaded.
SEARCH FORM
As part of your listings, add a little search form. Listen to the user typing into the field, and filter the listings in your state based on that.
One thing that is tempting is to replace the state with the results of the filter, but this will mean that if the user deletes the filter, or chooses to filter a new term, that you'd have to re-fetch the original list of postings.
Instead, keep a searchTerm in your state, and map over the postsToDisplay (or whatever you call it) instead of posts after the filter is applied. Below is a very loose attempt at providing some structure. You'll have to fill in the holes.
