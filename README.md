# Certificate Generator Backend

A backend application to generate certificates based on user-provided details. This service validates incoming requests, processes certificate data, and generates certificates securely through API endpoints.

Live on Render Plateform: [the live link is](https://certificate-generator-backend-app.onrender.com/)
The API end point is for POST: api/certificate/generate

##  Features

* REST API to generate certificates
* Request validation middleware
* Clean MVC-based project structure
* Centralized error handling
* Environment-based configuration
* Ready for frontend or third-party integration

## Tech Stack

* **Node.js**
* **Express.js**
* **JavaScript**
* **Middleware-based validation**

##  Project Structure

```
backend/
├── controllers/
│   └── certificateController.js
├── services/
│   └── certificateServices.js
├── middlewares/
│   └── validateCertificateRequest.js
├── routes/
│   └── certificateRoutes.js
├── index.js
├── package.json
└── README.md

##  API Endpoint

### Generate Certificate

**POST** `api/certificate/generate`

#### Request Headers

```
Content-Type: application/json
```

#### Request Body

```json
{
  "name": "Imrankahan",
  "email": "imran@example.com",
  "gstNumber": "22AAAAA0000A1Z5",
  "businessName": "ABC Pvt Ltd",
  "businessAddress": "Mumbai, India"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Certificate generated successfully"
}
```

#### Error Response

```json
{
  "success": false,
  "message": "Missing required fields"
}
```

##  Validation Rules

* All fields are mandatory
* Email must be a valid format
* GST number must follow standard structure

## ▶️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <https://github.com/mohmadimran/certificate-generator-backend-app/>
cd certificate-generator-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Server

```bash
npm start
```

Server will start on:

```
http://localhost:5000
```

## 🧪 Testing with Postman

* Method: **POST**
* URL: `http://localhost:5000/api/certificate/generate`
* Body: Raw JSON

## 🔐 Best Practices Followed

* Separation of concerns (Routes, Controllers, Services)
* Reusable validation middleware
* Centralized business logic
* Scalable folder structure


## 📈 Future Enhancements

* PDF certificate generation
* Database integration
* Authentication & authorization
* Certificate download endpoint

---

## 👤 Author

Developed by **Imran**


> Simple, clean, and scalable backend service for certificate generation.
