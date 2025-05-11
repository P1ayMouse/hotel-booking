## Overview
Hotee Site is a responsive web application for searching and booking hotels. It provides users with an intuitive interface to browse hotel options, apply advanced filters, view detailed information, and save favorites.

---

## Features
### Search & Filtering
* Select destination, check-in/check-out dates, price range, rating, and more.
* Adaptive layout for desktop and mobile devices.

### Hotel Card View
* Photo gallery, key amenities, rating, and a special button to like a hotel. 

### Favorites Management
* Logged-in users can save and revisit their liked hotels.

### Internationalization
* Multi-language support via react-i18next.

### Form Validation
* Date pickers, budget fields, and other inputs validated with Formik & Yup.

---

## Technology Stack

### Frontend
- **Framework**: React
- **Routing**: React Router
- **State Management**: Redux + Thunks
- **UI**: MUI (v5)
- **Styling**: SCSS Modules
- **i18n**: react-i18next
- **Forms**: Formik, Yup
- **Dates**: Day.js, MUI Date Pickers
- **HTTP**: axios
- **Icons**: @mui/icons-material + custom SVGs

### Backend
- **Runtime**: Node.js (v16+)
- **Framework**: Express
- **Auth**: JWT (jsonwebtoken), bcryptjs
- **UUIDs**: uuid
- **CORS**: cors
- **Body Parsing**: body-parser
- **Data Storage**: JSON files (`users-db.json`, `db.json`)
- **Env Variables**: dotenv


---

## Getting Started
### Prerequisites
- Node.js (v22.13.1) & npm (10.9.2)
- Git

---

### Frontend Setup
1. Install the npm:
   ```bash
   cd front-end
   npm install
   ```
2. Create a .env file in front-end/:
    ```
    REACT_APP_BASE_URL=http://localhost:3001
    
    REACT_APP_URL_GET_DESTINATION=/destination
    REACT_APP_URL_GET_HOTELS=/hotels
    REACT_APP_URL_POST_HOTELS=/hotels
    REACT_APP_URL_USER_LOGIN=/login
    ```
3. Run in dev mode:
    ```bash 
    cd front-end
    npm start
    ```
4. Open: http://localhost:3000

---

### Backend Setup
1. Install the npm:
   ```bash
   cd server
   npm install
   ```
2. Create a .env file in server/:
    ```
    JWT_SECRET=jwt_secret_key
    ```
3. Run the server:
    ```bash
    cd server
    npm run start
    ```
4. Server listens on http://localhost:3001