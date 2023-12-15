//clear token and serviceID

export const Logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('serviceID');
    window.location.reload();
}