<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
This project is a Backend service built with NestJS that provides an intelligent item similarity search feature. The system integrates Qdrant vector database to perform image similarity matching, allowing users to search for items based on visual resemblance.
All uploaded images are stored securely on Cloudinary, ensuring optimized delivery and efficient media management.

The project also includes a complete authentication system using Google OAuth, along with a mail service to support password recovery via email.
User and application data are managed using MySQL, powered by Prisma ORM for efficient database interaction and schema management.

### 🔧 Key Features
- 🚀 **NestJS Backend** – Modular, scalable server-side architecture  
- 🔍 **Image Similarity Search** – Qdrant vector search integration  
- ☁️ **Cloudinary Storage** – Image upload, optimization, and CDN delivery  
- 🔐 **Google OAuth Authentication** – Secure login using Google accounts  
- 📧 **Mail Service** – Forgot-password and notification emails  
- 🗄️ **MySQL + Prisma** – Type-safe relational database management  

## 🛠️ Tech Stack

### **Backend**
- NestJS  
- TypeScript  

### **Database**
- MySQL  
- Prisma ORM  

### **Vector Search / AI**
- Qdrant  

### **Cloud Storage**
- Cloudinary  

### **Authentication**
- Google OAuth 2.0  
- JWT  
- bcrypt  

### **Email**
- Nodemailer or mail service  

### **Development Tools**
- Multer / File Interceptors  
- ESLint + Prettier  
- Docker (for Qdrant)

## 📂 Project Structure
project/
│
├── prisma/                 # Prisma migrations & schema
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── auth/               # Authentication module (Google OAuth, JWT, etc.)
│   ├── cloudinary/         # Cloudinary service & upload handlers
│   ├── common/             # Shared utilities, guards, decorators
│   ├── config/             # Environment & configuration management
│   ├── facility-room/      # Facility room module (your custom domain logic)
│   ├── image/              # Image upload + similarity search integration
│   ├── item-type/          # Item type management module
│   ├── mail/               # Email service (forgot password, notifications)
│   ├── post/               # Post module
│   ├── prisma/             # Prisma service for DB connection
│   ├── user/               # User module (profile, CRUD)
│   │
│   ├── app.controller.ts   # Main application controller
│   ├── app.service.ts      # Root service
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
│
├── .env                    # Environment variables (local)
├── example.env             # Example env template
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── nest-cli.json
├── tsconfig.json
└── tsconfig.build.json

## Frontend

The project's FE is stored in a separate repository
You can access at: `https://github.com/tdagn2202/FoundIt`

## Project setup

```bash
$ npm install
```
## 🔑 Environment Variables
Create a `.env` file based on `example.env`:

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Prisma Setup

1. **Configure the Database**  
   Add the `DATABASE_URL` in your `.env` file to connect to your database (MySQL in this example):  
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/mydb"```

2. **Create Migration and Update Database**
Run the following command to generate a migration and apply it to your database: `npx prisma migrate dev --name init`

3. **Generate Prisma Client**
Generate the Prisma Client to use in your code: `npx prisma generate`

4. **Access Database with Prisma Studio**
You can view and manage your database data visually using Prisma Studio: `npx prisma studio`

## Docker Qdrant to storage images
```bash
# Pull docker
docker pull qdrant/qdrant 

# Create volume for storage
docker volume create qdrant_storage

# Run docker
docker run -d -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant
```
You can check or see your stored image on qdrant by access to `localhost:6333/dashboard`

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
