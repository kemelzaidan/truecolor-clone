FlowRouter.route("/", {
  action: () => {
    BlazeLayout.render('layout', { main: 'gameArea', footer: 'progressBar' });
    console.log('Rendered game...');
  }
});
