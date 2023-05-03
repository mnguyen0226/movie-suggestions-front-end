# Scrollflix - Frontend
<img src="https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/scrollflix_logo.png" alt="alt text" width="200">


**Scrollflix** is a single page application web app that capture users' scroll behavior on movie posts and make movie suggestion based on the posts' view duration.

**Related Works**
- **ElasticSearch:** is a tool used in industry to collect data in both logged in users and site visitor.
- **Facebook:** uses elasticsearch for their News Feed algorithm. By analyzing data points such as likes and content interaction the algorithm can indirectly infer users' intention and provides personal recommendation to enhanced user experience
- **Netflix:** uses Elasticsearch to recommend content to millions of users by collects a variety of data point (viewing history, rating, scroll activity, navigation, to help users find relevant content)
- **Amplitude:;** provides the API for developer to develop a product analytics dashboard to collect a user engagement data, thus they can provide data insights to stakeholders. To do this, we need to require a redesign the entire architecture from event-base system into a log-base system. What our team trying to do is to make an extension version of amplitude that is: you don't need to redesign your architecture into event base; if you know where to print the log to console.log, we can capture that and still able to use that data for content curation.

**Backend** code can be found [here](https://github.com/Harishgeth/movie-suggestions-api).

## Demo
Home Page
<br/>
<img src="https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/home_page.gif" alt="alt text" width="200">

Scroll Suggestion
<br/>
<img src="https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/movie_suggestion.gif" alt="alt text" width="200">

Movie Trend
<br/>
<img src="https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/movie_trend.gif" alt="alt text" width="200">

## Architecture Designs
<img src="https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/overall_arc.png" alt="alt text" width="200">


### Frontend
<img src="https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/frontend_arc.png" alt="alt text" width="200">

### Backend
<img src="https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/backend_arc.png" alt="alt text" width="200">


## How to Run
Clone the github repository

Install Vue CLI
```sh
npm install -g @vue/cli
```

Create a Vue project
```sh
vue create .
```

Run Vue single-page application
```sh
npm run serve
```

## Unit Test

## Tools
- **Frontends:** Vue.js, HTML, CSS, Javascript, Bootstrap, Mozilla InteractionObserver API.
- **Backends:** Filebeat, Kibana, ElasticSearch, Vector, Go, Python, MongoDB, Docker.
- **Development Tools:** VSCode, Postman, ElasticSearch, Docker.
- **Teamwork Tools:** Slack, Git.

## References
- [Presentation](https://github.com/mnguyen0226/movie-suggestions-front-end/blob/main/docs/presentation.pdf).
- [Report]().