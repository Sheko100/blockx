# Directory Structure

## Root

```
├── backend
├── Cargo.lock
├── Cargo.toml
├── declarations
├── dfx.json
├── frontend
├── Makefile
├── public
├── README.md
└── rust-toolchain.toml
```

## Backend

```
├── Cargo.toml
└── src
    ├── asset.rs
    ├── blockx_rust.did
    ├── err.rs
    ├── hash.rs
    ├── lib.rs
    ├── store.rs
    └── utils.rs
```

## Frontend

```
├── README.md
├── backend_api
│   ├── blockx_rust.ts
│   └── declarations
│       ├── blockx_rust.did.d.ts
│       └── blockx_rust.did.js
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── react-router.config.ts
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── components
│   │   ├── CertificatePDF.jsx
│   │   ├── Header.jsx
│   │   ├── RegistrationCard.jsx
│   │   ├── RegistrationPage.css
│   │   └── ui
│   │       ├── AssetItem.jsx
│   │       ├── DownloadCertBtn.jsx
│   │       ├── FileUpload.jsx
│   │       └── WalletButton.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   └── InternetIdentityContext.jsx
│   ├── controller
│   │   ├── agent.js
│   │   ├── auth.js
│   │   └── controller.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── AboutPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegistrationPage.jsx
│   │   └── VerifyPropertyPage.jsx
│   ├── routes
│   │   ├── AppRoutes.jsx
│   │   ├── GuestRoute.jsx
│   │   └── ProtectedRoute.jsx
│   ├── styles
│   │   ├── globals.css
│   │   └── registration.css
│   └── utils.js
├── tailwind.config.js
└── vite.config.js
```
