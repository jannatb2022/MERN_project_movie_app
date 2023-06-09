const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// CREATE_________

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);

    try {
      const saveList = await newList.save();
      res.status(200).json(saveList);
    } catch (error) {
      res.status(500).json("You are not allowed");
    }
  }
});

// // UPDATE_________

// router.put("/:id", verify, async(req, res) => {
//     if (req.user.isAdmin) {

//         try {
//             const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {
//                 $set : req.body,
//             }, { new : true })
//            res.status(200).json(updateMovie);

//         } catch (error) {
//             res.status(500).json('You are not allowed');
//         }
//     }
// });

// // DELETE________

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deleteList = await List.findByIdAndDelete(req.params.id);
      res.status(200).json(deleteList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// // get___________

router.get("/", verify, async (req, res) => {
  let typeQuery = req.query.type;
  let genreQuery = req.query.genre;
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error)
  }
});

// // GET_____RANDOM_______

// router.get("/random", async(req, res) => {
//     const type = req.query.type;
//     let movie;

//         try {
//             if(type === "series"){
//                 movie = await Movie.aggregate([
//                     {
//                         $match : { isSeries : true},
//                     },
//                     { $sample : { size: 1}},
//                 ]);
//             }
//             else {
//                 movie = await Movie.aggregate([
//                     {
//                         $match : { isSeries : false},
//                     },
//                     { $sample : { size: 1}},
//                 ]);
//             }

//             res.status(200).json(movie);
//         } catch (error) {
//             res.status(500).json("You are not allowed");
//         }

// });

// // GET ALL________

// router.get("/", verify, async(req, res) => {

//     if( req.user.isAdmin){

//         try {
//             const movies =  await Movie.find();
//             res.status(200).json(movies.reverse());
//         } catch (error) {
//             res.status(500).json("You are not allowed to see all users..");
//         }
//     }
// });

// GET USER STATS__

// router.get("/stats" , async (req, res) => {
//     // const today = new Date();
//     // const lastYear = today.setFullYear(today.setFullYear() - 1)
//     // console.log(lastYear);

//     // const monthsArray = [
//     //     "January", "February", "March", "April", "May", "June", "july", "August", "September", "October", "November", "December"
//     // ];

//     try {
//         const data = await User.aggregate([
//             {
//                 $project: {
//                     month : { $month : "$createdAt"}
//                 }
//             },
//             {
//                 $group : {
//                     _id: "$month",
//                     total: { $sum: 1 },
//                 },
//             },
//         ]);
//         res.status(200).json(data);

//     } catch (error) {
//         res.status(500).json(error)
//     };

// })
module.exports = router;
