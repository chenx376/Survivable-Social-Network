var config = require('config');
let emailModel = require('../models/emailModel.js');
var singleton = require('../singleton.js');
var gmailService = singleton.getGmailService();
let userModel = require('../models/userModel.js');

module.exports = class emailDao {
    // /**
    //  * emailController.list()
    //  */
    // list(success, error){
    //     emailModel
    //         .find({})
    //         .populate('sender')
    //         .populate('receivers_group')
    //         .sort({created_at: -1})
    //         .exec(function (err, emails) {
    //             if (err){
    //                 return error({
    //                     message: 'Error when getting emailments.',
    //                     error: err
    //                 });
    //             }
    //             return success(emails)
    //         });
    // }

    /**
     * emailController.findById()
     */
    findById(id, success, error) {
        emailModel
            .findOne({_id: id})
            .populate('sender')
            .populate('receivers_group')
            .exec(function (err, email) {
                if (err){
                    return error({
                        message: 'Error when getting emails.',
                        error: err
                    });
                }
                // if (!email){
                //     return error({message: 'No such email'});
                // }
                return success(email._doc);
            });
    }

    /**
     * emailController.create()
     */
    create(emailObj, success, error) {
        let emailToCreate = emailModel(emailObj);
        emailToCreate.save(function (err, email) {
            if (err) {
                return error({
                    message: 'Error when creating email.',
                    error: err
                });
            }
            if (email.title == null || email.title == '' || email.title == undefined) {
                return error({
                    message: 'Email must have a title.',
                    error: err
                });
            }
            userModel.findOne({_id: emailObj.receivers_group[0]}, function (err, valid_receiver) {
                if (err) {
                    return error({
                        message: 'Error when getting user.',
                        error: err
                    });
                }
                if ((emailObj.receivers_group.length == 1) && (valid_receiver.email == null || valid_receiver.email == '')) {
                    return error({
                        message: 'The user has no email address.',
                        error: err
                    });
                }
                userModel.findOne({_id: emailObj.sender}, function (err, sender) {
                    if (err) {
                        return error({
                            message: 'Error when getting user',
                            error: err
                        });
                    }
                    emailObj.receivers_group.forEach(function(receiver_id){
                        userModel.findOne({_id: receiver_id}, function (err, receiver) {
                            if (err) {
                                return error({
                                    message: 'Error when getting user',
                                    error: err
                                });
                            }
                            let m_email = {
                                title : emailObj.title,
                                content : emailObj.content,
                                sender_name : sender.username,
                                receiver_email : receiver.email
                            }
                            gmailService.sendEMail(m_email);
                        });
                    });
                    return success(email._doc);
                });
            });


            // email.receivers_group.forEach(function(receiver){
            //     let email = {
            //         title : email.title,
            //         content : email.content,
            //         sender_name : email.sender.username,
            //         receiver_email : receiver.email
            //     }
            //     gmailService.sendEMail(email);
            // });



        });
    }

    // /**
    //  * emailController.update()
    //  */
    // update(emailToUpdate, success, error) {
    //
    //     emailModel.findOne({_id: emailToUpdate.id}, function (err, email) {
    //         if (err) {
    //             return error({
    //                 message: 'Error when getting email.',
    //                 error: err
    //             });
    //         }
    //         // if (!email) {
    //         //     return error({
    //         //         message: 'No such email.'
    //         //     });
    //         // }
    //
    //         email.id = emailToUpdate.id;
    //         email.title = emailToUpdate.title ? emailToUpdate.title : email.title;
    //         email.content = emailToUpdate.content ? emailToUpdate.content : email.content;
    //         email.created_at = emailToUpdate.created_at ? emailToUpdate.created_at : email.created_at;
    //         email.sender = emailToUpdate.sender ? emailToUpdate.sender : email.sender;
    //         email.receivers_group = emailToUpdate.receivers_group ? emailToUpdate.receivers_group : email.receivers_group;
    //
    //         email.save(function (err, email) {
    //             if (err) {
    //                 return error({
    //                     message: 'Error when updating email.',
    //                     error: err
    //                 });
    //             }
    //             return success(email);
    //         });
    //     });
    // }
    //
    // /**
    //  * emailController.remove()
    //  */
    // remove(id, success, error) {
    //
    //     emailModel.findByIdAndRemove(id, function (err, email) {
    //         if (err) {
    //             return error({
    //                 message: 'Error when deleting the email.',
    //                 error: err
    //             });
    //         }
    //         return success();
    //     });
    // }


}
