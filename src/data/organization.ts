import type { OrgNode, OrgScope } from '@/types';
import { employees } from './employees';
import { entities } from './entities';

/** Builds the reporting tree from `employees.reportsTo` so hierarchy is defined once. */
function buildTree(rootId: string): OrgNode {
  const employee = employees.find((item) => item.id === rootId);

  const node: OrgNode = {
    id: rootId,
    employeeId: rootId,
    name: employee?.name ?? 'Unassigned',
    role: employee?.position ?? '',
    unit: employee?.department ?? '',
    entityId: employee?.entityId === 'GROUP' ? null : (employee?.entityId ?? null),
    children: employees
      .filter((item) => item.reportsTo === rootId)
      .map((item) => buildTree(item.id)),
  };

  return node;
}

/**
 * Scopes shown in the organisation chart switcher. Each entity scope roots at
 * that entity's managing director rather than the group CEO.
 */
export const orgScopes: OrgScope[] = [
  {
    id: 'GROUP',
    label: 'Whole Company',
    description:
      'The full group reporting line, from the Chief Executive through the three operating entities and the corporate functions.',
    root: buildTree('emp-001'),
  },
  ...entities.map((entity) => {
    const md = employees.find(
      (employee) => employee.entityId === entity.id && employee.department === 'Executive',
    );
    return {
      id: entity.id,
      label: entity.name,
      description: `${entity.fullName} — ${entity.employees.toLocaleString('en-GB')} employees, headquartered in ${entity.headquarters}.`,
      root: buildTree(md?.id ?? 'emp-001'),
    };
  }),
];

export function getScope(id: string) {
  return orgScopes.find((scope) => scope.id === id) ?? orgScopes[0];
}
