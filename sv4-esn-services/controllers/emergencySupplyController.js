/**
 * Created by arthurm.
 */
let EmergencySupplyDao = require('../dao/emergencySupplyDao.js')
let MessageDao = require('../dao/messageDao.js')

let emergencySupplyDao = new EmergencySupplyDao();

let messageDao = new MessageDao();

/**
 * emergencySupplyController.js
 *
 * @description :: Server-side logic for managing emergency supplies.
 */

module.exports = {

    /**
     * emergencySupplyController.list()
     */
    list: function (req,res) {
        emergencySupplyDao.list(function (emergerncySupplies) {
            return res.json(emergerncySupplies);
        }, function (error) {
            return res.status(404).json(error);
        });
    },
    /**
     * emergencySupplyController.show()
     */
    show: function (req, res) {
        let id = req.params.id;
        emergencySupplyDao.findById(id, function (emergencySupply) {
            return res.json(emergencySupply);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emergencySupplyController.suppliesByUser()
     */
    suppliesByUser: function (req, res) {
        let uid = req.params.id;
        emergencySupplyDao.suppliesByUser(uid, function (emergencySupply) {
            return res.json(emergencySupply);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emergencySupplyController.create()
     */
    create: function (req,res) {
        let emergencySupply  = {
            supplier : req.body.supplier,
            supplyname: req.body.supplyname,
            created_at : new Date(),
            location_text : req.body.location_text,
            location_lat: req.body.location_lat,
            location_lng: req.body.location_lng,
            type: req.body.type
        };
        emergencySupplyDao.create(emergencySupply, function (created) {
            emergencySupplyDao.findById(created._id, function (found) {
                return res.status(201).json(found);
            }, function (error) {
                return res.status(404).json(error);
            });
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emergencySupplyController.update()
     */
    update: function (req,res) {
        let emergencySupply  = {
            id: req.params.id,
            supplier : req.body.supplier,
            supplyname: req.body.supplyname,
            created_at : new Date(),
            location_text : req.body.location_text,
            location_lat: req.body.location_lat,
            location_lng: req.body.location_lng,
            type: req.body.type
        };
        emergencySupplyDao.update(emergencySupply, function (updated) {
            return res.json(updated);
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emergencySupplyController.remove()
     */
    remove: function (req,res) {
        let id = req.params.id;
        emergencySupplyDao.remove(id, function () {
            return res.status(204).json('Deleted');
        }, function (error) {
            return res.status(404).json(error);
        });
    },

    /**
     * emergencySupplyController.confirmSupplyRequestViaHeadlessClient
     */
    confirmSupplyRequest(req, res) {

        let supplyRequest = req.body.supplyRequest;
        let keys = Object.keys(supplyRequest);

        for(let i in keys) {
            if (supplyRequest.hasOwnProperty(keys[i])) {
                let msg = `Hi, I saw you have some emergency supplies available for sharing. <br /> <br /> I am interested in the following item: <br /> <br />`;
                let targetUsr = supplyRequest[keys[i]].supplier.userId;
                msg += `<md-list-item>- ` + supplyRequest[keys[i]].supplyname + `</md-list-item><br />`;

                let message = {
                    sender : req.body.sender,
                    receiver : targetUsr,
                    message : msg,
                    sent_at : new Date(),
                    broadcast : false,
                    user_status: 0
                };

                messageDao.create(message, function (message) {
                    return res.status(201).json(message);
                }, function(error) {
                    return res.status(404).json(error);
                });
            }
        }
    }
};
