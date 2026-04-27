const contentModel = require("../models/content.model");
const slotModel = require("../models/slot.model");
const scheduleModel = require("../models/schedule.model");

exports.getLiveContent = async (teacherId) => {
  const contents =
    await contentModel.findApprovedActiveByTeacher(teacherId);

  if (!contents.length) return [];

  const subjectMap = {};
  contents.forEach((c) => {
    if (!subjectMap[c.subject]) subjectMap[c.subject] = [];
    subjectMap[c.subject].push(c);
  });

  const result = [];

  for (let subject in subjectMap) {
    const slot = await slotModel.findBySubject(subject);
    if (!slot) continue;

    const schedules = await scheduleModel.findBySlot(slot.id);
    if (!schedules.length) continue;

    const valid = schedules.filter((s) =>
      subjectMap[subject].some((c) => c.id === s.content_id)
    );

    const total = valid.reduce((sum, s) => sum + s.duration, 0);
    let pointer = Math.floor(Date.now() / 60000) % total;

    for (let s of valid) {
      if (pointer < s.duration) {
        const item = subjectMap[subject].find(
          (c) => c.id === s.content_id
        );
        if (item) result.push(item);
        break;
      }
      pointer -= s.duration;
    }
  }

  return result;
};