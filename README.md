# **BOOKWORM PROJECT**

**Description:** Bookworm - E-Commerce website
</br>
Technology in use:
- Frontend: HTML, CSS, JavaScript, ReactJS, Boostraps
- Backend: Laravel Framework, PostgreSQL
- Architecture: MVC
- Design pattern: Service and repository
- Tool: Docker ( PHP and PostgreSQL)
## **Usage**

**Install packages composer**

```console
composer i
```
**Install packages NPM**
```console
npm i
```

**Change type of file**
```console
.env.example to .env
```

**Generate KEY**
```console
php artisan key:generate
```

**Build Image Docker**
```console
docker-compose build
```
**Run Docker**
```console
docker compose up -d
```

**MIGRARE database and seed data**
```console
php artisan migrate:fresh --seed
```

**Build Frontend (ReactJS)**
```console
npm run production
```

**Start Laravel using Artisan**
```console
php artisan serve
```

**Run Queue**
```console
php artisan queue:work
```
