# 🎮 PokéFusion - Reto Angular + Firebase (3-4 horas)

## 🔗 **URL Pública de la App**
### **[https://poke-fusion-demo.web.app](https://poke-fusion-demo.web.app)**

## 📱 **Demo en Video/Capturas**
*(Agrega capturas de pantalla o enlace a video demo)*

---

## 🎯 **Reto Elegido y Alcance**

### **PokéFusion (PokeAPI)**
**Objetivo:** Fusionar 3 Pokémon para crear uno nuevo con nombre, tipos, estadísticas y movimientos combinados.

### **Alcance Implementado:**
- ✅ Búsqueda/aleatorización de 3 Pokémon desde PokeAPI
- ✅ Fusión completa mostrada en tarjeta interactiva
- ✅ Botón "Re-fusionar" para nuevas combinaciones
- ✅ Persistencia en localStorage (favoritos)
- ✅ Despliegue completo en Firebase Hosting

### **Supuestos:**
1. Se usan Pokémon de la primera generación (ID 1-151) para simplicidad
2. Las fusiones se guardan localmente (no requiere autenticación)
3. La app es SPA (Single Page Application) sin routing complejo

---

## 🏗 **Arquitectura y Dependencias**

### **Diagrama de Arquitectura:**

┌─────────────────────────────────────────────────┐
│ Firebase Hosting │
│ https://poke-fusion-demo.web.app │
└─────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────┐
│ Angular SPA (Cliente) │
│ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│ │Components│◄─┤ Services │◄─┤ PokeAPI │ │
│ └──────────┘ └──────────┘ └──────────────┘ │
│ │ │ │
│ ┌──────────┐ ┌─────────────┐ │
│ │Template │ │ localStorage │ │
│ └──────────┘ └─────────────┘ │
└─────────────────────────────────────────────────┘

