## Overview

This is a Node.js application with a well-structured folder organization. It includes a variety of configuration files, controllers, models, and routing mechanisms to facilitate the development of a robust API.
This application is designed to work with MSSQL and provides a set of APIs.

## Folder Structure

```javascript
my-node-app/
│
├── configuration/
│   └── db/
│       └── dbpool.conf.js
│   └── middleware/
│   └── utils/
│       ├── ApiResponse.conf.js
│       ├── Common.conf.js
│       ├── Constant.conf.js
│       └── Security.conf.js
│
├── controllers/
│   ├── index.ctrl.js
│   └── users.ctrl.js
│
├── env/
│   ├── .env.development
│   └── .env.production
│
├── models/
│   └── users.model.js
│
├── routers/
│   ├── index.js
│   └── users.js
│
├── app.js
├── package-lock.json
└── package.json
```

## Explanation of Each Folder and File

- configuration/: Contains configuration files.

  - db/: Database configuration files.
  - middleware/: Middleware configuration files.
  - utils/: Utility configuration files (e.g., API responses, constants, security settings).

- controllers/: Contains the controller files that handle business logic for different routes.

- env/: Environment variable files for different environments (e.g., development, production).

- models/: Contains model files that define the data structure and interact with the database.

- routers/: Contains route definition files that map endpoints to controllers.

- app.js: The main entry point of the application.

- package-lock.json and package.json: Standard npm files for managing dependencies and scripts.

Feel free to adjust any names or structure according to your specific needs!
