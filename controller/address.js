
const UserAddress = require("../models/address");
const { isNull } = require("../validators/nullcheck");
module.exports = {
    async createAddress(req, res) {

        const { id } = req.user
        const { _id, address1, address2, city, state, zipCode, addressType } = req.body;
        const addressPayload = {
            address1: address1, address2: address2, city: city, state: state, zipCode: zipCode, addressType: addressType
        };
        let model = {
            userId: id,
            address: [addressPayload]
        }
        const checkIfUserExist = await UserAddress.findOne({ userId: id });
        if (checkIfUserExist) {
            const checkAddressType = checkIfUserExist.address.findIndex((item) => item.addressType.toString() === addressPayload.addressType);
            if (checkAddressType !== -1) {
                checkIfUserExist.address[checkAddressType] = addressPayload
                await checkIfUserExist.save()
                res.status(200).send({ message: " Item updated successfully" })
            } else {
                checkIfUserExist.address.push(addressPayload);
                await checkIfUserExist.save()
                res.status(200).send({ message: " Item added successfully" })
            }

        } else {
            const useraddress = await UserAddress.create(model)
            if (useraddress) {
                res.status(200).send({ useraddress })
            } else {
                res.status(400).send({ message: 'Something Went Wrong' })
            }
        }



    },

    async getAddress(req, res) {
        const useraddress = await UserAddress.findOne({ user: req.user._id });
        if (useraddress) {
            res.status(400).send({ useraddress })
        }else{
            res.status(400).send({ message: 'address not found' })
        }
    }
}