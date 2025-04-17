import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser, clearError } from "@/redux/slices/auth";
import { Button } from "@/shared/components/ui/Button";
import Typography from "@/shared/components/ui/Typography";
import { RootState } from "@/redux/store";
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
import {
  loginSchema,
  type LoginFormValues,
} from "@/shared/validation/FormSchema";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authError = useSelector((state: RootState) => state.auth?.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth?.isAuthenticated,
  );

  const from = location.state?.from?.pathname || "/products";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      dispatch(clearError());

      dispatch(loginUser(values));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="rounded-lg border p-6 shadow-sm">
        <Typography variant="h3" className="mb-6 text-center font-bold">
          Log In to Your Account
        </Typography>

        {authError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-red-600">
            {authError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1 block text-sm font-medium">
                    Username
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
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
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
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </div>

            <div className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-gray-600 hover:underline"
                >
                  Create one
                </Link>
              </Typography>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
