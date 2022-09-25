
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn run dev
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In order to run the tests, run the below command:

```bash
npm run test
# or
yarn test
```

## About Project and implemented features

This is a coding exercise to display the position of robot on the map based on the websocket real-time data. User can also change the position of robot, pause, and unpause the process.

This test contains three main parts.
1) Displaying the status and position of robot
2) Inputs for the user to manually change the position of the robot
3) Showing the location of robot and its movements on the map

I also added a feature to enable users to change the robot's location by dragging and dropping it on the map.

Some tests for these three components(`RobotStatus`, `FormInput`, and `DraggableComponent`) have been added to test the final results and functionalities.


Hope you enjoy working with it :)