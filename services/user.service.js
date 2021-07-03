const auth = require('../firebase.js').auth();
const db = require('../firebase.js').database();


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
                user: `Registrado el usuario: ${(user.email)}`,
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
        var { email} = userCredential.user;
        response.send({
            user: `iniciado con usuario: ${(email)}`,
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
            user: auth.createUser,
            state: true
        })
    })
}


module.exports = {
    register,
    login,
    logout
}