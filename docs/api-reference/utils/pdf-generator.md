# PDFGenerator - Référence Technique

## Description

Classe utilitaire de génération de documents PDF à partir de contenu HTML ou de composants React. Elle utilise `html2canvas` pour capturer le rendu DOM, `jsPDF` pour la génération du PDF, et `pdf-lib` pour la fusion de documents multi-pages.

## Hiérarchie / Implémentations

- **Dépendances** : `html2canvas`, `jspdf`, `pdf-lib`
- **Consommé par** : `usePdf` (hook), `PDFProvider` (contexte)
- **Type** : Classe utilitaire pure (sans état)
- **Exporté depuis** : `src/utils/pdfGenerator.ts`

## Rôle principal

Fournir une couche d'abstraction robuste pour la conversion de contenu HTML en PDF. La classe gère :
- Le rendu hors écran dans un conteneur DOM caché
- La capture haute qualité via `html2canvas`
- La génération de documents PDF avec mise en page automatique
- La fusion de documents multi-pages
- Le téléchargement direct ou la génération en base64

## API / Méthodes

### `generatePage`

Génère un PDF d'une seule page à partir d'un élément HTML.

| Paramètre | Type | Requis | Défaut | Description |
|-----------|------|--------|--------|-------------|
| `element` | `HTMLElement` | ✅ | - | Élément HTML à convertir |
| `options` | `PDFOptions` | ❌ | `{}` | Options de génération |
| **Retour** | `Promise<ArrayBuffer>` | - | - | Données binaires du PDF |

### `generateMultiplePages`

Génère un PDF multi-pages à partir de plusieurs éléments HTML.

| Paramètre | Type | Requis | Défaut | Description |
|-----------|------|--------|--------|-------------|
| `elements` | `HTMLElement[]` | ✅ | - | Tableau d'éléments, un par page |
| `options` | `PDFOptions` | ❌ | `{}` | Options de génération |
| **Retour** | `Promise<ArrayBuffer>` | - | - | Données binaires du PDF fusionné |

### `mergePdfs`

Fusionne plusieurs fichiers PDF en un seul document.

| Paramètre | Type | Requis | Défaut | Description |
|-----------|------|--------|--------|-------------|
| `pdfFiles` | `ArrayBuffer[]` | ✅ | - | Tableau de PDFs à fusionner |
| **Retour** | `Promise<ArrayBuffer>` | - | - | Données binaires du PDF fusionné |

### `toBase64`

Convertit du contenu HTML en chaîne base64.

| Paramètre | Type | Requis | Défaut | Description |
|-----------|------|--------|--------|-------------|
| `htmlContent` | `string` | ✅ | - | Contenu HTML à convertir |
| `options` | `PDFOptions` | ❌ | `{}` | Options de génération |
| **Retour** | `Promise<string>` | - | - | Chaîne base64 du PDF |

### `downloadMultiplePages`

Génère et télécharge directement un PDF multi-pages.

| Paramètre | Type | Requis | Défaut | Description |
|-----------|------|--------|--------|-------------|
| `elements` | `HTMLElement[]` | ✅ | - | Tableau d'éléments, un par page |
| `options` | `PDFOptions` | ❌ | `{}` | Options de génération |
| **Retour** | `Promise<void>` | - | - | Résolution après téléchargement |

## Options de configuration (PDFOptions)

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `filename` | `string` | `'document.pdf'` | Nom du fichier téléchargé |
| `scale` | `number` | `1.5` | Facteur d'échelle pour la qualité de capture |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond du PDF |
| `margin` | `number` | `10` | Marge en millimètres |
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal' \| number[]` | `'a4'` | Format de page |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Orientation de la page |
| `quality` | `number` (0.1 - 1.0) | `0.8` | Qualité de compression JPEG |
| `containerWidth` | `number` | `900` | Largeur du conteneur de rendu en px |
| `containerPadding` | `number` | `40` | Padding du conteneur en px |
| `containerBackground` | `string` | `'#ffffff'` | Couleur de fond du conteneur |

## Exemples d'utilisation

### Exemple 1 : Génération d'une facture simple

