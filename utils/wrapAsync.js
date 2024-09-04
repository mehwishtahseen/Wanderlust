// module.exports = (fn) => {
//     return(res,req,next) => {
//         fn(res,req,next).catch(err);

//     }
// }
module.exports = (fn) => {
    return(req,res,next) => {
        fn(req,res,next).catch(next);

    }
}