## 📄 Références Techniques des Composants

---

# Badge - Référence Technique

## Description

Composant d'étiquette visuelle pour afficher des statuts, des catégories ou des informations contextuelles.

## Rôle principal

Fournir une indication visuelle rapide avec des variantes de couleurs prédéfinies et des tailles ajustables.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu du badge |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'destructive' \| 'info' \| 'outline' \| 'ghost'` | ❌ | `'primary'` | Couleur du badge |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | ❌ | `'md'` | Taille du badge |
| `rounded` | `boolean` | ❌ | `false` | Coins arrondis |
| `pill` | `boolean` | ❌ | `false` | Style pilule (alias de rounded) |
| `subtle` | `boolean` | ❌ | `false` | Version discrète avec fond transparent |
| `removable` | `boolean` | ❌ | `false` | Afficher un bouton de suppression |
| `onRemove` | `() => void` | ❌ | - | Callback lors de la suppression |
| `icon` | `ReactNode` | ❌ | - | Icône à afficher |
| `iconPosition` | `'left' \| 'right'` | ❌ | `'left'` | Position de l'icône |
| `animate` | `boolean` | ❌ | `false` | Animation au survol |
| `dot` | `boolean` | ❌ | `false` | Afficher un point |
| `dotColor` | `string` | ❌ | - | Couleur du point |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Badge de statut
```tsx
<Badge variant="success">Payée</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="destructive">En retard</Badge>
```

### Exemple 2 : Badge avec icône
```tsx
<Badge variant="primary" icon={<Bell size={12} />}>
  Notifications
</Badge>
```

### Exemple 3 : Badge supprimable
```tsx
<Badge variant="primary" removable onRemove={() => alert('Supprimé !')}>
  Filtre actif
</Badge>
```

### Exemple 4 : Badge avec point
```tsx
<Badge variant="success" dot>En ligne</Badge>
<Badge variant="warning" dot dotColor="orange-500">Absent</Badge>
```

### Exemple 5 : Version subtle
```tsx
<Badge variant="primary" subtle>Primary</Badge>
<Badge variant="success" subtle>Success</Badge>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Text` - Composant de texte
- `Box` - Conteneur générique

---

# Barcode - Référence Technique

## Description

Composant de génération de codes-barres pour les documents PDF.

## Rôle principal

Permettre l'intégration de codes-barres dans les factures et documents générés.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `value` | `string` | ✅ | - | Valeur à encoder |
| `format` | `'CODE128' \| 'CODE39' \| 'EAN13' \| 'EAN8' \| 'UPC' \| 'ITF' \| 'ITF14' \| 'MSI' \| 'CODABAR' \| 'PHARMACODE'` | ❌ | `'CODE128'` | Format du code-barres |
| `width` | `number` | ❌ | `2` | Largeur des barres |
| `height` | `number` | ❌ | `100` | Hauteur du code-barres |
| `displayValue` | `boolean` | ❌ | `true` | Afficher la valeur sous le code |
| `fontSize` | `number` | ❌ | `16` | Taille de police de la valeur |
| `background` | `string` | ❌ | `'#ffffff'` | Couleur de fond |
| `lineColor` | `string` | ❌ | `'#000000'` | Couleur des barres |

## Exemples d'utilisation

### Exemple 1 : Code-barres simple
```tsx
<Barcode value="INV-2026-001" format="CODE128" />
```

### Exemple 2 : Code-barres EAN-13
```tsx
<Barcode value="123456789012" format="EAN13" height={60} />
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `QRCode` - Génération de QR code

---

# Box - Référence Technique

## Description

Conteneur générique avec options de style intégrées (padding, margin, bordure, ombre).

## Rôle principal

Fournir une boîte de base stylisée avec des classes Tailwind.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu de la boîte |
| `padding` | `number` | ❌ | `4` | Padding interne (1-12) |
| `margin` | `number` | ❌ | `0` | Marge externe (1-12) |
| `border` | `boolean` | ❌ | `false` | Ajouter une bordure |
| `rounded` | `boolean` | ❌ | `false` | Coins arrondis |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | ❌ | `'none'` | Ombrage |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Boîte avec bordure
```tsx
<Box border rounded padding={4}>
  <Text>Contenu avec bordure</Text>
</Box>
```

