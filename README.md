# Architectural Heritage Archive 


[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Strapi](https://img.shields.io/badge/Strapi-Headless_CMS-purple?style=for-the-badge&logo=strapi)](https://strapi.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

> **A centralized digital platform for documenting, analyzing, and visualizing the restoration of architectural heritage.**

##  Overview

The **Architectural Heritage Archive** is an open-source platform designed to bridge the gap between history and modern technology. It allows researchers, architects, and history enthusiasts to explore the transformation of cultural sites through interactive tools.

### Key Features

* **Advanced Catalogue:** Filtering by tags, location, and era with a responsive sticky sidebar.
* **Before/After Comparison:** Interactive sliders to visualize restoration progress.
* **3D Visualization:** Integrated 3D model viewer (GLB/GLTF) for immersive object exploration.
* **High Performance:** Built with Next.js App Router, Server Components, and optimized asset delivery.
* **Modern UI/UX:** "Engineering" design style using Tailwind CSS, Shadcn UI, and Framer Motion.
* **CMS Powered:** Fully dynamic content management via Strapi.

---

## Tech Stack

### Frontend (`apps/web`)
* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Components:** shadcn/ui (Radix Primitives)
* **Animations:** Framer Motion, CSS Native Animations
* **3D Engine:** Google Model Viewer / React Three Fiber (optional modules)

### Backend (`apps/backend`)
* **Core:** [Strapi CMS](https://strapi.io/)
* **Database:** PostgreSQL
* **Media Storage:** Cloudinary Provider

### Infrastructure
* **Containerization:** Docker & Docker Compose (for local DB)
* **Package Manager:** npm / yarn

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
* Node.js (v18 or v20+)
* Docker Desktop (for local database)
* Git

### 1. Clone the Repository

```bash
git clone [https://github.com/yunaree/architectural-archive.git](https://github.com/yunaree/architectural-archive.git)
cd architectural-archive