const ctrlUserMaster = {},
UserMaster = require('../models/users.model')

ctrlUserMaster.login = (req, res) => {
    req.body.user && req.body.password ?
    UserMaster?.findOne({ user: req.body.user }, (err, user) => {
            //console.time("test")
            switch (true) {
                case (err):
                    res.send({ "msg": err })
                    break;
                case (user==null):
                    res.send({"msg":"No existe el usuario en la BD"});
                    break;
                case (user?.password == req.body.password):
                    let token = user.generarJWT()
                    res.send({ "msg": "Se puede loggear", token, "user": user.userName, "rol": user.userRol})
                    break;
                case (user?.userPwd != req.body.userPwd):
                    res.send({ "msg": "La contraseña está erronea" })
                    break;
            }
            //console.timeEnd("test")
        })
        :
    res.send({ "msg": "Te falta usuario o contraseña" });
}

ctrlUserMaster.create = async (req, res) => {
    const newUser = new UserMaster({
        userName: req.body.userName,
        id_type: req.body.id_type,
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        userPhone1: req.body.userPhone1,
        userPhone2: req.body.userPhone2,
        user: req.body.user,
        password: req.body.password,
        userRol: req.body.userRol
    });
    await newUser.save();
    res.json({msg: "User created successfully", status: true})
}

ctrlUserMaster.list = async (req, res) => {
    const users = await UserMaster.find({}).sort({"userName": 1}).exec();
    res.json(users);
}

ctrlUserMaster.update = async (req, res) => {
    const { _id, userName, id_type, userEmail, userPhone1, userPhone2, userLogin, userPwd, userRol} = req.body;
    const filter = {_id: _id}
    const update = {
        userName: userName,
        id_type: id_type,
        userId: userId,
        userEmail: userEmail,
        userPhone1: userPhone1,
        userPhone2: userPhone2,
        user: user,
        password: password,
        userRol: userRol
    }
    await UserMaster.findOneAndUpdate(filter, update);
    res.json({ status: true });
}

ctrlUserMaster.delete = async (req, res) => {
    const { _id } = req.params;
    await UserMaster.deleteOne({ _id: _id });
    res.json({ status: true });
}

ctrlUserMaster.search = async (req, res ) => {
    console.log("pasó el middleware(next) y por eso me estoy ejecuntando")
    console.log(req.body)
    UserMaster.find(req.body,(err, usuarios)=>{
        if(err) res.send(err)
        res.send(usuarios)
    })
    //res.send(req.query)
}

module.exports = ctrlUserMaster