### **Dependencias Principales:**
```json
{
  "@angular/core": "^20.0.0",
  "@angular/fire": "^20.0.1",
  "@angular/material": "^20.0.0",
  "firebase": "^10.12.0",
  "rxjs": "^7.8.0"
}

src/app/
├── components/                    # Componentes standalone
│   ├── fusion-page/              # Página principal
│   ├── fusion-card/              # Tarjeta de Pokémon fusionado
│   └── pokemon-selector/         # Selector individual
├── services/                     # Lógica de negocio
│   ├── pokemon.service.ts        # Consumo PokeAPI + fusión
│   └── storage.service.ts        # Gestión localStorage
├── environments/                 # Configuración Firebase
├── app.config.ts                # Configuración global
└── app.component.ts             # Componente raíz

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
}

interface FusionPokemon {
  name: string;                    // Nombre combinado
  types: string[];                 // Tipos fusionados (max 2)
  stats: { name: string; value: number }[]; // Stats promedio
  moves: string[];                 // 2 movimientos aleatorios
  image?: string;                  // Imagen del primer Pokémon
}

Persistencia:
Colección: fusions (Firestore - configurada pero no usada en MVP)

Local: localStorage -> clave: poke-fusions (array de FusionPokemon)

Límite: Últimas 10 fusiones guardadas

Reglas de Seguridad (Firestore):

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura solo a usuarios autenticados
    match /fusions/{fusionId} {
      allow read, write: if request.auth != null;
    }
    
    // Permitir acceso público para desarrollo
    match /{document=**} {
      allow read, write: if true; // Modo desarrollo
    }
  }
}

🧭 Estado y Navegación
Estrategia de Estado:
Estado Local: Componentes standalone manejan su estado interno

Estado Compartido: Servicios singleton (PokemonService, StorageService)

Persistencia: localStorage para datos críticos (favoritos)

Navegación:
SPA Simple: Una sola ruta (/) - Componente FusionPageComponent

Lazy Loading: No aplica por simplicidad del MVP

Estado de URL: No requiere parámetros de ruta

⚙️ Decisiones Técnicas
1. Angular Standalone Components
Justificación: Reducción de boilerplate, mejor performance inicial, compatibilidad con futuras versiones de Angular.

2. localStorage sobre Firestore para MVP
Justificación:

Evita complejidad de autenticación en ventana de 4 horas

Funciona offline

Suficiente para demostrar persistencia

3. PokeAPI sin proxy/caché
Justificación:

API pública y gratuita

Límites generosos (100 requests/día por IP)

MVP no requiere caché avanzado

4. Angular Material
Justificación:

Desarrollo rápido de UI consistente

Componentes accesibles por defecto

Responsive design incorporado

5. Firebase Hosting sobre GitHub Pages
Justificación:

Despliegue más rápido (1 comando)

SSL automático

Integración nativa con Firestore (para escalar)

📈 Escalabilidad y Mantenimiento
Cómo Crecería:
Backend: Migrar a Firestore con autenticación

Caching: Implementar service worker para PokeAPI

Estado: Agregar NgRx para estado complejo

Testing: Agregar unit tests (Karma) y e2e (Cypress)

Separación de Capas:

Presentation Layer → Components (UI/UX)
Business Logic     → Services (Lógica de negocio)
Data Layer         → PokeAPI + localStorage/Firestore

Migrabilidad:
Firestore → Backend propio: Servicios abstractos facilitan migración

Angular Material → Otra UI: Componentes desacoplados

PokeAPI → Otra fuente: Interface Pokemon estable

🔒 Seguridad y Validaciones
Reglas Firebase:

{
  "rules": {
    ".read": true,     // Temporal para demo
    ".write": true     // Temporal para demo
  }
}

{
  "rules": {
    ".read": true,     // Temporal para demo
    ".write": true     // Temporal para demo
  }
}

⚡ Rendimiento
Optimizaciones Implementadas:
Lazy Images: loading="lazy" en imágenes de Pokémon

Bundle Size: Tree-shaking automático con Angular CLI

API Calls: forkJoin para llamadas paralelas a PokeAPI

Change Detection: OnPush strategy en componentes

Para Escalar:
Paginación: Load more / infinite scroll para historial

Caché: Service worker para assets estáticos

Compresión: Brotli/Gzip en Firebase Hosting

♿ Accesibilidad
Implementado:
Teclado: Navegación completa con Tab/Enter

Foco: Orden lógico en formularios

Contraste: Colores de Angular Material WCAG AA compliant

Labels: aria-label en botones e imágenes

Semántica: HTML5 tags apropiados

Por Mejorar:
Screen reader testing

High contrast mode

Reduced motion preferences

🤖 Uso de IA
Dónde y Por Qué se Usó IA:
Área	Uso de IA	Justificación
Setup Inicial	Generación de comandos Angular CLI, estructura de proyecto	Acelerar configuración técnica
Servicios	Código base de PokemonService, lógica de fusión	Implementar lógica compleja rápidamente
Componentes	Templates HTML, CSS responsive, TypeScript boilerplate	Mantener consistencia y mejores prácticas
Debugging	Solución de errores de import, configuración Firebase	Reducir tiempo de troubleshooting
Despliegue	Comandos Firebase, configuración hosting	Evitar errores de configuración

Resumen de Prompts Efectivos:
"Genera un servicio Angular que consuma PokeAPI y fusione 3 Pokémon"

"Corrige este error de TypeScript: Cannot find module..."

"Configura Firebase Hosting para una app Angular"

"Diseña una interfaz de fusión de Pokémon con Angular Material"

Riesgos y Mitigación:
Riesgo	Mitigación
Código inseguro	Revisión manual, validación con TypeScript
Dependencias obsoletas	Verificación de versiones, package.json audit
Malas prácticas	Refactorización basada en Angular style guide
Over-reliance	Uso solo para boilerplate, lógica core manual
Tiempo Ahorrado:
Sin IA: ~6-8 horas
