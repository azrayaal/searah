import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { entityLabel } from '@/components/features/directory/EmployeeCard';
import { cn } from '@/lib/cn';
import type { OrgNode } from '@/types';

interface OrgTreeProps {
  root: OrgNode;
  /** Directory route the nodes deep-link into. */
  directoryPath?: string;
  className?: string;
}

/** Flattens the tree into ids — used for expand-all and headcount. */
function collectIds(node: OrgNode): string[] {
  return [node.id, ...node.children.flatMap(collectIds)];
}

/** Root plus its immediate children are open by default; deeper levels are not. */
function defaultOpen(root: OrgNode): Set<string> {
  return new Set([root.id, ...root.children.map((child) => child.id)]);
}

interface TreeNodeProps {
  node: OrgNode;
  level: number;
  index: number;
  siblings: number;
  open: Set<string>;
  toggle: (id: string) => void;
  directoryPath: string;
}

/**
 * One box in the chart, with the elbow that ties it to its parent drawn above it.
 * The horizontal rail is assembled from each child's own half-segments: the first
 * child draws only its right half, the last only its left, so the rail spans exactly
 * from the first sibling's centre to the last — no measuring, no SVG.
 */
function TreeNode({ node, level, index, siblings, open, toggle, directoryPath }: TreeNodeProps) {
  const hasChildren = node.children.length > 0;
  const expanded = hasChildren && open.has(node.id);
  const root = level === 1;

  const first = index === 0;
  const last = index === siblings - 1;
  const only = siblings === 1;

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-level={level}
      className="relative flex flex-col items-center px-3"
    >
      {!root ? (
        <>
          {/* Rail shared with the siblings, then the drop into this box */}
          {!only ? (
            <span
              aria-hidden
              className={cn(
                'absolute top-0 h-px bg-hairline',
                first && 'left-1/2 right-0',
                last && 'left-0 right-1/2',
                !first && !last && 'left-0 right-0',
              )}
            />
          ) : null}
          <span aria-hidden className="h-6 w-px shrink-0 bg-hairline" />
        </>
      ) : null}

      <div
        className={cn(
          'group relative flex w-[228px] flex-col rounded-card border bg-white p-4 text-center transition-colors duration-300',
          'hover:border-ocean/40 hover:bg-sky-faint',
          root ? 'border-navy-deep/20 shadow-raised' : 'border-hairline',
        )}
      >
        <Link to={`${directoryPath}?person=${node.employeeId}`} className="min-w-0">
          <span className="block truncate text-body-sm font-bold text-navy-deep transition-colors group-hover:text-ocean">
            {node.name}
          </span>
          <span className="mt-1 block text-caption leading-snug text-charcoal">{node.role}</span>
          <span className="mt-1.5 block text-caption text-muted">
            {entityLabel(node.entityId)} · {node.unit}
          </span>
        </Link>

        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggle(node.id)}
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} the ${node.children.length} people reporting to ${node.name}`}
            className={cn(
              'absolute -bottom-3 left-1/2 flex h-6 -translate-x-1/2 items-center gap-1 rounded-full border border-hairline bg-white px-2 text-caption text-muted transition-colors',
              'hover:border-ocean hover:text-ocean',
            )}
          >
            {node.children.length}
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-300',
                expanded && 'rotate-180',
              )}
              aria-hidden
            />
          </button>
        ) : null}
      </div>

      {expanded ? (
        <>
          {/* Drop out of this box into the children's rail */}
          <span aria-hidden className="h-6 w-px shrink-0 bg-hairline" />
          <ul role="group" className="flex items-start justify-center pt-0">
            {node.children.map((child, childIndex) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                index={childIndex}
                siblings={node.children.length}
                open={open}
                toggle={toggle}
                directoryPath={directoryPath}
              />
            ))}
          </ul>
        </>
      ) : null}
    </li>
  );
}

/**
 * Top-down organisation chart: each person sits above the people who report to them,
 * joined by elbow connectors. Wide branches scroll horizontally rather than wrapping,
 * which would break the visual reading of the hierarchy.
 */
export function OrgTree({ root, directoryPath = '/directory', className }: OrgTreeProps) {
  const ids = useMemo(() => collectIds(root), [root]);
  const [open, setOpenSet] = useState<Set<string>>(() => defaultOpen(root));
  const viewport = useRef<HTMLDivElement>(null);

  // A wide top row spills past the viewport, and a scroller parks at its left edge —
  // which puts the chief executive off screen. Open on the middle of the chart instead.
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
  }, [root]);

  // The scope switcher swaps the tree under us; start each scope from its own default.
  useEffect(() => setOpenSet(defaultOpen(root)), [root]);

  const toggle = useCallback((id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allOpen = open.size >= ids.length;

  return (
    <div className={cn('min-w-0', className)}>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          icon={<Plus className="h-[18px] w-[18px]" aria-hidden />}
          iconPosition="left"
          onClick={() => setOpenSet(new Set(ids))}
          disabled={allOpen}
        >
          Expand all
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<Minus className="h-[18px] w-[18px]" aria-hidden />}
          iconPosition="left"
          onClick={() => setOpenSet(defaultOpen(root))}
        >
          Reset view
        </Button>
        <p className="ml-auto text-caption text-muted">Drag sideways to follow a branch</p>
      </div>

      <div ref={viewport} className="-mx-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
        <ul
          role="tree"
          aria-label={`Reporting line from ${root.name}, ${root.role}`}
          className="flex w-max min-w-full justify-center py-2"
        >
          <TreeNode
            node={root}
            level={1}
            index={0}
            siblings={1}
            open={open}
            toggle={toggle}
            directoryPath={directoryPath}
          />
        </ul>
      </div>
    </div>
  );
}

/** Headcount for a scope — every person in the reporting tree, root included. */
export function countNodes(root: OrgNode) {
  return collectIds(root).length;
}
