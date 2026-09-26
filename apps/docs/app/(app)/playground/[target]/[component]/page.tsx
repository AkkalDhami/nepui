import { Playground } from "@/components/playground"
import { getRegistryItem } from "@/lib/registry"
import { notFound } from "next/navigation"

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
    <main className="container mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Playground</h1>

        {registry.description && (
          <p className="mt-2 text-muted-foreground">
            {/* {registry.description} */}
            Edit the component and see the result instantly.
          </p>
        )}
      </div>

      <Playground
        name={registry.name}
        title={registry.title}
        files={registry.files}
      />
    </main>
  )
}
