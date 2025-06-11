// lightweight way to expose /orders/:id/items and ?status=delivered|cancelled
module.exports = (req, res, next) => {
  const match = req.path.match(/^\/orders\/(\d+)\/items$/);
  if (!match) return next();

  const wantedId   = Number(match[1]);
  const status     = (req.query.status || 'delivered').toLowerCase(); // default

  const db    = require('./db.json');
  const order = db.orders.find(o => o.order_id === wantedId);

  if (!order) return res.status(404).jsonp({ error: 'Order not found' });
  return res.jsonp(order.return_items?.[status] || []);
};

