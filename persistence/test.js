let models = require('./loadModels');
let db = require('./db')
let
    User = models.user;

(async () => {
    await db.sync();
    var user = await User.create({
        username: 'John',
        birthday: '2007-07-07'
    });
    console.log('created: ' + JSON.stringify(user));

    user.username = "tom"
    user.save();
    await User.update({
        username: 'sssss',
        birthday: '2007-02-07'
    },{
        where:{
            id:1
        }
    });
    console.log('created: ' + JSON.stringify(user));
})();
