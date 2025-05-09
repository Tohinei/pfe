import {
  BarChart,
  Calendar,
  Database,
  Home,
  Inbox,
  Layers,
  Search,
  Settings,
} from "lucide-react";

interface RenderIconProps {
  icon: string | undefined | null;
}

export default function RenderIcon({ icon }: RenderIconProps) {
  const renderIcon = (icon: string | undefined | null) => {
    switch (icon?.toLocaleLowerCase()) {
      case "home":
        return <Home />;
      case "calendar":
        return <Calendar />;
      case "inbox":
        return <Inbox />;
      case "search":
        return <Search />;
      case "barchart":
        return <BarChart />;
      case "layers":
        return <Layers />;
      case "settings":
        return <Settings />;
      case "database":
        return <Database />;
      default:
        return null;
    }
  };
  return renderIcon(icon);
}
