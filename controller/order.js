const Order = require("../models/order");

module.exports = {
    async addOrder(req, res) {
        const { id } = req.user;


        const { addressId, totalAmount, items, paymentType, orderStatus } = req.body;

        try {
            const orderObject = {
                userId: id, addressId: addressId, totalAmount: totalAmount, items: items, paymentType: paymentType, orderStatus: orderStatus
            };

            const order = await Order.create(orderObject)
            if (order) {
                res.status(200).send({ order })
            } else {
                res.status(400).send({ message: 'Something Went Wrong' })
            }

        } catch (error) {
            res.status(400).send({ error });
        }
    },

    async getOrderList(req, res) {
        const { id } = req.user
        try {
            const orders = await Order.find({ userId: id })
                .select("_id paymentStatus paymentType orderStatus items")
                .populate("items.productId", "_id name ");

            if (orders) {
                res.status(200).json({ orders });
            } else {
                return res.status(400).json({ message: 'no data found' });
            }
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    async getOrderDetailById(req, res) {
        const { orderId } = req.params;

        if (orderId) {
            try {
                const orderData = await Order.findOne({ _id: orderId })
                    .populate('userId', 'userName')
                    .populate('items.productId', "name description price")
                if (orderData) {
                    res.status(200).send({ orderData });
                } else {
                    return res.status(400).send({ message: 'data not found' });
                }

            } catch (error) {
                return res.status(400).send({ error });
            }

        } else {
            return res.status(400).send({ error: "Params required" });
        }
    },


    async updateOrderStatus(req, res) {
        const { orderId, status } = req.body;
        try {
            const order = await Order.findById({ _id: orderId });
            if (!order) {
                return res.status(404).send({ message: 'Order not found' });
            }
            const newStatus = {
                type: status,
                date: new Date(),
                isCompleted: true
            };
            order.orderStatus.push(newStatus);
            await order.save();
            res.status(200).send(order);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
}