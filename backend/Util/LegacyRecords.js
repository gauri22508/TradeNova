const unassignedRecordFilter = {
  $or: [{ userId: { $exists: false } }, { userId: null }],
};

const claimLegacyRecords = async (model, userId) => {
  const ownedRecords = await model.find({ userId }).select("name").lean();
  const ownedNames = [...new Set(ownedRecords.map((record) => record.name).filter(Boolean))];
  const legacyRecords = await model
    .find({
      $and: [
        unassignedRecordFilter,
        { name: { $nin: ownedNames } },
      ],
    })
    .select("_id")
    .lean();

  if (!legacyRecords.length) return;

  await model.updateMany(
    {
      _id: { $in: legacyRecords.map((record) => record._id) },
      ...unassignedRecordFilter,
    },
    { $set: { userId } }
  );
};

module.exports = { claimLegacyRecords };