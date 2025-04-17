import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/redux/slices/auth";
import Typography from "@/shared/components/ui/Typography";
import { User } from "@/interface/product.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/Input";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "@/shared/validation/FormSchema";
import { Button } from "@/shared/components/ui/Button";

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      address: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: RegistrationFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = values;
      dispatch(registerUser(userData as User));

      navigate("/products");
    } catch (error) {
      console.error("Registration error:", error);
      form.setError("root", {
        message: "An error occurred during registration. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <div className="rounded-lg border p-6 shadow-sm">
        <Typography variant="h3" className="mb-6 text-center font-bold">
          Create an Account
        </Typography>

        {form.formState.errors.root && (
          <div className="mb-4 rounded-md p-3 text-red-600">
            {form.formState.errors.root.message}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium">
                      First Name *
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 block text-sm font-medium">
                      Last Name
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
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 block text-sm font-medium">
                    Username *
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 block text-sm font-medium">
                    Password *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="w-full rounded-md border p-2 shadow-sm"
                      placeholder="Min. 8 characters with uppercase, number, special char"
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
                    Email
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 block text-sm font-medium">
                    Address
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

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </div>

            <div className="text-center">
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-gray-600 hover:underline"
                >
                  Log In
                </Link>
              </Typography>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
