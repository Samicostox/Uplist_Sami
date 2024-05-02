## Below are some instruction on running the frontend of the website 
### prerequisites 
1. install git
2. install nodejs
3. clone this repository


### Environment Variables
1. `cp sample.env .env` to create a .env file
2. Fill in the environment variables in the .env file

### steps to run dev enviroment
1. install packages - only need to once - or whenever the package.json has changed
```
npm i 
```
2. start the local development server
```
npm start
```


### pages
```
login page = domain/auth/login
sign up page = domain/auth/sign-up
biolink = domain/biolink/:id
biolink edit page = domain/biolink/:id/edit
landing page = domain/ or domain/biolink/
```
