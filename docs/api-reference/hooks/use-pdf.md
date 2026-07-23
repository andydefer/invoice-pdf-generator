Absolument. Voici la documentation technique complète pour le hook `usePdf`.

---

# usePdf - Référence Technique

## Description

Hook personnalisé React qui permet de générer des documents PDF à partir de composants React. Il rend le composant fourni dans un conteneur DOM caché, le capture via `html2canvas`, et produit un PDF téléchargeable ou encodé en base64.

## Hiérarchie / Implémentations

- **Dépendances** : `react-dom/client` (createRoot), `html2canvas`, `jsPDF`, `pdf-lib`
- **Consomme** : `PDFGenerator` depuis `../utils/pdfGenerator`
- **Exporté depuis** : `src/hooks/index.ts`
- **Type** : Custom Hook React (Stateful)

## Rôle principal

Fournir une interface déclarative et réutilisable pour la génération de PDF dans une application React. Le hook gère automatiquement le cycle de vie du rendu, la capture du DOM, et la génération du PDF, tout en exposant des méthodes simples pour les opérations courantes (téléchargement, génération base64).

## API / Props

### Input

| Paramètre | Type | Requis | Défaut | Description |
|-----------|------|--------|--------|-------------|
| `component` | `ReactElement` | ✅ | - | Composant React à rendre et convertir en PDF |

### Return (UsePdfReturn)

| Propriété | Type | Description |
|-----------|------|-------------|
| `download` | `(options?: Partial<PDFOptions>) => Promise<void>` | Télécharge le PDF directement |
| `generate` | `(options?: Partial<PDFOptions>) => Promise<string>` | Génère le PDF en base64 |
| `loading` | `boolean` | Indique si une génération est en cours |
| `error` | `string \| null` | Message d'erreur ou null |
| `config` | `PdfConfig` | Configuration actuelle du PDF |
| `updateConfig` | `(newConfig: PartialPdfConfig) => void` | Met à jour la configuration |
| `cleanup` | `() => void` | Nettoie le conteneur DOM et le root React |

### Options PDF (PDFOptions)

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `filename` | `string` | `'document.pdf'` | Nom du fichier pour le téléchargement |
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal'` | `'a3'` | Format de la page |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Orientation de la page |
| `scale` | `number` | `1.5` | Facteur d'échelle pour la qualité |
| `margin` | `number` | `20` | Marge en mm |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `quality` | `number` (0.1 à 1.0) | `0.8` | Qualité d'image JPEG |
| `containerWidth` | `number` | `900` | Largeur du conteneur en px |
| `containerPadding` | `number` | `10` | Padding du conteneur en px |
| `containerBackground` | `string` | `'#ffffff'` | Fond du conteneur |

### Configuration par défaut (PdfConfig)

```typescript
{
  format: 'a3',
  orientation: 'portrait',
  scale: 2,
  margin: 20,
  containerWidth: 900,
  containerPadding: 10,
  containerBackground: '#ffffff',
}
```

## Hooks utilisés

| Hook | Rôle |
|------|------|
| `useState` | Gère `config`, `loading`, `error` |
| `useRef` | Stocke les références du conteneur DOM et du root React |
| `useCallback` | Mémoïse les fonctions pour éviter les re-rendus inutiles |

## Exemples d'utilisation

### Exemple 1 : Téléchargement simple

```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';

function InvoicePage() {
  const invoiceData = { id: 123, total: 1500, items: [...] };
  const { download, loading } = usePdf(
    <Invoice data={invoiceData} />
  );

  return (
    <button 
      onClick={() => download({ filename: 'facture-123.pdf' })}
      disabled={loading}
    >
      {loading ? 'Génération...' : 'Télécharger la facture'}
    </button>
  );
}
```

### Exemple 2 : Génération base64 avec prévisualisation

```tsx
import { useState } from 'react';
import { usePdf } from '@andy-defer/react-pdf-builder';

function ReportPage() {
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const { generate, loading } = usePdf(
    <AnnualReport data={reportData} />
  );

  const handlePreview = async () => {
    const base64 = await generate({ 
      format: 'a4',
      orientation: 'landscape' 
    });
    setPdfPreview(base64);
  };

  return (
    <div>
      <button onClick={handlePreview} disabled={loading}>
        Générer l'aperçu
      </button>
      {pdfPreview && (
        <iframe
          src={pdfPreview}
          style={{ width: '100%', height: '600px' }}
        />
      )}
    </div>
  );
}
```

