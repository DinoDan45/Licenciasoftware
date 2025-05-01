# Licencia Software - Gestión de Licencias

## Descripción del Proyecto

Este proyecto es una aplicación completa para la gestión de licencias de software, que incluye un backend y un frontend integrados.  
- El **backend** está desarrollado con Node.js y Express, proporcionando una API REST para la gestión de usuarios, licencias y transacciones, con autenticación, conexión a base de datos y pruebas automatizadas.  
- El **frontend** es una aplicación React construida con Vite, que ofrece una interfaz de usuario para interactuar con el sistema de licencias, utilizando React Router para la navegación y contextos para autenticación y carrito.

## Tecnologías Utilizadas

### Backend
- Node.js
- Express
- JWT para autenticación
- Base de datos (configurada en el proyecto)
- Jest y Mocha para pruebas
- Otros: bcryptjs, cors, morgan, dotenv, mssql/mysql2

### Frontend
- React 18
- Vite
- React Router DOM
- Context API para estado global (autenticación y carrito)
- Axios para llamadas HTTP
- Vitest y Jest para pruebas
- ESLint para linting

## Instalación

### Backend

```bash
cd Licenciasoftware-cambios/Backend
npm install
```

### Frontend

```bash
cd Licenciasoftware-cambios/Frontend
npm install
```

## Ejecución del Proyecto

### Backend

Para iniciar el servidor backend en modo desarrollo con recarga automática:

```bash
npm run dev
```

Para iniciar el servidor en modo producción:

```bash
npm start
```

El backend corre por defecto en el puerto configurado (ver `config.js`).

### Frontend

Para iniciar la aplicación frontend en modo desarrollo:

```bash
npm run dev
```

Para construir la aplicación para producción:

```bash
npm run build
```

Para previsualizar la aplicación construida:

```bash
npm run preview
```

## Pruebas

### Backend

Para ejecutar las pruebas con cobertura:

```bash
npm run test:dev
```

### Frontend

Para ejecutar las pruebas con Vitest:

```bash
npm run test
```

Para generar reporte de cobertura:

```bash
npm run coverage
```

## Rutas Principales de la API

- `/api/usuarios` - Gestión de usuarios  
- `/api/licencias` - Gestión de licencias  
- `/api/transacciones` - Gestión de transacciones  

## Descripción del Frontend

La aplicación frontend está construida con React y utiliza React Router para la navegación entre páginas.  
Se manejan contextos para la autenticación de usuarios y el estado del carrito de licencias.  
Los componentes principales incluyen páginas de login, registro, listado de licencias, carrito y gestión de transacciones.

## Licencia

Este proyecto está bajo licencia ISC.

## Autor

Información del autor no especificada.
