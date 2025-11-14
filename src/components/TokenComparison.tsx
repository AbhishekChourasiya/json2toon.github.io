import { Card } from "@/components/ui/card";
import { ArrowDown, Percent } from "lucide-react";

interface TokenComparisonProps {
  jsonTokens: number;
  toonTokens: number;
}

export const TokenComparison = ({ jsonTokens, toonTokens }: TokenComparisonProps) => {
  const reduction = jsonTokens > 0 ? ((jsonTokens - toonTokens) / jsonTokens * 100).toFixed(1) : 0;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-6 space-y-2">
        <div className="text-sm text-muted-foreground font-medium">JSON Tokens</div>
        <div className="text-4xl font-bold text-foreground">{jsonTokens.toLocaleString()}</div>
      </Card>

      <Card className="p-6 space-y-2 border-accent/50 bg-accent/5">
        <div className="text-sm text-accent font-medium flex items-center gap-2">
          <ArrowDown className="h-4 w-4" />
          Token Reduction
        </div>
        <div className="text-4xl font-bold text-accent flex items-baseline gap-1">
          {reduction}
          <Percent className="h-6 w-6" />
        </div>
      </Card>

      <Card className="p-6 space-y-2">
        <div className="text-sm text-muted-foreground font-medium">TOON Tokens</div>
        <div className="text-4xl font-bold text-foreground">{toonTokens.toLocaleString()}</div>
      </Card>
    </div>
  );
};
