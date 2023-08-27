export const setLogoutLocal = () => {
    window.localStorage.setItem('idLogin', '');
    window.localStorage.setItem('token', '');
    window.localStorage.setItem('nameUser', '');
};
