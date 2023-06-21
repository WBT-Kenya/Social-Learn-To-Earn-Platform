const Course = require('../models/Course');
module.exports.video_get = (req, res) => {
    res.render('');

}
module.exports.Image_get = (req, res) => {
    res.render('download');
}
module.exports.video_post = async (req, res) => {
    const { title, publishDate,Description, coverImageName } = req.body

    try{
       const user = await User.create({ title, publishDate,Description, coverImageName });
       res.status(201).json(user);
    }
    catch (err){
        console.log(err);
        res.status(400).send('error, user not created');

    };
}

module.exports.image_post = (req, res) => {
    const {title, coverImageName} = req.body;

    console.log(title.coverImageName);
    res.send('Successful download');
};