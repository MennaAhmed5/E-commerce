const stripe = require('stripe')(process.env.STRIPE_KEY);
const Cart = require('../models/Cartmodel');


exports.getCheckout = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return ('Cart Not found');
        }

        let cartPrice = cart.items.reduce((total, item) => total + item.price, 0);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'egp',
                    product_data: {
                        name: req.user.name,
                    },
                    unit_amount: Math.round(cartPrice * 100), 
                },
                quantity: 1,
            }],
            mode: 'payment',
            customer_email: req.user.email,
            success_url: `${req.protocol}://${req.get('host')}/orders`,
            cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        });
        res.status(200).json({ status: 'Success', session });
    } catch (error) {
        next(error);
    }
};



