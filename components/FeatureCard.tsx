import Image from "next/image";

export const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  return (
    <div className="bg-background rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center hover-card transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 icon-container">
        <Image src={icon} alt={title} width={24} height={24} className="icon-image" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};