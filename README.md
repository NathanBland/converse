# Converse
An experimental social media platform

[![Join the chat at https://gitter.im/NathanBland/converse](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/NathanBland/converse?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Contributing
*Do not commit code to this repo.* Please create a fork, make your changes, and
then create a pull request. This helps keep a clear picture of what work was done
with your commits, and helps us keep our sanity.

## Planned Features
For a more current version of what is planned/being discussed please see
[this issue](https://github.com/whiteboards/converse/issues/5)
_draft of feature list_
* Users
  * Registration
  * Authentication
  * Profile
    * Picture
    * Age
    * Location?
* Landing
  * Notifications
  * Friends Grid/List
    * Status request
  * Feed
    * Status response
    * Status of requests
  * Add new Friends
    * By username
    * Search by name

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
