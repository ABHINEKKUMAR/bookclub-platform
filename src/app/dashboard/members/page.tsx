import ResourceManager from "@/components/dashboard/resource-manager";

export default function MembersPage() {
  return <ResourceManager eyebrow="Community" title="Members" description="Manage reader profiles, membership plans, and account status." apiPath="/members" searchKeys={["name", "email", "phone", "membershipType"]} fields={[
    { key: "name", label: "Name", required: true },
    { key: "email", label: "Email", required: true },
    { key: "phone", label: "Phone" },
    { key: "membershipType", label: "Membership", type: "select", options: ["Basic", "Standard", "Premium"] },
    { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
  ]} />;
}
