import ResourceManager from "@/components/dashboard/resource-manager";

export default function ReviewsPage() {
  return <ResourceManager eyebrow="Moderation" title="Reviews" description="Review community feedback and control what is approved for publishing." apiPath="/reviews" searchKeys={["reviewerName", "bookTitle", "comment", "status"]} fields={[
    { key: "reviewerName", label: "Reviewer", required: true },
    { key: "bookTitle", label: "Book", required: true },
    { key: "rating", label: "Rating", type: "number", required: true },
    { key: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected"] },
    { key: "comment", label: "Comment", type: "textarea" },
  ]} />;
}
