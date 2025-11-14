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
  ecommerce: {
    name: "E-commerce Order",
    json: JSON.stringify({
      orderId: "ORD-2024-00184729",
      orderDate: "2024-11-14T10:30:00Z",
      status: "processing",
      customer: {
        customerId: "CUST-99382746",
        firstName: "Emma",
        lastName: "Rodriguez",
        email: "emma.rodriguez@email.com",
        phone: "+1-555-0123-4567",
        shippingAddress: {
          street: "2847 Maple Grove Avenue",
          apartment: "Suite 402",
          city: "Portland",
          state: "Oregon",
          zipCode: "97204",
          country: "United States",
          coordinates: {
            latitude: 45.5152,
            longitude: -122.6784
          }
        },
        billingAddress: {
          street: "2847 Maple Grove Avenue",
          apartment: "Suite 402",
          city: "Portland",
          state: "Oregon",
          zipCode: "97204",
          country: "United States"
        },
        loyaltyProgram: {
          tier: "platinum",
          points: 15847,
          memberSince: "2019-03-15"
        }
      },
      items: [
        {
          productId: "PROD-ELEC-00847",
          sku: "LPTOP-DELL-XPS15-I7-32GB-1TB",
          name: "Dell XPS 15 9520 Laptop",
          category: "Electronics",
          subcategory: "Computers & Laptops",
          brand: "Dell",
          specifications: {
            processor: "Intel Core i7-12700H",
            ram: "32GB DDR5",
            storage: "1TB NVMe SSD",
            display: "15.6-inch 4K OLED Touch",
            graphics: "NVIDIA GeForce RTX 3050 Ti",
            weight: "4.31 lbs"
          },
          quantity: 1,
          unitPrice: 2499.99,
          discount: {
            type: "percentage",
            value: 15,
            code: "TECH15",
            appliedAmount: 375.00
          },
          tax: {
            rate: 0.0875,
            amount: 185.94
          },
          subtotal: 2124.99,
          total: 2310.93,
          warranty: {
            type: "extended",
            duration: "3 years",
            price: 299.99,
            coverage: "Comprehensive with accidental damage"
          }
        },
        {
          productId: "PROD-ACC-02934",
          sku: "MOUSE-LOG-MXM3S-BLK",
          name: "Logitech MX Master 3S Wireless Mouse",
          category: "Electronics",
          subcategory: "Computer Accessories",
          brand: "Logitech",
          specifications: {
            connectivity: "Bluetooth & USB-C",
            dpi: "8000",
            buttons: 7,
            battery: "70 days on full charge",
            color: "Black"
          },
          quantity: 2,
          unitPrice: 99.99,
          discount: null,
          tax: {
            rate: 0.0875,
            amount: 17.50
          },
          subtotal: 199.98,
          total: 217.48
        },
        {
          productId: "PROD-ACC-01847",
          sku: "KB-MECH-KYCHRO-RGB-BR",
          name: "Keychron K8 Pro Mechanical Keyboard",
          category: "Electronics",
          subcategory: "Computer Accessories",
          brand: "Keychron",
          specifications: {
            layout: "TKL (Tenkeyless)",
            switches: "Gateron G Pro Brown",
            connectivity: "Wireless & Wired",
            backlight: "RGB",
            batteryLife: "240 hours"
          },
          quantity: 1,
          unitPrice: 109.99,
          discount: {
            type: "fixed",
            value: 20,
            code: "BUNDLE20",
            appliedAmount: 20.00
          },
          tax: {
            rate: 0.0875,
            amount: 7.87
          },
          subtotal: 89.99,
          total: 97.86
        }
      ],
      pricing: {
        itemsSubtotal: 2414.96,
        totalDiscount: 395.00,
        subtotalAfterDiscount: 2019.96,
        taxAmount: 211.31,
        shippingCost: {
          method: "express",
          carrier: "FedEx",
          estimatedDays: 2,
          cost: 24.99,
          insurance: 5.99
        },
        warrantyTotal: 299.99,
        giftWrap: {
          selected: true,
          cost: 12.99
        },
        total: 2574.23,
        currency: "USD"
      },
      payment: {
        method: "credit_card",
        cardType: "Visa",
        last4Digits: "4892",
        transactionId: "TXN-847293847293",
        authorizationCode: "AUTH-9384729",
        timestamp: "2024-11-14T10:32:15Z",
        status: "approved",
        installments: {
          enabled: true,
          plan: "6_months",
          monthlyAmount: 429.04
        }
      },
      shipping: {
        trackingNumber: "FDX8473927483",
        carrier: "FedEx",
        service: "FedEx 2Day",
        estimatedDelivery: "2024-11-16",
        shipFromWarehouse: {
          id: "WH-WEST-02",
          name: "Western Distribution Center",
          city: "Reno",
          state: "Nevada"
        }
      },
      metadata: {
        source: "web",
        device: "desktop",
        browser: "Chrome 119",
        referrer: "google_shopping",
        sessionId: "SESS-8472938472938",
        ipAddress: "203.0.113.42",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
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
        onClick={() => onSelectExample(EXAMPLES.ecommerce.json)}
      >
        {EXAMPLES.ecommerce.name}
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