### Exemple 2 : Boîte avec ombre
```tsx
<Box shadow="md" padding={6} className="bg-white">
  <Text>Carte avec ombre</Text>
</Box>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Flex` - Disposition en ligne/colonne
- `Grid` - Disposition en grille

---

# Divider - Référence Technique

## Description

Séparateur visuel pour structurer le contenu.

## Rôle principal

Créer une séparation horizontale entre les sections d'un document.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | ❌ | `'solid'` | Style de la ligne |
| `size` | `number` | ❌ | `2` | Épaisseur en pixels |
| `color` | `string` | ❌ | `'gray-300'` | Couleur Tailwind |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Séparateur simple
```tsx
<Divider />
```

### Exemple 2 : Séparateur en pointillés
```tsx
<Divider variant="dashed" color="blue-200" />
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

---

# Flex - Référence Technique

## Description

Composant de mise en page flexible (flexbox) avec options d'alignement et d'espacement.

## Rôle principal

Fournir une interface déclarative pour les layouts flexbox avec des props typées.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Éléments à disposer |
| `direction` | `'row' \| 'column'` | ❌ | `'row'` | Direction du flux |
| `gap` | `number` | ❌ | `4` | Espace entre les éléments |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | ❌ | `'stretch'` | Alignement vertical |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | ❌ | `'start'` | Alignement horizontal |
| `wrap` | `boolean` | ❌ | `false` | Retour à la ligne |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Disposition en ligne
```tsx
<Flex direction="row" gap={4}>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Flex>
```

### Exemple 2 : Disposition en colonne centrée
```tsx
<Flex direction="column" align="center" justify="center" gap={2}>
  <Text>Centered content</Text>
  <Text>Another line</Text>
</Flex>
```

### Exemple 3 : Espacement entre éléments
```tsx
<Flex justify="between" align="center">
  <div>Gauche</div>
  <div>Droite</div>
</Flex>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Grid` - Mise en page en grille
- `Box` - Conteneur générique

---

# Grid - Référence Technique

## Description

Composant de mise en page en grille avec colonnes configurables.

## Rôle principal

Organiser le contenu en grille avec un nombre de colonnes défini.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Éléments à disposer |
| `columns` | `number` | ❌ | `2` | Nombre de colonnes (1-12) |
| `gap` | `number` | ❌ | `4` | Espace entre les éléments |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Grille à 2 colonnes
```tsx
<Grid columns={2} gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Grid>
```

### Exemple 2 : Grille à 3 colonnes
```tsx
<Grid columns={3} gap={6}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Grid>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Flex` - Disposition en ligne/colonne
- `Box` - Conteneur générique

---

# Heading - Référence Technique

## Description

Composant de titre avec niveaux hiérarchiques (h1 à h6).

## Rôle principal

Fournir des titres structurés avec des styles cohérents.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu du titre |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | ❌ | `1` | Niveau hiérarchique |
| `color` | `'primary' \| 'secondary' \| 'muted'` | ❌ | `'primary'` | Couleur du texte |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Titre principal
```tsx
<Heading level={1}>Titre Principal</Heading>
```

### Exemple 2 : Sous-titre
```tsx
<Heading level={2} color="secondary">Sous-titre</Heading>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Text` - Texte générique

---

# Image - Référence Technique

## Description

Composant d'image avec gestion d'erreur et fallback.

## Rôle principal

Afficher des images avec options de dimensionnement et de fallback en cas d'erreur.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `src` | `string` | ✅ | - | URL de l'image |
| `alt` | `string` | ❌ | `''` | Texte alternatif |
| `width` | `number` | ❌ | - | Largeur en pixels |
| `height` | `number` | ❌ | - | Hauteur en pixels |
| `fit` | `'contain' \| 'cover' \| 'fill' \| 'none'` | ❌ | `'contain'` | Mode de redimensionnement |
| `rounded` | `boolean \| 'full'` | ❌ | `false` | Coins arrondis |
| `fallback` | `string` | ❌ | - | URL de remplacement |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Image simple
```tsx
<Image src="/logo.png" alt="Logo" width={150} height={50} />
```

### Exemple 2 : Image avec fallback
```tsx
<Image 
  src="/missing.png" 
  alt="Logo" 
  fallback="https://via.placeholder.com/150x50"
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

