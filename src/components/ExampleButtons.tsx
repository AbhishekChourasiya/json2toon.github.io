import { Button } from "@/components/ui/button";

interface ExampleButtonsProps {
  onSelectExample: (json: string) => void;
}

const EXAMPLES = {
  simpleUsers: {
    name: "Simple Users",
    json: JSON.stringify({
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", active: true },
        { id: 2, name: "Jane Smith", email: "jane@example.com", active: false }
      ]
    }, null, 2)
  },
  apiResponse: {
    name: "API Response",
    json: JSON.stringify({
      status: "success",
      data: {
        user: {
          id: 12345,
          username: "techdev2024",
          profile: {
            fullName: "Alex Thompson",
            avatar: "https://api.example.com/avatars/12345.jpg"
          }
        },
        posts: [
          { id: 1, title: "Getting Started with TOON", likes: 42 },
          { id: 2, title: "JSON vs TOON Comparison", likes: 156 }
        ]
      },
      meta: {
        timestamp: "2024-11-14T10:30:00Z",
        version: "1.0"
      }
    }, null, 2)
  }
};

export const ExampleButtons = ({ onSelectExample }: ExampleButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button
        variant="outline"
        onClick={() => onSelectExample(EXAMPLES.simpleUsers.json)}
      >
        {EXAMPLES.simpleUsers.name}
      </Button>
      <Button
        variant="outline"
        onClick={() => onSelectExample(EXAMPLES.apiResponse.json)}
      >
        {EXAMPLES.apiResponse.name}
      </Button>
    </div>
  );
};
