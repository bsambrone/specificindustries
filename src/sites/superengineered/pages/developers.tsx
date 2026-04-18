import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Developers — Super Engineered",
  description: "REST and GraphQL APIs for every Super Engineered device. Build on your toothbrush.",
}

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
}

const endpoints: Endpoint[] = [
  { method: "POST", path: "/v1/toothbrush/:id/sessions", description: "Create a new brushing session." },
  { method: "GET",  path: "/v1/toothbrush/:id/sessions/:session_id", description: "Retrieve a brushing session." },
  { method: "POST", path: "/v1/doorknob/:id/turns", description: "Record a turn event (grip ID required)." },
  { method: "GET",  path: "/v1/lightswitch/:id/state", description: "Retrieve current switch state (authenticated)." },
  { method: "PUT",  path: "/v1/lightswitch/:id/state", description: "Set switch state. Requires scope: switch:write." },
  { method: "POST", path: "/v1/spoon/:id/bites", description: "Log a bite. Pro subscription required." },
  { method: "GET",  path: "/v1/fleet/devices", description: "List devices in your organization's fleet." },
  { method: "POST", path: "/v1/fleet/firmware/rollouts", description: "Initiate a staged firmware rollout. Enterprise only." },
]

export default function SuperEngineeredDevelopers() {
  return (
    <main className="bg-background py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          Developer Platform
        </p>
        <h1 className="text-5xl md:text-6xl font-heading font-light text-primary text-center mb-4">
          Build on your essentials.
        </h1>
        <p className="text-xl text-primary/70 text-center max-w-3xl mx-auto mb-16">
          The Super Engineered API exposes first-class primitives for every object we ship. REST today. GraphQL in private beta. gRPC on the roadmap.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-light text-primary mb-4">Quickstart</h2>
          <pre className="bg-secondary rounded-2xl p-6 overflow-x-auto text-sm font-mono">
{`curl -X POST https://api.superengineered.example/v1/toothbrush/tb_01H.../sessions \\
  -H "Authorization: Bearer $SUPERENGINEERED_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "started_at": "2026-04-17T06:42:11Z",
    "duration_ms": 122000,
    "bristle_pattern": "adaptive-v4"
  }'`}
          </pre>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-light text-primary mb-6">Endpoints</h2>
          <div className="border border-primary/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-primary/70 uppercase text-xs tracking-widest">
                <tr>
                  <th className="text-left px-6 py-3">Method</th>
                  <th className="text-left px-6 py-3">Path</th>
                  <th className="text-left px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {endpoints.map((ep) => (
                  <tr key={ep.path}>
                    <td className="px-6 py-3 font-mono text-accent">{ep.method}</td>
                    <td className="px-6 py-3 font-mono text-primary">{ep.path}</td>
                    <td className="px-6 py-3 text-primary/70">{ep.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-heading font-light text-primary mb-4">Authentication</h2>
          <p className="text-primary/70 leading-relaxed mb-4">
            All API requests require a bearer token. Generate tokens in your Super Engineered console. Enterprise customers may configure OAuth 2.0 scopes per device family.
          </p>
          <div className="bg-secondary rounded-2xl p-6">
            <p className="text-sm font-medium text-primary mb-2">Scopes</p>
            <ul className="text-sm text-primary/70 space-y-1 font-mono">
              <li>toothbrush:read, toothbrush:write</li>
              <li>doorknob:read, doorknob:turn</li>
              <li>switch:read, switch:write</li>
              <li>spoon:bites:write</li>
              <li>fleet:admin</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-light text-primary mb-4">Rate Limits</h2>
          <p className="text-primary/70 leading-relaxed">
            Personal: 60 requests/minute per device. Pro: 600 req/min. Enterprise: negotiated. Exceeding your limit returns <code className="font-mono text-accent">429 Too Many Brushes</code>.
          </p>
        </section>
      </div>
    </main>
  )
}
