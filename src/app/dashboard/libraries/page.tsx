import ResourceManager from "@/components/dashboard/resource-manager";

export default function LibrariesPage() {
  return <ResourceManager eyebrow="Network" title="Libraries" description="Manage connected branches and their inventory and member totals." apiPath="/libraries" searchKeys={["name", "location", "status"]} fields={[
    { key: "name", label: "Name", required: true },
    { key: "location", label: "Location", required: true },
    { key: "books", label: "Books", type: "number" },
    { key: "members", label: "Members", type: "number" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Maintenance"] },
  ]} />;
}
