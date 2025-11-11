# calendar-app
A modern Angular 17+ calendar app with monthly view, event creation/editing, and color-coded categories. Built using RxJS for state management, Reactive Forms, and LocalStorage for persistence. No external calendar libraries used. Clean UI and fully responsive.

---

## Features

-  **Monthly Calendar View** — Grid-based view of days in the selected month  
-  **Create / Edit / Delete Events** — Click a day to add events, edit or remove existing events  
-  **Color-Coded Event Categories** — Choose colors to visually distinguish event types  
-  **Month Navigation** — Move between previous and next months  
-  **RxJS State Management** — Reactive store to keep all components in sync  
-  **LocalStorage Persistence** — Events are saved locally and persist on page reload  
-  **Responsive Design** — Adapts to desktop, tablet, and mobile layouts  
-  **No External Calendar Plugins** — 100% custom-built calendar logic

---

## Tech Stack

- **Angular 17+**
- **TypeScript**
- **RxJS**
- **Reactive Forms**
- **LocalStorage API**
- **SCSS (Responsive CSS)**

---

##  Project Structure

```
calendar-app/
├─ src/
│ ├─ app/
│ │ ├─ models/
│ │ │ └─ event.model.ts
│ │ ├─ services/
│ │ │ ├─  event-store.service.ts
│ │ │ └─  modal.service.ts
│ │ ├─ components/
│ │ │ ├─ calendar/
│ │ │ │ ├─ calendar.component.ts
│ │ │ │ ├─ calendar.component.html
│ │ │ │ └─ calendar.component.scss
│ │ │ ├─ day-cell/
│ │ │ │ ├─ day-cell.component.ts
│ │ │ │ ├─ day-cell.component.html
│ │ │ │ └─ day-cell.component.scss
│ │ │ └─ event-modal/
│ │ │   ├─ event-modal.component.ts
│ │ │   ├─ event-modal.component.html
│ │ │   └─ event-modal.component.scss
│ │ ├─ app.component.ts
│ │ ├─ app.component.html
│ │ ├─ app.component.scss
│ │ └─ app.module.ts
│ ├─ styles.scss
│ └─ index.html
├─ README.md
└─ .gitignore
```

---

##  Getting Started

###  1. Clone the repository
- git clone https://github.com/KishoreSolairaj/calendar-app.git
- cd calendar-app

###  2. Install dependencies
- npm install

### 3. Run the development server
- ng serve
- After compailation open your browser at http://localhost:4200

---

## Usage
- Use the next and previous button at the top to switch months.
- Click on any date cell to open the modal and create a new event.
- Click an existing event to open it in the modal and edit or delete it.
- All changes are saved in localStorage and will persist after reloading.

---

