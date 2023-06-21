// const express = require('express')
// const router = express.Router()
// const Course = require('../models/Course')
// const path = require('path')
// const fs = require('fs')
// const uploadPath = path.join('public', Course.coverImageBasePath)
// const ImageMimeTypes  = ['image/jpeg', 'image/png', 'images/gif']
// const multer = require('multer')
// const upload = multer ({
//     dest: uploadPath,
//     fileFilter: (req, file, callback) => {
//         callback(null, imageMimeTypes.include(file.mimetype))
//     }
// })


// // All Course routes
// router.get('/', async(req, res)=> {
//     let query = Course.find()
//     if (req.query.title != null && req.query.title != ''){
//         query = query.regex('title', new RegExp(req.query.title,'i'))
//     }
//     if (req.query.publishedBefore != null && req.query.publishedBefore != ''){
//         query = query.lte('publishDate',req.query.publishedBefore) // lte -> less than or equal to
//     }
//     if (req.query.publishedAfter != null && req.query.publishedAfter != ''){
//         query = query.gte('publishDate',req.query.publishedAfter) // gte -> greater than or equal to
//     }
//     try {
//         const course = await query.exec()
//         res.render('course/index', {
//             course: course,
//             searchParams: req.query //if searchParams does not work, replace with Search Options
//         })

//     } catch {
//         res.redirect('/')
//     }
   
//    })

// //new course route
// router.get('/new', async(req, res)=> {
//     renderNewPage(res,new Course()) 
// })

// //create course route
// router.post('/', upload.single('cover'),async (req, res)=> {
//    const fileName = req.file != null ? req.file.filename : null
    
//    const course = new Course ({
//         title: req.body.title,
//         publishDate: new Date(req.body.publishDate),
//         description: req.body.description,
//         coverImageName: fileName
//    })

//    try {
//     const newCourse = await course.save()
//     //res.redirect('books/${newBook.id})
//     res.redirect('course')
//    } catch {
//      if(course.coverImageName != null) {
//         removeCourseCover(course.coverImageName)
//      }
//      removeCourseCover(course.coverImageName)
//      renderNewPage(res, course, true)
//    }
// })

// function removeCourseCover(fileName){
//     fs.unlink(path.join(uploadPath, fileName), err => {
//       if (err) console.error(err)
//     })
// }

// function renderNewPage(res, course, hasError = false) {
//     try{
//         const params = {
//             course: course
//         }
//         if (hasError) params.errorMessage = 'Error Creating course',
//         res.render('course/new', params)
//     }   catch {
//         res.redirect('/course')
//     }
// }

// module.exports = router

const { Router } = require('express');

const courseController = require('../controllers/courseController'); //import

const router = Router();
router.get('/video',courseController.video_get); //uses get request handler that sends back sign up view.
router.post('/video',courseController.video_post); //communicate with db and add a new user
router.get('/image',courseController.image_get);
router.post('/image',courseController.image_post);

module.exports = router;