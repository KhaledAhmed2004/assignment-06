<div align="center">
  <h1>Tec-Que</h1>
</div>

---

## Introduction

**Tec-Que** is a dynamic full-stack web application aimed at tech enthusiasts seeking practical solutions, tutorials, and expert insights. Users can engage with a wide variety of tech content, ranging from troubleshooting tips to reviews on the latest software, apps, gadgets, and digital tools. The platform enables user-generated content and interaction, fostering a community of like-minded individuals sharing and discovering valuable tech knowledge.

## Project Description

Tec-Que provides a collaborative space where users can share their own tech tips, interact with others, and access both free and premium content. The application supports features such as user registration, content creation with rich text editing, content upvoting/downvoting, comments, and a subscription model for premium content. It offers a personalized experience with user authentication, profile management, and content categorization. The platform also supports seamless payment integration for premium features, making it a go-to destination for tech enthusiasts.

## Features

- **User Authentication & Authorization**: Secure login, registration, and JWT-based authentication.
- **Profile Management**: Personalize user profiles, manage posts, and display verified badges for premium users.
- **Content Creation**: Rich text editor (e.g., Quill.js or Draft.js) to create and share detailed tech guides, tips, and tutorials.
- **Upvote & Downvote System**: Community-driven voting system for content quality.
- **Premium Content**: Access to exclusive content via subscription (Aamarpay/Stripe integration).
- **News Feed**: A dynamic feed displaying tech posts, tips, and guides, with filtering and sorting options.
- **Payment Integration**: Integration with Aamarpay/Stripe for secure payments to unlock premium features.
- **PDF Generation**: Users can generate PDFs of posts for offline reference.
- **Search & Filtering**: Advanced search functionality with debouncing and filtering by category, keyword, and post type.
- **Social Features**: Commenting system, post categorization, following system, and interaction options.
- **Admin Dashboard**: Admin tools to manage users, posts, and payment data.

## Technology Stack

The technologies, frameworks, and tools used in the project include:

- **Frontend**: React, Redux, Tailwind CSS, Quill.js, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, JWT (for authentication), Bcrypt.js (password hashing)
- **Payment Gateways**: Aamarpay, Stripe
- **Others**: PDF generation library (e.g., pdf-lib), email service (e.g., Nodemailer), Cloud storage (for image uploads)

## Installation Guidelines

### Prerequisites

Before setting up the project locally, ensure you have the following software installed:

- **Node.js** (v16 or higher)
- **MongoDB** (locally or through a service like MongoDB Atlas)
- **npm** or **yarn** (package manager)
- **Stripe** or **Aamarpay** account for payment integration

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tec-que.git
   cd tec-que
