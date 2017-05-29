FlowRouter.route("/", {
  action: () => {
    BlazeLayout.render('layout', { main: 'gameArea', footer: 'progressBar' });
    console.log('Rendered game...');
  }
});

FlowRouter.route("/login", {
  action: () => {
    BlazeLayout.render('layout', { main: 'login', footer: '' });
    console.log('Rendered login screen...');
  }
});
