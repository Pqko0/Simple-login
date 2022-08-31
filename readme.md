## Notice

Allowed for personal usage or other.
**Give credits if using this! Without and credits I will stop releasing any projects like this.**

## Usages

* [ ] External app usage ( Javascript Apps, Etc auth apps )
* [ ] Dashboard ( Not supported YET )

## How to use

Coming Soon

## Obfectives

* [x] Use .env file
* [x] Enable/Disable Emails in GET /users ( .env )
* [x] Use js-sha256 to encrypt password to database
* [ ] Make user IDs for each user
* [ ] Make a email verification system
* [ ] Make a anti-swear word system
* [ ] Use express-sessions to stay logged in
* [ ] Rate limit each IP ( 10 API Requests per 10 minutes )
* [ ] Express slowdown per IP ( 10 API Requests per 10 minutes 500ms Seconds delay add )

## Plans

* [ ] Setup Frontend server ( Packages: express, express-sessions, express-handlebars )
* [ ] Setup Backend server ( Packages: express, express-rate-limit, express-slow-down, mongooose, js-sha256, nodemailer, bad-words, cookieparser )

## Frontend

* [x] Use public folder for html ( express-handlebars to be specific )
* [x] GET /notif ( Show notification if backend is having errors )
* [x] GET /users for frontend
* [x] GET /login ( POST Request /login )
* [ ] POST /login ( Send /login POST to backend NOT HTML JS )
* [ ] GET /register ( POST Request /register )
* [ ] POST /register ( Make /register POST Request to backend NOT HTML JS )
* [ ] GET /reset ( POST Request /reset )
* [ ] POST /reset (Reset password for user using user email)

## Backend

* [x] GET /users
* [x] Return all signed up users ( Check backend .env to turn emails in api )
* [x] POST /login
* [x] Use js-sha256 hmac 
* [x] Send data back
* [ ] POST /register
* [ ] Basic check
* [ ] Anti Swear-Word Check
* [ ] Hash using HMAC SHA256
* [ ] Save to mongoose
* [ ] POST /reset
* [ ] Check if user exists
* [ ] Send email to user
* [ ] Send Temporary token to user generated by Client ( Frontend )