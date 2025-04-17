import Typography from "@/shared/components/ui/Typography";
import { Button } from "@/shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <Typography variant="h1" className="text-primary mb-4 font-bold">
          About Our Store
        </Typography>
        <Typography variant="body1" className="mx-auto max-w-2xl">
          We're dedicated to providing high-quality products and exceptional
          shopping experiences for our customers. Learn more about our journey
          and values.
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <Typography variant="h3" className="mb-4 font-semibold">
            Our Story
          </Typography>
          <Typography variant="body1" className="mb-4">
            Founded in 2020, our e-commerce store began with a simple mission:
            to create a platform where customers can find carefully curated
            products that combine quality, style, and value.
          </Typography>
          <Typography variant="body1" className="mb-4">
            What started as a small online shop has grown into a comprehensive
            marketplace offering products across multiple categories, all while
            maintaining our commitment to customer satisfaction and quality.
          </Typography>
          <Button onClick={() => navigate("/contact")} className="mt-2">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div>
          <Typography variant="h3" className="mb-4 font-semibold">
            Our Values
          </Typography>
          <div className="space-y-4">
            <div>
              <Typography variant="h5" className="mb-1 font-medium">
                Quality First
              </Typography>
              <Typography variant="body1">
                We rigorously test and select every product in our catalog to
                ensure it meets our high standards of quality and durability.
              </Typography>
            </div>
            <div>
              <Typography variant="h5" className="mb-1 font-medium">
                Customer Satisfaction
              </Typography>
              <Typography variant="body1">
                Your satisfaction is our priority. We strive to provide
                exceptional customer service and address any concerns promptly.
              </Typography>
            </div>
            <div>
              <Typography variant="h5" className="mb-1 font-medium">
                Sustainability
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                We're committed to reducing our environmental impact through
                sustainable practices in packaging, shipping, and product
                sourcing.
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Typography variant="h3" className="mb-6 text-center font-semibold">
          Our Team
        </Typography>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image: "https://randomuser.me/api/portraits/women/32.jpg",
            },
            {
              name: "Michael Chen",
              role: "Head of Product",
              image: "https://randomuser.me/api/portraits/men/67.jpg",
            },
            {
              name: "Alicia Patel",
              role: "Customer Experience",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "James Wilson",
              role: "Operations Manager",
              image: "https://randomuser.me/api/portraits/men/91.jpg",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="mb-4 h-32 w-32 rounded-full object-cover shadow-md"
              />
              <Typography variant="h5" className="mb-1 font-medium">
                {member.name}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {member.role}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
