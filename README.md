# PawFinds: A Pet Adoption System with Admin Panel
"PawFinds" is a website where you can either give a pet up for adoption or adopt one. If you have a pet you can't care for anymore, you fill out a form. The admin then decides if they can put your pet on PawFinds. If they approve, they'll ask you to bring the pet to an adoption center.

If you want to adopt a pet, you fill out a form with your details. The admin gets a lot of requests and picks the best one. If they choose you, they'll delete the other requests and take the pet off PawFinds. They'll keep a record of the pet and your contact info.

So, PawFinds makes it easy to find new homes for pets and connect them with people who want to adopt.

### Watch PawFinds in Action

[![Watch the video](https://github.com/KaShiekzmi/PawFinds-A-Pet-Adoption-System-MERN-Stack-Portfolio-with-Admin-Panel/assets/114513868/521826b2-10d9-41b4-aec3-3497e23d2cbb)](https://www.youtube.com/watch?v=wXQpAoX7_QY)

Click the image above to watch a demo of PawFinds on YouTube.


## Introduction
PawFinds is a web application that connects pet lovers with pets in need of a home. Our platform simplifies the process of pet adoption by providing a seamless user experience.

## Features
- Users can submit a pet for adoption by filling out a form.
- Admin reviews adoption submissions and can approve or reject them.
- Approved pets are listed on PawFinds for potential adopters to view.
- Users interested in adopting a pet fill out an application form.
- Admin evaluates adoption applications to select the most suitable adopter.
- Admin maintains a history of adopted pets and their new owners.
- User can browse and search for available pets for adoption.
- They can filter pets based on pet type i.e. dog, cat, fish, etc.
- PawFinds offer detailed pet profiles with photos and descriptions.

## Technology Stack
PawFinds uses a React frontend, an Express/Node backend, and PostgreSQL for data storage.

## **Please Note: This Project Is Designed for Laptop Screens**
Kindly be aware that this project is optimized for laptop screens and is not responsive for mobile or tablet devices. The development of this project was carried out during an internship, and as the internship period has come to an end, further enhancements may not be applied.

## Local Setup
Follow these steps to run the project locally:

1. Clone the repository.
2. Install frontend dependencies in `Client` with `npm install`.
3. Install backend dependencies in `server` with `npm install`.
4. Create a PostgreSQL database.
5. Create `server/.env` using `server/.env.example`.
6. Create `Client/.env` using `Client/.env.example`.
7. Start the backend from `server` with `npm start`.
8. Start the frontend from `Client` with `npm start`.

### Backend Environment Variables
Use these values in `server/.env` for local development:

- `PORT=4000`
- `JWT_SECRET=your-secret`
- `CORS_ORIGIN=http://localhost:3000`
- `PG_HOST=localhost`
- `PG_PORT=5432`
- `PG_DATABASE=pawfinds`
- `PG_USER=your-db-user`
- `PG_PASSWORD=your-db-password`

You can also use `DATABASE_URL` instead of the individual `PG_*` values.

### Frontend Environment Variables
Use this value in `Client/.env` for local development:

- `REACT_APP_API_URL=http://localhost:4000`

## Deployment

### Netlify Frontend
This repo includes `netlify.toml` configured for the React app in `Client`.

Netlify settings:

- Base directory: `Client`
- Build command: `npm run build`
- Publish directory: `build`

Netlify environment variable:

- `REACT_APP_API_URL=https://your-render-backend.onrender.com`

### Render Backend
This repo includes `render.yaml` for the backend in `server`.

Render web service settings:

- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

Render environment variables:

- `PORT=10000`
- `JWT_SECRET=your-secret`
- `CORS_ORIGIN=https://your-netlify-site.netlify.app`
- `DATABASE_URL=<render-postgres-external-database-url>`
- `PG_SSL=true`

### Render PostgreSQL
Create a Render PostgreSQL database and copy its External Database URL into the backend service as `DATABASE_URL`.

### Additional Notes
- Ensure you have Node.js and npm installed on your machine.
- The frontend will not work in production unless `REACT_APP_API_URL` points to a deployed backend.
- Uploaded images are served by the backend from `/images`, so the backend must be running and reachable.

## Contributing
We welcome contributions to improve PawFinds! To contribute, follow these steps:
- Fork the repository.
- Create a new branch: git checkout -b feature-new-feature
- Make your changes and commit them: git commit -m 'Add new feature'
- Push to the branch: git push origin feature-new-feature
- Create a pull request explaining your changes.

## Contact Information
For questions, please contact 
- [GitHub](https://github.com/kashiekzmi)
- [LinkedIn](https://www.linkedin.com/in/kashiekzmi)
