// clears a Meteor interval based on a Session key
export default function clearInterval (sessionKey) {
  let id = Session.get(sessionKey);
  Meteor.clearInterval(id);
}
