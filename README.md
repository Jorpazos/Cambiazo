# 🏆 Cambiazo — Intercambio de Figuritas Mundial 2026

Plataforma argentina para **intercambiar, comprar y vender figuritas** del álbum oficial del FIFA World Cup 2026™.

> 🤖 Este proyecto fue desarrollado con [**Claude Code**](https://claude.com/claude-code) de Anthropic.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan) ![Prisma](https://img.shields.io/badge/Prisma-5-darkblue)

---

## ✨ Features

### 🏠 Landing Page
- **Hero** con estadísticas en vivo (usuarios, intercambios, figuritas)
- **Intercambios destacados** — tarjetas estilo figurita con foto de jugador
- **Cómo funciona** — proceso en 4 pasos
- **Sección de seguridad** — usuarios verificados, reputación, garantía
- **Tienda oficial** — sobres, packs y álbum
- **FAQ** — 8 preguntas frecuentes con accordion
- **Formulario de contacto**

### 👤 Sistema de usuarios
- Registro con email + contraseña + provincia/ciudad (24 provincias argentinas)
- Login con JWT en cookies httpOnly
- Dashboard personal con publicaciones y stats
- Marketplace filtrable con búsqueda

### 🛡️ Panel de Administrador
- Dashboard con KPIs (usuarios, ventas, mensajes)
- **Gestión de jugadores** — cargar fotos, números, posiciones
- **Tienda** — productos con stock y precios
- **Mensajes** — inbox de contacto
- **Usuarios** — moderación y suspensión

---

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** con App Router
- **TypeScript** estricto
- **Tailwind CSS** con tema personalizado (navy/blue/gold)
- **Lucide Icons** para íconos
- **React Hook Form + Zod** para validación

### Backend
- **API Routes** de Next.js
- **JWT** (httpOnly cookies, 7 días)
- **bcrypt** para passwords
- **Prisma ORM**
- **PostgreSQL** (recomendado) / SQLite (dev)
- **Nodemailer** para emails de contacto

### Infraestructura recomendada
- **Vercel** — frontend (deploy automático desde GitHub)
- **Railway** o **Render** — base de datos PostgreSQL
- **Cloudinary** o **AWS S3** — para fotos de jugadores (opcional)

---

## 🚀 Cómo correrlo localmente

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```

Editá `.env` con:
```env
DATABASE_URL="postgresql://usuario:pass@localhost:5432/cambiazo"
JWT_SECRET="generá-un-secreto-largo-y-aleatorio"
SMTP_HOST="smtp.gmail.com"
SMTP_USER="tu-email@gmail.com"
SMTP_PASS="tu-app-password"
```

### 3. (Opcional) Setup de la base de datos
```bash
npm run db:push    # crea las tablas
npm run db:seed    # carga admin + 15 jugadores + 5 productos
```

> 💡 **La app funciona sin base de datos en modo mock** — login/register usan datos simulados. Podés probar toda la UI sin configurar Postgres.

### 4. Levantar el servidor
```bash
npm run dev
```

Abrí 👉 [http://localhost:3000](http://localhost:3000)

---

## 🔑 Credenciales de prueba

| Rol     | Email                 | Contraseña   | Redirige a  |
|---------|-----------------------|--------------|-------------|
| Admin   | `admin@cambiazo.ar`   | `admin123`   | `/admin`    |
| Usuario | cualquier email       | `demo123`    | `/dashboard` |

---

## 📁 Estructura del Proyecto

```
Cambiazo/
├── prisma/
│   ├── schema.prisma         # 6 modelos: User, Player, Listing, etc.
│   └── seed.ts               # Datos iniciales
├── src/
│   ├── app/
│   │   ├── page.tsx          # 🏠 Landing page
│   │   ├── layout.tsx        # Layout raíz con navbar/footer
│   │   ├── globals.css       # Estilos globales + Tailwind
│   │   ├── login/            # Página de login
│   │   ├── register/         # Página de registro
│   │   ├── marketplace/      # Listado público de figuritas
│   │   ├── dashboard/        # Panel del usuario
│   │   ├── admin/            # 🛡️ Panel admin (5 tabs)
│   │   └── api/              # Endpoints REST
│   │       ├── auth/         # login, register, logout
│   │       ├── listings/     # CRUD de publicaciones
│   │       ├── contact/      # Formulario de contacto
│   │       └── admin/        # Endpoints solo admin
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── landing/          # 7 secciones de la landing
│   ├── lib/
│   │   ├── auth.ts           # JWT helpers
│   │   ├── db.ts             # Prisma client singleton
│   │   ├── utils.ts          # Helpers (cn, formatPrice, etc.)
│   │   └── mockData.ts       # Datos de demostración
│   └── types/
│       └── index.ts          # TypeScript types
├── package.json
├── tailwind.config.ts        # Tema con colores Mundial 2026
├── next.config.mjs
└── tsconfig.json
```

---

## 🌐 Deploy a Vercel (5 minutos)

1. Subí el repo a GitHub
2. Entrá a [vercel.com](https://vercel.com) y conectá tu cuenta de GitHub
3. Importá el repo `Cambiazo`
4. Agregá las variables de entorno (`JWT_SECRET`, `DATABASE_URL`)
5. **Deploy**

Para la base de datos:
- [Railway](https://railway.app) → Postgres gratis
- [Neon](https://neon.tech) → Postgres serverless gratis
- [Supabase](https://supabase.com) → Postgres + storage

---

## 🗺️ Roadmap

- [ ] Conectar API routes con Prisma real (actualmente usa mocks)
- [ ] OCR de figuritas con Google Vision API o Tesseract.js
- [ ] Mapa de usuarios cercanos con Leaflet/Google Maps
- [ ] Chat en tiempo real entre usuarios (Socket.io / Pusher)
- [ ] Sistema de reputación con calificaciones
- [ ] Notificaciones push con Firebase Cloud Messaging
- [ ] Pagos integrados con Mercado Pago
- [ ] App mobile con React Native
- [ ] Importar las 980 figuritas oficiales del Mundial 2026

---

## 📜 Modelos de Base de Datos

```
User         → email, password, name, province, city, isAdmin, verified
Player       → name, country, number, position, image, section
Listing      → type (CAMBIO/VENDO/BUSCO), price, status, userId, playerId
StoreProduct → name, price, type (SOBRE/PACK/ALBUM), stock
Order        → status, total, userId, listingId/productId
Message      → name, email, subject, body, read
```

---

## 🤖 Sobre el desarrollo

Este proyecto fue **íntegramente generado con [Claude Code](https://claude.com/claude-code)**, la CLI oficial de Anthropic para desarrollo asistido por IA.

**Estadísticas:**
- 🗂️ 38 archivos
- 📝 3.038 líneas de código
- ⏱️ Generado en una sola sesión

Si querés aprender a usar Claude Code para tus propios proyectos, visitá [claude.com/claude-code](https://claude.com/claude-code).

---

## 📄 Licencia

MIT — usalo, modificalo, compartilo.

Las figuritas Panini y el álbum del Mundial 2026 son marcas registradas de sus respectivos dueños. Este proyecto no está afiliado oficialmente con FIFA, Panini ni ninguna de sus subsidiarias.

---

<div align="center">

**Hecho con ❤️ en Argentina · 🤖 con Claude Code**

⚽ ¡Vamos por el campeonato! 🏆

</div>
