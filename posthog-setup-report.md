<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog was already initialized in `main.tsx` with `PostHogProvider`, `PostHogErrorBoundary`, and a custom `useAnalytics` hook. The integration was extended with two new tracking callsites in `src/components/cart/index.tsx`: `product_removed_from_cart` is now fired when the trash button is clicked (previously only tracked via quantity decrease), and `cart_cleared` is fired after a successful sale clears the cart. Environment variables were updated to the correct PostHog token and host values.

| Event | Description | File |
|---|---|---|
| `page_viewed` | Fired on every route change | `src/App.tsx` |
| `product_viewed` | Fired when a product detail page loads with product data | `src/pages/products/modules/product/index.tsx` |
| `product_added_to_cart` | Fired when a product or variant is added to the cart | `src/hooks/useCart.ts` |
| `product_removed_from_cart` | Fired when a product is removed via quantity decrease or trash button | `src/hooks/useCart.ts`, `src/components/cart/index.tsx` *(extended)* |
| `cart_opened` | Fired when the cart sheet/drawer is opened from the navbar | `src/components/navbar/index.tsx` |
| `cart_cleared` | Fired when the cart is cleared after a successful sale | `src/components/cart/index.tsx` *(new)* |
| `checkout_started` | Fired when the user clicks "Enviar pedido" to begin checkout | `src/components/cart/index.tsx` |
| `sale_completed` | Fired on successful sale creation via the API | `src/hooks/useCreateSale.ts` |
| `search_used` | Fired when the user submits a non-empty debounced search query | `src/pages/products/components/searchProducts/index.tsx` |
| `category_filter_applied` | Fired when one or more category filters are selected | `src/pages/products/components/selectCategories/index.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://us.posthog.com/project/407108/dashboard/1537279)
- [Checkout Conversion Funnel](https://us.posthog.com/project/407108/insights/KczrTAob) — product viewed → added to cart → checkout started → sale completed
- [Sales & Cart Engagement Over Time](https://us.posthog.com/project/407108/insights/bcyHujdo) — daily trend of cart opens, checkout starts, and completed sales
- [Top Search Queries](https://us.posthog.com/project/407108/insights/Cm7WYvbu) — most common search terms used by shoppers
- [Most Viewed Products](https://us.posthog.com/project/407108/insights/hvP22Hhz) — top products by view count
- [Revenue from Completed Sales](https://us.posthog.com/project/407108/insights/hITOtwv3) — total revenue (saleTotal) over time as an area chart

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
