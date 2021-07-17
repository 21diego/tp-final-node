
import  initializer  from '../firebase.js';

const db = initializer.database();
const auth = initializer.auth();

const register = (email, password, name, lastname, address, response) => {
    console.log("Registrando al usuario: " + name)
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
            displayName: name
        }).then(() =>{
            createUser(user.uid, user.displayName, user.email, lastname, address);
            enviarEmailVerificacion();
            response.send({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                state: true,
                emailVerified: user.emailVerified,
                apiKey: user.apiKey,
                error: false
            })

        })
        
        // ...
    })
    .catch((error) => {
        response.send({
            error: true,
            errorCode: error.code,
            errorMessage: error.message
        })
    });
}

const createUser = (  uid, displayName, email, lastname, address) => {
    db.ref('users/' + uid).set({
        name: displayName ? displayName : "Anonimo",
        email: email,
        lastname: lastname,
        address: address

    })
}

const enviarEmailVerificacion = () => {
    auth.currentUser.sendEmailVerification()
    .then( response => {
        console.log(response);
    }).catch( error => {
        console.log(error);
    })
}


const login = (email, password, response) => {
    console.log("Iniciando con el usuario: " + email)
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        response.send({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            state: true,
            emailVerified: user.emailVerified,
            apiKey: user.apiKey,
            error: false
        })
    })
    .catch((error) => {
        response.send({
            error: true,
            errorCode: error.code,
            errorMessage: error.message
        })
    });
}

const logout = (response) => {
    auth.signOut()
    .then(() => {
        response.send({
            name: null,
            email: null,
            state: false,
            emailVerified: null,
            apiKey: null,
            error: false
        })
    })
    .catch((error) => {
        console.log("entro al catch")
        response.send({
            error: true,
            errorCode: error.code,
            errorMessage: error.message
        })
    });
}

const getCurrentUser = (response) => {
    if(auth.currentUser){
        console.log("entro al current")
        response.send({
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            state: true,
            emailVerified: auth.currentUser.emailVerified,
            apiKey: auth.currentUser.apiKey,
            error: false
        })
    } else {
        response.send({
            uid: null,
            name: null,
            email: null,
            state: false,
            emailVerified: false,
            apiKey: null,
            error: true,
            errorCode: 'userNotSigned',
            errorMessage: 'El usuario no esta en sesion'
        })
    }
    
}

export  {
    register,
    login,
    logout,
    getCurrentUser
}
