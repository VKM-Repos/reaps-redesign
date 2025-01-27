import TemplateCard from "@/pages/dashboard/home/custom/TemplateCard";
type TemplateGridProps = {
  templates: any;
};
export default function TemplateGrid({ templates }: TemplateGridProps) {
  console.log(templates, "////");

  return (
    <div>
      <div className="flex flex-wrap gap-5">
        {templates?.items?.map((template: any) => (
          <TemplateCard template={template} />
        ))}
      </div>
    </div>
  );
}
