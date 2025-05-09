import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/dataTableColumnHeader";
import LoadingPage from "@/components/LoadingPage";
import MenuForm from "@/components/MenuForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteMenu } from "@/hooks/useCreateMenu";
import { useProducts } from "@/hooks/useData";
import { Product } from "@/types/types";
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
  { label: "Description", name: "description" },
];

export default function ManageProduct() {
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const { data: products, isLoading, isError } = useProducts();
  const { mutate: deleteMenu } = useDeleteMenu();

  const handleDelete = async (id: string) => {
    deleteMenu(id);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error loading sessions</div>;
  }

  const columns: ColumnDef<Product>[] = [
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
      header: ({ column: col }: { column: Column<Product> }) => (
        <DataTableColumnHeader column={col} title={column.label} />
      ),
      id: column.name,
    })),

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
      <DataTable columns={columns} data={products ?? []} />

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Edit the product details below.
              </DialogDescription>
            </DialogHeader>
            <MenuForm form={editingItem} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
