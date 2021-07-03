import  initializer  from '../firebase.js';

const db = initializer.database();
const auth = initializer.auth();

const register = (email, password, name, response) => {
    console.log("Registrando al usuario: " + name)
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
            displayName: name
        }).then(() =>{
            createUser(user);
            response.send({
                email: user.email,
                name: user.displayName,
                state: true
            })

        })
        
        // ...
    })
    .catch((error) => {
        console.log("entro al catch")
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorCode: " + errorCode);
        console.log("errorMessage: " + errorMessage);
    });
}

const createUser = ( { uid, displayName, email}) => {
    db.ref('users/' + uid).set({
        name: displayName ? displayName : "Anonimo",
        email: email
    })
}


const login = (email, password, response) => {
    console.log("Iniciando con el usuario: " + email)
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var { email, displayName } = userCredential.user;
        response.send({
            name: displayName,
            email: email,
            state: true
        })
    })
    .catch((error) => {
        console.log("entro al catch")
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorCode: " + errorCode);
        console.log("errorMessage: " + errorMessage);
    });
}

const logout = (response) => {
    auth.signOut().then(() => {
        response.send({
            name: null,
            email: null,
            state: false
        })
    })
}

const getCurrentUser = (response) => {
    if(auth.currentUser){
        response.send({
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            state: true
        })
    } else {
        response.send({
            name: null,
            email: null,
            state: false
        })
    }
    
}
export  {
    register,
    login,
    logout,
    getCurrentUser
}