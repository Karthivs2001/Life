import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { isAdmin, isAuth } from '../utils';
import { OrderModel } from '../models/order.model';
import { ProductModel } from '../models/product.model';
import { Document } from 'mongoose';

export const orderRouter = express.Router();
const PDFDocument = require('pdfkit');

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find().populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await OrderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await ProductModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  '/hisotry',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    if (req.body.items.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const createdOrder = await OrderModel.create({
        items: req.body.items.map((x: any) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      res.status(201).send(createdOrder);
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.get('/:id/download-report', async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;

    // Fetch the specific order from the database
    const order = await OrderModel.findById(orderId).populate('items.product').populate('user');

    if (!order) {
      return res.status(404).send('Order not found');
    }

    // Create a new PDF document
    const pdfDoc = new PDFDocument();

    // Add content to the PDF
    pdfDoc.fontSize(16).text('Order Report', { align: 'center' });
    pdfDoc.fontSize(12).text(`Order ID: ${orderId}`);
    
    const user = (order.user as User)?.email;
    pdfDoc.fontSize(12).text(`User: ${user}`);

    const shippingAddress = order.shippingAddress ?? {};
    pdfDoc.fontSize(12).text(`Delivery Address: ${shippingAddress.address ?? 'N/A'}`);

    pdfDoc.fontSize(12).text('Order Details:');

    order.items.forEach((item) => {
      pdfDoc.fontSize(12).text(`- Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`);
    });

    pdfDoc.fontSize(12).text(`Total Price: ${order.totalPrice}`);
    pdfDoc.fontSize(12).text(`Mode of Payment: ${order.paymentMethod}`);
    pdfDoc.fontSize(12).text(`Order Status: ${order.isDelivered ? 'Delivered' : 'Not Delivered'}`);

    // Set headers for the response to trigger download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=order-report-${orderId}.pdf`);

    // Pipe the PDF document directly to the response stream
    pdfDoc.pipe(res);

    // End the PDF document
    pdfDoc.end();
  } catch (error) {
    console.error('Error generating the report:', error);
    res.status(500).send('Internal Server Error');
  }
})

// orderRouter.put(
//   '/:id/pay',
//   isAuth,
//   asyncHandler(async (req: Request, res: Response) => {
//     const order = await OrderModel.findById(req.params.id).populate('user');

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = new Date(Date.now());
//       order.paymentResult = {
//         paymentId: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await order.save();

//       res.send(updatedOrder);
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// orderRouter.put(
//   '/:id/deliver',
//   isAuth,
//   isAdmin,
//   asyncHandler(async (req: Request, res: Response) => {
//     const order = await OrderModel.findById(req.params.id);
//     if (order) {
//       order.isDelivered = true;
//       order.deliveredAt = new Date(Date.now());
//       // order.deliveredAt = Date.now();

//       const updatedOrder = await order.save();
//       res.send({ message: 'Order Delivered', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );

orderRouter.delete(
  '/cancel/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const userId = req.user._id; // Assuming your user ID is available in the req.user object

    const order = await OrderModel.findById(orderId);

    if (order) {
      // Check if the authenticated user is the owner of the order
      if (typeof order.user === 'string' && order.user === userId) {
        // Allow cancellation
        const deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
      } else if (isDocument(order.user) && order.user.equals(userId)) {
        // Allow cancellation
        const deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
      } else {
        // User is not the owner of the order
        res.status(403).send({ message: 'Unauthorized: You do not have permission to cancel this order' });
      }
    } else {
      // Order not found
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// Type guard to check if an object is a Mongoose Document
function isDocument(obj: any): obj is Document {
  return obj && typeof obj.equals === 'function';
}

