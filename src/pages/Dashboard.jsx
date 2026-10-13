import {
  Card,
  // CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "../component/ui/card";
import { DollarSign } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-muted/30">
        <main className="max-w-6xl mx-auto p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard POS</h2>
            <p className="text-sm text-muted-foreground">
              Welcome to Dashboard
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="shadow-lg border-border p-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today Sales
                </CardTitle>
                {/* icon */}
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            </Card>
            <Card className="shadow-lg border-border p-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today Sales
                </CardTitle>
                {/* icon */}
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            </Card>
            <Card className="shadow-lg border-border p-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today Sales
                </CardTitle>
                {/* icon */}
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
