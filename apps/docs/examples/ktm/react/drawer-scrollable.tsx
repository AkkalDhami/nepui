import { Button } from "@/registry/react/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/react/drawer"

export default function DrawerScrollableDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Drawer
      </DrawerTrigger>
      <DrawerContent
        style={{ "--np-drawer-height": "60dvh" } as React.CSSProperties}
      >
        <DrawerHeader>
          <DrawerTitle>Terms of service</DrawerTitle>
          <DrawerDescription>Read to the end.</DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          {Array.from({ length: 12 }).map((_, index) => (
            <p key={index} style={{ margin: "0 0 0.75rem" }}>
              Paragraph {index + 1}. Scroll this area; the header and the footer
              stay in view.
            </p>
          ))}
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Accept</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
