import { Session } from 'meteor/session';

// routes that are public accessible without the need to authenticate
var exposed = FlowRouter.group({
  name: 'public'
});

// routes accessible for logged users only
var loggedIn = FlowRouter.group({
  triggersEnter: [
    () => {
      let route = FlowRouter.current().route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        if (route.group.name !== 'public') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('login');
      }
    }
  ]
});

// redirect after login
Accounts.onLogin(function() {
  let redirect = Session.get('redirectAfterLogin');
  if (redirect != null) {
    if (redirect !== '/login') {
      return FlowRouter.go(redirect);
    }
  }
});

///
// Actual routes
///
// home screen
exposed.route('/', {
  name: 'home',
  action: () => {
    BlazeLayout.render('layout', { main: 'start', footer: 'iconsBarHome' });
    console.log('Rendered start screen...');
  }
});

// login screen
exposed.route('/login', {
  name: 'login',
  action: () => {
    BlazeLayout.render('layout', { main: 'login', footer: '' });
    console.log('Rendered login screen...');
  }
});

// actual game
loggedIn.route('/game', {
  name: 'game',
  action: () => {
    BlazeLayout.render('layout', { main: 'gameArea', footer: 'progressBar' });
    console.log('Rendered game...');
  }
});

loggedIn.route('/logout', {
  name: 'logout',
  action: () => {
    FlowRouter.go('home');
  }
})
