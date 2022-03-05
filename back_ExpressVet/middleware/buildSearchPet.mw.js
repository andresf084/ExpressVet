const buildSearch = (req,res,next)=>{
    try{
        //console.log(req.query)
        req.body.IdMeeting? req.body.IdMeeting = req.body.IdMeeting.split(","): console.log("no Id reunión")
        req.body.startDateTime? req.body.startDateTime = {$regex:req.body.startDateTime} : console.log("no fecha inicial")
        req.body.petName? req.body.petName = req.body.petName: console.log("no nombre mascota")
        req.body.petOwner? req.body.petOwner = req.body.petOwner: console.log("no dueño mascota")
        req.body.statusName? req.body.statusName = req.body.statusName: console.log("no estado cita")
        next()
    }catch(err){
        res.status(500).send({"msg":"ocurrió un error: "+err})
    }
}

module.exports = {
    buildSearch
}