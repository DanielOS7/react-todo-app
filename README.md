# react-todo-app

## Starting the application

To start the cloned application:

1) Open the cloned folder in a terminal.

For this application you will need MySQL installed on your machine You will need MySQL on your machine: https://dev.mysql.com/downloads/installer/

2) Run: "cd server", "npm install" and then "npm start". More details and dependencies can be found here: [Server README](server/README.md)

3) Open the cloned folder in a terminal again.

4) Run: "cd client", "npm install" and then "npm start". More details and dependencies can be found here: [Client README](client/README.md)

## Project improvements to make this SPA better with more time

- <b>Unit Testing!</b> to test the components and functionality. I have some react-redux standard tests in a recent repo 
[react-redux-book-app](https://github.com/DanielOS7/react-redux-book-app/tree/develop/client/src)

- <b>Redux</b> - It would have been more efficient to make use of a global state instead of local states. I have utilised redux with JavaScript
in react but there was more configuration involved with using typescript for the first time in react so after implementing webpack and learning 
sequelize to validate data in the backend I wasn't able to set it up in time which is shown in a 'WIP:' commit which was later scraped.

- <b>Reusable CSS classes</b> - Upon leaving the styling to the end of the project I realised there was more webpack setup involved to enable
me to use my created css files. This was attempted but I resorted to bootstrap and in-line styling in the end.

- <b>A more suitable component to map array of to-do's</b> - The list component was fine I just needed to spend more time with styling and not
containing my button elements inside the list element which itself was a button!

- <b>Making use of the Creation Date property</b> - I did include this in my models but didn't display them in the end. Needed to put more
thought in the layout of the to-do's in the list.







