import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Mail, Pencil, Phone, MapPin, Calendar, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { format } from "date-fns";

export default function Profile() {
  const { data } = useAuthStore();

  return (
    <Card className="max-w-md mx-auto mt-[5rem] p-4">
      <CardHeader className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={data?.profilePicture || "/profile.jpg"}
            alt="User avatar"
          />
        </Avatar>
        <div>
          <CardTitle className="text-xl">
            {data?.firstName} {data?.lastName}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {data?.role?.name || "User"}
          </CardDescription>
        </div>
        <Button size="icon" variant="ghost" className="ml-auto">
          <Pencil className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{data?.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{data?.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{data?.gender}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{data?.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            Date of Birth:{" "}
            {data?.dateOfBirth
              ? format(new Date(data.dateOfBirth), "PPP")
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            Joined:{" "}
            {data?.createdAt ? format(new Date(data.createdAt), "PPP") : "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
