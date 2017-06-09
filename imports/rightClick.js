import { make4Circles } from '../imports/make4Circles';

export default function rightClick () {
    let score = Session.get('score');
    console.log('clicked on the RIGHT circle!');

    let elem = $('#myBar');
    const temp = Template.instance();
    elem.removeClass('full').addClass('empty');
    
    Meteor.setTimeout(() => {
        temp.circleArray.set(make4Circles());
        // var elem = $("#myBar");
        // var width = 0;
        // Session.set('progressID', Meteor.setInterval(frame, 20));
        Session.set('score', score + 1);
        console.log(`score: ${score}`);
        elem.removeClass('empty').addClass('full');
    }, 10);
}
