import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/component/ui/dialog";
import { Button } from "@/component/ui/button";

const AppModal = ({
  show,
  onclose,
  onSubmit,
  title,
  children,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isLoading = false,
  // showFooter = true,
}) => {
  return (
    <Dialog open={show} onOpenChange={onclose}>
      <DialogContent className="max-w-[540px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="py-2">{children}</div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading ..." : submitLabel}
            </Button>
            <Button variant="outline" onClick={() => onclose(false)}>
              {cancelLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AppModal;
