# League Homework Assignment: Time Range Subtraction

## Features
These are the highlights behind this solution:
- Written using Test-Driven Development (TDD)
- If you strictly follow red -> green -> refactor -> repeat, coverage must be 100%, so coverage is 100% here.
- Decided to build a UI to send input to the parsing script. I felt it would be helpful to have a tangible example of UI code to review in addition to my basic JavaScript.
- Used this mini-project to try out development with the latest React, Redux, Babel, Webpack, ESLint, Enzyme, and Sinon.
- Deeper dive into using Jest ()but avoided mocking in it where possible).
- Used Chance.js for automated [fuzzing](http://searchsecurity.techtarget.com/definition/fuzz-testing).
- Checked code quality using [Code Climate](https://codeclimate.com) to get an A rating for 'Maintainability'. One interesting thing to note is that the 38hrs of reported debt took about 30 minutes to address. I'll chalk that one up to TDD. Note that I excluded test code from these metrics.
- Committed to Github as I would a real project so the reviewer could get a sense of my commit style (semantic git comments, attempted cohesion, mostly working patch commits, etc.). 
- I did this to show some authenticity to my efforts. It was also frankly really nice to have an isolated coding problem to solve and have fun with.

## Prerequisites to Run the Application
This application prefers that you have `yarn` installed. If not, see the [installation instructions](https://yarnpkg.com/en/docs/install).You may also use normal `npm install`, which is bundled with node, but the app was developed with `yarn` in mind.

This application was developed using Node 6.11.1 on Mac OS. I haven't tested this on a Windows machine, so I'm not sure it'll run properly there. To switch between versions you're best off using [`nvm`](https://github.com/creationix/nvm). It _should_ run fine on other versions, but you never know so if you can, please try to replicate the environment.

## Installing the Application
Run `nvm use` to use the correct version of Node for this application.

Run `yarn` to install the project dependencies.

## Testing the Application
Run `yarn test` to run tests in watch mode for active development.

Run `yarn test:once` to run tests once.

Run `yarn eslint` to lint your files.

Run `yarn verify` to lint and test your files.

**Note:** `yarn verify` runs on `git push`.

## Playing with the Application
Run `yarn start` and a React application will start to play with the application. 

## Publishing the Application
**Note:** The application was originally created with the idea to export it as a module, but after creating the React application, this seems unnecessary. I left it in here in you case you wanted it for some reason.

Run `yarn dist` to output an un-minified version of the application.

Run `yarn dis:prod` to output a production version of the application.

# Process Journal
I've tried to capture my thought process for insight into my ways of working.

## Summary
Overall, I hope that this project gives insight into how I think and work. I understand that my style of programming may not appeal to all. After working for years going with the fastest solution, I've come to the conclusion that I'd rather be methodical and save future headaches, and so far TDD is the best fit for that philosophy. It probably has to do with my predominantly enterprise experience where scalability and extensibility are inevitable.

All that said, I'm open to other viewpoints, and am always eager to discuss them! I'm not naive or stubborn enough to think that this is the only way to build software. 

If you've made it this far through my ramblings, thanks for your attention and the opportunity to share my thoughts and philosophies. 

## Assumptions
These are boundary conditions that I would usually ask about before doing the exercise. What I'll do is to list them out and pretend that they were answered.
1. Will the terminal value of a given range ever be before the start value? **Assuming 'no'.**
2. Will there ever be whitespace between the parentheses and the range values? **Assuming 'no'.**
3. Will there always be a `:` separating hours and minutes, and a `-` separating the start and terminal values of each range? **Assuming 'yes'.**
4. Will this ever need to be adjusted for timezone? **Assuming 'no', but may use `moment`.**
5. Is using a 24-hour clock ok? **Assuming 'yes' since that's the example.**
6. Will there every be overlaps in A or B? For example, would I get `(9:00-11:00, 10:00-12:00) "minus" (19:00-20:00, 19:30-21:355)` where the base times are overlapping? **Assuming 'no' **
7. Do we add leading zeroes in? **Assuming 'no' since that's what's in the examples (missed this).**
8. Were the `"` and `"` characters around `minus` intentional, or can I just use `"`? **Assuming 'yes' and that the proper quotes were not a trick.**
9: Do I need to sort the output? **Assuming 'no'.**
10. Do I need to check the output for overlapping ranges and do a union on them? **Assuming 'no'.**

## Defensive Programming
~~These are things I'd consider doing, but won't in the interest of getting this challenge done. I just want to make it clear that these are factors I'd consider.~~ Went ahead and did all of this. Disclaimer: my regex abilities aren't great, so if you read it, please accept my apologies.
1. ~~Validate structure of a given range with a regex.~~
2. ~~Check input type before processing.~~
3. ~~Empty string or other falsey values.~~

## Original Thought Process for the Solution
I'm not an algorithm master by any means. I researched the solution to this challenge by reading the following:
- https://softwareengineering.stackexchange.com/questions/241373/algorithm-for-flattening-overlapping-ranges
- https://stackoverflow.com/questions/5712472/fastest-way-to-split-overlapping-date-ranges/5713241#5713241
- https://gist.github.com/zac-xin/4349436

This led me to thinking along these lines:
1. The visuals for the first link above were very helpful. I was able to visualize the main range (A) which could be one or many start and end intervals as a coloured bar. Subtracting the other range (B) was simply an exercise in determining overlaps and removing them.
2. I considered a data structure like a stack as the first link suggested for a quick second, but realized that we don't need that. Simple arrays should do. 
3. The essential algorithm is simply to loop through each interval in (A) and compare it to each interval in (B). That could have performance implications, but I'll worry about that later.
4. The other important question is what we convert the string input to. I thought that reducing to milliseconds would be the easiest. I started out with an object, however, because I feel that would give us the clearest meaning as we work through the problem space. I also looked at `moment.js` objects, but decided against adding a dependency (and point of failure) as well as the complexity. If I went with a POJO then I could always use that to create another object. Since I write this using TDD, I'm not afraid of that kind of refactoring.
5. After getting into the problem space more, I decided to introduce `moment.js` after all to simplify the comparison aspect of the solution. We don't _need_ it, but it just makes this simpler. I like `moment` because it's very declarative and this code will be easier to process for the reader. The alternative is to work with the `Date` object directly. We could easily just hard-code a year, month, etc. and just deal with the output milliseconds from the epoch, but who wants to look at that? Not me! If forced to, say, because we don't want the external dependency, then I'd do that but extract it into its own class.
6. It's looking like Big-O `O(A * B)` is unavoidable. It's not bad.
7. A React interface to test the application live.
8. After struggling a bit with combining arrays, though about an Interval Tree. Honestly, probably should've done this from the beginning, but to demo TDD I thought I'd start with the most basic solution and work my way up. Now I feel like I've invested too much time in this. In real life, I would be happy to do this. So I've missed the opportunity for two data structures: Interval Tree and State pattern. 
9. I realized I hadn't coded a Redux app from scratch for a really long time. I decided to use this project as a refresher. I had forgotten all of the boilerplate and the pain of converting from React components using internal state to Redux. _However_, the process actually has reminded me why Redux is so nice, and gave me a bit of a deeper insight into where and when you calculate data and how to logically deal with the results. 
10. I found an edge case bug. Given all of the other effort I've put in, I'm going to have to skip this last one. You can see it breaking if you select the last examply enter this base input text: `9:00-11:00, 13:00-15:00, 0:00-23:00`. 

# Original Coding problem
Write a program that will subtract one list of time ranges from another. Formally: for two
lists of time ranges A and B, a time is in (A-B) if and only if it is part of A and not part of
B.

A time range has a start time and an end time. You can define times and time ranges
however you want (Unix timestamps, date/time objects in your preferred language, the
actual string "start-end", etc).

Your solution shouldn’t rely on the granularity of the timestamps (so don’t, for example,
iterate over all the times in all the ranges and check to see if that time is "in").

## Examples
```
(9:00-10:00) "minus" (9:00-9:30) = (9:30-10:00)
(9:00-10:00) "minus" (9:00-10:00) = ()
(9:00-9:30) "minus" (9:30-15:00) = (9:00-9:30)
(9:00-9:30, 10:00-10:30) "minus" (9:15-10:15) = (9:00-9:15, 10:15-10:30)
(9:00-11:00, 13:00-15:00) "minus" (9:00-9:15, 10:00-10:15, 12:30-16:00)
= (9:15-10:00, 10:15-11:00)
```

