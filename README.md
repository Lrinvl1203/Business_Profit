# Business Profit Analyzer

A multilingual web application for analyzing business profitability with interactive charts and exportable reports.

## 🌟 Features

- **Multilingual Support**: Korean (default), English, Spanish, and Japanese
- **Interactive Analysis**: Real-time calculation of business metrics
- **Multiple Scenarios**: Compare different sales increase scenarios
- **Visual Analytics**: Interactive charts for sales, expenses, and profits
- **Export Options**: Save analysis as PDF or JPG
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Currency Support**: Automatic currency symbol display based on language

## 🛠️ Technology Stack

### Frontend
- **React.js**: Core framework
- **Material-UI**: UI components and styling
- **Chart.js**: Data visualization
- **html2canvas & jsPDF**: PDF/Image export functionality

### Key Dependencies
```json
{
  "@mui/material": "^5.17.1",
  "chart.js": "^4.3.0",
  "react-chartjs-2": "^5.2.0",
  "html2canvas": "^1.4.1",
  "jspdf": "^3.0.1"
}
```

## 📁 Project Structure

```
business-profit-analyzer/
├── src/
│   ├── components/          # Reusable UI components
│   ├── App.js              # Main application component
│   ├── LanguageContext.js  # Language context provider
│   ├── translations.js     # Translation strings
│   └── index.js           # Application entry point
├── public/                 # Static assets
├── build/                  # Production build
└── package.json           # Project dependencies and scripts
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## 💡 Key Features Implementation

### Language Support
- Context-based language management
- Automatic currency symbol adaptation
- Seamless language switching

### Business Analysis
- Monthly sales calculation
- Expense tracking
- Investment recovery period analysis
- Multiple scenario comparison

### Data Visualization
- Bar charts for sales and expenses
- Line charts for profit trends
- Combined analysis charts
- Interactive tooltips and legends

## 🔄 Future Improvements

1. **Data Persistence**
   - Add local storage for user inputs
   - Implement cloud storage for saved analyses

2. **Enhanced Analytics**
   - Add more business metrics
   - Implement trend analysis
   - Add forecasting capabilities

3. **User Experience**
   - Add more export formats
   - Implement user preferences
   - Add data import functionality

4. **Performance Optimization**
   - Implement code splitting
   - Add lazy loading for charts
   - Optimize bundle size

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Live Demo](https://your-netlify-url.netlify.app)
- [Issue Tracker](https://github.com/your-username/business-profit-analyzer/issues)
