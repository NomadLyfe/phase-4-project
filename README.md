# Menu Masters App

Menu Masters is a website that allows users to login, search for restaurants across the US, see the reviews of those restaurants, write reviews, and customize their own account.

## Installation

Fork this repo, copy the SSH link, and type "git clone 'SSH link'" into your terminal in your desired directory.

On your local copy, type "pip install -r requirements.txt" to make sure you have all the needed libraries for this run. In the root directory, type "npm run build --prefix client" to make the build. Once the build is made, type "gunicorn --chdir server app:app" to run a production build on local port 8000.

## Usage

Menu Masters allows a user to create an account and easily search for restaurants in the US and look at their reviews and ratings. The website also allows users to make their own reviews about restaurants that will add tot he average rating of the restaurant. A user will only be allowed to make a review if they have an account and are logged in. In addition to writing your own review, a logged in user can also customize or edit their own account information including: profile picture, username, password, and email. The website is currently deployed at the following link: [Menu Masters](https://menu-masters-app.onrender.com/).

## Sample GIF of Application

![Menu Masters GIF](/video3583018274-ezgif.com-video-to-gif-converter.gif)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Roadmap

I plan on eventually adding the capability for users to like or dislike reviews by other users. 

Also I am planning on adding the capability for the user to look at other users' account info page without the ability to edit it.

Additionally, I plan on adding a sort functionality to the list of restaurants that appears when the user searches for restaurants.

## License

[MIT](https://choosealicense.com/licenses/mit/)