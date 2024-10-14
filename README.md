# Hand Gesture Car Racing

## What it does
Our game is a racing game that requires no additional driving equipment or keyboard input. Using just your hands and computer webcam, we created a fully functional driving vehicle that can race across a course.

For the main driving mechanism, we split the driving into two parts: driving and steering. In order to control the driving speed, the user must move their hands closer (faster) and farther (slower). To make sure the driving is always comfortable, the user must drive in a "thumbs up" position, and can zero the velocity at any time by putting their thumbs down.

We created a race track to accompany the car, with a fully functional lap timer and checkpoint system, where the entire lap won't be counted until the car reaches all of the checkpoints and the finish line. Additionally, if the car leaves the track, the speed will drastically slow down.

Finally, we added a settings menu to fine tune any multiplier to the user's preference, including velocity and turning multipliers. We also created a stats menu in order for the user to visualize how their car is moving.

## How we built it

Our two tasks were essentially computer vision, and the game itself. 

For computer vision, we decided to use Google's open source mediapipe "Gesture Recognizer" model, ensuring that we'd have the opportunity to extract gesture data. With some somewhat straightforward math, we're able to calculate the centers of the hands and determine the angle that the hands make relative to the origin. Additionally, we used the proportion that the distance is directly proportional to 1 / Area ^ 2, allowing us to directly relate the velocity to the (relative) distance that the hands were from the screen

For the game, we decided to go with PixiJS, an HTML rendering engine for 2D games. We decided to create a top down racing game due to simplicity, and made the background move relative to the car, rather than the car move around a background. This allowed for bigger maps and a more natural feel to the driving. We used node.js and express.js to host the website via Heroku.

## What's next 
In the future, it's possible to add a leaderboard and login system, providing an ability to log and see "top times" of a track. Additionally, adding a multi-track selector would be another goal, allowing the user to pick and choose their favorite maps. Maybe we could even implement a track creator with this system. We also can add more complex driving mechanics, including drifting and a more sophisticated acceleration/braking system. For our settings, we could implement a cache system to remember the previous settings.

