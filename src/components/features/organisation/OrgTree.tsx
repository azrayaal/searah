import { useCallback, useMemo, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { entityLabel } from '@/components/features/directory/EmployeeCard';
import { EASE } from '@/lib/motion';
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
  isLast: boolean;
  open: Set<string>;
  toggle: (id: string) => void;
  setOpen: (id: string, value: boolean) => void;
  directoryPath: string;
}

function TreeNode({ node, level, isLast, open, toggle, setOpen, directoryPath }: TreeNodeProps) {
  const hasChildren = node.children.length > 0;
  const expanded = hasChildren && open.has(node.id);
  const root = level === 1;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!hasChildren) return;
    if (event.key === 'ArrowRight' && !expanded) {
      event.preventDefault();
      setOpen(node.id, true);
    }
    if (event.key === 'ArrowLeft' && expanded) {
      event.preventDefault();
      setOpen(node.id, false);
    }
  };

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-level={level}
      className={cn('relative', !root && 'pl-6 pt-2 sm:pl-8')}
    >
      {!root ? (
        <>
          {/* Vertical spine — stops at the connector on the last sibling */}
          <span
            aria-hidden
            className={cn('absolute left-0 top-0 w-px bg-hairline', isLast ? 'h-9' : 'h-full')}
          />
          {/* Horizontal connector into the centre of the node row */}
          <span aria-hidden className="absolute left-0 top-9 h-px w-6 bg-hairline sm:w-8" />
        </>
      ) : null}

      <div
        onKeyDown={onKeyDown}
        className={cn(
          'group flex min-h-[56px] items-center gap-2 rounded-field border bg-white pr-2 transition-colors duration-300',
          'hover:border-ocean/40 hover:bg-sky-faint',
          root ? 'border-navy-deep/15 shadow-raised' : 'border-hairline',
        )}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggle(node.id)}
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} the team reporting to ${node.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-field text-muted transition-colors hover:text-ocean"
          >
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex"
            >
              <ChevronRight className="h-[18px] w-[18px]" aria-hidden />
            </motion.span>
          </button>
        ) : (
          <span className="flex h-11 w-4 shrink-0 items-center justify-center sm:w-6" aria-hidden>
            <span className="h-1 w-1 rounded-full bg-hairline" />
          </span>
        )}

        <Link
          to={`${directoryPath}?person=${node.employeeId}`}
          className="flex min-h-[44px] min-w-0 flex-1 items-center gap-3 py-2 pr-1"
        >
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="truncate text-body-sm font-bold text-navy-deep transition-colors group-hover:text-ocean">
                {node.name}
              </span>
              <span className="text-caption text-muted">{entityLabel(node.entityId)}</span>
            </span>
            <span className="mt-0.5 block truncate text-caption text-charcoal">{node.role}</span>
            <span className="mt-0.5 block truncate text-caption text-muted">{node.unit}</span>
          </span>

          {hasChildren ? (
            <span className="hidden shrink-0 rounded-full bg-navy-deep/5 px-2 py-0.5 text-caption text-muted sm:inline">
              {node.children.length}
            </span>
          ) : null}

          <ArrowUpRight
            className="h-[18px] w-[18px] shrink-0 text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </Link>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.ul
            key="children"
            role="group"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            {node.children.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                isLast={index === node.children.length - 1}
                open={open}
                toggle={toggle}
                setOpen={setOpen}
                directoryPath={directoryPath}
              />
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

/**
 * Expandable reporting tree. Connectors are drawn with hairline borders rather
 * than SVG so the tree reflows with the text at any viewport width.
 */
export function OrgTree({ root, directoryPath = '/directory', className }: OrgTreeProps) {
  const ids = useMemo(() => collectIds(root), [root]);
  const [open, setOpenSet] = useState<Set<string>>(() => defaultOpen(root));

  const toggle = useCallback((id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const setOpen = useCallback((id: string, value: boolean) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
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
      </div>

      {/* Horizontal scroll keeps deep branches usable on narrow screens */}
      <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        <ul
          role="tree"
          aria-label={`Reporting line from ${root.name}, ${root.role}`}
          className="min-w-[420px] md:min-w-0"
        >
          <TreeNode
            node={root}
            level={1}
            isLast
            open={open}
            toggle={toggle}
            setOpen={setOpen}
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
