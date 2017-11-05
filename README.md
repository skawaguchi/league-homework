# League Homework Assignment: Time Range Subtraction

## Prerequisites
This application prefers that you have `yarn` installed. If not, see the [installation instructions](https://yarnpkg.com/en/docs/install).You may also use normal `npm`, which is bundled with node.

This application is developed using Node 6. To switch between versions you're best off using `nvm`. If you don't have it and work with Node regularly, I suggest you get it.

## Installing the Application
Run `nvm use` to use the correct version of Node for this application.

Run `yarn` to install the project dependencies.

## Testing the Application
Run `yarn test` to run tests in watch mode for active development.

Run `yarn test:once` to run tests once.

Run `yarn eslint` to lint your files.

Run `yarn verify` to lint and test your files.

**Note:** `yarn verify` runs on `git push`.

## Publishing the Application
Run `yarn dist` to output an unminified version of the application.

Run `yarn dis:prod` to output a production version of the application.

## Playing with the Application
I've set up a sandbox file in `./sandbox/index.js` to be able to test outputs by running `yarn sandbox`. Feel free to modify the sandbox index file to try different inputs with the application. 

Alternatively, you can simply import the `dist/LeagueHomework.js`. The `parseInput` method is exposed as the only export on that module.

## Running the Application
The application is exported as a UMD Module at `./dist/LeagueHomework.js`. You can `import` or `require` `parseInput` from there.

# Process 'Journal'
I've tried to capture my thought process for insight into my ways of working.

## Final Thoughts on Implementation
### Regrets
I'm not exactly happy with my implementation. I think that the logic around the subtractive method is weak because it relies on side-effects. I think I cheated a bit in terms of extracting to reduce cyclomatic complexity. The better way would have been to create a state machine with the complex states (probably when the subtractive range is before or equals the base range, and when it is after). This would be scalable. However, when you TDD you can refactor this drastically without fear. However, I've run out of time for this take-home challenge.

The other thing I'm pretty sure can use re-work is the way I'm storing time. I can probably just do away with the whole `start` / `end` thing and just use `moment` objects. I'm going to leave it as-is since using `moment` objects in a very isolated way allows us to create really simple POJOs. That's a good starting point, and again, if we need to refactor, we can because this code is TDD'd.

### Summary
Overall, I hope that this gives insight into how I think and work. My git commits, which you can view if you'd like (just ask me) to get a sense of my workflow, are pretty representative of how I work. It was tough doing this off-hours on a busy weekend, but at least it's an approximation of how I work so I hope that you see some value in this approach. 

I understand that my style of programming may not appeal to all. After working for years trying to find the fast solution, I've come to the conclusion that I'd rather be methodical and approach my work as a craftsman, and so far TDD is the best for that philosophy. It probably has to do with my mostly enterprise experience for the past six years where scalability and extensibility are inevitable. I hope that bias won't be held against me. 

All that said, I'm open to other viewpoints, and am always eager to discuss them. I'm not naive or stubborn enough to think that this is the only way to code, after all. If you've made it this far, thanks for your attention and the opportunity to share my thoughts and philosophies. 

## Assumptions
These are boundary conditions that I would usually ask about before doing the exercise. What I'll do is to list them out and pretend that they were answered.
1. Will the terminal value of a given range ever be before the start value? Assuming 'no'.
2. Will there ever be whitespace between the parentheses and the range values? Assuming 'no'.
3. Will there always be a `:` separating hours and minutes, and a `-` separating the start and terminal values of each range? Assuming 'yes'.
4. Will this ever need to be adjusted for timezone? Assuming 'no', but may use moment.
5. Is using a 24-hour clock ok? Assuming 'yes' since that's the example.
6. Will there every be overlaps in A or B? For example, would I get `(9:00-11:00, 10:00-12:00) "minus" (19:00-20:00, 19:30-21:355)` where the base times are overlapping? Assuming 'no' 
7. Do we add leading zeroes in? Assuming 'no' since that's what's in the examples (missed this).
8. Were the `"` and `"` characters around `minus` intentional, or can I just use `"`? Assuming 'yes' and that the proper quotes were not a trick.

## Defensive Programming
These are things I'd consider doing, but won't in the interest of getting this challenge done. I just want to make it clear that these are factors I'd consider.
1. Trim whitespace.
2. Validate structure of a given range with a regex.
3. Check input type before processing.
4. Empty string or other falsey values.

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

