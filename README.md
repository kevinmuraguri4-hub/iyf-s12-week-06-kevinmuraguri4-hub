# Week 6: Asynchronous JavaScript

## Author
- **Name:** Kevin Muraguri
- **GitHub:** [@kevinmuraguri4-hub](https://github.com/kevinmuraguri4-hub)
- **Date:** November 13, 2026

## Project Description
This repository practises callbacks, Promises, Promise chaining, `Promise.all`, `Promise.race`, `async/await`, error handling and the Fetch API. It includes a user directory with search, sorting, city filtering and a demo POST form, plus a Weather Dashboard using OpenWeatherMap.

## Technologies Used
- HTML5 and CSS3
- Vanilla JavaScript (ES6+)
- Fetch API, JSONPlaceholder and OpenWeatherMap API
- GitHub Actions and GitHub Pages (deployment)

## Main Features
- Weather search with Celsius/Fahrenheit toggle, weather details and last five searches
- Loading, invalid-city, API-key and network error messages
- User directory fetched from JSONPlaceholder with live search, name sorting and city filter
- Demo POST request form (JSONPlaceholder simulates the created resource)
- Async practice examples and five daily challenges

## Run Locally
1. Download this repository using **Code → Download ZIP**, then extract it.
2. Open `index.html` in a browser to use the project menu and user directory.
3. For the Weather Dashboard, copy `config.example.js` to a new file named `config.js`.
4. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and put it in `config.js`:
   `const API_KEY = "YOUR_KEY_HERE";`
5. Open `weather.html`. If your browser blocks local file requests, use VS Code Live Server.

**Never commit `config.js` or paste a real API key into `app.js`.** The `.gitignore` excludes it. Only `config.example.js` is committed.

## Deploy to GitHub Pages
1. In the repository, open **Settings → Secrets and variables → Actions → New repository secret**.
2. Set the secret name to `OPENWEATHER_API_KEY` and paste your OpenWeatherMap key as its value.
3. Open **Settings → Pages** and set the source to **GitHub Actions**.
4. Open the **Actions** tab and wait for the deployment workflow to finish successfully. The published URL will appear in the workflow run.

The workflow creates `config.js` during deployment from the repository secret, so the key is not stored in Git history. As with any browser-only app, the key is visible to visitors in the delivered JavaScript; use a free-tier key and usage limits. A backend proxy is needed to keep it private.

## File Structure
```
.
├── index.html
├── styles.css
├── weather.html
├── app.js
├── config.example.js
├── user-directory.html
├── user-directory.js
├── async-practice.html
├── async-practice.js
├── daily-challenges.html
├── daily-challenges.js
├── .gitignore
└── .github/workflows/deploy.yml
```

## Lessons Learned
**Complete after practising:** Explain in your own words the difference between a Promise and async/await, and how fetch retrieves API data.

## Challenges Faced
**Complete after practising:** Record one API or asynchronous error you encountered and how you solved it.

## Testing Checklist
- [ ] Run the async practice examples and inspect the browser console
- [ ] Search, sort and filter the user directory
- [ ] Submit the demo post form and inspect the returned result
- [ ] Add a valid OpenWeatherMap key locally and search for a city
- [ ] Test invalid city and network/API-key error messages
- [ ] Check recent searches and the temperature toggle
- [ ] Add the GitHub Actions secret and deploy to GitHub Pages

> This project is a learning starter. Run it, test it, and complete the personal reflection sections before submitting it. Do not claim the weather API or deployment works until you have added your own key and tested it.
