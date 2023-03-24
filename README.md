# Basic contact form

## Goals of the project
This project provides a basic contact form that can be used on a website for any user to fill out to reach out to you.
It is a basic project with only the essential aspects of the app without going in a lot of depth regarding styling and UI.
The project uses Firebase as its backend to 1) make it simple and highlight the logic behind the project and 2) send real-time notifications to the app user.
Note: The user UI and form do not require the creation of an account and users write directly into firestore. Specific rules on firestore need to be added to add security.

## Features
- Admin dashboard to see messages
- Users can send messages through the contact form but cannot see the dashboard
- Realtime notification through Firebase Cloud Messaging to the app users (android)

## Web app
The web app provides two different frontends. The user side, where users can fill out the form (contact information and their message), and a dashboard for the admin to check the messages that are displayed in descending order. The path to the admin sections are /dashboard and /login. There's no signup route since the backend is supposed to be accessed by only a few people (admin).

## Android app
The android app only provides a frontend for the admin. An account (firebase auth) is required to display the dashboard with the different messages that users sent.

## Languages and frameworks
- NextJS (web)
- Typescript (web)
- Kotlin (android)
- Firebase (backend)
