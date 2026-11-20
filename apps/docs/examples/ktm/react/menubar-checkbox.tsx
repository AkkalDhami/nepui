"use client"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from "@/registry/react/menubar"

export default function MenubarCheckbox() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarCheckboxItem defaultChecked>
              Bookmarks Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem>Full URLs</MenubarCheckboxItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Text</MenubarLabel>
            <MenubarCheckboxItem defaultChecked>
              Strikethrough
            </MenubarCheckboxItem>
            <MenubarCheckboxItem>Code</MenubarCheckboxItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
