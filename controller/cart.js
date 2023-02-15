const Cart = require("../models/cart");
const { isNull } = require("../validators/nullcheck");
module.exports = {
    async addItemToCart(req, res) {
        const { id } = req.user;
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: id });          // check if user already have cart items
        if (cart) {
            // user items already exist in cart 
            const checkCartItems = cart.items.findIndex((item) => item.productId.toString() === productId);     // check if user current cart product is same 
            if (checkCartItems !== -1) {
                // update already added product
                cart.items[checkCartItems].quantity = quantity;
                await cart.save();
                res.status(200).send({ message: " Item updated successfully" })
            } else {
                // update user list with new item 
                cart.items.push({
                    productId: productId,
                    quantity: quantity
                });
                await cart.save();
                res.status(200).send({ message: " Item added to cart successfully" })
            }
        } else {
            const cartObj = { userId: id, items: [{ productId, quantity }] }
            const cartItem = await Cart.create(cartObj)
            if (cartItem) {
                res.status(200).send({ message: " Item added to cart successfully" })
            } else {
                res.status(400).send({ message: 'Something Went Wrong' })
            }

        }

    },

    async getCartWithProductDetails(req, res) {
        const { id } = req.user;
        const cart = await Cart.findOne({ userId: id }).populate('items.productId', 'name price pictures');
        if (cart) {
            res.status(200).send({ cart })
        } else {
            res.status(400).send({ message: 'Something Went Wrong' })
        }

    },

    async removeItemFromCart(req, res) {
        const { id } = req.user;
        const { cartId, productId } = req.body
        const cart = await Cart.findById({ _id: cartId, userId: id })
        if (!cart) {
            res.status(400).send({ message: "Can't find cart w.r.t user" })
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
            if (itemIndex === -1) {
                res.status(400).send({ message: "Can't find product" })
            } else {
                cart.items.splice(itemIndex, 1);
                await cart.save();
                res.status(200).send({ cart })
            }
        }

    }
}