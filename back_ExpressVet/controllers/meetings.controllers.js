const ctrlMeetingMaster = {},
  MeetingMaster = require("../models/meetings.model");

ctrlMeetingMaster.create = async (req, res) => {
  const newMeeting = new MeetingMaster({
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    petName: req.body.petName,
    petKind: req.body.petKind,
    petOwner: req.body.petOwner,
    caseDescription: req.body.caseDescription,
    veterinaryName: req.body.veterinaryName,
    statusName: "reservada",
    statusComment: `cita creada por ${req.body.petOwner} en la web`,
  });
  await newMeeting.save();
  res.json({ msg: "reserva creada con éxito", status: true });
};

ctrlMeetingMaster.list = async (req, res) => {
  const meetings = await MeetingMaster.find({})
    .sort({ startDateTime: 1 })
    .exec();
  res.json(meetings);
};

ctrlMeetingMaster.CountReserve = async (req, res) => {
  const reserveMeetings = await MeetingMaster.find({
    statusName: "reservada",
  }).count();
  res.json(reserveMeetings);
};

ctrlMeetingMaster.CountActive = async (req, res) => {
  const activeMeetings = await MeetingMaster.find({
    statusName: "activa",
  }).count();
  res.json(activeMeetings);
};

ctrlMeetingMaster.SearchReserve = async (req, res) => {
    const validation1 = {
        $and: [
            { startDateTime: { $gte: req.body.startDateTime } },
            { endDateTime: { $lte: req.body.endDateTime } },
        ],
        };
        const validation2 = {
        $and: [
            { startDateTime: { $lte: req.body.startDateTime } },
            { endDateTime: { $gte: req.body.endDateTime } },
        ],
        };
        const validation3 = {
        $and: [
            { startDateTime: { $lte: req.body.endDateTime } },
            { endDateTime: { $gte: req.body.endDateTime } },
        ],
        };
        const validation4 = {
        $or: [
            { startDateTime: req.body.startDateTime },
            { endDateTime: req.body.endDateTime },
            ],
        };
        const reserves = await MeetingMaster.find(
            validation1 ||
            validation2 ||
            validation3 ||
            validation4
        );
        res.json(reserves);
};

ctrlMeetingMaster.CountComplete = async (req, res) => {
  const completeMeetings = await MeetingMaster.find({
    statusName: "completada",
  }).count();
  res.json(completeMeetings);
};

ctrlMeetingMaster.update = async (req, res) => {
  const { _id, veterinaryName, statusName, statusComment } = req.body;
  const filter = { _id: _id };
  const update = {
    veterinaryName: veterinaryName,
    statusName: statusName,
    statusComment: statusComment,
  };
  await MeetingMaster.findOneAndUpdate(filter, update);
  res.json({ status: true });
};

ctrlMeetingMaster.Cancel = async (req, res) => {
    const { IdMeeting , statusName, statusComment } = req.body;
    const filter = { IdMeeting: IdMeeting };
    const update = {
      statusName: statusName,
      statusComment: statusComment,
    };
    await MeetingMaster.findOneAndUpdate(filter, update);
    res.json({ status: true });
  };

ctrlMeetingMaster.delete = async (req, res) => {
  const { _id } = req.params;
  await MeetingMaster.deleteOne({ _id: _id });
  res.json({ status: true });
};

ctrlMeetingMaster.search = async (req, res) => {
  console.log("pasó el middleware(next) y por eso me estoy ejecuntando");
  console.log(req.body);
  MeetingMaster.find(req.body, (err, reservas) => {
    if (err) res.send(err);
    res.send(reservas);
  });
  //res.send(req.query)
};

module.exports = ctrlMeetingMaster;
