var Report = require('../models/Report');

module.exports = function (app, passport) {
    app.get('/api/report/getAll', function (req, res) {
        Report.find({}).populate('userId').populate('postId').exec(function (err, list) {
            if (err) {
                return res.send(err);
            }
            return res.json(list);
        });
    });

    app.delete('/api/report/delete/:id', function (req, res) {
        Report.remove(req.params.id, function (err, report) {
            if (err) {
                return res.send(err);
            }
            return res.json({
                deleted: 'true'
            });
        });
    });
};