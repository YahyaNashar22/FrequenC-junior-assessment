# FrequenC-junior-assessment
Todo app done using react, nest and mongoDB as an assessment for the junior full stack position at FrequenC


## Project Structure
The project is separated to two parts
- **backend:** NestJs
- **frontend:**: React + Vite

## How to run it ?

In order to run the project locally, you need to follow these steps to install dependencies on both the backend and frontend.

### **Backend:**
- open terminal in root directory
- cd backend/
- npm install
- add .env file with the correct values ( MONGO_URI, PORT, JWT_SECRET)
- npm run start:dev (for dev mode)
- alternatively for production mode you can first npm run build
- then npm start

### **Frontend:**
- open another terminal in root directory while the first is running
- cd client/
- npm install
- add .env file with the correct values (VITE_BACKEND)
- npm run dev ( for dev mode)
- alternatively for production mode you can first npm run build
- then npm preview


## Production Link
you can also find the live production version of the webapp in [this link](https://frequenc-assessment.netlify.app/)