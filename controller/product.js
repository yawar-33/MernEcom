const { default: slugify } = require("slugify");
const Product = require("../models/product");
const User = require("../models/user")

module.exports = {
    async addProduct(req, res) {
        const { id } = req.user;
        const { name, price, quantity, description, productPictures: [], category } = req.body;
        try {

            const productObj = {
                name: name, slug: slugify(name), price: price, quantity: quantity, description: description, category: category, createdBy: id
            }
            const product = await Product.create(productObj)
            if (product) {
                res.status(200).send({ product })
            } else {
                res.status(400).send({ message: 'Something Went Wrong' })
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    },

    async getProducts(req, res) {
        const { id } = req.user;
        const products = await Product.find({ createdBy: id })
            .select("_id name price quantity slug description productPictures category reviews")
            .populate({
                path: 'category',
                select:
                    '_id name',
            })
            .exec();

        res.status(200).send({ products });
    },

    async getProductById(req, res) {
        const { productId } = req.params;
        if (productId) {
            Product.findOne({ _id: productId }).exec((error, product) => {
                if (error) return res.status(400).send({ error });
                if (product) {
                    res.status(200).send({ product });
                }
            });
        } else {
            return res.status(400).send({ error: "Params required" });
        }
    },

    async findProductByCategoryId(req, res) {
        const { categoryId } = req.params;
        if (categoryId) {
            Product.find({ category: categoryId }).exec((error, product) => {
                if (error) return res.status(400).send({ error });
                if (product) {
                    res.status(200).send({ product });
                }
            });
        } else {
            return res.status(400).send({ error: "Params required" });
        }
    },

    async deleteProduct(res) {
        res.status(200).send({ message: "dlt products by" })
    },

    async addReview(req, res) {
        const { id } = req.user;
        const { productId, rating, review } = req.body
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send({ message: "Product not found" });

        const user = await User.findById(id);
        if (!user) return res.status(404).send({ message: "User not found" });

        const userHasAlreadyReviewed = product.reviews.some(
            (review) => review.userId.toString() === id
        );
        if (userHasAlreadyReviewed)
            return res.status(400).send({ message: "User has already reviewed this product" });

        const reviewPayload = {
            userId: id,
            rating: rating,
            review: review,
        };

        product.reviews.push(reviewPayload);

        try {
            const result = await product.save();
            res.send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}