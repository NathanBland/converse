# Converse
An experimental social media platform

[![Join the chat at https://gitter.im/NathanBland/converse](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/NathanBland/converse?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Contributing
*Do not commit code to this repo.* Please create a fork, make your changes, and
then create a pull request. This helps keep a clear picture of what work was done
with your commits, and helps us keep our sanity. We use the [Standard JS](https://github.com/feross/standard) format, please comply with it.

## Goals/Feature List
For a more in depth look at what has been discussed please see
[this issue](https://github.com/whiteboards/converse/issues/5).

- As a user, I should be able to ask my select friends questions (see below) and get updated - information that I asked for.
- As a user, I should see my friends requests for information and be able to respond to that in a meaningful way.
- As a user, if I choose, I should be able to know who is asking for what information.
  - If I am ok with the default setting of "x(number) of your friends asked for an update" then great, however, if I want to know who is asking for what, I should have that option: "x, y, & z want to know what you are doing next Saturday"
- As a user, I should be able to see what others are asking my friends: "x has 3 friends that are wanting to know what he is listening to"
  - I should be able to add my name/number (x number of friends/names of friends) to this easily.
- As a user, I should not be given stale information. It should be "real time"
  - As a user, I should be able to define what period defines "stale"
  - If I ask for an update, you can show me what their most recent update was, but tell me how old it is, and notify me when they give an updated response: "The last time someone asked X what he was watching, he said he was watching star-wars. That was 4 days ago, asking him for an update."
- As a user, when someone asks me for an update, I should be able to give them meaningful
  content to interact with.
  - This should be specific to a question (youtube api, text-grabbing from articles, etc.)
- As a user, my interaction with Converse should be short, simple, and to the point.

More to come...

### Planned Features
_Draft of feature list. This is not final, this will change._
* [ ] Users
  * [x] Registration
  * [x] Authentication
  * [ ] Profile
    * [ ] Picture
    * [ ] Age
    * [ ] Location
    * [ ] Gender
    * [ ] Relationships
  * [ ] Privacy
    * [ ] Question level
      * [ ] What users can ask a question
      * [ ] Questions that are disabled
    * [ ] Profile Level
      * [ ] Public/private - Private by default
  * [ ] Questions/requests
    * [ ] What are you up to?
    * [ ] What are you listening to?
    * [ ] What are you reading?
    * [ ] What are you watching?
    * [ ] Where are you/where are you headed?
    * [ ] What are you....? (custom questions)
* [ ] Landing/dashboard
  * [ ] Notifications
  * [ ] Friends Grid/List
    * [ ] Status request
  * [ ] Feed
    * [ ] Status response
    * [ ] Status of requests
  * [ ] Add new Friends
    * [x] By email
    * [ ] Search by name
* [ ] Socket.io
  * [ ] Integration with `passport.js`
  * [ ] Notifications
  * [ ] Responses

## Technologies Used
* [node.js](https://nodejs.org/)
* [express](http://expressjs.com/)
  * `express`
* [passport](http://passportjs.org/)
  * `passport`
* [jade](http://jade-lang.com/)
  * `jade`
* [sass](http://sass-lang.com/)  
  * `node-sass`
  * Also `node-sass-middleware`
* [mdl-lite](http://www.getmdl.io/)  
  * `material-design-lite`
* [Browserify](http://browserify.org/)  
  * `browserify`
* [Watchify](https://www.npmjs.com/package/watchify)  
  * `npm install -g watchify`
  * To use:
    * `$ watchify js/main.js -o public/js/bundle.min.js`

## Contributors
* [NathanBland](https://github.com/NathanBland/)
* [keawade](https://github.com/keawade/)
* [crodeheaver](https://github.com/crodeheaver/)
