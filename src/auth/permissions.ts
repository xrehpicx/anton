import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

// Combine default statements for admin resources
const statement = {
  ...defaultStatements,
  // Additional custom resources (e.g., 'tool': ['list', 'execute']) can be declared here
} as const;

// Create an access control instance
export const ac = createAccessControl(statement);

// Define the admin role with all built-in permissions
export const admin_role = ac.newRole({
  ...adminAc.statements,
});

// Define a basic user role (no elevated permissions)
export const user_role = ac.newRole({
  // By default, no additional permissions beyond core auth
});
