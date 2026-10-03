# BYSSUS TENEBRARUM — Site V2

Version pensée pour GitHub Pages, responsive et très simple à maintenir.

## Ce qui change
- logo agrandi dans le header
- navigation desktop + menu mobile
- boutique complète
- 7 catégories × 10 images PNG = 70 emplacements photo
- aucun changement HTML nécessaire pour remplacer les photos
- configurateur sur-mesure en 10 étapes
- panier localStorage
- pages produit automatiques
- responsive mobile / tablette / desktop

## Gestion ultra-simple des photos

Remplacez simplement les fichiers PNG dans :

- `assets/images/products/colliers/`
- `assets/images/products/manchettes/`
- `assets/images/products/chaines-taille/`
- `assets/images/products/parures-buste/`
- `assets/images/products/boucles-oreilles/`
- `assets/images/products/ensembles-couple/`
- `assets/images/products/bijoux-corps/`

Chaque dossier contient exactement 10 PNG numérotés `01` à `10`.

Exemple :
`assets/images/products/colliers/colliers-01.png`

Pour changer la photo du modèle 01, remplacez ce fichier par votre vraie photo PNG en conservant exactement le même nom.

## Modifier un produit

Éditez uniquement `data/products.json` pour :
- nom
- prix
- pierre
- description
- image
- catégorie

## Ajouter ou modifier une catégorie

Le fichier `data/catalog.json` contient les catégories principales.

## Format recommandé des images

PNG vertical, ratio 4:5.
Idéal : `1200 × 1500 px`.

## Configurateur sur-mesure

`creation.html` + `js/builder.js`

10 étapes :
1. Type de bijou
2. Univers esthétique
3. Pierre
4. Fil / couleurs
5. Métal
6. Intention
7. Taille
8. Fermeture
9. Niveau de finition
10. Mesures, message, budget et image PNG de référence

La photo de référence est prévisualisée localement. Pour transmettre réellement le fichier à l’artisane, connecter ensuite un service de formulaire / stockage.

## Paiement

Le panier est fonctionnel côté navigateur.
Le bouton final doit être connecté à Stripe Checkout, PayPal, Shopify, WooCommerce ou autre solution de paiement.

## GitHub Pages

Déposer tout le contenu du dossier à la racine du dépôt.
Puis `Settings > Pages > Deploy from a branch > main / root`.

