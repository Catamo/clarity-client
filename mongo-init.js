db.createCollection("sessions", {
  viewOn: "recordings",
  pipeline: [
    {
      $group: {
        _id: "$envelope.sessionId",
        sessionId: { $first: "$envelope.sessionId" },
        recordingsCount: { $sum: 1 },
      },
    },
  ],
});