---

# Page - Référence Technique

## Description

Composant représentant une page dans un document multi-pages.

## Rôle principal

Délimiter les pages dans un document PDF, avec un identifiant unique pour le suivi.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu de la page |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |
| `data-page-id` | `string` | ❌ | `auto-généré` | Identifiant unique (pour la détection) |

## Exemples d'utilisation

### Exemple 1 : Page simple
```tsx
<Page>
  <Text>Contenu de la page 1</Text>
</Page>
```

### Exemple 2 : Multi-pages
```tsx
<Page data-page-id="page-1">
  <Text>Page 1</Text>
</Page>
<Page data-page-id="page-2">
  <Text>Page 2</Text>
</Page>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `usePdf` - Hook de génération

---

# QRCode - Référence Technique

## Description

Composant de génération de QR codes pour les documents.

## Rôle principal

Permettre l'intégration de QR codes dans les factures et documents.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `value` | `string` | ✅ | - | Données à encoder |
| `size` | `number` | ❌ | `128` | Taille en pixels |
| `bgColor` | `string` | ❌ | `'#ffffff'` | Couleur de fond |
| `fgColor` | `string` | ❌ | `'#000000'` | Couleur du QR code |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | ❌ | `'M'` | Niveau de correction d'erreur |
| `includeMargin` | `boolean` | ❌ | `false` | Inclure la marge |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : QR code simple
```tsx
<QRCode value="https://example.com/invoice/123" />
```

### Exemple 2 : QR code personnalisé
```tsx
<QRCode 
  value="https://example.com" 
  size={200} 
  fgColor="#4338ca" 
  level="H" 
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Barcode` - Génération de code-barres

---

# Table - Référence Technique

## Description

Composant de tableau avec colonnes configurables et options de style.

## Rôle principal

Afficher des données tabulaires avec des colonnes définies.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `columns` | `Column[]` | ✅ | - | Définition des colonnes |
| `data` | `Record<string, any>[]` | ✅ | - | Données du tableau |
| `bordered` | `boolean` | ❌ | `false` | Ajouter des bordures |
| `striped` | `boolean` | ❌ | `false` | Alternance de couleurs |
| `hoverable` | `boolean` | ❌ | `false` | Effet au survol |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

### Type Column

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `key` | `string` | ✅ | Clé dans les données |
| `label` | `string` | ✅ | En-tête de colonne |
| `width` | `string` | ❌ | Largeur (ex: '50%') |
| `align` | `'left' \| 'center' \| 'right'` | ❌ | Alignement du texte |

## Exemples d'utilisation

### Exemple 1 : Tableau simple
```tsx
<Table
  columns={[
    { key: 'name', label: 'Nom' },
    { key: 'price', label: 'Prix', align: 'right' },
  ]}
  data={[
    { name: 'Produit A', price: 100 },
    { name: 'Produit B', price: 200 },
  ]}
/>
```

### Exemple 2 : Tableau avec style
```tsx
<Table
  columns={[
    { key: 'description', label: 'Description', width: '50%' },
    { key: 'qty', label: 'Qté', align: 'center' },
    { key: 'total', label: 'Total', align: 'right' },
  ]}
  data={items}
  bordered
  striped
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `TableRow` - Ligne de tableau
- `TableCell` - Cellule de tableau

---

# TableCell - Référence Technique

## Description

Cellule de tableau avec options d'alignement.

## Rôle principal

Afficher le contenu d'une cellule avec alignement configurable.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu de la cellule |
| `align` | `'left' \| 'center' \| 'right'` | ❌ | `'left'` | Alignement du texte |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

