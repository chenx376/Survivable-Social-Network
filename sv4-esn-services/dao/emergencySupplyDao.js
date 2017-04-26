/**
 * Created by arthurm.
 */

var config = require('config');
let emergencySupplyModel = require('../models/emergencySupplyModel.js');

var ObjectId = require('mongoose').Types.ObjectId;

var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'http', // Default
    //apiKey: 'AIzaSyAHkwtxgDpDMqFvDtTl4JXxt-ldAH08Kvs', // for Mapquest, OpenCage, Google Premier
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
    };

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
    };

    /**
     * emergencySupplyController.create()
     */
    create(emergencySupplyObj, success, error) {


        /**
         * Implementing Geocoder API to convert address into lat / long
         */
        if(emergencySupplyObj.location_text) {
            geocoder.geocode(emergencySupplyObj.location_text, function(err, res) {
                //console.log(res);
                if(res && res.length > 0) {
                    emergencySupplyObj.location_lat = res[0].latitude.toString();
                    emergencySupplyObj.location_lng = res[0].longitude.toString();
                }
                let emergencySupplyToCreate = emergencySupplyModel(emergencySupplyObj);
                emergencySupplyToCreate.save(function (err, emergencySupply) {
                    return success(emergencySupply._doc);
                });
            });
        } else {
            let emergencySupplyToCreate = emergencySupplyModel(emergencySupplyObj);
            emergencySupplyToCreate.save(function (err, emergencySupply) {
                return success(emergencySupply._doc);
            });
        }
    };

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
    };

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
    };

    /**
     * emergencyDao.retrieveMySharedSupplies
     */
    suppliesByUser(uid1, success, error) {

        /**
         * Find all supplies where
         * uid1 is supplier
         */

        emergencySupplyModel.find({supplier: new ObjectId(uid1)})
            .populate('supplier')
            .exec(/*success*/ function(err, data1){

                if(err){
                    return error({
                        message: 'Error when finding the emergencySupply.',
                        error: err
                    });
                }

                if(data1)
                    return success(data1);
                else
                    return error({
                        message: 'Error when finding the emergencySupply.',
                        error: err
                    });
            });

    };

}
