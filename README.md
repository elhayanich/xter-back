# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Explications

## Front


### CheckAuth

```js
<CheckAuth />
```

#### Fonctionnalité

Permet d'authentifier l'utilisateur actuel

#### Prérequis

L'utilisateur doit obligatoirement s'être authentifié via `/login` afin de recevoir un token

#### Sortie

* Affiche l'id de l'utilisateur



### SendAuthauredMessage

```js
<SendAuthoredMessage messageToSend={messageToSend} route={route}/>
```

#### Fonctionnalité

Permet d'envoyer un message sécurisé au serveur

#### Prérequis

L'utilisateur doit obligatoirement s'être authentifié via `/login` afin de recevoir un token

#### Entrées

* `messageToSend` : message à envoyer au serveur. Format String ou Dictionnaire
* `route` route de notre Back. Format String forme `/ma_route` (ne pas oublier le '/')

#### Sortie

* Methode `POST` vers la route renseignée en entrée
* `message` : Dictionnaire
* `Header` : Token contenant l'ID de l'utilisateur actuel



## Back


### Réception d'un message authentifié

```python
from auth_tools import AuthTool


async def ma_fonction(token: Annotated[str, Depends(AuthTool.oauth2_scheme)],
                      message : dict):
    user_id = await AuthTool.get_current_user(token)

```

#### Entrées

* Cette fonction est appellée par 
```js
<SendAuthoredMessage messageToSend={messageToSend} route={route}/>
```
Voir la section dédiée dans la partie Front

* `user_id` est un STRING!! le transformer en int si on veut l'utiliser dans la BDD

#### Utilisation

Permet de faire des actions avec l'ID de l'utilisateur

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
