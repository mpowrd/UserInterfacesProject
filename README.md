# UserInterfacesProject
## Título: EURODLE


Grupo P

### Integrantes y roles:

| 🏆 Nombre     | 🎯 Correo | 🔍 Rol |
|----------------------|--------------|-----------|
| Eduardo García Rivas     | eduardogarr@uma.es | CTO |
| Francisco Eloy González Castillo  | eloygonzalez@uma.es | CEO |
| Francisco Javier Jordá Garay      | francisco.jorda@uma.es | CIO |
| María Paulina Ordóñez Walkowiak      | mpow@uma.es  | COO |
| Javier Toledo Delgado       | javier.toledo.delgado@uma.es | CXO |

### Descripción del proyecto:

Nuestro juego se inspira en otros populares minijuegos derivados de Wordle, como Gamedle o Pokédle. Aprovechando la proximidad de la próxima edición de Eurovisión Song Context, hemos decidido basar el juego en este evento. El objetivo es adivinar una canción de Eurovisión con la ayuda de pistas, que se van volviendo progresivamente más claras a medida que el jugador va fallando. Al llegar al final de las pistas sin adivinar correctamente, el jugador pierde el juego.

Los datos de las canciones de Eurovisión Song Context serán extraídas de las siguientes bases de datos, eligiendo, únicamente, las canciones de los últimos 10 años:


[Eurovision Song Contest Data from Kaggle](https://www.kaggle.com/datasets/diamondsnake/eurovision-song-contest-data)


[Spijkervet/eurovision-dataset: The Eurovision Song Contest Dataset is a freely-available dataset containing audio features, metadata, contest ranking and voting data of 1735 songs that have competed in the Eurovision Song Contests between 1956 and 2023.](https://github.com/Spijkervet/eurovision-dataset?tab=readme-ov-file)


### 🚀 Guía de instalación y uso

**Prerrequisitos**

* Tener instalados [Node.js](https://nodejs.org/en/download) y el gestor de paquetes **npm** (mediante el instalador de Node o un gestor de versiones como **nvm**).
* Disponer de un IDE como **IntelliJ IDEA** o **Visual Studio Code** donde poder abrir el proyecto y ejecutar comandos desde la terminal (ya sea la integrada en el IDE o una externa).

---

**🧩 Paso 1:**
Clonar el repositorio a tu máquina local.

```bash
git clone <URL-del-repositorio>
```

---

**📁 Paso 2:**
Abrir el proyecto en tu IDE preferido en la carpeta raíz (`/eurodle` o el nombre que se especifique, donde se encuentran las carpetas `src` y `public`, entre otras).

---

**📦 Paso 3:**
ANTES de hacer `npm start`, muy probablemente falten dependencias dentro de la carpeta `node_modules`. Para actualizarlas, ejecutar primero el comando:

```bash
npm install
```

---

**🖥️ Paso 4:**
Una vez instaladas las dependencias, ejecutar el servidor de desarrollo con el siguiente comando:

```bash
npm start
```

---

**🌐 Paso 5:**
Abrir un navegador e ingresar a la URL:

```
http://localhost:3000/
```

para probar la aplicación.

---

⚠️ **AVISO:**
`npm start` inicia un servidor de desarrollo. **No es una versión final** de la aplicación como podría ser la que se consigue al hacer un build y un deploy.

Por ese motivo, hemos subido a una página gratuita una versión funcional de la aplicación, que debería comportarse igual que la del servidor de desarrollo. En caso de que no se pueda iniciar o haya algún problema, es recomendable utilizar esta:
👉 [Eurodle](https://endearing-stroopwafel-7c8d92.netlify.app)
