# 📘 Documentation de l'API – `fullstack-app`

## 🌐 URL de base

```
http://localhost:3000/api
```

## 🔐 Authentification

Aucune authentification requise pour les endpoints fournis.

---

## 📂 Endpoints

### ✅ `GET /users`  
**Description :** Récupère la liste de tous les utilisateurs.

#### Réponse (200 OK) :

```json
[
  {
    "id": 1,
    "name": "Ismail",
    "email": "ismail@example.com",
    "created_at": "2025-04-10T12:00:00.000Z"
  }
]
```

---

### ➕ `POST /users`  
**Description :** Crée un nouvel utilisateur.

#### Corps de la requête :

```json
{
  "name": "Nouveau User",
  "email": "nouveau@example.com"
}
```

#### Réponse (201 Created) :

```json
{
  "message": "User created successfully",
  "user": {
    "id": 2,
    "name": "Nouveau User",
    "email": "nouveau@example.com"
  }
}
```

---

### ✏️ `PUT /users/:id`  
**Description :** Modifie un utilisateur par son ID.

#### Corps de la requête :

```json
{
  "name": "Nom modifié",
  "email": "modifie@example.com"
}
```

#### Réponse :

```json
{
  "message": "User updated successfully"
}
```

---

### ❌ `DELETE /users/:id`  
**Description :** Supprime un utilisateur.

#### Réponse :

```json
{
  "message": "User deleted successfully"
}
```

---

## 🧪 Tester l'API

- Utilise [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
- Lance le backend avec :

```bash
npm start
```

---

## 🗃️ Structure de la base de données

La table `users` :

| Champ        | Type            | Description                   |
|--------------|-----------------|-------------------------------|
| `id`         | INT AUTO_INCREMENT | Identifiant unique         |
| `name`       | VARCHAR(255)    | Nom de l’utilisateur          |
| `email`      | VARCHAR(255) UNIQUE | Email de l’utilisateur    |
| `created_at` | TIMESTAMP       | Date de création              |

---
