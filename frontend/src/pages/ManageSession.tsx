import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/dataTableColumnHeader";
import LoadingPage from "@/components/LoadingPage";
import SessionForm from "@/components/SessionForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSessions } from "@/hooks/useData";
import { useDeleteSession } from "@/hooks/userCreateSession";
import { Session } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Column } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const tableColumns = [
  { label: "Name", name: "name" },
  { label: "Icon", name: "icon" },
  { label: "Description", name: "description" },
];

export default function ManageSession() {
  const [editingItem, setEditingItem] = useState<Session | null>(null);
  const { data: sessions, isLoading, isError } = useSessions();
  const { mutate: deleteSession } = useDeleteSession();
  console.log(sessions);
  const handleDelete = async (id: string) => {
    deleteSession(id);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error loading sessions</div>;
  }

  const columns: ColumnDef<Session>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    ...tableColumns.map((column) => ({
      accessorKey: column.name,
      header: ({ column: col }: { column: Column<Session> }) => (
        <DataTableColumnHeader column={col} title={column.label} />
      ),
      id: column.name,
    })),
    {
      id: "parentSession.name",
      accessorFn: (row: Session) => row.parentSession?.name ?? "",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parent" />
      ),
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-10 p-2 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <MoreHorizontal className="h-5 w-5 text-gray-700 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background shadow-lg rounded-md border w-[100px]"
            >
              <DropdownMenuItem
                className="p-2 outline-0 cursor-pointer"
                onSelect={() => setEditingItem(item)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-2 outline-0 cursor-pointer"
                onClick={() => handleDelete(item.id ?? "")}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={sessions ?? []} form="session" />

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Session</DialogTitle>
              <DialogDescription>
                Edit the session details below.
              </DialogDescription>
            </DialogHeader>
            <SessionForm form={editingItem} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

//  accessorKey: "firstName",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           First Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
