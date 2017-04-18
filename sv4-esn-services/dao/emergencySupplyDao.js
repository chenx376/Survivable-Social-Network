/**
 * Created by arthurm.
 */

var config = require('config');
let emergencySupplyModel = require('../models/emergencySupplyModel.js')

module.exports = class EmergencySupplyDao {
    /**
     * annouceController.list()
     */
    list(success, error){
        emergencySupplyModel
            .find({})
            .populate('supplier')
            .sort({created_at: -1})
            .exec(function (err, emergencySupplies) {
                if (err){
                    return error({
                        message: 'Error when getting emergencySupplies.',
                        error: err
                    });
                }
                return success(emergencySupplies)
            });
    }

    /**
     * announceController.findById()
     */
    findById(id, success, error) {
        emergencySupplyModel
            .findOne({_id: id})
            .populate('supplier')
            .exec(function (err, emergencySupply) {
                if (err){
                    return error({
                        message: 'Error when getting emergencySupplies.',
                        error: err
                    });
                }
                // if (!announce){
                //     return error({message: 'No such announce'});
                // }
                return success(emergencySupply._doc);
            });
    }

    /**
     * announceController.create()
     */
    create(emergencySupplyObj, success, error) {

        let emergencySupplyToCreate = emergencySupplyModel(emergencySupplyObj);
        emergencySupplyToCreate.save(function (err, emergencySupply) {
            if (err) {
                return error({
                    message: 'Error when creating emergencySupply.',
                    error: err
                });
            }
            return success(emergencySupply._doc);
        });
    }

    /**
     * announceController.update()
     */
    update(emergencySupplyToUpdate, success, error) {

        emergencySupplyModel.findOne({_id: emergencySupplyToUpdate.id}, function (err, emergencySupply) {
            if (err) {
                return error({
                    message: 'Error when getting emergencySupply.',
                    error: err
                });
            }

            emergencySupply.supplier = emergencySupplyToUpdate.supplier ? emergencySupplyToUpdate.supplier : emergencySupply.supplier;
            emergencySupply.supplyname = emergencySupplyToUpdate.supplyname ? emergencySupplyToUpdate.supplyname : emergencySupply.supplyname;
            emergencySupply.location_text = emergencySupplyToUpdate.location_text ? emergencySupplyToUpdate.location_text : emergencySupply.location_text;
            emergencySupply.location_lat = emergencySupplyToUpdate.location_lat ? emergencySupplyToUpdate.location_lat : emergencySupply.location_lat;
            emergencySupply.location_lng = emergencySupplyToUpdate.location_lng ? emergencySupplyToUpdate.location_lng : emergencySupply.location_lng;
            emergencySupply.type = emergencySupplyToUpdate.type ? emergencySupplyToUpdate.type : emergencySupply.type;
            emergencySupply.created_at = emergencySupplyToUpdate.created_at ? emergencySupplyToUpdate.created_at : emergencySupply.created_at;

            emergencySupply.save(function (err, updated) {
                if (err) {
                    return error({
                        message: 'Error when updating emergencySupply.',
                        error: err
                    });
                }
                return success(updated);
            });
        });
    }

    /**
     * announceController.remove()
     */
    remove(id, success, error) {

        emergencySupplyModel.findByIdAndRemove(id, function (err, emergencySupply) {
            if (err) {
                return error({
                    message: 'Error when deleting the emergencySupply.',
                    error: err
                });
            }
            return success();
        });
    }


}
