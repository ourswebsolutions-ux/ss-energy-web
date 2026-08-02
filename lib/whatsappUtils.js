// WhatsApp Configuration
export const WHATSAPP_NUMBER = "923091419331"; // 👈 Apna WhatsApp Number Yahan Likhain

/**
 * Global Direct WhatsApp Order Function
 * @param {Object} product - Product details (title, price, originalPrice, savings, category, etc.)
 */
export const sendToWhatsApp = (product = {}) => {
  const title = product.title || product.name || "Product Inquiry";
  const price = product.discountedPrice || product.price || "N/A";
  const originalPrice = product.originalPrice ? ` (Original: ${product.originalPrice})` : "";
  const savings = product.savings ? `\n🎉 *Savings:* ${product.savings}` : "";
  const category = product.category ? `\n🏷️ *Category:* ${product.category.toUpperCase()}` : "";

  const textMessage = `*Assalamu Alaikum! I want to order this product:*

📦 *Product:* ${title}
💰 *Price:* ${price}${originalPrice}${savings}${category}

Please share payment & delivery details.`;

  const encodedMessage = encodeURIComponent(textMessage);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
};