# FastAPI Authentication Service

A simple authentication service built with FastAPI and PostgreSQL.

## ⚠️ Security Notice

**IMPORTANT**: This service is configured with permissive CORS settings (`allow_origins=["*"]`) for development purposes. In a production environment, you should:

1. Restrict CORS origins to specific domains
2. Configure proper security headers
3. Use HTTPS
4. Implement rate limiting
5. Set up proper firewall rules

Example of secure CORS configuration:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)
```

## Features

- User registration (signup)
- User authentication (signin)
- JWT token-based authentication
- PostgreSQL database integration
- Password hashing with bcrypt

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables in `.env`:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

3. Run the application:
```bash
uvicorn main:app --reload
```

## API Endpoints

### Signup
- **POST** `/signup`
- Request body:
```json
{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "yourpassword"
}
```

### Signin
- **POST** `/signin`
- Form data:
```
username: user@example.com
password: yourpassword
```

## Development

To run in debug mode:
1. Open VS Code
2. Press F5 or select "FastAPI Debug" from the debug menu
3. The server will start with hot-reload enabled

## Deployment

### Deploying Client on Render.com

1. Create a new Web Service on Render.com
2. Connect your repository
3. Configure the deployment settings:
   - **Root Directory**: `client_react`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Click "Create Web Service" to start the deployment