### Exemple 3 : Configuration dynamique avec `updateConfig`

```tsx
function SettingsPage() {
  const { download, config, updateConfig } = usePdf(
    <ReportComponent data={data} />
  );

  const handleSettingsChange = (format: 'a4' | 'a3') => {
    updateConfig({ 
      format,
      orientation: format === 'a3' ? 'landscape' : 'portrait'
    });
  };

  return (
    <div>
      <select 
        value={config.format}
        onChange={(e) => handleSettingsChange(e.target.value as any)}
      >
        <option value="a4">A4</option>
        <option value="a3">A3</option>
      </select>
      <button onClick={() => download()}>
        Télécharger avec les paramètres actuels
      </button>
    </div>
  );
}
```

### Exemple 4 : Nettoyage manuel dans un useEffect

```tsx
function PdfGenerator() {
  const { download, cleanup } = usePdf(<MyComponent />);

  useEffect(() => {
    // Le hook gère le nettoyage automatiquement,
    // mais on peut aussi le faire manuellement
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return <button onClick={download}>Download</button>;
}
```

## Gestion des erreurs

| Situation | Erreur | Message |
|-----------|--------|---------|
| Aucune page trouvée | `Error` | `No pages found to generate PDF` |
| Conteneur non trouvé | `Error` | `Container not found` |
| Erreur html2canvas | `Error` | `PDF generation failed: [détails]` |
| Erreur de fusion PDF | `Error` | `PDF merge failed: [détails]` |
| Erreur de conversion base64 | `Error` | `Base64 conversion failed: [détails]` |
| Erreur inconnue | `Error` | `Unknown error` |

**Note** : Toutes les erreurs sont capturées et accessibles via la propriété `error` du hook. Elles sont également re-lancées pour permettre une gestion personnalisée.

## Intégration

### Avec `PDFProvider`

Le hook `usePdf` fonctionne de manière autonome mais peut être combiné avec `PDFProvider` pour une gestion centralisée de la configuration :

```tsx
import { PDFProvider, usePdf } from '@andy-defer/react-pdf-builder';

function App() {
  return (
    <PDFProvider defaultConfig={{ format: 'a4', orientation: 'portrait' }}>
      <PdfGenerator />
    </PDFProvider>
  );
}
```

### Avec `Page` et les attributs `data-page-id`

Le hook détecte automatiquement les pages marquées avec l'attribut `data-page-id`. Utilisez le composant `Page` pour gérer les documents multi-pages :

```tsx
import { Page, usePdf } from '@andy-defer/react-pdf-builder';

function MultiPageDocument() {
  return (
    <>
      <Page data-page-id="page-1">
        <h1>Page 1</h1>
        <p>Contenu de la page 1</p>
      </Page>
      <Page data-page-id="page-2">
        <h1>Page 2</h1>
        <p>Contenu de la page 2</p>
      </Page>
    </>
  );
}
```

## Performance

| Aspect | Impact | Recommandation |
|--------|--------|----------------|
| **Rendu initial** | Le composant est rendu dans un conteneur caché | Le rendu est efficace et n'affecte pas l'UI visible |
| **Re-rendus** | Le hook re-rend le composant à chaque opération | Utiliser `React.memo` sur les composants lourds |
| **Mémoire** | Le conteneur DOM est conservé en mémoire | Appeler `cleanup()` ou laisser le hook gérer le nettoyage |
| **Qualité vs Performance** | `scale` et `quality` impactent la génération | Utiliser `scale: 1.5` pour un bon équilibre |
| **Délai d'attente** | `waitForRender` (300ms) | Nécessaire pour la stabilité de html2canvas |

### Optimisations recommandées

```tsx
// ✅ Bon : Composant mémoïsé
const Invoice = React.memo(({ data }: InvoiceProps) => {
  return <div>...</div>;
});

// ✅ Bon : Utiliser cleanup pour libérer la mémoire
useEffect(() => {
  return () => cleanup();
}, [cleanup]);

// ⚠️ Éviter : Composant non stabilisé
// Chaque re-rendu de InvoicePage recrée le composant
function InvoicePage() {
  const { download } = usePdf(<Invoice data={data} />);
  // ❌ Le composant est recréé à chaque rendu
}
```

## Compatibilité

