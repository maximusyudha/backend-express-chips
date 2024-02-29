const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }
});

productSchema.add({ id: { type: Number, unique: true } });

productSchema.pre('save', function(next) {
    var doc = this;
    // Find the largest id in the collection
    mongoose.model('Product').find({}, 'id').sort({ id: -1 }).limit(1).exec()
        .then(result => {
            var largestId = 0;
            if (result.length > 0) {
                largestId = result[0].id;
            }
            doc.id = largestId + 1; // Increment the id
            next();
        })
        .catch(err => next(err));
});


module.exports = mongoose.model('Product', productSchema);
