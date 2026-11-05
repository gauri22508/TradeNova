# TradeNova – Virtual Stock Trading Platform (Zerodha-Inspired UI)

TradeNova is a full-stack stock trading demo application inspired by Zerodha. It provides users with a platform to explore stocks, buy and sell shares, manage their portfolio, track investments, and monitor profit and loss.

The project is built using React.js, JavaScript, Node.js, Express.js, and MongoDB.

## Features

### Authentication
- User Registration and Login
- Secure password hashing using bcrypt
- Cookie-based authentication
- Protected user routes

### Stock Watchlist
- Display multiple stocks with their prices
- Show percentage price changes
- Identify stocks with upward and downward price movements

### Buy and Sell
- Buy stocks at available demo prices
- Sell previously purchased stocks
- Update holdings and positions after transactions
- Store transaction details in the database

### Portfolio Management
- View all purchased stocks in Holdings
- Track open Positions
- Calculate average buying price
- Display Last Traded Price (LTP)
- Calculate total investment and current portfolio value
- Calculate profit and loss (P&L)
- Display Net Change and Day Change

### Orders Management
- Maintain order history
- View Buy and Sell transactions
- Store order details in MongoDB

### Funds Management
- Display available funds
- Update balance based on Buy and Sell transactions

### Dashboard
- Dedicated trading dashboard
- Portfolio overview
- Holdings, Positions, Orders, and Funds sections

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML, CSS |
| UI Library | Material UI (MUI) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | bcrypt, JWT/Cookie-based authentication |
| API Communication | Axios / HTTP requests |
| Version Control | Git and GitHub |
| Deployment | Render |

## Project Structure

```text
TradeNova/
│
├── frontend/
│   └── React application
│
├── dashboard/
│   └── Trading dashboard
│
├── backend/
│   └── Express server and API
│
├── README.md
└── package.json
```

## How It Works

1. Users register or log in to access the application.
2. Users explore available stocks in the Watchlist.
3. Users can buy and sell shares.
4. Transaction details are stored in MongoDB.
5. Holdings and Positions are updated according to transactions.
6. Portfolio values and Profit/Loss are calculated using stock prices, average buying price, and quantity.

## Market Data

Currently, TradeNova uses predefined demo stock prices for trading operations. Live stock market API integration is not included.

## Future Enhancements

- Live stock market API integration
- Real-time stock price updates
- Advanced portfolio analytics

## Disclaimer

TradeNova is an educational demo trading application inspired by Zerodha. It does not execute real stock market transactions or provide actual investment services.

## Author

**Gauri Sharma**

GitHub: [gauri22508](https://github.com/gauri22508)

