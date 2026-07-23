# React PDF Builder

> Générez des documents PDF professionnels avec React et Tailwind CSS

[![npm version](https://img.shields.io/badge/npm-1.0.0-blue.svg)](https://www.npmjs.com/package/@andy-defer/react-pdf-builder)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/andy-defer/react-pdf-builder/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)

---

## 📋 Table des matières

- [Introduction](#introduction)
- [Installation](#installation)
- [Prérequis](#prérequis)
- [Démarrage rapide](#démarrage-rapide)
- [Téléchargement du PDF](#téléchargement-du-pdf)
- [Composants](#composants)
  - [Page](#page)
  - [Flex](#flex)
  - [Grid](#grid)
  - [Box](#box)
  - [Text](#text)
  - [Heading](#heading)
  - [Image](#image)
  - [Table](#table)
  - [TableRow](#tablerow)
  - [TableCell](#tablecell)
  - [Badge](#badge)
  - [Divider](#divider)
  - [TotalBox](#totalbox)
  - [QRCode](#qrcode)
  - [Barcode](#barcode)
- [Hooks](#hooks)
  - [usePdf](#usepdf)
- [API Référence](#api-référence)
- [Exemples](#exemples)
- [Performance](#performance)
- [Compatibilité](#compatibilité)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## Introduction

**React PDF Builder** est une bibliothèque qui permet de générer des documents PDF directement depuis vos composants React en utilisant le rendu HTML/CSS.

### Philosophie

- **React-first** : Construisez vos documents avec des composants React familiers
- **Tailwind CSS** : Stylisez avec les classes Tailwind que vous connaissez
- **TypeScript** : Typage complet pour une expérience de développement fluide
- **Sans serveur** : Tout se passe côté client, aucune installation serveur nécessaire
- **Multi-pages** : Support natif des documents multi-pages

### Cas d'usage

- 📄 Factures et reçus
- 📊 Rapports de données
- 🏷️ Étiquettes et codes-barres
- 📑 Documents administratifs
- 🎫 Billets et réservations

---

## Installation

```bash
# Avec npm
npm install @andy-defer/react-pdf-builder

# Avec yarn
yarn add @andy-defer/react-pdf-builder

# Avec pnpm
pnpm add @andy-defer/react-pdf-builder
```

### Dépendances

Le package utilise les bibliothèques suivantes en peerDependencies :

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.0.0"
}
```

---

## Prérequis

### 1. Configuration Tailwind CSS

Assurez-vous que Tailwind CSS est configuré dans votre projet :

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@andy-defer/react-pdf-builder/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2. Import du CSS

Importez le CSS du package dans votre point d'entrée :

```tsx
// index.tsx ou App.tsx
import '@andy-defer/react-pdf-builder/dist/style.css';
```

---

## Démarrage rapide

### Exemple minimal

```tsx
import React from 'react';
import { 
  Page, 
  Flex, 
  Text, 
  usePdf,
} from '@andy-defer/react-pdf-builder';

function MyDocument() {
  const { download, loading } = usePdf(
    <Page>
      <Flex direction="column" gap={4}>
        <Text variant="h1">Mon Document</Text>
        <Text>Ceci est un document PDF généré avec React.</Text>
      </Flex>
    </Page>
  );

  return (
    <div>
      <button 
        onClick={() => download({ filename: 'mon-document.pdf' })}
        disabled={loading}
        style={{
          padding: '10px 24px',
          background: loading ? '#6b7280' : '#4338ca',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'default' : 'pointer',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Génération en cours...' : '📥 Télécharger le PDF'}
      </button>
    </div>
  );
}

export default MyDocument;
```

---

## Téléchargement du PDF

### Méthode 1 : Téléchargement simple avec `download()`

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';

function MyComponent() {
  const { download, loading } = usePdf(
    <Invoice data={invoiceData} />
  );

  return (
    <button 
      onClick={() => download({ filename: 'facture.pdf' })}
      disabled={loading}
    >
      {loading ? 'Génération...' : 'Télécharger PDF'}
    </button>
  );
}
```

### Méthode 2 : Téléchargement avec configuration personnalisée

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';

function MyComponent() {
  const { download, loading } = usePdf(<Report data={reportData} />);

  const handleDownload = async () => {
    await download({
      filename: 'rapport-2026.pdf',
      format: 'a4',
      orientation: 'landscape',
      scale: 2,
      quality: 0.95,
      margin: 15,
    });
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? 'Génération...' : '📥 Télécharger'}
    </button>
  );
}
```

### Méthode 3 : Génération base64 pour prévisualisation

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';
import { useState } from 'react';

function MyComponent() {
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const { generate, loading } = usePdf(<Document content={data} />);

  const handlePreview = async () => {
    const base64 = await generate({
      format: 'a4',
      scale: 1.5,
      quality: 0.8,
    });
    setPdfPreview(base64);
  };

  return (
    <div>
      <button onClick={handlePreview} disabled={loading}>
        {loading ? 'Génération...' : 'Aperçu'}
      </button>
      {pdfPreview && (
        <iframe
          src={pdfPreview}
          style={{ width: '100%', height: '600px', border: '1px solid #e5e7eb' }}
        />
      )}
    </div>
  );
}
```

### Méthode 4 : Gestion d'erreur et état de chargement

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';
import { useState } from 'react';

function MyComponent() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { download, loading, error } = usePdf(<MyDocument />);

  const handleDownload = async () => {
    try {
      setErrorMessage(null);
      await download({
        filename: 'document.pdf',
        format: 'a4',
        scale: 2,
      });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '12px' }}>
          ❌ {error}
        </div>
      )}
      <button onClick={handleDownload} disabled={loading}>
        {loading ? '⏳ Génération...' : '📥 Télécharger PDF'}
      </button>
    </div>
  );
}
```

### Méthode 5 : Bouton stylé avec Tailwind et animation

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';

function MyComponent() {
  const { download, loading } = usePdf(<Invoice data={invoiceData} />);

  return (
    <button
      onClick={() => download({ filename: 'facture.pdf' })}
      disabled={loading}
      className={`
        px-6 py-3 rounded-lg font-bold text-white transition-all
        flex items-center gap-2
        ${loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95'
        }
      `}
    >
      {loading ? (
        <>
          <span className="animate-spin">⏳</span>
          Génération en cours...
        </>
      ) : (
        <>
          📥 Télécharger le PDF
        </>
      )}
    </button>
  );
}
```

---

## Composants

### Page

Composant représentant une page individuelle dans un document multi-pages.

```tsx
import { Page } from '@andy-defer/react-pdf-builder';

<Page
  data-page-id="page-1"  // Identifiant pour la détection automatique
  className="p-8"
  style={{}}
>
  {/* Contenu de la page */}
</Page>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu de la page |
| `data-page-id` | `string` | `auto-généré` | Identifiant unique pour la détection |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

**Important :** Chaque `Page` est automatiquement détectée via l'attribut `data-page-id` et transformée en une page PDF distincte.

---

### Flex

Composant de mise en page flexible (flexbox).

```tsx
import { Flex } from '@andy-defer/react-pdf-builder';

<Flex
  direction="row"                // 'row' | 'column'
  gap={4}                        // Espace entre les éléments (1-12)
  align="start"                  // 'start' | 'center' | 'end' | 'stretch'
  justify="between"              // 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap={false}                   // Retour à la ligne
  className=""
  style={{}}
>
  <div>Élément 1</div>
  <div>Élément 2</div>
</Flex>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Éléments à disposer |
| `direction` | `'row' \| 'column'` | `'row'` | Direction du flux |
| `gap` | `number` | `4` | Espace entre les éléments |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Alignement vertical |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Alignement horizontal |
| `wrap` | `boolean` | `false` | Retour à la ligne |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Grid

Composant de mise en page en grille.

```tsx
import { Grid } from '@andy-defer/react-pdf-builder';

<Grid
  columns={2}                    // Nombre de colonnes (1-12)
  gap={4}                        // Espace entre les éléments
  className=""
  style={{}}
>
  <div>Colonne 1</div>
  <div>Colonne 2</div>
</Grid>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Éléments à disposer |
| `columns` | `number` | `2` | Nombre de colonnes |
| `gap` | `number` | `4` | Espace entre les éléments |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Box

Conteneur générique avec options de style intégrées.

```tsx
import { Box } from '@andy-defer/react-pdf-builder';

<Box
  padding={4}                    // Padding interne (1-12)
  margin={2}                     // Marge externe (1-12)
  border={true}                  // Ajouter une bordure
  rounded={true}                 // Coins arrondis
  shadow="md"                    // 'none' | 'sm' | 'md' | 'lg'
  className=""
  style={{}}
>
  Contenu
</Box>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu de la boîte |
| `padding` | `number` | `4` | Padding interne |
| `margin` | `number` | `0` | Marge externe |
| `border` | `boolean` | `false` | Ajouter une bordure |
| `rounded` | `boolean` | `false` | Coins arrondis |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Ombrage |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Text

Composant de texte avec variantes de style.

```tsx
import { Text } from '@andy-defer/react-pdf-builder';

<Text
  variant="body"                 // 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'small' | 'caption'
  color="primary"                // 'primary' | 'secondary' | 'muted' | 'destructive' | 'success' | 'warning'
  align="left"                   // 'left' | 'center' | 'right' | 'justify'
  bold={false}                   // Texte en gras
  truncate={false}               // Tronquer le texte
  className=""
  style={{}}
>
  Contenu du texte
</Text>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu du texte |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'body' \| 'small' \| 'caption'` | `'body'` | Style typographique |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'destructive' \| 'success' \| 'warning'` | `'primary'` | Couleur du texte |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Alignement |
| `bold` | `boolean` | `false` | Texte en gras |
| `truncate` | `boolean` | `false` | Tronquer le texte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Heading

Composant de titre hiérarchique.

```tsx
import { Heading } from '@andy-defer/react-pdf-builder';

<Heading
  level={1}                      // 1-6 (h1 à h6)
  color="primary"                // 'primary' | 'secondary' | 'muted'
  className=""
  style={{}}
>
  Titre
</Heading>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu du titre |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | Niveau hiérarchique |
| `color` | `'primary' \| 'secondary' \| 'muted'` | `'primary'` | Couleur du texte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Image

Composant d'image avec gestion d'erreur et fallback.

```tsx
import { Image } from '@andy-defer/react-pdf-builder';

<Image
  src="/logo.png"                // URL de l'image
  alt="Logo"                     // Texte alternatif
  width={150}                    // Largeur en pixels
  height={50}                    // Hauteur en pixels
  fit="contain"                  // 'contain' | 'cover' | 'fill' | 'none'
  rounded={false}                // Coins arrondis ou 'full'
  fallback="/fallback.png"       // Image de remplacement
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `src` | `string` | - | URL de l'image |
| `alt` | `string` | `''` | Texte alternatif |
| `width` | `number` | - | Largeur en pixels |
| `height` | `number` | - | Hauteur en pixels |
| `fit` | `'contain' \| 'cover' \| 'fill' \| 'none'` | `'contain'` | Mode de redimensionnement |
| `rounded` | `boolean \| 'full'` | `false` | Coins arrondis |
| `fallback` | `string` | - | URL de remplacement |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Table

Composant de tableau avec colonnes configurables.

```tsx
import { Table } from '@andy-defer/react-pdf-builder';

const columns = [
  { key: 'name', label: 'Nom', width: '50%' },
  { key: 'qty', label: 'Qté', align: 'center' },
  { key: 'price', label: 'Prix', align: 'right' },
];

const data = [
  { name: 'Produit A', qty: 2, price: 150 },
  { name: 'Produit B', qty: 1, price: 200 },
];

<Table
  columns={columns}
  data={data}
  bordered={true}
  striped={true}
  hoverable={false}
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | `Column[]` | - | Définition des colonnes |
| `data` | `Record<string, any>[]` | - | Données du tableau |
| `bordered` | `boolean` | `false` | Ajouter des bordures |
| `striped` | `boolean` | `false` | Alternance de couleurs |
| `hoverable` | `boolean` | `false` | Effet au survol |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

#### Type Column

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Clé dans les données |
| `label` | `string` | En-tête de colonne |
| `width` | `string` | Largeur (ex: '50%') |
| `align` | `'left' \| 'center' \| 'right'` | Alignement du texte |

---

### TableRow

Composant de ligne de tableau.

```tsx
import { TableRow } from '@andy-defer/react-pdf-builder';

<TableRow className="" style={{}}>
  <TableCell>Contenu</TableCell>
</TableRow>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Cellules de la ligne |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### TableCell

Composant de cellule de tableau.

```tsx
import { TableCell } from '@andy-defer/react-pdf-builder';

<TableCell align="left" className="" style={{}}>
  Contenu
</TableCell>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu de la cellule |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Alignement du texte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Badge

Composant d'étiquette visuelle.

```tsx
import { Badge } from '@andy-defer/react-pdf-builder';

<Badge
  variant="success"              // 'success' | 'warning' | 'destructive' | 'info' | 'default'
  size="md"                      // 'sm' | 'md' | 'lg'
  rounded={true}                 // Coins arrondis complets
  className=""
  style={{}}
>
  Payée
</Badge>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu du badge |
| `variant` | `'success' \| 'warning' \| 'destructive' \| 'info' \| 'default'` | `'default'` | Couleur du badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du badge |
| `rounded` | `boolean` | `true` | Coins arrondis complets |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Divider

Composant de séparateur visuel.

```tsx
import { Divider } from '@andy-defer/react-pdf-builder';

<Divider
  variant="solid"                // 'solid' | 'dashed' | 'dotted'
  size={2}                       // Épaisseur
  color="gray-300"               // Couleur Tailwind
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Style de la ligne |
| `size` | `number` | `2` | Épaisseur en pixels |
| `color` | `string` | `'gray-300'` | Couleur Tailwind |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### TotalBox

Bloc d'affichage des totaux pour les factures.

```tsx
import { TotalBox } from '@andy-defer/react-pdf-builder';

<TotalBox
  subtotal={850}
  discount={50}
  tax={20}
  shipping={0}
  total={960}
  currency="€"
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `subtotal` | `number` | - | Montant hors taxe |
| `discount` | `number` | `0` | Remise en euros |
| `tax` | `number` | `0` | TVA en pourcentage |
| `shipping` | `number` | `0` | Frais de livraison |
| `total` | `number` | - | Montant total TTC |
| `currency` | `string` | `'€'` | Symbole de la devise |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

**Calcul automatique :** La TVA est calculée sur `(subtotal - discount) × tax / 100`.

---

### QRCode

Composant de génération de QR codes.

```tsx
import { QRCode } from '@andy-defer/react-pdf-builder';

<QRCode
  value="https://example.com"    // Données à encoder
  size={128}                     // Taille en pixels
  bgColor="#ffffff"              // Couleur de fond
  fgColor="#000000"              // Couleur du QR code
  level="M"                      // 'L' | 'M' | 'Q' | 'H'
  includeMargin={false}          // Inclure la marge
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | - | Données à encoder |
| `size` | `number` | `128` | Taille en pixels |
| `bgColor` | `string` | `'#ffffff'` | Couleur de fond |
| `fgColor` | `string` | `'#000000'` | Couleur du QR code |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Niveau de correction d'erreur |
| `includeMargin` | `boolean` | `false` | Inclure la marge |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Barcode

Composant de génération de codes-barres.

```tsx
import { Barcode } from '@andy-defer/react-pdf-builder';

<Barcode
  value="INV-2026-001"           // Valeur à encoder
  format="CODE128"               // Format du code-barres
  width={2}                      // Largeur des barres
  height={100}                   // Hauteur
  displayValue={true}            // Afficher la valeur
  fontSize={16}                  // Taille de police
  background="#ffffff"           // Couleur de fond
  lineColor="#000000"            // Couleur des barres
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | - | Valeur à encoder |
| `format` | `'CODE128' \| 'CODE39' \| 'EAN13' \| 'EAN8' \| 'UPC' \| 'ITF' \| 'ITF14' \| 'MSI' \| 'CODABAR' \| 'PHARMACODE'` | `'CODE128'` | Format du code-barres |
| `width` | `number` | `2` | Largeur des barres |
| `height` | `number` | `100` | Hauteur |
| `displayValue` | `boolean` | `true` | Afficher la valeur |
| `fontSize` | `number` | `16` | Taille de police |
| `font` | `string` | `'monospace'` | Police |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Alignement du texte |
| `textPosition` | `'top' \| 'bottom'` | `'bottom'` | Position du texte |
| `background` | `string` | `'#ffffff'` | Couleur de fond |
| `lineColor` | `string` | `'#000000'` | Couleur des barres |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

**Formats supportés :**
- `CODE128`
- `CODE39`
- `EAN13`
- `EAN8`
- `UPC`
- `ITF`
- `ITF14`
- `MSI`
- `CODABAR`
- `PHARMACODE`

---

## Hooks

### usePdf

Hook principal pour la génération de PDF. Contrairement à l'ancienne API, ce hook prend directement un composant React en paramètre.

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';

const {
  download,                      // Télécharge le PDF
  generate,                      // Génère le PDF en base64
  loading,                       // État de chargement
  error,                         // Message d'erreur
  config,                        // Configuration actuelle
  updateConfig,                  // Met à jour la configuration
  cleanup,                       // Nettoie le conteneur DOM
} = usePdf(<MyDocument />);
```

#### `download(options?: Partial<PDFOptions>): Promise<void>`

Télécharge le document sous forme de PDF.

```tsx
await download({
  filename: 'document.pdf',
  format: 'a4',
  orientation: 'portrait',
  scale: 2,
  quality: 0.9,
  margin: 15,
});
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `filename` | `string` | `'document.pdf'` | Nom du fichier PDF |
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal'` | `'a3'` | Format du papier |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Orientation |
| `scale` | `number` | `1.5` | Qualité du rendu (1-3) |
| `quality` | `number` | `0.8` | Qualité JPEG (0.1-1.0) |
| `margin` | `number` | `20` | Marge en mm |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `containerWidth` | `number` | `900` | Largeur du conteneur |
| `containerPadding` | `number` | `10` | Padding du conteneur |
| `containerBackground` | `string` | `'#ffffff'` | Fond du conteneur |

#### `generate(options?: Partial<PDFOptions>): Promise<string>`

Génère une représentation base64 du document.

```tsx
const base64 = await generate({
  scale: 2,
  quality: 0.9,
});
```

#### `updateConfig(newConfig: Partial<PdfConfig>): void`

Met à jour la configuration globale.

```tsx
updateConfig({ 
  format: 'a4', 
  orientation: 'landscape', 
  scale: 2,
  margin: 20,
});
```

#### `cleanup(): void`

Nettoie le conteneur DOM et le root React pour libérer la mémoire.

```tsx
useEffect(() => {
  return () => cleanup();
}, [cleanup]);
```

---

## API Référence

### PDFOptions

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `filename` | `string` | `'document.pdf'` | Nom du fichier PDF |
| `scale` | `number` | `1.5` | Qualité du rendu (1-3) |
| `quality` | `number` | `0.8` | Qualité JPEG (0.1-1.0) |
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal'` | `'a3'` | Format du papier |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Orientation |
| `margin` | `number` | `20` | Marge en mm |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `containerWidth` | `number` | `900` | Largeur du conteneur (px) |
| `containerPadding` | `number` | `10` | Padding du conteneur (px) |
| `containerBackground` | `string` | `'#ffffff'` | Couleur de fond du conteneur |

### PdfConfig

Configuration du hook usePdf.

```typescript
interface PdfConfig {
  format: 'a3' | 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  scale: number;
  margin: number;
  containerWidth: number;
  containerPadding: number;
  containerBackground: string;
}
```

---

## Exemples

### Facture complète avec QR Code et Barcode

```tsx
import React from 'react';
import {
  Page,
  Flex,
  Grid,
  Box,
  Text,
  Heading,
  Table,
  Badge,
  Divider,
  TotalBox,
  QRCode,
  Barcode,
  usePdf,
} from '@andy-defer/react-pdf-builder';

function CompleteInvoice() {
  const invoiceData = {
    number: 'INV-2026-001',
    date: '19/07/2026',
    dueDate: '18/08/2026',
    customer: {
      name: 'Jean Dupont',
      address: '45 Rue du Commerce',
      city: '69000 Lyon',
    },
    items: [
      { description: 'Développement site e-commerce', quantity: 1, unitPrice: 850, total: 850 },
      { description: 'Intégration système de paiement', quantity: 1, unitPrice: 350, total: 350 },
      { description: 'Hébergement premium (1 an)', quantity: 12, unitPrice: 25, total: 300 },
    ],
    subtotal: 1500,
    discount: 50,
    tax: 20,
    total: 1740,
  };

  const { download, loading, error } = usePdf(
    <Page className="p-8">
      <Box>
        {/* En-tête */}
        <Flex justify="between" align="center">
          <Box>
            <Heading level={1}>FACTURE</Heading>
            <Text color="muted">#{invoiceData.number}</Text>
          </Box>
          <Box style={{ textAlign: 'right' }}>
            <Text variant="body" className="font-bold">WebStudio Pro</Text>
            <Text variant="small" color="muted">123 Avenue des Créateurs</Text>
            <Text variant="small" color="muted">75000 Paris</Text>
          </Box>
        </Flex>

        <Divider />

        {/* Informations client */}
        <Grid columns={2} gap={4}>
          <Box className="bg-gray-50 p-4 rounded">
            <Text variant="small" color="muted">DESTINATAIRE</Text>
            <Text className="font-bold">{invoiceData.customer.name}</Text>
            <Text>{invoiceData.customer.address}</Text>
            <Text>{invoiceData.customer.city}</Text>
          </Box>
          <Box className="bg-gray-50 p-4 rounded">
            <Text variant="small" color="muted">DÉTAILS</Text>
            <Text>Date: {invoiceData.date}</Text>
            <Text>Échéance: {invoiceData.dueDate}</Text>
            <Badge variant="warning">En attente</Badge>
          </Box>
        </Grid>

        {/* Tableau des articles */}
        <Table
          columns={[
            { key: 'description', label: 'Description', width: '50%' },
            { key: 'quantity', label: 'Qté', align: 'center' },
            { key: 'unitPrice', label: 'Prix unit.', align: 'right' },
            { key: 'total', label: 'Total', align: 'right' },
          ]}
          data={invoiceData.items}
          bordered
          striped
        />

        {/* Totaux */}
        <Flex justify="end">
          <TotalBox
            subtotal={invoiceData.subtotal}
            discount={invoiceData.discount}
            tax={invoiceData.tax}
            total={invoiceData.total}
          />
        </Flex>

        <Divider />

        {/* Pied de page */}
        <Flex justify="between">
          <Box>
            <Text variant="small" color="muted">
              <strong>Conditions de paiement :</strong> 30 jours nets
            </Text>
            <Text variant="small" color="muted">
              <strong>IBAN :</strong> FR76 1234 5678 9012 3456 7890 123
            </Text>
          </Box>
          <Flex gap={4}>
            <QRCode value={`https://example.com/invoice/${invoiceData.number}`} size={80} />
            <Barcode value={invoiceData.number} format="CODE128" height={60} />
          </Flex>
        </Flex>
      </Box>
    </Page>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {error && (
        <div style={{ color: '#dc2626', padding: '12px', background: '#fee2e2', borderRadius: '8px', marginBottom: '16px' }}>
          ❌ {error}
        </div>
      )}

      <button
        onClick={() => download({
          filename: `facture_${invoiceData.number}.pdf`,
          format: 'a4',
          orientation: 'portrait',
          scale: 2,
          quality: 0.9,
        })}
        disabled={loading}
        style={{
          padding: '12px 32px',
          background: loading ? '#6b7280' : '#059669',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: loading ? 'default' : 'pointer',
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {loading ? (
          <>
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
            Génération en cours...
          </>
        ) : (
          <>📥 Télécharger la facture</>
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default CompleteInvoice;
```

---

## Performance

### Optimisation de la taille des PDF

| Paramètre | Impact |
|-----------|--------|
| `scale: 1.5` | Bon équilibre qualité/poids |
| `scale: 2` | Qualité supérieure, fichier 2x plus lourd |
| `quality: 0.8` | Réduction de 30-40% du poids |
| `quality: 0.6` | Réduction de 50-60% (perte de qualité visible) |

### Recommandations

| Cas d'usage | `scale` | `quality` |
|-------------|---------|-----------|
| Aperçu rapide | 1 | 0.6 |
| Usage général | 1.5 | 0.8 |
| Impression | 2 | 0.95 |
| Archivage | 2.5 | 0.95 |

### Nettoyage de mémoire

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';
import { useEffect } from 'react';

function MyComponent() {
  const { download, cleanup } = usePdf(<MyDocument />);

  useEffect(() => {
    // Nettoyage automatique à la destruction du composant
    return () => cleanup();
  }, [cleanup]);

  // ...
}
```

---

## Compatibilité

| Environnement | Support |
|---------------|---------|
| **React** | 18.0+ |
| **TypeScript** | 5.0+ |
| **Chrome** | 60+ |
| **Firefox** | 55+ |
| **Safari** | 12+ |
| **Edge** | 79+ |
| **Node.js** | 18+ (pour les builds) |

---

## Migration depuis l'ancienne API

### Avant (ancienne API)

```tsx
// ❌ Ancienne API avec PDFGenerator
<PDFGenerator format="a4" border>
  <Page>Contenu</Page>
</PDFGenerator>

// ❌ Ancien usePDF
const { download, loading } = usePDF();
await download(container, { filename: 'doc.pdf' });
```

### Après (nouvelle API)

```tsx
// ✅ Nouvelle API - Le composant PDFGenerator n'est plus nécessaire
const { download, loading } = usePdf(
  <Page>Contenu</Page>
);

// ✅ Téléchargement simplifié
await download({ filename: 'doc.pdf' });
```

### Principaux changements

| Ancienne API | Nouvelle API | Description |
|--------------|--------------|-------------|
| `PDFGenerator` | `usePdf()` | Plus besoin de wrapper, le hook gère le rendu |
| `usePDF()` | `usePdf()` | Nom plus cohérent |
| `download(container, options)` | `download(options)` | Le conteneur est géré automatiquement |
| `generate(container, options)` | `generate(options)` | Génération simplifiée |
| `preview(element, containerId)` | Non supporté | Utiliser `generate()` avec iframe |

---

## Contribuer

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

---

## Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

---

## Liens utiles

- [GitHub Repository](https://github.com/andy-defer/react-pdf-builder)
- [NPM Package](https://www.npmjs.com/package/@andy-defer/react-pdf-builder)
- [Signaler un bug](https://github.com/andy-defer/react-pdf-builder/issues)