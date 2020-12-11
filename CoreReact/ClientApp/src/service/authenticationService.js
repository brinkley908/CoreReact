import { handleResponse } from '../infrastructure/handleResponse';
import { BehaviorSubject } from 'rxjs';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
export const authenticationService = {

    login,
    logout,
    isAuthenticated,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }

}


function login(model) {

    return fetch(`Account/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(model)
    })
        .then(handleResponse)
        .then(user => {
            //    // store user details and jwt token in local storage to keep user logged in between page refreshes

            if (!user.success)
                throw new Error(user.error);

            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });

}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}


async function isAuthenticated() {

    var response = await fetch("Account/IsAuthenticated");
    var result = await response.json();
    return result;

}

//export const isAuthenticated = () => {
//    // const { state, dispatch } = useStore();
//    const response = fetch("Account/IsAuthenticated")
//        .then(response.json)
//        .then(result => { return result }) 
////    var result = await response.json();

//    // await dispatch({ type: "authenticationflag", valie: true });

//  //  return result;
//}