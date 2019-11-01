export default function signout(req, res) {
  req.logout();
  req.redirect('/');
}