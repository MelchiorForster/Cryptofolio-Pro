# CryptoFolio Pro 🚀

> \*\*Profe

## 🚀 Quick Start

### Voraussetzungen

- XAMPP (Apache + MySQL + PHP)
- Node.js 18+
- npm oder yarn

### Installation

1. **Repository klonen**

   ```bash
   git clone https://github.com/MelchiorForster/cryptofolio-pro.git
   cd cryptofolio-pro
   ```

2. **Frontend Dependencies installieren**

   ```bash
   npm install
   ```

3. **Backend Setup**

   ```bash
   # XAMPP starten (Apache + MySQL)
   # Dann Datenbank initialisieren:
   php api/setup.php
   ```

4. **Development Server starten**

   ```bash
   npm run dev
   ```

5. **App öffnen**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost/cryptofolio-pro/api/`

## 📱 Screenshots

### Dashboard

- Portfolio-Übersicht mit Echtzeit-Werten
- Holdings mit aktuellen Preisen
- Top Gainers des Tages

### Features

- Live Crypto-Preise von CoinGecko
- Portfolio-Berechnung in Echtzeit
- Responsive Design für alle Geräte

## 🔧 API Endpoints

- `GET /api/test_prices.php` - Aktuelle Kryptowährungs-Preise
- `GET /api/portfolio.php` - Benutzer-Portfolio
- `POST /api/portfolio.php` - Portfolio-Holdings hinzufügen
- `GET /api/markets.php` - Marktdaten (geplant)

## 🎯 Roadmap

- [ ] **Charts & Visualisierungen** - Portfolio-Performance-Charts
- [ ] **Portfolio-Management** - Holdings hinzufügen/entfernen
- [ ] **Preisalarme** - Push-Benachrichtigungen
- [ ] **Export-Funktionen** - PDF-Reports
- [ ] **Multi-User Support** - Benutzer-Authentifizierung
- [ ] **Mobile App** - React Native Version

## 📄 Lizenz

MIT License - Siehe [LICENSE](LICENSE) für Details.

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle einen Issue oder Pull Request.

## 📧 Kontakt

**Entwickelt von:** Melchior Forster  
**GitHub:** [@MelchiorForster](https://github.com/MelchiorForster)

---

⭐ **Gefällt dir das Projekt? Gib ihm einen Stern!** ⭐ryptowährungs-Portfolio-Management-Anwendung\*\*

Eine moderne, vollständig funktionsfähige Web-App für das Management von Kryptowährungs-Portfolios mit Echtzeit-Marktdaten und eleganter Benutzeroberfläche.

## ✨ Features

- 📊 **Real-time Portfolio Tracking** - Live-Aktualisierung der Portfolio-Werte
- 💹 **Live Marktdaten** - Integration mit CoinGecko API für aktuelle Preise
- 📱 **Responsive Design** - Optimiert für Desktop, Tablet und Mobile
- 🎨 **Moderne UI/UX** - Dunkles Crypto-Theme mit Tailwind CSS
- ⚡ **Schnelle Performance** - React 18 + Vite für optimale Geschwindigkeit
- 🔐 **Sichere Backend-API** - PHP + MySQL für Datenpersistierung
- 📈 **Portfolio Analytics** - Detaillierte Übersicht über Gewinne/Verluste
- 🔔 **Preisalarme** - Benachrichtigungen bei Zielpreisen (geplant)

## 🛠️ Tech Stack

### Frontend

- **React 18** - Moderne UI-Komponenten
- **Vite** - Schneller Build-Prozess
- **Tailwind CSS** - Utility-First CSS Framework
- **Axios** - HTTP-Client für API-Calls
- **React Router** - Client-side Routing
- **Lucide React** - Moderne Icon-Bibliothek

### Backend

- **PHP 8.2** - Server-side Logic
- **MySQL** - Relationale Datenbank
- **CoinGecko API** - Live Kryptowährungs-Daten
- **XAMPP** - Lokale Entwicklungsumgebung

## Entwicklungsnotizen

Dieses Repository enthält auch Entwicklungsnotizen und Projektdokumentation in separaten Markdown-Dateien.

## Status

🚧 In aktiver Entwicklung

---

_Ein professionelles Kryptowährungs-Portfolio-Management-Tool_
