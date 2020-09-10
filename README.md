# Surrogate Languages Website
This site was created for Professor Laura McPherson's research about Musical Surrogate languages

## Functionality
### Users
There are 3 roles that a user can have (admin/contributor/none):
- Admins can change user roles, create new media pages, create new about pages, create new news as well as do everything that a contributor can do.
- Contributors can write/edit/hide blog posts and input/edit/delete languages for the map. Contributors have their own bio for the contributor bio section
- None. These users have an account but have no permissions to do anything but change their password.

### Media pages
These are free form pages where an admin can write as many blurbs as they want. For each blub, you can attach a media file (video/audio) which also has an explanatory blub. This gives admins a lot of room to customize these media pages. They can create, edit, and delete pages as they wish. Once completed they will appear in the "media" dropdown on the navbar.

### About pages
These pages are just blurbs that give information about this site. HTML comes from the rich text editor. Admins can create, edit, and delete pages as they wish. Once completed they will appear in the "about" dropdown on the navbar.

### Contriutor bio
Each admin and contributor has a bio. They all show up in this page. If they have not filled it out yet, then it does not appear on this page.

### Add content to this site
This is the space for admins to do everything that is unique to them (see above).

### Profile
This is where users can change their passwords, emails, and bios (if they are an admin or contributor).

### Blog
This is a space where admins and contributors can write blog posts. They are tagged with keywords for searchability. Any user (with or without an account) can comment on these posts. Admins and contributors have the ability to hide posts and comments. 

### Podcast
In production

### Map
The map uses [Amcharts'](https://www.amcharts.com/) [am4core package](https://www.amcharts.com/docs/v4/chart-types/map/) with the [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code labeling. Coordinates for the countries can be found [here](https://drive.google.com/file/d/12moxdLpDxnMZufvkA3qZXvFjga3BkOh5/view).
The map is meant to be an open source database for surrogate languages. A CSV of the data can be downloaded directly from the site.

### Home page
The home page features the news on the right side which can be edited by the admins. It prominently features the most recent blog post and links to the about pages. 

### Signin/Signup/Forgot password
Simple forms for auth and creating new users. There is a forgot password link for those who need it. The user inputs their username and a new randomized password is sent to the email on file for that username using [nodemailer](https://nodemailer.com/about/).

### Rich text editor
The rich text editor used throughtout this project is [SunEditor](http://suneditor.com/sample/index.html)

## Deploy
This project is depolyed through [surge](https://surge.sh/)
The backend is deployed on [heroku](https://www.heroku.com/) and can be found [here](https://speech-surrogates-backend.herokuapp.com/)
The backend repo can be found [here](https://github.com/erafkin/speech-surrogates-backend).
For access contact Emma Rafkin or Laura McPherson for the .env file and the username and password.

## Live
The prod site can be found [here](http://speechsurrogates.org/) while the dev site can be found [here](http://speechsurrogates.surge.sh/).

## Run
- clone this repo
- yarn install
- yarn start

## Author
Emma Rafkin.
Thanks to [Thomas Monfre](https://github.com/tmonfre) for some initial scaffolding and auth.