# Scrollflix - Frontend
![alt text](image URL){width=400}

Scrollflix is a single page application web app that capture users' scroll behavior on movie posts and make movie suggestion based on the posts' view duration.

Backend code can be found [here]](https://github.com/Harishgeth/movie-suggestions-api)

## Demo

## Design

### Frontend


### Backend

## How To Run
Get the backend code can be found [here]](https://github.com/Harishgeth/movie-suggestions-api)

1. Clone the github repository
```sh
git clone  git@github.com:Harishgeth/movie-suggestions-api.git 
```
2. Install Docker Compose

3. Install Mongo Compass

    3.1 If you want to connect to our Mongodb (Mongodb starts up at http://localhost:27018. The default username/password is user/pass for non-m2 machines, but for m2 you just use noauth)

4. To Run Docker

 For windows and mac with M1 chip:
        

```sh
# Run Docker with rebuilding the API
make up

# Built and Run Docker
make build-and-up

# Disconnect Docker
make down
```

For mac with M2 chip:
        

```sh
# Run Docker without rebuilding the API
make up-m2

# Built and Run Docker
make build-and-up-m2

# Disconnect Docker
make down-m2
```

Please ensure the following ports are available, [if not kill applications running on ports.](https://stackoverflow.com/questions/11583562/how-to-kill-a-process-running-on-particular-port-in-linux) 

Ports required by applications to be brought up - 9200:Elasticsearch, 5601:Kibana, 3000-Golang, 27018 - MongoDB.

5. Pull the front-end code from [here.](https://github.com/mnguyen0226/movie-suggestions-frontend)

6. Follow the instructions in the frontend repository to run it, and it should automatically recognize the backend.

Clone the github repository

Install Vue CLI
```sh
npm install @vue/cli
```

Create a Vue project
```sh
vue create .
```

Run Vue single-page application
```sh
npm run serve
```

7. You can checkout the elasticsearch data at Kibana which runs in the [url.](http://localhost:5601/app/kibana). There are two index pattern of interest.

Operational Excellence Logs - filebeat*

Movie curation Index - movie*

Use the Discover tab of Analytics to create a data view with these index patterns described above to see the data :)

## Unit Test

## Tools

## References
