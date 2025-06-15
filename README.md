# 📹 Personal Video Meeting App  
> A slick web app to host, schedule, and revisit video calls.

🌐 **Live Demo:** [wavecall-by-arnab.vercel.app](https://wavecall-by-arnab.vercel.app/)

---

## 🧠 Features

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| 🏠 Personal Room       | Instantly create or join your private meeting room                          |
| 📅 Call Scheduling     | Auto-schedule meetings with unique call IDs                                 |
| 👤 Participant Capture | Track and store who joined your calls                                       |
| 🎥 Recordings Ready    | Easily access previous calls & recordings                                   |
| 🔐 Auth with Clerk     | Secure, user-friendly login/signup flows                                    |
| 🌐 Invite Link         | One-click copyable invite link                                              |
| 💅 Beautiful UI        | Styled with TailwindCSS + ShadCN + Lucide Icons                             |

---

## ⚙️ Tech Stack

| Layer         | Stack/Library                         |
|---------------|----------------------------------------|
| 🧠 Framework   | Next.js 14 (App Router)                |
| 🎥 Video SDK   | Stream Video React SDK                 |
| 🔐 Auth        | Clerk                                  |
| 🎨 UI & Style  | TailwindCSS + ShadCN UI + Lucide       |
| 📦 Extras      | Sonner for toasts, Framer Motion (optional) |

---

## 🚀 Getting Started

Try it live 👉 [wavecall-by-arnab.vercel.app](https://wavecall-by-arnab.vercel.app/)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/your-repo-name.git

# 2. Install dependencies
cd your-repo-name
npm install

# 3. Add environment variables
cp .env.example .env.local
# Fill in your Clerk + Stream credentials

# 4. Run the dev server
npm run dev
