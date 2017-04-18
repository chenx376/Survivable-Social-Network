var expect = require('expect.js');
let EmergencySupplyDao = require('../../dao/emergencySupplyDao.js')
let emergencySupplyDao;
var ConnectionController = require('../../controllers/connection-controller.js');
var conn;
var tmp_id;
var tmp_time_stamp;
var tmp_user_id;
let UserDAO = require('../../dao/userDao.js');
let userDao;
var createHash = require('sha.js');

suite('EmergencySupply Tests', function(){

    suiteSetup('Setup DB Connection', function(done){
        conn = new ConnectionController();
        emergencySupplyDao = new EmergencySupplyDao();
        tmp_time_stamp = new Date();

        userDao = new UserDAO();

        var sha256 = createHash('sha256');
        var shapassword = sha256.update('123456', 'utf8').digest('hex');

        let user = {
            username : 'emergencySupplyUser',
            email : 'emergencySupply@website.com',
            password : shapassword,
            created_at : '1489962761679',
            updated_at : '1489962761679',
            role : 'CITIZEN',
            location : 'Mountain View'
        };

        userDao.create(user, function(user){
            tmp_user_id = user._id;
            done();
        }, function(error){
            done();
        });

    });

    test('Creating an emergency supply', function(done){

        let emergencySupply  = {
            supplier : tmp_user_id,
            supplyname: 'Emergency Supply',
            created_at : tmp_time_stamp,
            location_text : '2326 California Street, Mountain View',
            location_lat: 999,
            location_lng: 999,
            type: 'Medicine'
        };

        emergencySupplyDao.create(emergencySupply, function (created) {
            tmp_id = created._id;
            expect(created.supplyname).to.eql('Emergency Supply');
            expect(created.supplier).to.eql(tmp_user_id);
            expect(created.created_at).to.eql(tmp_time_stamp);
            expect(created.location_text).to.eql('2326 California Street, Mountain View');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Listing emergency supplies', function(done){
        emergencySupplyDao.list(function (emergencySupplies) {
            expect(emergencySupplies).to.be.an('array');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding an emergencySupply by USER ID', function(done){
        let user_id = tmp_user_id;
        emergencySupplyDao.suppliesByUser(user_id, function (found) {
            expect(found).to.be.an('array');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Finding an emergencySupply by ID', function(done){
        let id = tmp_id;
        emergencySupplyDao.findById(id, function (found) {
            expect(found.supplyname).to.eql('Emergency Supply');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating an emergencySupply without change', function(done){
        new_time_stamp = new Date();
        let emergencySupply = {
            id : tmp_id,
        };

        emergencySupplyDao.update(emergencySupply, function (updated) {
            expect(updated.supplyname).to.eql('Emergency Supply');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Updating an emergencySupply', function(done){
        new_time_stamp = new Date();
        let emergencySupply  = {
            id: tmp_id,
            supplier : tmp_user_id,
            supplyname: 'New Emergency Supply',
            created_at : new_time_stamp,
            location_text : '2326 California Street, Mountain View',
            location_lat: 999,
            location_lng: 999,
            type: 'New Type'
        };

        emergencySupplyDao.update(emergencySupply, function (updated) {
            expect(updated.supplyname).to.eql('New Emergency Supply');
            expect(updated.supplier).to.eql(tmp_user_id);
            expect(updated.created_at).to.eql(new_time_stamp);
            expect(updated.type).to.eql('New Type');
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Removing an emergencySupply', function(done){
        emergencySupplyDao.remove(tmp_id, function () {
            done();
        }, function (error) {
            expect(error).to.be(undefined);
            done();
        });
    });

    test('Error Case - Finding an emergencySupply by Invalid ID', function(done){
        let id = 'invalid id';
        emergencySupplyDao.findById(id, function (emergency) {
            expect('Error Case').to.eql('Should not go to here');
            done();
        }, function (error) {
            expect(error.message).to.eql('Error when getting emergencySupplies.');
            done();
        });
    });

    test('Error Case - Updating an invalid emergencySupply', function(done){
        let emergencySupply = {
            id : 'invalid id',
            supplyname: 'Emergency Supply',
            created_at : tmp_time_stamp,
            location : '2326 California Street, Mountain View',
            location_lat: 999,
            location_lng: 999,
            type: 'Type'
        };

        emergencySupplyDao.update(emergencySupply, function (updated) {
            expect('Error Case').to.eql('Should not go here');
            done();
        }, function (error) {
            expect(error.message).to.eql('Error when getting emergencySupply.');
            done();
        });
    });

    test('Error Case - Removing an emergencySupply of Invalid ID', function(done){
        emergencySupplyDao.remove('invalidID', function (emergency) {
            done();
        }, function (error) {
            expect(error.message).to.be('Error when deleting the emergencySupply.');
            done();
        });
    });

    suiteTeardown('Teardown DB Connection', function(done){
        conn.disconnect();
        done();
    });

})
