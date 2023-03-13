# sunnin

A CLI app that retrieves & prints a list of sunrise & sunset times for 100 random coordinates, and then identifies the point of earliest sunrise out of this list.

## Requirements:

- [npm](https://docs.npmjs.com/about-npm) & [node](https://nodejs.org/)
- This project was developed using Node v18.
- [n](https://www.npmjs.com/package/n) from npm or [NVM](https://github.com/nvm-sh/nvm) are good candidates for managing multiple node versions.

## Building:

1. Make sure you have node and npm installed and in your PATH.
2. Clone the repository and run `npm install` from the repo root directory.
3. Run `npm run-script run` (or `npm run run`) to retrieve & output 100 random sunset times, followed by the earliest time.
4. Run `npm run test` to run tests.

## API Bug & Fix:

The [API](https://sunrise-sunset.org/api) returns 0 for all of the time values when passing coordinates that fall within a certain range of the Earth's poles. This then leads to the app identifying these coordinates as having the earliest sunrise.
<br><br>
I have included a workaround for this problem on the `alternative-format` branch, which also uses the more human-readable time format; I didn't include this in the main branch as it assumes unintended behaviour on the part of the API and discards the offending data points.