```tsx
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

async function generateInvoice() {
  const invoiceElement = document.getElementById('invoice');
  const generator = new PDFGenerator();
  
  const pdfBuffer = await generator.generatePage(invoiceElement, {
    format: 'a4',
    orientation: 'portrait',
    margin: 20,
    quality: 0.9
  });
  
  // Télécharger le PDF
  const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'facture.pdf';
  link.click();
  URL.revokeObjectURL(url);
}
```

### Exemple 2 : Document multi-pages avec pages marquées

```tsx
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

async function generateReport() {
  const generator = new PDFGenerator();
  
  // Récupérer toutes les pages marquées avec data-page-id
  const pages = Array.from(document.querySelectorAll('[data-page-id]'));
  
  await generator.downloadMultiplePages(pages as HTMLElement[], {
    filename: 'rapport-annuel.pdf',
    format: 'a4',
    orientation: 'landscape',
    scale: 2,
    quality: 0.95
  });
}
```

### Exemple 3 : Génération base64 pour prévisualisation

```tsx
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

async function previewPDF(htmlContent: string) {
  const generator = new PDFGenerator();
  
  const base64 = await generator.toBase64(htmlContent, {
    scale: 1.5,
    containerWidth: 900,
    containerPadding: 40
  });
  
  // Afficher dans un iframe
  const iframe = document.getElementById('preview');
  iframe.src = base64;
}
```

### Exemple 4 : Fusion de documents existants

```tsx
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

async function mergeDocuments() {
  const generator = new PDFGenerator();
  
  // Charger des PDFs existants
  const pdf1 = await fetch('/document1.pdf').then(r => r.arrayBuffer());
  const pdf2 = await fetch('/document2.pdf').then(r => r.arrayBuffer());
  const pdf3 = await fetch('/document3.pdf').then(r => r.arrayBuffer());
  
  // Fusionner
  const merged = await generator.mergePdfs([pdf1, pdf2, pdf3]);
  
  // Télécharger le résultat
  const blob = new Blob([merged], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url);
}
```

### Exemple 5 : Génération avec configuration personnalisée

```tsx
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

async function generateCustomPDF(element: HTMLElement) {
  const generator = new PDFGenerator();
  
  const buffer = await generator.generatePage(element, {
    format: 'a3',
    orientation: 'landscape',
    scale: 2.5,
    margin: 15,
    quality: 0.95,
    containerWidth: 1200,
    containerPadding: 60,
    containerBackground: '#f9f9f9'
  });
  
  return buffer;
}
```

## Gestion des erreurs

| Situation | Erreur | Message |
|-----------|--------|---------|
| Aucune page fournie | `Error` | `No pages provided for PDF generation` |
| Échec de capture html2canvas | `Error` | `PDF generation failed: [détails]` |
| Échec de fusion des PDFs | `Error` | `PDF merge failed: [détails]` |
| Échec de conversion base64 | `Error` | `Base64 conversion failed: [détails]` |
| Conteneur DOM manquant | `Error` | Erreur spécifique à html2canvas |
| Fichier PDF corrompu | `Error` | Erreur spécifique à pdf-lib |

**Note** : Toutes les erreurs sont encapsulées avec des messages descriptifs et re-lancées pour permettre une gestion personnalisée.

## Intégration

### Avec le hook `usePdf`

La classe `PDFGenerator` est utilisée en interne par le hook `usePdf` :

```tsx
// Dans usePdf.ts
const generator = new PDFGeneratorClass();
await generator.downloadMultiplePages(pages, pdfOptions);
```

### Avec des composants React

La classe fonctionne avec n'importe quel contenu HTML, ce qui la rend compatible avec React, Vue, Angular ou du HTML pur :

```tsx
// React
const container = document.getElementById('react-root');
await generator.generatePage(container);

// HTML pur
const html = '<h1>Hello World</h1>';
const container = document.createElement('div');
container.innerHTML = html;
await generator.generatePage(container);
```

## Performance

| Aspect | Impact | Recommandation |
|--------|--------|----------------|
| **Rendu initial** | 200ms de délai pour la stabilisation DOM | Délai configurable via `RENDER_DELAY_MS` |
| **Capture html2canvas** | Dépend de la complexité du DOM | Utiliser `scale: 1.5` pour un bon équilibre |
| **Qualité d'image** | `scale` et `quality` impactent la taille du fichier | `scale: 2` et `quality: 0.8` pour documents professionnels |
| **Fusion de PDFs** | Mémoire proportionnelle au nombre de pages | Éviter les documents > 100 pages en une seule opération |
| **Conteneur DOM** | Créé et détruit à chaque opération | Aucune fuite mémoire (nettoyage automatique) |

