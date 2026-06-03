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

## Exercice 6 - InternList

### Question 6.1: ReferenceField génère quel appel HTTP pour résoudre le manager ?
`ReferenceField` analyse le tableau de données des stagiaires affichés, extrait la liste unique des identifiants présents dans le champ `managerId` (ex: `[1, 2, 4, 5]`), puis regroupe et déclenche une seule requête réseau optimisée de type **GET** avec filtrage par identifiants multiples :
`GET http://localhost:3002/employees?id=1&id=2&id=4&id=5`

### Question 6.2: Que se passe-t-il visuellement si managerId ne correspond à aucun employé ?
Visuellement, l'emplacement réservé à l'affichage du champ de référence reste vide (aucun texte n'est rendu). React-Admin ne plante pas grâce à une capture d'erreur interne, mais l'interface affiche simplement une cellule vide pour la colonne Manager.

## Exercice 7 - InternCreate & InternEdit

### Question 7.1: Quelle méthode HTTP est émise lors de la soumission de InternCreate? Vers quel endpoint ?
Lors de la soumission de `InternCreate`, une requête HTTP avec la méthode **POST** est émise par le client. Elle cible l'endpoint global de la ressource concernée : `POST http://localhost:3002/interns` avec les données du stagiaire sérialisées dans le corps de la requête.

### Question 7.2: Quel hook utilisez-vous pour la validation conditionnelle de remuneration, et pourquoi ?
Nous utilisons le hook `useWatch()` issu de l'écosystème de `react-hook-form` (parfaitement intégré dans les formulaires de React-Admin v5). Il est indispensable car il permet d'écouter en temps réel l'état de la case à cocher `isRemunerate` afin de modifier dynamiquement les contraintes du schéma de validation du champ `remuneration` sans provoquer de re-rendus globaux lourds sur le reste du formulaire.

## Exercice 8 - InternShow & ManagerCard

### Question 8.1: Quelle est la différence entre useGetOne et ReferenceField? Quand préférer l'un ou l'autre ?
- `ReferenceField` est un composant de haut niveau orienté UI. Il gère automatiquement le cycle de vie de la requête, le groupement des identifiants (coalescence) au sein d'un Datagrid et l'affichage d'un champ enfant. À utiliser impérativement dans les listes et les Layouts de lecture standards.
- `useGetOne` est un hook de bas niveau qui retourne directement les données brutes sous forme d'objet JavaScript, ainsi que les états de chargement (`isPending`, `error`). Il est à préférer lorsque l'on construit un composant totalement personnalisé (Custom Component) nécessitant de manipuler programmatiquement la donnée ou de conditionner l'affichage de blocs complexes à l'aide de variables logiques.

### Question 8.2: Que se passe-t-il si useGetOne reçoit id: undefined sans l'option enabled? Comment ce paramètre résout-il le problème ?
Si `id` vaut `undefined` et que l'option `{ enabled: true }` (valeur par défaut) est active, le moteur interne (`react-query`) tente malgré tout de forger une requête HTTP invalide (ex: `GET http://localhost:3002/employees/undefined`), ce qui provoque une erreur 404 sur le réseau et lève une exception dans la console. L'option `{ enabled: !!record?.managerId }` résout cela en gelant l'exécution de la requête tant que la clé d'identification n'est pas résolue et typée.

## Exercice 9 - Enrichissement EmployeeShow

### Question 9.1: Différence entre useGetList et ReferenceManyField? Dans quel cas useGetList est-il indispensable ?
- `ReferenceManyField` est un composant UI déclaratif conçu pour afficher des sous-listes d'enregistrements liés dans un Layout standard.
- `useGetList` est le hook bas niveau qui interroge directement le provider. Il est indispensable lorsque nous voulons effectuer des calculs programmatiques sur les données retournées (comme faire des sommes, filtrer manuellement en JavaScript, ou agréger des données) avant de décider comment le rendu visuel doit être structuré.

### Question 9.2: Comment optimiser la requête de DepartmentStats pour ne récupérer que le total sans charger tous les employés ?
Pour ne récupérer que le total, il faut configurer la pagination de la requête avec les paramètres `{ page: 1, perPage: 1 }`. Ainsi, le serveur ne renvoie qu'un seul enregistrement (charge utile réseau minimale), mais l'en-tête de réponse HTTP calculé par le serveur contient la valeur globale de la clé de métadonnées `total`, que React-Admin extrait et met à disposition dans le retour du hook.

## Exercice 10 - QuickStatus Toggle (useUpdate)

### Question 10.1: Quelle méthode HTTP useUpdate utilise-t-il par défaut? Comment forcer PATCH au lieu de PUT ?
Par défaut, `useUpdate` (et l'adaptateur de serveur JSON) utilise la méthode HTTP **PUT** pour écraser entièrement la ressource. Pour forcer l'usage de la méthode **PATCH**, il faut configurer l'option de mutation ou modifier la politique de verbe au sein de la déclaration globale du `dataProvider` à l'initialisation de l'application, car c'est lui qui mappe l'action `update` vers le verbe HTTP.

### Question 10.2: Pourquoi previousData est-il nécessaire ? Que se passe-t-il si on l'omet ?
`previousData` est indispensable pour alimenter le cache local de l'application. Sans lui, les modes de mutation comme `optimistic` ou `pessimistic` sont incapables de calculer les différences d'états (diffing) pour mettre à jour instantanément l'interface graphique. Si on l'omet, l'interface graphique peut flasher, afficher des données vides temporairement ou perdre l'état de synchronisation visuelle en attendant le retour de la réponse de l'API.

## Exercice 11 - useCreate & Formulaire rapide

### Question 11.1: Quelle différence entre utiliser useCreate dans un composant custom et utiliser le composant <Create> de React-Admin ?
Le composant `<Create>` est une vue complète qui gère l'affichage d'une page entière, l'implémentation d'un fil d'Ariane, les actions de toolbar et les redirections d'itinéraires (URL). `useCreate` est une fonction pure (un hook d'action) qui déclenche la création d'une donnée de manière totalement invisible en tâche de fond, permettant de l'exécuter à l'intérieur d'éléments d'interface tiers comme une modale éphémère, sans perturber la navigation courante de l'utilisateur.

### Question 11.2: Comment gérez-vous le rechargement de la liste après une création réussie via useCreate ?
Le rechargement s'effectue en couplant le hook d'action avec le hook de synchronisation `useRefresh()` fourni par React-Admin. Au sein des options de `useCreate`, on déclare une fonction de rappel `onSuccess` qui invoque la fonction `refresh()`. Cela invalide immédiatement les caches de la liste active et force un rafraîchissement asynchrone des données du tableau à l'écran.

## Exercice 12 - Dashboard

### Question 12.1: Les 4 appels useGetList se font-ils en parallèle ou en séquence ? Justifiez.
Les 4 appels se font rigoureusement **en parallèle**. Chaque composant de carte s'exécute de manière autonome lors du montage de la page d'accueil. Comme ils s'appuient tous sur le moteur de requêtes asynchrones de React-Admin (propulsé par `react-query`), les promesses JavaScript (`Promise.all` interne) sont lancées simultanément sur le réseau, évitant tout goulot d'étranglement.

### Question 12.2: Pourquoi perPage: 1 est préférable à perPage: 100 ici ?
`perPage: 1` est largement préférable car le Dashboard n'affiche que des compteurs (des chiffres globaux) et non le détail des fiches d'employés ou de stagiaires. Charger 100 objets complets consommerait inutilement de la bande passante et de la mémoire vive pour le client, alors qu'une pagination à 1 suffit à obtenir la métadonnée du total calculée efficacement par le serveur.