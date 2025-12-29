# Person Management System - Frontend

A modern, responsive React frontend application for managing persons through a RESTful API built with JAX-RS.

## 📋 Project Description

This is a complete frontend interface that consumes REST API services for CRUD operations on Person entities. The application provides an intuitive and visually appealing user interface with smooth animations and modern design patterns.

## ✨ Features

- ✅ **List All Persons** - Display all persons in a responsive card grid layout
- ➕ **Add Person** - Create new persons with form validation
- ✏️ **Edit Person** - Update existing person information with pre-filled forms
- 🗑️ **Delete Person** - Remove persons with confirmation dialog
- 🔍 **Search** - Real-time search by name, email, or ID
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful gradient colors, smooth animations, and intuitive interactions

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with Hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Fetch API** - For HTTP requests to REST API

### Backend (Existing)
- **JAX-RS** - Java REST API
- **JPA/Hibernate or JDBC** - Database layer
- **Tomcat** - Application server

## 📁 Project Structure

```
person-management-frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          # Main React component
│   ├── index.js         # Entry point
│   └── index.css        # Tailwind styles
├── package.json
├── README.md
└── .gitignore
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Your JAX-RS backend running on Tomcat

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd person-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL**
   Open `src/App.jsx` and update the API base URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/your-app-name/api/persons';
   ```
   Replace `your-app-name` with your actual backend application context path.

4. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

### Backend Configuration

Ensure your JAX-RS backend is running and accessible at:
```
http://localhost:8080/your-app-name/api/persons
```

The backend should support these endpoints:
- `GET /persons` - Get all persons
- `GET /persons/{id}` - Get person by ID
- `POST /persons` - Create new person
- `PUT /persons/{id}` - Update person
- `DELETE /persons/{id}` - Delete person

### CORS Configuration

If you encounter CORS issues, add this to your JAX-RS backend:

```java
@Provider
public class CorsFilter implements ContainerResponseFilter {
    @Override
    public void filter(ContainerRequestContext requestContext,
                      ContainerResponseContext responseContext) {
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", 
            "GET, POST, PUT, DELETE, OPTIONS");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", 
            "Content-Type, Authorization");
    }
}
```

## 📸 Screenshots

### Main Dashboard
![Dashboard](screenshots/dashboard.png)

### Add Person Modal
![Add Person](screenshots/add-person.png)

### Edit Person
![Edit Person](screenshots/edit-person.png)

## 🎯 API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/persons` | Retrieve all persons |
| GET | `/persons/{id}` | Retrieve person by ID |
| POST | `/persons` | Create new person |
| PUT | `/persons/{id}` | Update existing person |
| DELETE | `/persons/{id}` | Delete person |

## 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📝 Person Data Model

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30
}
```

## 🎥 Video Demonstration

[Link to Demo Video](your-video-link-here)

## 👨‍💻 Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Code Structure

The application is built as a single React component with:
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Requests**: Fetch API
- **Styling**: Tailwind CSS utility classes
- **Icons**: Lucide React components

## 🐛 Troubleshooting

### Backend Connection Issues
- Verify backend is running on Tomcat
- Check the API URL in `App.jsx`
- Ensure CORS is configured on backend

### CORS Errors
- Add CORS filter to your JAX-RS application
- Check browser console for specific error messages

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JAX-RS Tutorial](https://docs.oracle.com/javaee/7/tutorial/jaxrs.htm)

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Project Link: [https://github.com/yourusername/person-management-frontend](https://github.com/yourusername/person-management-frontend)

## 📄 License

This project is part of an academic assignment for JEE/JAX-RS course.

---

**Note**: Make sure your backend is running before starting the frontend application!