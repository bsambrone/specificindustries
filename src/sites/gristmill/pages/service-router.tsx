import ArmPage from "./arm-page"
import ServiceDetailPage from "./service-detail"

interface ServiceRouterProps {
  slug: string
  segments?: string[]
}

export default function ServiceRouter({ slug, segments }: ServiceRouterProps) {
  if (segments && segments.length === 2) {
    return <ServiceDetailPage armSlug={segments[0]} serviceSlug={segments[1]} />
  }
  return <ArmPage slug={slug} />
}
