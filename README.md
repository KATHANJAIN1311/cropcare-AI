# CropCare AI - Plant Disease Detection System

A comprehensive crop management and AI-powered plant disease detection application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+ (for ML service)
- MongoDB (local or cloud)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/KATHANJAIN1311/cropcare-AI.git
   cd cropcare-AI
   ```

2. **Start all services** (Windows)
   ```bash
   start-all-services.bat
   ```

3. **Manual setup** (if needed)
   ```bash
   # Backend
   cd server
   npm install
   npm run dev
   
   # Frontend (new terminal)
   cd User
   npm install
   npm start
   
   # ML Service (new terminal)
   cd python-ml-service
   pip install -r requirements.txt
   python app.py
   ```

## 📁 Project Structure

```
cropcare-AI/
├── User/                    # React Frontend Application
├── server/                  # Node.js Backend API
├── python-ml-service/       # Python ML Disease Detection
├── start-all-services.bat   # Windows startup script
└── README.md               # This file
```

## 🌟 Features

- 🔍 **AI Disease Detection** - Advanced plant disease identification
- 🌱 **Crop Management** - Track and manage your crops
- 📱 **Mobile-First Design** - Responsive interface
- 🔐 **User Authentication** - Secure login system
- 📊 **Dashboard** - Comprehensive crop health monitoring
- 💊 **Treatment Recommendations** - Personalized treatment plans

## 🛠️ Technology Stack

### Frontend
- React 18 + Tailwind CSS
- shadcn/ui components
- React Router + Framer Motion

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication

### ML Service
- Python + FastAPI
- TensorFlow/PyTorch
- Image processing libraries

## 🌐 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/crops` - Get user crops
- `POST /api/ml/predict` - Disease prediction
- `POST /api/diagnoses` - Create diagnosis

## 🔧 Configuration

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PYTHON_ML_URL=http://localhost:8000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5001
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

## 📱 Usage

1. **Register/Login** - Create account or sign in
2. **Add Crops** - Register your crops in the system
3. **Capture Image** - Take photo of plant/leaf
4. **Get Diagnosis** - AI analyzes and identifies diseases
5. **View Treatment** - Get personalized treatment recommendations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the GitHub repository.