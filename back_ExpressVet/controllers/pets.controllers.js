const ctrlPetMaster = {},
PetMaster = require('../models/Pets.model')

ctrlPetMaster.create = async (req, res) => {
    const newPet = new PetMaster({
        petName: req.body.petName,
        petKind: req.body.petKind,
        petBreed: req.body.petBreed,
        petAge: req.body.petAge,
        petOwnerName: req.body.petOwnerName,
        petOwnerPhone: req.body.petOwnerPhone,
        petOwnerAddress: req.body.petOwnerAddress,
        petOwnerTypeId: req.body.petOwnerTypeId,
        petOwnerId: req.body.petOwnerId
    });
    await newPet.save();
    res.json({msg: "mascota creada con éxito", status: true})
}

ctrlPetMaster.list = async (req, res) => {
    const Pets = await PetMaster.find({}).sort({"startDateTime": 1}).exec();
    res.json(Pets);
}

ctrlPetMaster.update = async (req, res) => {
    const {
        _id,
        petName,
        petKind,
        petBreed,
        petAge,
        petOwnerName,
        petOwnerPhone,
        petOwnerAddress,
        petOwnerTypeId,
        petOwnerId
        } = req.body;
    const filter = {_id: _id}
    const update = {
        petName: petName,
        petKind: petKind,
        petBreed: petBreed,
        petAge: petAge,
        petOwnerName: petOwnerName,
        petOwnerPhone: petOwnerPhone,
        petOwnerAddress: petOwnerAddress,
        petOwnerTypeId: petOwnerTypeId,
        petOwnerId: petOwnerId
        }
    await PetMaster.findOneAndUpdate(filter, update);
    res.json({ status: true });
};

ctrlPetMaster.delete = async (req, res) => {
    const { _id } = req.params;
    await PetMaster.deleteOne({ _id: _id });
    res.json({ status: true });
};


ctrlPetMaster.search = async (req, res ) => {
    console.log("pasó el middleware(next) y por eso me estoy ejecuntando")
    console.log(req.body)
    PetMaster.find(req.body,(err, mascotas)=>{
        if(err) res.send(err)
        res.send(mascotas)
    })
    //res.send(req.query)
};

module.exports = ctrlPetMaster