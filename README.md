# queue project wiki

---
## Overview
- the purpose of this application is for (psycho)therapists to manage their patients
- a therapist has a waiting list and a patient list of patients
- the waiting list is supposed to store patients until there is enough space to add them to the current patient list
- a therapist can add and remove patients on their lists
- patients from the waiting list can be moved to the patient list
  
---
## Project structure
- the project is separated into the folders server and client
### server
- is the API to communicate with the frontend server
- uses Axios for HTTP requests with the client
- queries to the MySQL Database
### client
- is the frontend server
- uses React

---
## Database
- MySQL
- so far a custom set docker image but will be changed to a dockerfile

---
## Postgres
- locally added requests

---
## Unit or E2E Tests
- need to be added

---
## Roadmap
### Functionality for patients
- Patients can log in to the website as well
- A Patient can find Therapists that live near his place
- A map (Google Maps API) where a patient can see therapists in a defined radius
- Therapists can be filtered by  proficiency/ type of therapy
- can apply for patients lists of therapists

### Functionality for therapists
- can add a proficiency/ type of therapy
