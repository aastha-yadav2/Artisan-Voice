# 🎤 ArtisanVoice: An AI-Powered Marketplace for Local Artisans

Local artisans often face significant challenges, including illiteracy, language barriers, and a lack of digital skills, which prevent them from accessing online marketplaces and earning a fair value for their products. Our prototype, 

ArtisanVoice, is an AI-powered solution designed to empower these artisans. It helps them easily sell their products online, reach a wider audience, and grow their business without needing advanced digital expertise.



---

## 🚀 Demo
🔗 [Artisan Voice Live Demo](https://artisan-voice-365e242f.base44.app/)  

---

## 📁 Repository
🔗 [GitHub Repo](https://github.com/aastha-yadav2/Artisan-Voice)  

---

## 🛠️ Features
- 🎙️ **Voice Input** – capture and process user speech  
- 🖼️ **Image Capture & Product Preview** – upload or preview artisan creations  
- 🛍️ **Marketplace** – search, filter, and view artisan products  
- 📦 **Orders & Dashboard** – manage artisan orders and profiles  
- 🌐 **Multi-Language Support** – onboarding with language selection  

---

## 🧰 Tech Stack
- **Frontend:** React, TypeScript, CSS  
- **State Management / Routing:** React Router (if used)  
- **APIs / Services:** (e.g. Web Speech API, OpenAI, or backend integration)  
- **Build Tools:** Vite / Webpack (depending on setup)  
- **Tools:** VS Code, npm  

---

## 📂 Project Structure

```text
Artisan-Voice/
│
├── Pages/                   # Full app pages
│   ├── Onboarding/          # User onboarding flow
│   ├── LanguageSelection/   # Choose preferred language
│   ├── Dashboard/           # User dashboard
│   ├── CreateProduct/       # Product creation workflow
│   ├── Marketplace/         # Artisan marketplace
│   ├── SignIn/              # Authentication page
│   ├── ArtisanDashboard/    # Artisan-specific dashboard
│   ├── Orders/              # Order management
│   └── Profile/             # User profile
│
├── Components/              # Reusable UI components
│   ├── create/              # Creation flow
│   │   ├── VoiceInput/      # Voice capture input
│   │   ├── ImageCapture/    # Capture product images
│   │   └── ProductPreview/  # Preview artisan products
│   ├── marketplace/         # Marketplace UI
│   │   ├── MarketplaceSearch/ 
│   │   ├── CategoryFilter/ 
│   │   └── ProductGrid/ 
│
├── Entities/                # Business/domain entities
│   ├── Product/             
│   └── Order/               
│
├── Layout.js                # Global layout component
├── package.json
├── tsconfig.json
└── README.md
```
## 📦 Installation
```bash
git clone https://github.com/aastha-yadav2/Artisan-Voice.git
cd Artisan-Voice
npm install
```
 ## ▶️ Usage
 ```bash
npm run dev
```
## 🤝 Contributing

** Contributions welcome! Open issues or PRs for feedback, bug fixes, or features.**

## 📜 License

MIT License 
