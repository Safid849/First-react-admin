# Réponses aux Questions Théoriques et Pratiques - Projet `employes-admin`

## Exercice 1 - Configuration de l'application

### Question 1.1: Que représente le dataProvider dans React-Admin ? Quel est son rôle ?
Le **dataProvider** est l'architecture pivot de React-Admin. Il s'agit d'un objet JavaScript contenant des méthodes standardisées (`getList`, `getOne`, `create`, `update`, `delete`, etc.). 
Son rôle est de servir d'**adaptateur (Design Pattern Adapter)** entre les composants génériques de React-Admin et l'API REST/GraphQL sous-jacente. Il intercepte les requêtes de l'interface, les traduit dans le format attendu par le serveur HTTP cible, puis formate la réponse brute reçue en objets standardisés consommables par les composants d'affichage.

### Question 1.2: Ouvrez l'onglet Network du navigateur. Quelle requête HTTP est envoyée au chargement de la liste ?
Lors du chargement initial de la liste des employés, la méthode `dataProvider.getList()` appelle l'API via une requête HTTP **GET**.
L'URL générée intègre des paramètres de filtrage et de pagination gérés par `ra-data-json-server` :
`GET http://localhost:3002/employees?_end=5&_order=ASC&_sort=id&_start=0`

---

## Exercice 2 - Liste des employés

### Question 2.1: Que fait la prop rowClick="edit" sur le Datagrid ?
La propriété `rowClick="edit"` configure l'action déclenchée lorsqu'un utilisateur clique n'importe où sur la ligne d'un employé au sein du tableau. Elle redirige automatiquement l'application vers l'URL de modification de cet enregistrement (ex: `/employees/1`). Dans l'Exercice 5, nous l'avons modifiée à `rowClick="show"` pour rediriger plutôt vers la fiche descriptive.

### Question 2.2: Passez perPage à 2. Que se passe-t-il dans l'interface ?
L'affichage se restreint instantanément à un maximum de 2 employés par page. React-Admin recalcule le composant de pagination situé en bas du tableau, affichant une pagination de type `1-2 of 5`, permettant ainsi de naviguer sur 3 pages distinctes pour consulter nos 5 employés de test. Le paramètre de l'URL réseau s'adapte automatiquement (`_end=2`).

---

## Exercice 3 - Création d'un employé

### Question 3.1: Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?
Le validateur `required()` bloque immédiatement la soumission du formulaire au niveau du client (Front-end). Le champ prend une bordure rouge et affiche le message d'erreur d'invalidation : *"Ce champ est obligatoire"*. Aucune requête HTTP n'est envoyée au serveur, protégeant ainsi l'intégrité des données de l'API.

### Question 3.2: Essayez de saisir un salaire de 500 euros. Que se passe-t-il ?
Le validateur `minValue(1500)` intercepte la valeur. Lors de la tentative de soumission ou du changement de focus, le formulaire invalide le champ en bloquant l'envoi et affiche le message contextuel : *"Le salaire minimum est de 1500 €"*.

---

## Exercice 4 - Modification d'un employé

### Question 4.1: Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ? Vérifiez dans l'onglet Network.
Par défaut, `ra-data-json-server` utilise la méthode HTTP **PUT** (ou **PATCH** selon les configurations de Providers) ciblant l'identifiant unique de la ressource modifiée (ex: `PUT http://localhost:3002/employees/1`). La payload contient l'ensemble des champs mis à jour de l'employé concerné.

### Question 4.2: À quel moment useRecordContext() est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?
`useRecordContext()` est disponible uniquement si le composant qui l'appelle est un enfant direct ou indirect d'un composant fournisseur de contexte (comme `<Edit>`, `<Show>`, `<DatagridRow>`). 
Tant que la requête réseau vers l'API n'est pas résolue, l'enregistrement est absent et le hook retourne `undefined`. C'est pourquoi une sécurité de type `if (!record) return ...` est indispensable pour éviter les plantages JavaScript lors de la tentative de lecture de propriétés inexistantes.

---

## Exercice 5 - Fiche détail

### Question 5.1: Quelle différence y a-t-il entre SimpleShowLayout et TabbedShowLayout ?
**SimpleShowLayout :** Affiche tous les champs de l'enregistrement de manière linéaire, les uns en dessous des autres sur une seule page verticale simple. Idéal pour les entités ayant peu de données.
**TabbedShowLayout :** Organise les champs au sein d'onglets de navigation cliquables distincts (`<Tab>`). Elle est indispensable pour structurer l'affichage de fiches complexes contenant de très nombreux champs ou des relations lourdes (ex: un onglet "Identité", un onglet "Contrat", un onglet "Historique").