```tsx
<TableRow>
  <TableCell>Texte à gauche</TableCell>
  <TableCell align="center">Centré</TableCell>
  <TableCell align="right">Droite</TableCell>
</TableRow>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Table` - Tableau complet
- `TableRow` - Ligne de tableau

---

# TableRow - Référence Technique

## Description

Ligne de tableau pour organiser les cellules.

## Rôle principal

Grouper des cellules dans une ligne de tableau.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Cellules de la ligne |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

```tsx
<TableRow className="bg-gray-50">
  <TableCell>Donnée 1</TableCell>
  <TableCell>Donnée 2</TableCell>
</TableRow>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Table` - Tableau complet
- `TableCell` - Cellule de tableau

---

# Text - Référence Technique

## Description

Composant de texte avec variantes de style et couleurs.

## Rôle principal

Afficher du texte avec des styles cohérents.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu du texte |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'body' \| 'small' \| 'caption'` | ❌ | `'body'` | Style typographique |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'destructive' \| 'success' \| 'warning'` | ❌ | `'primary'` | Couleur du texte |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | ❌ | `'left'` | Alignement |
| `bold` | `boolean` | ❌ | `false` | Texte en gras |
| `truncate` | `boolean` | ❌ | `false` | Tronquer le texte |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Texte simple
```tsx
<Text>Texte normal</Text>
```

### Exemple 2 : Titre avec couleur
```tsx
<Text variant="h2" color="destructive">Titre en rouge</Text>
```

### Exemple 3 : Texte centré
```tsx
<Text align="center" color="muted">Texte centré gris</Text>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Heading` - Titres hiérarchiques
- `Badge` - Étiquettes

---

# TotalBox - Référence Technique

## Description

Bloc d'affichage des totaux pour les factures.

## Rôle principal

Afficher les montants (sous-total, remise, TVA, total) dans un format structuré.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `subtotal` | `number` | ✅ | - | Montant hors taxe |
| `discount` | `number` | ❌ | `0` | Remise en euros |
| `tax` | `number` | ❌ | `0` | TVA en pourcentage |
| `shipping` | `number` | ❌ | `0` | Frais de livraison |
| `total` | `number` | ✅ | - | Montant total TTC |
| `currency` | `string` | ❌ | `'€'` | Symbole de la devise |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Total simple
```tsx
<TotalBox subtotal={850} discount={50} tax={20} total={960} />
```

### Exemple 2 : Avec frais de livraison
```tsx
<TotalBox 
  subtotal={850} 
  discount={50} 
  tax={20} 
  shipping={15} 
  total={975} 
  currency="$"
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Table` - Tableau des articles
- `Text` - Affichage du texte

---

# usePdf - Référence Technique (Hook)

## Description

Hook React pour générer des documents PDF à partir de composants React.

## Rôle principal

Fournir une interface déclarative pour la génération de PDF, avec gestion automatique du rendu et du cycle de vie.

## API

### Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `component` | `ReactElement` | ✅ | Composant React à convertir en PDF |

### Retour (UsePdfReturn)

| Propriété | Type | Description |
|-----------|------|-------------|
| `download` | `(options?: Partial<PDFOptions>) => Promise<void>` | Télécharge le PDF |
| `generate` | `(options?: Partial<PDFOptions>) => Promise<string>` | Génère le PDF en base64 |
| `loading` | `boolean` | Indique si une génération est en cours |
| `error` | `string \| null` | Message d'erreur ou null |
| `config` | `PdfConfig` | Configuration actuelle |
| `updateConfig` | `(newConfig: PartialPdfConfig) => void` | Met à jour la configuration |
| `cleanup` | `() => void` | Nettoie le conteneur DOM |

### Options PDF (PDFOptions)

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `filename` | `string` | `'document.pdf'` | Nom du fichier PDF |
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal'` | `'a3'` | Format du papier |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Orientation |
| `scale` | `number` | `1.5` | Qualité du rendu (1-3) |
| `quality` | `number` | `0.8` | Qualité JPEG (0.1-1.0) |
| `margin` | `number` | `20` | Marge en mm |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |
| `containerWidth` | `number` | `900` | Largeur du conteneur (px) |
| `containerPadding` | `number` | `10` | Padding du conteneur (px) |
| `containerBackground` | `string` | `'#ffffff'` | Couleur de fond du conteneur |

