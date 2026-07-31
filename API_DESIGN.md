Library Catalogue RESTful API Design
1. Functional and Non-Functional Requirements
Functional Requirements:
Books Management: Users can view a paginated list of books, search books by title, and filter them by author or category. Administrators can add, update, and delete books.
Authors Management: Users can view a list of authors and their biographies. Administrators can manage author records.
Categories Management: Users can browse book categories. Administrators can create and update categories.
Authentication & Authorization: Users must log in via credentials to receive a token. Role-based access control (Admin / Regular User) restricts write operations to administrators.
Non-Functional Requirements:
Protocol: HTTPS enforced for secure data transmission.
Data Format: Request and response bodies must be in JSON format.
Security: Stateless authentication using JSON Web Tokens (JWT).
Performance: Caching headers (Cache-Control, ETag) must be implemented for read-only (GET) endpoints.
Scalability: All list endpoints must support pagination to handle large datasets efficiently.
2. Entity Models
Book
id (Integer, Primary Key)
title (String, Required)
isbn (String, Unique, Required)
published_year (Integer)
author_id (Integer, Foreign Key referencing Author)
category_id (Integer, Foreign Key referencing Category)
created_at (Timestamp)
Author
id (Integer, Primary Key)
first_name (String, Required)
last_name (String, Required)
bio (Text)
birth_date (Date)
Category
id (Integer, Primary Key)
name (String, Unique, Required)
description (Text)
3. Operations and Status Codes
Endpoints Overview:
GET /api/v1/books — Retrieve a paginated list of books (Supports filters: author_id, category_id, search).
POST /api/v1/books — Create a new book (Admin only).
GET /api/v1/books/{id} — Retrieve details of a specific book.
PUT /api/v1/books/{id} — Update an existing book (Admin only).
DELETE /api/v1/books/{id} — Delete a book (Admin only).
POST /api/v1/auth/login — Authenticate user and return a JWT token.
Meaningful Status Codes:
200 OK — The request was successful (used for GET, PUT).
201 Created — The resource was successfully created (used for POST).
204 No Content — The resource was successfully deleted, with no body returned (used for DELETE).
400 Bad Request — Validation error or malformed JSON payload.
401 Unauthorized — Authentication token is missing or invalid.
403 Forbidden — Authenticated user does not have administrative privileges.
404 Not Found — The requested resource does not exist.
4. Richardson Maturity Model Application
This API implements Level 3 (HATEOAS - Hypermedia as the Engine of Application State):
Uses appropriate HTTP verbs (GET, POST, PUT, DELETE).
Maps operations to distinct URIs representing resources.
Each response includes hypermedia links (_links) directing clients to related actions or resources (e.g., a book response contains a link to its author and the next pagination page).
5. Authentication and Error Handling
Authentication Method:
JWT (JSON Web Token): Clients must include the token in the HTTP header:
Authorization: Bearer <JWT_TOKEN>
Token Structure: Composed of Header, Payload (containing user_id, email, and role), and Signature.
Error Response Format:
All errors return a standard JSON structure:
{
  "error": {
    "status": 400,
    "message": "Validation failed",
    "details": ["The title field is required."]
  }
}
6. Pagination
All collection endpoints (GET /books, GET /authors, GET /categories) support query parameters for pagination:
page: The page number to retrieve (default: 1).
size: The number of items per page (default: 10).
Example Request: GET /api/v1/books?page=1&size=10&category_id=2
7. Caching Strategy
Cacheable Endpoints: All GET requests (e.g., book lists, single book details, categories) are cached using Cache-Control (e.g., public, max-age=3600) and ETag validation to reduce server load.
Non-Cacheable Endpoints: POST, PUT, and DELETE methods are not cached and automatically invalidate the relevant cache stores to ensure data consistency.


