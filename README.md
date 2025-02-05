# BiblioFind 📚  
A simple web application that allows users to search for books using the Google Books API, save books to their account, and view previously displayed books.

## 🚀 Live Demo  
[BiblioFind on Render](https://bibliofind.onrender.com/)

## ✨ Features  
- 🔍 **Search for books** using the Google Books API  
- 🔐 **User authentication** (sign up, log in, log out)  
- 📖 **Save books** to a personal collection  
- 📚 **View previously displayed books** on the saved-books page  

## 🛠️ Tech Stack  
- **Frontend:** Next.js, React  
- **Backend:** Express, Apollo Server, GraphQL  
- **Database:** MongoDB  
- **Authentication:** JWT  

## 🔧 Installation & Setup  
To run the project locally, follow these steps:

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/yourusername/bibliofind.git
cd bibliofind
```

### 2️⃣ Install dependencies  
```bash
npm install
```

### 3️⃣ Set up environment variables  
Create a `.env` file in the root directory and add the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_
```

### 4️⃣ Start the development server  
```bash
npm run dev
```
The app should now be running at `http://localhost:3000`.

## 📌 API & Services  
- **Google Books API** - Fetch book details  
- **MongoDB** - Store user and saved book data  
- **JWT Authentication** - Secure user sessions  

## 🛣️ Roadmap / Future Enhancements  
- ⭐ Add user reviews and ratings for books  
- 🔄 Implement book categories and filters  
- 📤 Allow users to export their saved books list  

## 🤝 Contributing  
Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License  
MIT License  
