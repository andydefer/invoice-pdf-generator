react-pdf-builder/
├── src/
│   ├── index.ts                      # Point d'entrée principal
│   ├── components/
│   │   ├── PDFGenerator.tsx          # Conteneur principal
│   │   ├── Flex.tsx                  # Layout flex
│   │   ├── Grid.tsx                  # Layout grid
│   │   ├── Box.tsx                   # Container générique
│   │   ├── Text.tsx                  # Typographie
│   │   ├── Heading.tsx               # Titres
│   │   ├── Image.tsx                 # Images
│   │   ├── Table.tsx                 # Tableau
│   │   ├── TableRow.tsx              # Ligne de tableau
│   │   ├── TableCell.tsx             # Cellule de tableau
│   │   ├── Badge.tsx                 # Badge/Étiquette
│   │   ├── Divider.tsx               # Séparateur
│   │   ├── TotalBox.tsx              # Bloc des totaux
│   │   └── index.ts                  # Export de tous les composants
│   ├── hooks/
│   │   ├── usePDF.ts                 # Hook principal
│   │   └── index.ts   ok               # Export des hooks
│   ├── types/
│   │   ├── components.ts   ok          # Types des composants
│   │   ├── pdf.ts    ok                # Types PDF
│   │   └── index.ts ok                 # Export des types
│   ├── utils/
│   │   ├── pdfGenerator.ts ok          # Génération PDF
│   │   ├── renderer.ts ok              # Rendu HTML
│   │   └── index.ts ok                 # Export des utils
│   ├── context/
│   │   ├── PDFContext.tsx ok           # Context principal
│   │   └── index.ts ok                # Export du context
│   └── styles/
│       └── tailwind.css ok             # Styles Tailwind de base
├── dist/                             # Build généré
├── examples/
│   ├── basic/
│   │   └── App.tsx                   # Exemple simple
│   └── invoice/
│       └── App.tsx                   # Exemple facture
├── package.json ok
├── tsconfig.json ok
├── tailwind.config.js ok                # Config Tailwind
├── vite.config.ts    ok                # Config Vite
└── README.md