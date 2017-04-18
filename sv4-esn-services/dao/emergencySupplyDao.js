/**
 * Created by arthurm.
 */

var config = require('config');
let emergencySupplyModel = require('../models/emergencySupplyModel.js');

var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyAHkwtxgDpDMqFvDtTl4JXxt-ldAH08Kvs', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

module.exports = class EmergencySupplyDao {
    /**
     * emergencySupplyController.list()
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
     * emergencySupplyController.findById()
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
     * emergencySupplyController.create()
     */
    create(emergencySupplyObj, success, error) {

        let emergencySupplyToCreate = emergencySupplyModel(emergencySupplyObj);

        /**
         * Implementing Geocoder API to convert address into lat / long
         */
        if(emergencySupplyObj.location_text) {
            geocoder.geocode('29 champs elysée paris', function(err, res) {
                console.log(res);
            });
        }

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
     * emergencySupplyController.update()
     */
    update(emergencySupplyToUpdate, success, error) {

        console.log('Calling update emergency supply: ' + emergencySupplyToUpdate.id);
        emergencySupplyModel.findOne({_id: emergencySupplyToUpdate.id}, function (err, found) {
            if (err) {
                return error({
                    message: 'Error when getting emergencySupply.',
                    error: err
                });
            }

            found.id = emergencySupplyToUpdate.id;
            found.supplier = (emergencySupplyToUpdate.supplier) ? emergencySupplyToUpdate.supplier : found.supplier;
            found.supplyname = emergencySupplyToUpdate.supplyname ? emergencySupplyToUpdate.supplyname : found.supplyname;
            found.location_text = emergencySupplyToUpdate.location_text ? emergencySupplyToUpdate.location_text : found.location_text;
            found.location_lat = emergencySupplyToUpdate.location_lat ? emergencySupplyToUpdate.location_lat : found.location_lat;
            found.location_lng = emergencySupplyToUpdate.location_lng ? emergencySupplyToUpdate.location_lng : found.location_lng;
            found.type = emergencySupplyToUpdate.type ? emergencySupplyToUpdate.type : found.type;
            found.created_at = emergencySupplyToUpdate.created_at ? emergencySupplyToUpdate.created_at : found.created_at;

            found.save(function (err, updated) {
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
     * emergencySupplyController.remove()
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
