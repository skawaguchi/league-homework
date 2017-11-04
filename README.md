# Usage
This application assumes that you have `yarn` installed. If not, see the [installation instructions](https://yarnpkg.com/en/docs/install).

## Installing the Application
Run `yarn` to install the project dependencies.

Run `yarn test` to run tests in watch mode for active development.

Run `yarn test:once` to run tests once.

Run `yarn eslint` to lint your files.

## Assumptions
These are boundary conditions that I would usually ask about before doing the exercise. What I'll do is to list them out and pretend that they were answered.
1. Will the terminal value of a given range ever be before the start value? Assuming 'no'.
2. Will there ever be whitespace between the parentheses and the range values? Assuming 'no'.
3. Will there always be a `:` separating hours and minutes, and a `-` separating the start and terminal values of each range? Assuming 'yes'.
4. Will this ever need to be adjusted for timezone? Assuming 'no', but may use moment.
5. Is using a 24-hour clock ok? Assuming 'yes' since that's the example.
6. Will there every be overlaps in A or B? For example, would I get `(9:00-11:00, 10:00-12:00) “minus” (19:00-20:00, 19:30-21:355)`. Assuming 'sure, why not?' since it shouldn't matter.

## Defensive Programming
These are things I'd consider doing, but won't in the interest of getting this challenge done. I just want to make it clear that these are factors I'd consider.
1. Trim whitespace.
2. Validate structure of a given range with a regex.
3. Check input type before processing.

## Thought Process
I'm not an algorithm master by any means. I researched the solution to this challenge by reading the following:
- https://softwareengineering.stackexchange.com/questions/241373/algorithm-for-flattening-overlapping-ranges
- https://stackoverflow.com/questions/5712472/fastest-way-to-split-overlapping-date-ranges/5713241#5713241
- https://gist.github.com/zac-xin/4349436

This led me to thinking along these lines:
1. The visuals for the first link above were very helpful. I was able to visualize the main range (A) which could be one or many start and end intervals as a coloured bar. Subtracting the other range (B) was simply an exercise in determining overlaps and removing them.
2. I considered a data structure like a stack as the first link suggested for a quick second, but realized that we don't need that. Simple arrays should do. 
3. The essential algorithm is simply to loop through each interval in (A) and compare it to each interval in (B). That could have performance implications, but I'll worry about that later.
4. The other important question is what we convert the string input to. I thought that reducing to milliseconds would be the easiest. I started out with an object, however, because I feel that would give us the clearest meaning as we work through the problem space. I also looked at `moment.js` objects, but decided against adding a dependency (and point of failure) as well as the complexity. If I went with a POJO then I could always use that to create another object. Since I write this using TDD, I'm not afraid of that kind of refactoring.

# Original Coding problem
Write a program that will subtract one list of time ranges from another. Formally: for two
lists of time ranges A and B, a time is in (A-B) if and only if it is part of A and not part of
B.

A time range has a start time and an end time. You can define times and time ranges
however you want (Unix timestamps, date/time objects in your preferred language, the
actual string “start-end”, etc).

Your solution shouldn’t rely on the granularity of the timestamps (so don’t, for example,
iterate over all the times in all the ranges and check to see if that time is “in”).

## Examples
```
(9:00-10:00) “minus” (9:00-9:30) = (9:30-10:00)
(9:00-10:00) “minus” (9:00-10:00) = ()
(9:00-9:30) “minus” (9:30-15:00) = (9:00-9:30)
(9:00-9:30, 10:00-10:30) “minus” (9:15-10:15) = (9:00-9:15, 10:15-10:30)
(9:00-11:00, 13:00-15:00) “minus” (9:00-9:15, 10:00-10:15, 12:30-16:00)
= (9:15-10:00, 10:15-11:00)
```

