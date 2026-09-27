import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Playground } from "@/components/playground"
import { CodePreferencesDialog } from "@/components/playground/code-preferences-dialog"
import { capitalize } from "@/lib/capatilize"
import { getRegistryItem } from "@/lib/registry"
import { Playground } from "@/components/playground"
import { CodePreferencesDialog } from "@/components/playground/code-preferences-dialog"
import { capitalize } from "@/lib/capatilize"
import { getRegistryItem } from "@/lib/registry"
import { Playground } from "@/components/playground"
import { CodePreferencesDialog } from "@/components/playground/code-preferences-dialog"
import { capitalize } from "@/lib/capatilize"
import { getRegistryItem } from "@/lib/registry"

type Params = {
  target: string
  component: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { target, component } = await params
  const capitalizedComponent = capitalize(component)

  return {
    title: `${capitalizedComponent} | ${capitalize(target)} | Playground`,
    description: `Preview the ${capitalizedComponent} component for ${target}.`,
  }
}

export default async function Page(
  props: PageProps<"/playground/[target]/[component]">
) {
  const { params } = props
  const { component, target } = await params

  const registry = await getRegistryItem(target, component)

  if (!registry) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-wrap justify-between gap-2">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Playground</h1>

          {registry.description && (
            <p className="text-muted-foreground">
              Edit the component and see the result instantly.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <CodePreferencesDialog />

          <Link
            href={`/docs/components/${target}/${component}`}
            className="text-sm text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
          >
            View Docs
          </Link>
        </div>
      </div>

      <Playground
        name={registry.name}
        title={registry.title}
        files={registry.files}
      />
    </main>
  )
}
