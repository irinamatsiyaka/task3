# task3

### Brief functionality

A web application for managing personal todos and chatting in real time.
Users can:

* View the list of todos (loaded via API).
* Open each todo and mark it as **completed / not completed**.
* Leave comments using a **WebSocket-based chat**.
* Register and log in (data saved in `localStorage`).
* Choose their country (fetched via **GraphQL API**) during registration.
* See their selected country’s flag on the homepage after login.

### Dependencies

* **React + TypeScript**
* **TanStack Router** 
* **TanStack Query** 
* **Tailwind CSS** 
* **GraphQL** 
* **WebSocket** 
* **Vite** 
* **Vitest + Testing Library** 

### Setup and Run Instructions

#### 1. Clone the repository
```
git clone https://github.com/irinamatsiyaka/task3.git
cd task3
```

#### 2. Install dependencies
```
npm install
```

#### 3. Start the development server
Run the app locally in development mode:
```
npm run dev
```

Then open your browser at:
`http://localhost:5173/`

#### 4. Build the project for production
Create an optimized production build:
```
npm run build
```

#### 5. Preview the production build locally
Before deploying, you can test the production build:

```bash
npm run preview
```

Then open your browser at:
`http://localhost:4173/`

### Live version
[https://irinamatsiyaka.github.io/task3/](https://irinamatsiyaka.github.io/task3/)



