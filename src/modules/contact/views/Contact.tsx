import { Button } from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/Form";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import {
  contactSchema,
  type ContactFormValues,
} from "@/shared/validation/FormSchema";

export default function Contact() {
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async () => {
    setTimeout(() => {
      enqueueSnackbar(
        "Message sent successfully! We will get back to you soon.",
        {
          variant: "success",
        },
      );
      form.reset();
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <Typography variant="h2" className="mb-6 text-center font-bold">
        Contact Us
      </Typography>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg p-6 shadow-sm">
          <Typography variant="h4" className="text-primary mb-4 font-semibold">
            Send Us a Message
          </Typography>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full rounded-md border p-2 shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full rounded-md border p-2 shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full rounded-md border p-2 shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        className="w-full rounded-md border p-2 shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} className="ml-2" />
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-6 rounded-lg p-6 shadow-sm">
          <div>
            <Typography
              variant="h4"
              className="text-primary mb-4 font-semibold"
            >
              Get In Touch
            </Typography>
            <Typography variant="body1">
              We'd love to hear from you! Whether you have a question about our
              products, need help with an order, or want to collaborate, our
              team is ready to assist you.
            </Typography>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin size={20} className="text-primary mr-3" />
              <div>
                <Typography variant="body1" className="font-medium">
                  Our Location
                </Typography>
                <Typography variant="body2" color="muted">
                  123 Commerce Street, Suite 456
                  <br />
                  Business City, ST 12345
                </Typography>
              </div>
            </div>

            <div className="flex items-start">
              <Phone size={20} className="text-primary mr-3" />
              <div>
                <Typography variant="body1" className="font-medium">
                  Phone Number
                </Typography>
                <Typography variant="body2" color="muted">
                  +1 (555) 123-4567
                </Typography>
              </div>
            </div>

            <div className="flex items-start">
              <Mail size={20} className="text-primary mr-3" />
              <div>
                <Typography variant="body1" className="font-medium">
                  Email Address
                </Typography>
                <Typography variant="body2" color="muted">
                  support@ecommercestore.com
                </Typography>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h5" className="mb-2 font-medium">
              Business Hours
            </Typography>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 pr-4 font-medium">Monday - Friday:</td>
                  <td>9:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Saturday:</td>
                  <td>10:00 AM - 4:00 PM</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 font-medium">Sunday:</td>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
