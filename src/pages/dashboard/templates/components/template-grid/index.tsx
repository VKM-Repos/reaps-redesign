import TemplateCard from "@/pages/dashboard/home/custom/TemplateCard";
type TemplateGridProps = {
  templates: any;
};
export default function TemplateGrid({ templates }: TemplateGridProps) {
  console.log(templates, "////");

  return (
    <div>
      template
      <div className="flex">
        {templates?.items?.map((template: any) => (
          <TemplateCard template={template} />
        ))}
      </div>
    </div>
  );
}
