const contentModel = require("../models/content.model");

exports.getPending = () => contentModel.findPending();

exports.approve = (id, principalId) =>
  contentModel.updateStatus(id, "approved", null, principalId);

exports.reject = (id, reason, principalId) =>
  contentModel.updateStatus(id, "rejected", reason, principalId);