## Exemples d'utilisation

### Exemple 1 : Téléchargement simple
```tsx
import { usePdf, Page, Text } from '@andy-defer/react-pdf-builder';

function InvoicePage() {
  const { download, loading } = usePdf(
    <Page>
      <Text variant="h1">Facture #001</Text>
      <Text>Contenu de la facture...</Text>
    </Page>
  );

  return (
    <button 
      onClick={() => download({ filename: 'facture.pdf' })}
      disabled={loading}
    >
      {loading ? 'Génération...' : '📥 Télécharger'}
    </button>
  );
}
```

### Exemple 2 : Génération base64 pour prévisualisation
```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';
import { useState } from 'react';

function ReportPage() {
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const { generate, loading } = usePdf(<Report data={reportData} />);

  const handlePreview = async () => {
    const base64 = await generate({ 
      format: 'a4',
      orientation: 'landscape',
      scale: 2
    });
    setPdfPreview(base64);
  };

  return (
    <div>
      <button onClick={handlePreview} disabled={loading}>
        {loading ? 'Génération...' : 'Aperçu'}
      </button>
      {pdfPreview && (
        <iframe src={pdfPreview} style={{ width: '100%', height: '600px' }} />
      )}
    </div>
  );
}
```

### Exemple 3 : Configuration dynamique
```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';

function SettingsPage() {
  const { download, config, updateConfig } = usePdf(<ReportComponent />);

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
        Télécharger
      </button>
    </div>
  );
}
```

### Exemple 4 : Nettoyage automatique
```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';
import { useEffect } from 'react';

function PdfGenerator() {
  const { download, cleanup } = usePdf(<MyComponent />);

  useEffect(() => {
    // Nettoyage automatique à la destruction du composant
    return () => cleanup();
  }, [cleanup]);

  return <button onClick={download}>Download</button>;
}
```

### Exemple 5 : Gestion d'erreur
```tsx
import { usePdf } from '@andy-defer/react-pdf-builder';
import { useState } from 'react';

function MyComponent() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { download, loading, error } = usePdf(<MyDocument />);

  const handleDownload = async () => {
    try {
      setErrorMessage(null);
      await download({ filename: 'document.pdf' });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      <button onClick={handleDownload} disabled={loading}>
        {loading ? '⏳ Génération...' : '📥 Télécharger'}
      </button>
    </div>
  );
}
```

## Gestion des erreurs

| Situation | Erreur | Message |
|-----------|--------|---------|
| Aucune page trouvée | `Error` | `No pages found to generate PDF` |
| Conteneur non trouvé | `Error` | `Container not ready. Call regenerate() first.` |
| Échec de génération | `Error` | `PDF generation failed: [détails]` |
| Erreur inconnue | `Error` | `Unknown error` |

## Performance

| Aspect | Impact | Recommandation |
|--------|--------|----------------|
| **Rendu initial** | 300ms de délai pour la stabilisation | Délai configurable |
| **Mémoire** | Le conteneur DOM est conservé | Appeler `cleanup()` ou laisser le hook gérer |
| **Qualité** | `scale` et `quality` impactent le poids | Utiliser `scale: 1.5` pour l'usage général |
| **Re-rendus** | Le composant est re-rendu à chaque appel | Utiliser `React.memo` sur les composants lourds |

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet (createRoot) |
| React 17 | ✅ Complet |
| TypeScript 5+ | ✅ Complet |
| TypeScript 4.x | ✅ Complet |
| Chrome 60+ | ✅ Complet |
| Firefox 55+ | ✅ Complet |
| Safari 12+ | ✅ Complet |
| Edge 79+ | ✅ Complet |

## Voir aussi
- `Page` - Composant de page
- `PDFGenerator` - Classe utilitaire sous-jacente
- `PDFOptions` - Options de génération
- `PdfConfig` - Configuration du hook