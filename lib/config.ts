export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://SITE_DOMAIN';
export const etsyListingUrl = process.env.NEXT_PUBLIC_ETSY_LISTING_URL || '#printable';
export const etsyBundleUrl = process.env.NEXT_PUBLIC_ETSY_BUNDLE_URL || '#bundle';
export const vipCode = process.env.NEXT_PUBLIC_VIP_CODE || 'DOPA-MENU-VIP';
export const shareUrl = `${siteUrl.replace(/\/$/, '')}/share`;
