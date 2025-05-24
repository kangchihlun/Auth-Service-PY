import requests
import json

# API configuration
BASE_URL = "http://localhost:8000"

def signup(email: str, name: str, password: str):
    """Register a new user"""
    url = f"{BASE_URL}/signup"
    payload = {
        "email": email,
        "name": name,
        "password": password
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        print("\n=== Signup Successful ===")
        print(f"User created: {json.dumps(response.json(), indent=2)}")
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"\n=== Signup Failed ===")
        print(f"Error: {str(e)}")
        if hasattr(e.response, 'text'):
            print(f"Response: {e.response.text}")
        return None

def signin(email: str, password: str):
    """Authenticate user and get token"""
    url = f"{BASE_URL}/signin"
    payload = {
        "username": email,
        "password": password
    }
    
    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()
        print("\n=== Signin Successful ===")
        print(f"Token: {json.dumps(response.json(), indent=2)}")
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"\n=== Signin Failed ===")
        print(f"Error: {str(e)}")
        if hasattr(e.response, 'text'):
            print(f"Response: {e.response.text}")
        return None

def main():
    # Test user credentials
    test_user = {
        "email": "test@example.com",
        "name": "Test User",
        "password": "testpassword123"
    }
    
    # First, try to signup
    print("\nAttempting to signup...")
    signup_result = signup(
        email=test_user["email"],
        name=test_user["name"],
        password=test_user["password"]
    )
    
    if signup_result:
        # If signup successful, try to signin
        print("\nAttempting to signin...")
        signin_result = signin(
            email=test_user["email"],
            password=test_user["password"]
        )
        
        if signin_result:
            print("\n=== Authentication Flow Completed Successfully ===")
            print("You can now use the access token for authenticated requests")
        else:
            print("\n=== Authentication Flow Failed at Signin ===")
    else:
        print("\n=== Authentication Flow Failed at Signup ===")

if __name__ == "__main__":
    main() 