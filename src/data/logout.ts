export const Logout = async () => {
    localStorage.removeItem('accesstkn');
    localStorage.removeItem('serviceid');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.reload();
}