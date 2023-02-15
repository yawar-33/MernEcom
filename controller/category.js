const { default: slugify } = require("slugify");
const Category = require("../models/category");

module.exports = {

    async addCategory(req, res) {
        const { id } = req.user;
        const { name, type, parentId, image } = req.body;
        try {
            const categoryObj = {
                name: name, slug: slugify(name), type: type, parentId: parentId, image: image, createdBy: id
            }
            const category = await Category.create(categoryObj)
            if (category) {
                res.status(200).send({ category })
            } else {
                res.status(400).send({ message: 'Something Went Wrong' })
            }
        }
        catch (error) {
            res.status(500).send(error)
        }
    },

    async getCategories(req, res) {
        try {
            const categories = await Category.find({})
            if (categories) {
                const categoryList = await createCategories(categories);
                res.status(200).send({ categoryList })
            } else {
                res.status(400).send({ message: 'No Record Found' })
            }
        } catch (error) {
            res.status(500).send(error)
        }
    },

    async deleteCategories(req, res) {
        const { ids } = req.body;
        const { id } = req.user;
        
        const deletedCategories = [];
        for (let i = 0; i < ids.length; i++) {
           
            const deleteCategory = await Category.findOneAndDelete({
                _id: ids[i],
                createdBy: id,
            });
            deletedCategories.push(deleteCategory);
        }

        if (deletedCategories.length == ids.length) {
            res.status(201).send({ message: "Categories removed" });
        } else {
            res.status(400).send({ message: "Something went wrong" });
        }
    },

}


function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => (cat.parentId === undefined || cat.parentId === "" || cat.parentId === null));
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            nodes: createCategories(categories, cate._id),
        });
    }

    return categoryList;
}