| Version | Support | Notes |
|---------|---------|-------|
| React 18+ | ✅ Complet | Utilise `createRoot` |
| React 17 | ✅ Complet | Utilise `react-dom` standard |
| React 16 | ⚠️ Partiel | `createRoot` non disponible |
| TypeScript 5.0+ | ✅ Complet | Types génériques supportés |
| TypeScript 4.x | ✅ Complet | Types compatibles |
| Node.js 18+ | ✅ Complet | ESM et CommonJS supportés |
| Navigation de bureau | ✅ Complet | Chrome, Firefox, Safari, Edge |
| Navigation mobile | ✅ Complet | Safari iOS, Chrome Android |

## Exemple complet

```tsx
import React, { useState, useEffect } from 'react';
import { usePdf, Page, Flex, Text } from '@andy-defer/react-pdf-builder';

// ============================================================================
// COMPOSANT DE FACTURE
// ============================================================================

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceData {
  number: string;
  date: string;
  customer: string;
  items: InvoiceItem[];
  total: number;
}

const InvoiceTemplate = React.memo(({ data }: { data: InvoiceData }) => {
  const subtotal = data.items.reduce((sum, item) => 
    sum + item.quantity * item.unitPrice, 0
  );

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <Page data-page-id="page-1">
        {/* En-tête */}
        <Flex justify="between" align="center" style={{ marginBottom: '20px' }}>
          <Text variant="h1" className="font-bold">FACTURE</Text>
          <div style={{ textAlign: 'right' }}>
            <Text variant="small">N° {data.number}</Text>
            <Text variant="small">Date : {data.date}</Text>
          </div>
        </Flex>

        {/* Client */}
        <div style={{ marginBottom: '20px' }}>
          <Text variant="h3">Client : {data.customer}</Text>
        </div>

        {/* Lignes */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Qté</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Prix unit.</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '8px' }}>{item.description}</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  {item.quantity}
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  {item.unitPrice.toFixed(2)} €
                </td>
                <td style={{ padding: '8px', textAlign: 'right' }}>
                  {(item.quantity * item.unitPrice).toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #000' }}>
              <td colSpan={3} style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                TOTAL
              </td>
              <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                {data.total.toFixed(2)} €
              </td>
            </tr>
          </tfoot>
        </table>
      </Page>
    </div>
  );
});

// ============================================================================
// COMPOSANT PARENT AVEC usePdf
// ============================================================================

function InvoiceGenerator() {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);

  const invoiceData: InvoiceData = {
    number: 'INV-2024-001',
    date: '2024-01-15',
    customer: 'Acme Corporation',
    items: [
      { description: 'Consulting services', quantity: 10, unitPrice: 150 },
      { description: 'Design work', quantity: 5, unitPrice: 200 },
      { description: 'Development', quantity: 20, unitPrice: 100 },
    ],
    total: 4500,
  };

  const { 
    download, 
    generate, 
    loading, 
    error,
    config,
    updateConfig,
    cleanup 
  } = usePdf(<InvoiceTemplate data={invoiceData} />);

  // Nettoyage automatique
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const handleGeneratePreview = async () => {
    try {
      const base64 = await generate({ format: 'a4' });
      setPdfBase64(base64);
    } catch (err) {
      console.error('Failed to generate preview:', err);
    }
  };

  const handleDownload = async () => {
    try {
      await download({ 
        filename: `facture-${invoiceData.number}.pdf`,
        format: 'a4',
        quality: 0.9
      });
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  if (error) {
    return <div className="text-red-600">Erreur : {error}</div>;
  }

  return (
    <div className="space-y-4 p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Générateur de Factures</h1>

      <div className="flex gap-4">
        <button
          onClick={handleGeneratePreview}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Génération...' : 'Aperçu'}
        </button>

        <button
          onClick={handleDownload}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Téléchargement...' : 'Télécharger'}
        </button>

        <button
          onClick={() => updateConfig({ 
            orientation: config.orientation === 'portrait' ? 'landscape' : 'portrait' 
          })}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Basculer orientation ({config.orientation})
        </button>
      </div>

      {pdfBase64 && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <iframe
            src={pdfBase64}
            title="PDF Preview"
            className="w-full h-[800px]"
          />
        </div>
      )}
    </div>
  );
}

export default InvoiceGenerator;
```

## Voir aussi

- `PDFGenerator` - Classe utilitaire sous-jacente pour la génération PDF
- `PDFProvider` - Context Provider pour la configuration globale
- `Page` - Composant pour le marquage des pages dans les documents multi-pages
- `usePDFContext` - Hook pour accéder au contexte PDF
- `Flex` - Composant de mise en page recommandé pour les templates PDF
- `Text` - Composant typographique pour les templates PDF