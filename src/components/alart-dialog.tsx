import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";

type AlartDialogProps = {
  title?: string;
  handleDelete: () => void;
};

export function AlertDialogModal({ title, handleDelete }: AlartDialogProps) {
  const { toast } = useToast();
  const onSubmit = () => {
    try {
      handleDelete();

      toast({ title: "Product Deleted Successfully" });
    } catch (error) {}
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="text-sm ml-2 cursor-pointer">{title}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            service and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
