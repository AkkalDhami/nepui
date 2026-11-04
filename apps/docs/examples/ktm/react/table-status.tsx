"use client"

import { DotsThreeIcon } from "@phosphor-icons/react"

import { Badge } from "@/registry/react/badge"
import { Button } from "@/registry/react/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/react/table"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/react/menu"

export default function TableStatusDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "36rem" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align="end">Price</TableHead>
            <TableHead align="end" style={{ width: "3rem" }}>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>Wireless Mouse</TableCell>
            <TableCell>
              <Badge variant="success" appearance="light">
                In stock
              </Badge>
            </TableCell>
            <TableCell align="end">$29.99</TableCell>
            <TableCell align="end">
              <Menu>
                <MenuTrigger
                  render={
                    <Button variant="ghost" size="icon-sm">
                      <DotsThreeIcon />
                    </Button>
                  }
                />
                <MenuContent align="end">
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Duplicate</MenuItem>
                  <MenuSeparator />
                  <MenuItem variant="destructive">Delete</MenuItem>
                </MenuContent>
              </Menu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>
              Mechanical Keyboard
            </TableCell>
            <TableCell>
              <Badge variant="warning" appearance="light">
                Low stock
              </Badge>
            </TableCell>
            <TableCell align="end">$129.99</TableCell>
            <TableCell align="end">
              <Menu>
                <MenuTrigger
                  render={
                    <Button variant="ghost" size="icon-sm">
                      <DotsThreeIcon />
                    </Button>
                  }
                />
                <MenuContent align="end">
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Duplicate</MenuItem>
                  <MenuSeparator />
                  <MenuItem variant="destructive">Delete</MenuItem>
                </MenuContent>
              </Menu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>USB-C Hub</TableCell>
            <TableCell>
              <Badge variant="destructive" appearance="light">
                Out of stock
              </Badge>
            </TableCell>
            <TableCell align="end">$49.99</TableCell>
            <TableCell align="end">
              <Menu>
                <MenuTrigger
                  render={
                    <Button variant="ghost" size="icon-sm">
                      <DotsThreeIcon />
                    </Button>
                  }
                />
                <MenuContent align="end">
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Duplicate</MenuItem>
                  <MenuSeparator />
                  <MenuItem variant="destructive">Delete</MenuItem>
                </MenuContent>
              </Menu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
