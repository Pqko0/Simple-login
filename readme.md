## Usage

* [ ] External app usage ( Javascript Apps, Etc auth apps )
* [ ] Dashboard ( Not supported YET )

## Obfectives

* [ ] Use js-sha256 to encrypt password to database
* [ ] Make user IDs for each user
* [ ] Make a email verification system
* [ ] Make a anti-swear word system
* [ ] Use express-sessions to stay logged in

## Plans

* [ ] Setup Frontend server ( Packages: express, express-sessions, express-handlebars, cookieparser )
* [ ] Setup Backend server ( Packages: express, mongooose, js-sha256, nodemailer, bad-words, cookieparser )

## Frontend

* [ ] GET /login ( Login page making )
* [ ] POST /login ( Send /login POST to backend NOT HTML JS )
* [ ] GET /register ( Register page making )
* [ ] POST /register ( Make /register POST Request to backend NOT HTML JS )

## Backend

* [ ] GET /users
* [ ] POST /login
 * [ ] Use js-sha256 hmac 
 * [ ] Send back
* [ ] POST /register
 * [ ] Basic check
 * [ ] Anti Swear-Word Check
 * [ ] Hash using HMAC SHA256
 * [ ] Save to mongoose