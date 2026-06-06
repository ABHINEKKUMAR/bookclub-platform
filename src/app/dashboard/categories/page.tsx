import ResourceManager from "@/components/dashboard/resource-manager";

export default function CategoriesPage() {
  return <ResourceManager eyebrow="Catalog" title="Categories" description="Keep the book catalog organized with a clear, reusable taxonomy." apiPath="/categories" listKey="categories" searchKeys={["name", "description", "status"]} fields={[
    { key: "name", label: "Name", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
  ]} />;
}
