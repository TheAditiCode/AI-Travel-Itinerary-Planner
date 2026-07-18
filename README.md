# VoyageAI - Premium AI Travel Planner (Version 1.0)

VoyageAI is a premium, responsive, and full-featured AI Travel Itinerary Planner designed to simplify trip preparation. Powered by the Gemini API, it curates custom destinations, estimates realistic budgets, automatically generates packing checklists, and fetches live weather forecasts.

This project was built to showcase clean coding standards, API integrations, and modern UI design. It is fully ready for GitHub upload and CSE portfolio inclusion.

---

## 🌟 Features

1. **Custom AI Itinerary Generation**: Generates structured, day-wise itineraries including daily key attractions, recommended dining, transportation advice, and local food suggestions.
2. **Interactive Budget Planner**: Supports setting custom budget limits (₹5,000–₹1,00,000) using a smooth slider, and alerts the user if the estimated trip expenses exceed their set limit.
3. **Number of Travelers Selector**: Offers a dropdown selector for 1–10 travelers to dynamically scale stay, transit, food, and fun expense forecasts.
4. **Live Currency Converter**: Connects to the public, keyless Frankfurter API to support instant conversion between **USD and INR**. If the live rates server is unreachable, the system automatically falls back to static offline rates with a user-friendly alert.
5. **Dynamic Packing Checklists**: Automatically feeds a checklist categorized by Essentials, Clothing, Electronics, and Documents based on the traveler's selected theme (Beach, Hill Station, Adventure, Historical).
6. **Live Geolocation & Weather Forecasts**: Utilizes Open-Meteo Geocoding and Forecast APIs to resolve destination coordinates and display a 5-day weather forecast tab.
7. **Saved Trips Manager**: Locally stores generated itineraries using `localStorage` to allow loading previous trips or deleting them.
8. **Export Utilities**: Supports downloading the formatted results as a clean PDF or copying a text summary to the clipboard.
9. **Universal Theme Switcher**: Toggle between premium dark-mode glassmorphism and a high-contrast light theme, persisting preferences across page reloads.

---

## 🛠️ Technologies Used

- **HTML5 & CSS3**: Custom styles, responsive grid systems, flexbox layouts, media printing parameters, and CSS keyframe animations.
- **JavaScript (ES6+)**: Asynchronous fetch workflows, DOM binding caches, event listeners, local storage CRUD, geocoding coordinate lookups, and clipboard controllers.
- **Gemini API**: Leverages the `gemini-3.5-flash` model with structured JSON schema responses to ensure data consistency.
- **html2pdf.js**: Client-side library to render the DOM directly into structured PDF canvas layers.
- **Open-Meteo API**: Public geocoding and daily weather forecasting.
- **Frankfurter API**: Free live exchange rates.
- **LoremFlickr**: Keyword-locked placeholder travel imagery.

---

## 🚀 Installation & How to Run

1. Clone or download this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/ai-travel-planner.git
   cd ai-travel-planner
   ```

2. VoyageAI runs directly in any modern web browser without compiling. You can host it using any local server utility (e.g., Python, Node.js, or PowerShell).
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   *Then open `http://localhost:8000` in your web browser.*

   **Using PowerShell Script:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File server.ps1
   ```

---

## 🔑 Gemini API Setup

1. Visit [Google AI Studio](https://aistudio.google.com/) and sign in with your Google account.
2. Click **Get API key** and generate a new key.
3. Configure the key securely in one of the following ways:
   - **Environment Variable**: Set the `GEMINI_API_KEY` system or process environment variable.
     ```bash
     $env:GEMINI_API_KEY="AIzaSyYourKeyHere..."
     ```
   - **Local Configuration**: Create a file named `config.json` in the root of the repository:
     ```json
     {
       "GEMINI_API_KEY": "AIzaSyYourKeyHere..."
     }
     ```
4. *Security Note*: The key is handled entirely on the backend server and is never exposed in the browser network tab or client-side script code. Leaving the key blank automatically runs the app in **Offline Demo Mode** using pre-seeded local destinations (Goa, Pokhara, Phuket, Bora Bora, Interlaken, etc.).

---

## 📁 Folder Structure

```
ai-travel-planner/
├── index.html       # Primary UI structure, dropdowns, cards, and modal components
├── style.css        # Premium typography, variables, responsive breakpoints, light-theme
├── script.js        # Global state, form handlers, API queries, local storage CRUD, helper routines
├── server.ps1       # Lightweight PowerShell web server script for local execution
├── .gitignore       # Excludes local caches, logs, and IDE metadata from Git history
└── README.md        # Technical project documentation and implementation overview
```

---

## 🔮 Future Improvements

- **Flight & Hotel Booking Integration**: Hooking up sandbox affiliate APIs to check real-time availability.
- **User Authentication**: Creating a secure node backend to sync itineraries across multiple devices.
- **Interactive Leaflet Maps**: Embedding dynamic interactive maps plotting day-wise attractions.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

Developed by **Aditi Singh** (© 2026). Created as a CSE portfolio project.
