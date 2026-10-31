"use client"

import { useState } from "react"

import { Checkbox } from "@/registry/react/checkbox"
import { CheckboxGroup } from "@/registry/react/checkbox-group"
import { Label } from "@/registry/react/label"

const mainPermissions = ["view-dashboard", "manage-users", "access-reports"]
const userManagementPermissions = [
  "create-user",
  "edit-user",
  "delete-user",
  "assign-roles",
]

export default function CheckboxGroupNested() {
  const [mainValue, setMainValue] = useState<string[]>([])
  const [managementValue, setManagementValue] = useState<string[]>([])

  const mainIsChecked = mainValue.length === mainPermissions.length

  const mainIsPartial =
    !mainIsChecked && (mainValue.length > 0 || managementValue.length > 0)

  const managementIsChecked =
    managementValue.length === userManagementPermissions.length

  const managementIsPartial = managementValue.length > 0 && !managementIsChecked

  function handleMainChange(value: string[]) {
    const manageUsersChecked = value.includes("manage-users")

    setMainValue(value)
    setManagementValue(manageUsersChecked ? userManagementPermissions : [])
  }

  function handleManagementChange(value: string[]) {
    setManagementValue(value)

    setMainValue((prev) => {
      const withoutManageUsers = prev.filter(
        (permission) => permission !== "manage-users"
      )

      return value.length === userManagementPermissions.length
        ? [...withoutManageUsers, "manage-users"]
        : withoutManageUsers
    })
  }

  return (
    <CheckboxGroup
      allValues={mainPermissions}
      aria-labelledby="user-permissions-caption"
      onValueChange={handleMainChange}
      value={mainValue}
    >
      <Label id="user-permissions-caption">
        <Checkbox indeterminate={mainIsPartial} parent />
        User Permissions
      </Label>

      <Label className="np-checkbox-group-child">
        <Checkbox value="view-dashboard" />
        View Dashboard
      </Label>

      <Label className="np-checkbox-group-child">
        <Checkbox value="access-reports" />
        Access Reports
      </Label>

      <CheckboxGroup
        allValues={userManagementPermissions}
        aria-labelledby="manage-users-caption"
        className="np-checkbox-group-child"
        onValueChange={handleManagementChange}
        value={managementValue}
      >
        <Label id="manage-users-caption">
          <Checkbox indeterminate={managementIsPartial} parent />
          Manage Users
        </Label>

        <Label className="np-checkbox-group-child">
          <Checkbox value="create-user" />
          Create User
        </Label>

        <Label className="np-checkbox-group-child">
          <Checkbox value="edit-user" />
          Edit User
        </Label>

        <Label className="np-checkbox-group-child">
          <Checkbox value="delete-user" />
          Delete User
        </Label>

        <Label className="np-checkbox-group-child">
          <Checkbox value="assign-roles" />
          Assign Roles
        </Label>
      </CheckboxGroup>
    </CheckboxGroup>
  )
}
