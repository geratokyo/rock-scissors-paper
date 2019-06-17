# __Rock Scissors Paper Game__


## Instructions 
```
npm install
npm run watch   // for development 
npm run publish // for production
```

To view the project visit: 

[http://localhost:4444/](http://localhost:4444/)


npm version: 6.9.0
node version: 10.15.0

## Assumptions
 
1. there can be only 2 players in a game 
2. A real player is always called Player 1
3. The game only continues until one of the players wins 3 times. If this number is changed the game will not behave as expected. 
4. data is being loaded through an API which is currently implemented with a fake network simulation. 

Data is defined in 
```
./src/services/api/Network.ts
```

The game also supports the extended version.
To load the extended version you will need to switch lines in the following directory 
```
./src/services/api/Gestures.ts
```


## Methodology

### Thoughts before implementation
- I started by thinking the general structure, how many pages will I need to make.
- For the state management I use Redux to store the global variables.
- To store the state of the game I use the react component state. I am instansiating the player class and storing them in an array in the state. This approach is closer to how you would implement it with Mobx as store manager. That meant that I had to maintain the state everytime there was a change on the player objects. This kind of approach would have worked better if I was using Mobx as my state manager. 

### Implementation
- I started with the implementation of the UI components of the application. 
- Starting from the smallest components, like buttons, panels and ScoreBadge.
- Created the pages for the Intro and the two modes you can play ```NPCvsNPC``` and ```PlayervsNPC```
- The ```Player``` class which is a class that handles all Player decisions NPC or real. With that I wanted to separate all the user logic from the view components. 
- The ```GameService``` class is responsible for computing the winner of each round. It receives a list of players and will return the index of the player from the list. 



## Re-used components and libraries
I used a generator I created which I am using on my own project.
Link to the repo [generator-react-studio](https://github.com/geratokyo/generator-react-studio)
The generator creates the current folder structure. Also has some of the libraries predefined in the package.json. 
It also includes the Materialize CSS library.
The Spinner component is also another component that I use regularly in my projects.
For the animations I used the animate.css library.