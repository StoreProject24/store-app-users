import posthog from 'posthog-js'

/**
 * Eventos disponibles para trackear en la app.
 * Ampliar con nuevos eventos según crezca el producto.
 */
export type AnalyticsEvent =
  | 'product_viewed'
  | 'product_added_to_cart'
  | 'product_removed_from_cart'
  | 'cart_opened'
  | 'cart_cleared'
  | 'checkout_started'
  | 'sale_completed'
  | 'search_used'
  | 'category_filter_applied'
  | 'brand_filter_applied'
  | 'page_viewed'

export interface AnalyticsProperties {
  // Producto
  productId?: number
  productName?: string
  productPrice?: number
  categoryId?: number
  categoryName?: string
  brandId?: number
  brandName?: string
  combinationId?: number
  quantity?: number
  // Venta
  saleTotal?: number
  saleItemsCount?: number
  // Búsqueda / filtros
  searchQuery?: string
  // Página
  pageName?: string
  pageUrl?: string
  // Extra
  [key: string]: unknown
}

const useAnalytics = () => {
  /**
   * Envía un evento a PostHog.
   * El storeId ya viene del grupo asignado en useGetStore via
   * posthog.group(), así que no hace falta pasarlo manualmente aquí.
   */
  const track = (event: AnalyticsEvent, properties?: AnalyticsProperties) => {
    // posthog.capture(event, {
    //   data: properties
    // })
  }

  /**
   * Identifica al usuario en PostHog.
   * Útil si en el futuro se agrega autenticación de usuarios.
   */
  const identify = (userId: string, traits?: Record<string, unknown>) => {
    // posthog.identify(userId, traits)
  }

  /**
   * Resetea la identidad del usuario (logout).
   */
  const reset = () => {
    // posthog.reset()
  }

  return { track, identify, reset }
}

export default useAnalytics