### Optimisations recommandées

```tsx
// ✅ Bon : Réutiliser l'instance du générateur
const generator = new PDFGenerator();

// ✅ Bon : Ajuster scale en fonction de la qualité souhaitée
const qualitySettings = {
  draft: { scale: 1, quality: 0.6 },
  standard: { scale: 1.5, quality: 0.8 },
  high: { scale: 2.5, quality: 0.95 }
};

// ⚠️ Éviter : Créer une nouvelle instance à chaque opération
// ❌ Mauvaise pratique
await new PDFGenerator().generatePage(element1);
await new PDFGenerator().generatePage(element2);
```

## Compatibilité

| Version | Support | Notes |
|---------|---------|-------|
| React 18+ | ✅ Complet | Compatible avec createRoot |
| React 17 | ✅ Complet | Fonctionne avec le render standard |
| TypeScript 5.0+ | ✅ Complet | Types génériques supportés |
| TypeScript 4.x | ✅ Complet | Types compatibles |
| Node.js 18+ | ✅ Complet | ESM et CommonJS supportés |
| Chrome 90+ | ✅ Complet | html2canvas optimisé |
| Firefox 88+ | ✅ Complet | Support des CORS |
| Safari 14+ | ✅ Complet | Support des CORS |
| Edge 90+ | ✅ Complet | Compatible Chromium |

## Exemple complet

```tsx
import React, { useState, useRef } from 'react';
import { PDFGenerator, Page, Flex, Text } from '@andy-defer/react-pdf-builder';

interface InvoiceData {
  number: string;
  date: string;
  customer: string;
  items: Array<{ description: string; amount: number }>;
  total: number;
}

function InvoiceTemplate({ data }: { data: InvoiceData }) {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <Page data-page-id="page-1">
        <Flex direction="column" gap={4}>
          <Flex justify="between" align="center">
            <Text variant="h1">INVOICE</Text>
            <div style={{ textAlign: 'right' }}>
              <Text variant="small">N° {data.number}</Text>
              <Text variant="small">Date: {data.date}</Text>
            </div>
          </Flex>
          
          <div style={{ marginTop: '20px' }}>
            <Text variant="h3">Customer: {data.customer}</Text>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '8px' }}>{item.description}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    ${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid #000' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>TOTAL</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                  ${data.total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </Flex>
      </Page>
    </div>
  );
}

function InvoiceGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const generator = useRef(new PDFGenerator());

  const invoiceData: InvoiceData = {
    number: 'INV-2024-001',
    date: '2024-01-15',
    customer: 'Acme Corporation',
    items: [
      { description: 'Consulting services (10 hours)', amount: 1500 },
      { description: 'Design work (5 hours)', amount: 1000 },
      { description: 'Development (20 hours)', amount: 2000 },
    ],
    total: 4500,
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);

      // Récupérer les pages du conteneur
      const container = containerRef.current;
      if (!container) {
        throw new Error('Container not found');
      }

      const pages = Array.from(container.querySelectorAll('[data-page-id]'));
      
      if (pages.length === 0) {
        throw new Error('No pages found');
      }

      await generator.current.downloadMultiplePages(pages as HTMLElement[], {
        filename: `facture-${invoiceData.number}.pdf`,
        format: 'a4',
        orientation: 'portrait',
        scale: 2,
        quality: 0.9,
        margin: 15,
      });

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Invoice Generator</h1>
        <button
          onClick={handleDownload}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded border border-red-300">
          Error: {error}
        </div>
      )}

      <div ref={containerRef} className="bg-white shadow-lg rounded-lg">
        <InvoiceTemplate data={invoiceData} />
      </div>
    </div>
  );
}

export default InvoiceGenerator;
```

## Voir aussi

- `usePdf` - Hook React pour une génération PDF déclarative
- `PDFProvider` - Context Provider pour la configuration globale
- `Page` - Composant de marquage des pages pour documents multi-pages
- `html2canvas` - Bibliothèque de capture DOM
- `jsPDF` - Bibliothèque de génération PDF côté client
- `pdf-lib` - Bibliothèque de manipulation PDF