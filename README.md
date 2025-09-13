# Cafe Management System

A web-based cafe management system implemented using vanilla JavaScript, HTML, and CSS with Firebase integration for backend services.

## 📋 Features

- **User Authentication**
  - Login and signup functionality
  - Secure user sessions

- **Product Management**
  - View product details
  - Product categorization
  - Upload and manage products
  - Manage product categories

- **Shopping Experience**
  - Shopping cart functionality
  - Smooth checkout process
  - Product details view

- **Admin Dashboard**
  - Manage products
  - Manage categories
  - Upload new products
  - Monitor inventory

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Firebase (Backend & Authentication)

## 📂 Project Structure

```
├── index.html          # Main entry point
├── assets/            # Images and favicon files
├── pages/             # HTML pages
│   ├── cart.html
│   ├── checkout.html
│   ├── login.html
│   ├── productDetails.html
│   ├── signup.html
│   └── dashboard/     # Admin dashboard pages
├── scripts/           # JavaScript files
│   ├── cart.js
│   ├── firebase.js
│   ├── main.js
│   └── dashboard/     # Dashboard related scripts
├── style/            # CSS stylesheets
    ├── style.css     # Main stylesheet
    └── dashboard/    # Dashboard styles
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/M7mdQashqesh/cafe-system.git
   ```

2. Open the project in your preferred code editor

3. Set up Firebase:
   - Create a Firebase project
   - Configure Firebase credentials in `scripts/firebase.js`
   - Enable Authentication and Firestore services

4. Open `index.html` in a web browser or use a local development server

## 💻 Usage

1. **User Access**:
   - Create an account using the signup page
   - Login with your credentials
   - Browse products and add them to cart
   - Complete purchases through the checkout process

2. **Admin Access**:
   - Access the dashboard to manage products and categories
   - Upload new products
   - Monitor and update inventory

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

- **M7mdQashqesh**
  - GitHub: [@M7mdQashqesh](https://github.com/M7mdQashqesh)

## 🔗 Links

- [Live Demo](https://cafe-system-ruddy.vercel.app/)

## ✨ Acknowledgments

- Thanks to all contributors who have helped with this project
- Special thanks to the Firebase team for their excellent documentation
