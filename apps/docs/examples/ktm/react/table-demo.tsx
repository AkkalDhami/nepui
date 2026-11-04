"use client"

import { Badge } from "@/registry/react/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/react/table"

export default function TableDemo() {
  return (
    <div style={{ width: "100%", maxWidth: "36rem" }}>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: "6.25rem" }}>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead align="end">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>INV001</TableCell>
            <TableCell>
              <Badge variant="success" appearance="light" dot>
                Paid
              </Badge>
            </TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell align="end">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>INV002</TableCell>
            <TableCell>
              <Badge variant="warning" appearance="light" dot>
                Pending
              </Badge>
            </TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell align="end">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>INV003</TableCell>
            <TableCell>
              <Badge variant="destructive" appearance="light" dot>
                Unpaid
              </Badge>
            </TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell align="end">$300.00</TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>INV003</TableCell>
            <TableCell>
              <Badge variant="success" appearance="light" dot>
                Paid
              </Badge>
            </TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell align="end">$100.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="end">$800.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
